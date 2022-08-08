import json
import os
import sys
from fastapi import File, Form, UploadFile, FastAPI, BackgroundTasks
from pydantic import BaseModel
import uuid
from fastapi.middleware.cors import CORSMiddleware
from system.process_files import *
from system.socket import *
from system.generate_captions import *
from config.config import path_config
from minio import Minio
from minio.error import S3Error
import os


app = FastAPI()
origins = [
    "*",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UploadItem(BaseModel):
    relativePath: str | None = None
    name: str | None
    type: str
    file: UploadFile


# upload images
@app.post("/upload")
async def uploads(user_id: str, file: UploadFile = Form()):
    # Initialize minio client
    client = Minio(
        endpoint=s3_config.get("endpoint"),
        access_key=s3_config.get("access_key"),
        secret_key=s3_config.get("secret_key"),
        secure=False,
    )

    # Upload file and create bucket
    upload_file_to_s3(client, file)

    # Write file to tmp folder
    get_save_file_local(client, file.filename, user_id)
    # url = client.presigned_get_object("images", file.filename)
    # print(response)
    # # write bytes of images to files
    # captions = generate_caption(url)

    # print(file.content_type)
    return {"message": "success"}
    # background_tasks.add_task(upload_files_sys, files)


# start generate captions
@app.get("/generate")
async def start_socket(user_id: str):

    print(f"User {user_id} connected!", user_id)
    server_id = str(uuid.uuid4())
    client = connect_socket(server_id)
    client.loop_start()
    folder_location = f"{path_config['static_path']}{user_id}/"
    print(folder_location)
    for image_file in os.listdir(folder_location):
        captions = generate_caption(user_id, image_file)
        publish(client, f"captions/{user_id}", json.dumps(captions))
        print(f"captions/{user_id}")
        return
    # image_paths = os.listdir(path_config.get('static_path'))
    # run_background_generate_captions(image_paths)
