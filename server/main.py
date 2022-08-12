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

# server connect socket
server_id = str(uuid.uuid4())
client = connect_socket(server_id)
client.loop_start()

# upload images
@app.post("/upload")
async def uploads(user_id: str, file: UploadFile, background_tasks: BackgroundTasks):
    # Initialize minio client
    client = Minio(
        endpoint=s3_config.get("endpoint"),
        access_key=s3_config.get("access_key"),
        secret_key=s3_config.get("secret_key"),
        secure=False,
    )

    # Upload file and create bucket
    new_file_name = upload_file_to_s3(client, file)

    # Write file to tmp folder
    get_save_file_local(client, new_file_name, user_id)

    # start generate captions
    background_tasks.add_task(start_socket, user_id, new_file_name)

    # print(file.content_type)
    return {"message": "success"}


# start generate captions
def start_socket(user_id: str, file_name: str):

    print(f"User {user_id} connected!", user_id)

    captions = generate_caption(user_id, file_name)

    # send captions to client
    publish(client, f"captions/{user_id}", json.dumps(captions))
    print(f"captions/{user_id}")
    return
