import os
import tempfile
from fastapi import FastAPI, UploadFile, File, HTTPException

from parsers.docx_parser import extract_text_from_docx

app = FastAPI(title = "Ai assistant TZ parser")

@app.get("/health")
def health():
    return{"status": "ok"}

@app.post("/parse/docx")
async def parse_docx(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".docx"):
        raise HTTPException(status_code=400, detail="Поддерживаюся только файлы docx")

    content = await file.read()

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
            tmp.write(content)
            tmp_path = tmp.name

        text = extract_text_from_docx(tmp_path)
        return {
            "filename": file.filename,
            "raw_text": text,
            "char_count": len(text),
        }
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)