import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    text_blocks = []
    for page in doc:
        text = page.get_text()
        if text.strip():
            text_blocks.append(text)
    doc.close()
    return "\n".join(text_blocks)