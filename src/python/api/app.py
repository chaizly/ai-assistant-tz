import os
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException
from parsers.universal_parser import extract_text_universal

app = FastAPI(title="TZ Assistant Parser")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/parse")
async def parse_file(file: UploadFile = File(...)):
    # Достаем расширение из имени файла
    _, ext = os.path.splitext(file.filename)
    if not ext:
        raise HTTPException(status_code=400, detail="Файл без расширения")

    content = await file.read()
    tmp_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
            tmp.write(content)
            tmp_path = tmp.name

        text = extract_text_universal(tmp_path)
        return {
            "filename": file.filename,
            "raw_text": text,
            "char_count": len(text),
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)