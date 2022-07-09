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
    user_id = str(uuid.uuid4())
    
    print(f'User {user_id} connected!', user_id)
    client = connect_socket(user_id)
    client.loop_start()
    for image_file in os.listdir(path_config.get('static_path')):
        captions = generate_caption(image_file)
        publish(client, json.dumps(captions))
        return
    # image_paths = os.listdir(path_config.get('static_path'))
    # run_background_generate_captions(image_paths)

       





    

