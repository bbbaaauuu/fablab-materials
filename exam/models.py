from typing import Optional

from sqlmodel import Field, SQLModel


class AllMaterials(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    room: str
    material: str
    height: int
    width: int
    thickness: int 

