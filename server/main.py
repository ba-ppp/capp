import json
import os
import sys
from fastapi import File, Form, UploadFile, FastAPI, BackgroundTasks
from pydantic import BaseModel
import uuid
from fastapi.middleware.cors import CORSMiddleware
from system.files_upload import *
from system.socket import *
from system.generate_captions import *
from config.config import path_config
from minio import Minio
from minio.error import S3Error


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
# async def uploads(files: UploadItem, background_tasks: BackgroundTasks):
#     print(files)
#     # background_tasks.add_task(upload_files_sys, files)
#     return {
#         'msg': 'Done!'
# }
async def uploads(file: UploadFile = Form(), name: str = Form()):
    print("run")
    client = Minio(
        endpoint="play.min.io",
        access_key="capp_cloud",
        secret_key="Ii4*4LCr6ZFxntSsaXn2ki$prST9FW!idWq&pBZe",
        secure=False,
    )
    found = client.bucket_exists("images")
    print(found)
    if not found:
        client.make_bucket("images")
        print("Created")
    else:
        print("Bucket exists")
    
    result = client.put_object("images", file.filename, file.file, -1, part_size=10*1024*1024)
    print(
        "created {0} object; etag: {1}, version-id: {2}".format(
            result.object_name,
            result.etag,
            result.version_id,
        ),
    )
    url = client.presigned_get_object("images", file.filename)
    response = client.get_object("images", file.filename)
    print(response)
    file_location = f"{path_config['static_path']}{file.filename}"
    # write bytes of images to files
    with open(file_location, "wb+") as file_object:
        file_object.write(response.data)
    # captions = generate_caption(url)

    # print(file.content_type)
    return file
    # background_tasks.add_task(upload_files_sys, files)


# start generate captions
@app.get("/generate")
async def start_socket():
    user_id = str(uuid.uuid4())

    print(f"User {user_id} connected!", user_id)
    client = connect_socket(user_id)
    client.loop_start()
    for image_file in os.listdir(path_config.get("static_path")):
        captions = generate_caption(image_file)
        publish(client, json.dumps(captions))
        return
    # image_paths = os.listdir(path_config.get('static_path'))
    # run_background_generate_captions(image_paths)
