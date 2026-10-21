import json
from pathlib import Path
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Важно: импорт относительно пакета src.ui
try:
    from .models import Tz, TzCreate, TzUpdate
except ImportError:
    from models import Tz, TzCreate, TzUpdate

DATA_FILE = Path(__file__).parent / "data.json"

app = FastAPI(title="AI Assistant TZ - API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_data() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))

def save_data(items: list[dict]) -> None:
    DATA_FILE.write_text(
        json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8"
    )

def next_id(items: list[dict]) -> int:
    return max((i["id"] for i in items), default=0) + 1

@app.get("/api/tz", response_model=list[Tz])
def list_tz():
    return load_data()

@app.get("/api/tz/{tz_id}", response_model=Tz)
def get_tz(tz_id: int):
    for item in load_data():
        if item["id"] == tz_id:
            return item
    raise HTTPException(404, "Not found")

@app.post("/api/tz", response_model=Tz, status_code=201)
def create_tz(payload: TzCreate):
    items = load_data()
    new_item = {
        "id": next_id(items),
        **payload.model_dump(mode="json"),
        "createdAt": datetime.utcnow().isoformat(timespec="seconds"),
    }
    items.append(new_item)
    save_data(items)
    return new_item

@app.put("/api/tz/{tz_id}", response_model=Tz)
def update_tz(tz_id: int, payload: TzUpdate):
    items = load_data()
    for i, item in enumerate(items):
        if item["id"] == tz_id:
            items[i] = {**item, **payload.model_dump(mode="json")}
            save_data(items)
            return items[i]
    raise HTTPException(404, "Not found")

@app.delete("/api/tz/{tz_id}", status_code=204)
def delete_tz(tz_id: int):
    items = load_data()
    filtered = [i for i in items if i["id"] != tz_id]
    if len(filtered) == len(items):
        raise HTTPException(404, "Not found")
    save_data(filtered)
    return None