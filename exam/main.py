from typing import Union

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import AllMaterials
from sqlmodel import Field, Session, SQLModel, create_engine, select

engine = create_engine("sqlite:///database.db")
SQLModel.metadata.create_all(engine)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add-item")
def addItem(item: AllMaterials):
    item1 = AllMaterials(title=item.title, room=item.room, material=item.material, width=item.width, height=item.height, thickness=item.thickness)
    with Session(engine) as session:
        session.add(item1)
        session.commit()

@app.get("/show-items/{mat}")
def allitems(mat: str):
    items_list = []
    with Session(engine) as session:
        items = session.exec(select(AllMaterials).where(AllMaterials.material == mat))

        for item in items :
            items_list.append({"id": item.id, "title": item.title, "material": item.material, "room": item.room, "height": item.height, "width": item.width, "thickness": item.thickness} )

    return items_list

@app.get("/delete-item/{id}")
def delitems(id: int):
    with Session(engine) as session:
        statement = select(AllMaterials).where(AllMaterials.id == id)
        results = session.exec(statement)
        hero = results.one()

        session.delete(hero)
        session.commit()

    return {}