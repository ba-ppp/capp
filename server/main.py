import json
import os
import sys
from uuid import uuid4
from fastapi import File, Form, UploadFile, FastAPI, BackgroundTasks
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from system.process_files import *
from system.socket import *
from system.generate_captions import *
from config.config import path_config
from minio import Minio
from minio.error import S3Error
import os
from datetime import datetime

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
server_id = str(uuid4())
client = connect_socket(server_id)
client.loop_start()

# upload images
@app.post("/upload")
async def uploads(user_id: str, file: UploadFile, background_tasks: BackgroundTasks):
    # Initialize minio client
    minio_client = Minio(
        endpoint=s3_config.get("endpoint"),
        access_key=s3_config.get("access_key"),
        secret_key=s3_config.get("secret_key"),
        secure=False,
    )

    # Upload file and create bucket
    file_id = str(uuid4())
    new_file_name = upload_file_to_s3(minio_client, file_id, file)

    # Write file to tmp folder
    get_save_file_local(minio_client, new_file_name, user_id)

    # start generate captions
    background_tasks.add_task(start_socket, user_id, new_file_name, minio_client)

    result = {
        'id': file_id,
        'statusCode': 1,
        'uploadedAt': datetime.now().strftime("%d %b %y  %H:%M:%S"),
        'fileType': file.content_type,
    }

    # print(file.content_type)
    return result


# start generate captions
def start_socket(user_id: str, file_name: str, minio_client):

    print(f"User {user_id} connected!", user_id)

    bucket_name = s3_config.get("bucket_name")
    file_id = file_name.split(".")[0]

    caption = generate_caption(user_id, file_name)

    imageURL = minio_client.presigned_get_object(bucket_name, file_name)

    result = {
        'id': file_id,
        'statusCode': 0,
        'caption': caption,
        'updatedAt': datetime.now().strftime("%d %b %y  %H:%M:%S"),
        'imageURL': imageURL
    }

    # send captions to client
    publish(client, f"captions/{user_id}", json.dumps(result))
    print(f"captions/{user_id}")
    return
