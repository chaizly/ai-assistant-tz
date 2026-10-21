from pydantic import BaseModel, Field, HttpUrl
from typing import Literal

Priority = Literal["low", "medium", "high"]

class TzBase(BaseModel):
    processName: str = Field(min_length=5, max_length=120)
    description: str = Field(min_length=20, max_length=2000)
    targetUrl: HttpUrl
    fields: list[str] = Field(min_length=1)
    priority: Priority = "medium"

class TzCreate(TzBase):
    pass

class TzUpdate(TzBase):
    pass

class Tz(TzBase):
    id: int
    createdAt: str