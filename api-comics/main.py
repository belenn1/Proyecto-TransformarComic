from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from uuid import uuid4


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción poné tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

#definimos la carpeta donde se subiran los pdf
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

#es la ruta que me permite subir los pdf
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    
    # ✅ Validar tipo
    if file.content_type != "application/pdf":
        return JSONResponse(
            status_code=400,
            content={"error": "Solo se permiten archivos PDF"}
        )

    # ✅ Generar nombre único (evita sobreescritura)
    unique_filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)

    # ✅ Guardar archivo físicamente
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "PDF subido correctamente",
        "filename": unique_filename,
        "path": file_path
    }