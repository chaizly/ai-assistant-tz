import os
from parsers.docx_parser import extract_text_from_docx
from parsers.pdf_parser import extract_text_from_pdf
from parsers.txt_parser import extract_text_from_txt

def extract_text_universal(file_path: str) -> str:
    """Смотрит на расширение файла и вызывает нужный парсер."""
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext == '.docx':
        return extract_text_from_docx(file_path)
    elif ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif ext == '.txt':
        return extract_text_from_txt(file_path)
    else:
        raise ValueError(f"Неподдерживаемый формат файла: {ext}")