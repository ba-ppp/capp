import json
from uuid import uuid4
from fastapi import UploadFile, FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from system.process_files import *
from system.socket import *
from system.generate_captions import *
from config.config import path_config
from minio import Minio
from datetime import datetime
from googletrans import Translator
from gtts import gTTS

app = FastAPI()
translator = Translator()

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
minio_client = Minio(
    endpoint=s3_config.get("endpoint"),
    access_key=s3_config.get("access_key"),
    secret_key=s3_config.get("secret_key"),
    secure=False,
)

@app.post("/upload")
async def uploads(user_id: str, file: UploadFile, background_tasks: BackgroundTasks):
    # Initialize minio client

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

class Item(BaseModel):
    user_id: str
    caption: str

@app.post('/exports')
async def exports(item: Item):
    caption = item.caption
    user_id = item.user_id

    myobj = gTTS(text=caption, lang='en', slow=False)
  
    # Saving the converted audio in a mp3 file named
    # welcome 
    folder_location = f"{path_config['static_path']}{user_id}"
    file_id = str(uuid4())
    new_file_name = f"{file_id}.mp3"

    file_location = f"{folder_location}/{new_file_name}"

    os.makedirs(folder_location, exist_ok=True)
    if not os.path.exists(file_location):
        with open(file_location, 'w'): pass

    myobj.save(file_location)

    bucket_export_name = s3_config.get('bucket_export_name')

    found = minio_client.bucket_exists(bucket_export_name)
    if not found:
        minio_client.make_bucket(bucket_export_name)

    minio_client.fput_object(
            bucket_name=bucket_export_name,
            object_name=new_file_name,
            file_path=file_location,
            part_size=10 * 1024 * 1024,
        )

    presign_url = minio_client.presigned_get_object(bucket_export_name, new_file_name)

    return presign_url


# start generate captions
def start_socket(user_id: str, file_name: str, minio_client):

    print(f"User {user_id} connected!", user_id)

    bucket_name = s3_config.get("bucket_name")
    file_id = file_name.split(".")[0]

    caption = generate_caption(user_id, file_name)

    imageURL = minio_client.presigned_get_object(bucket_name, file_name)
    translation = translator.translate(caption, dest="vi")


    result = {
        'id': file_id,
        'statusCode': 0,
        'caption': caption,
        'captionVietnamese': translation.text,
        'updatedAt': datetime.now().strftime("%d %b %y  %H:%M:%S"),
        'imageURL': imageURL
    }

    # send captions to client
    publish(client, f"captions/{user_id}", json.dumps(result))
    print(f"captions/{user_id}")
    return
