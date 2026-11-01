from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

def extract_text_from_docx(docx_path: str) -> str:
    """
    Извлекает параграфы и таблицы из файлов docx
    """
    doc = Document(docx_path)
    parts=[]

    for element in doc.element.body:
        if element.tag.endswith('p'):
            para = Paragraph(element, doc)
            if para.text.strip():
                parts.append(para.text.strip())
        elif element.tag.endswith('tbl'):
            table = Table(element, doc)
            for row in table.rows:
                cells = [c.text.strip() for c in row.cells if c.text.strip()]
                if cells:
                    parts.append(" | ".join(cells))

    text = "\n".join(parts)
    text = text.replace("\\n", "\n")
    return text
