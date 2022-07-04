import json
import os
import sys
from fastapi import File, UploadFile, FastAPI, BackgroundTasks
import uuid
from fastapi.middleware.cors import CORSMiddleware
from system.files_upload import *
from system.socket import *
from system.generate_captions import *
from config.config import path_config

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

# upload images
@app.post('/uploads')
async def uploads(files: list[UploadFile], background_tasks: BackgroundTasks):
    background_tasks.add_task(upload_files_sys, files)
    return {
        'msg': 'Done!'
    }

# start generate captions
@app.get('/generate')
async def start_socket():
    # user_id = str(uuid.uuid4())
    user_id = 'abcd'
    print('userid', user_id)
    client = connect_socket(user_id)
    # client.loop_start()
    print('connected')
    for image_file in os.listdir(path_config.get('static_path')):
        captions = generate_caption(image_file)
        print(captions)
        publish(client, json.dumps(captions))
        # return

       





    

