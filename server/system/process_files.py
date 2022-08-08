from fastapi import UploadFile, Form
from minio.error import S3Error
from config.config import *
import os


def upload_file_to_s3(client, file: UploadFile = Form()):
    try:
        bucket_name = s3_config.get("bucket_name")

        # Create bucket if it doesn't exist.
        found = client.bucket_exists(bucket_name)
        if not found:
            client.make_bucket(bucket_name)

        # upload file to s3
        client.put_object(
            bucket_name=bucket_name,
            object_name=file.filename,
            data=file.file,
            length=-1,
            part_size=10 * 1024 * 1024,
        )

    except S3Error as e:
        print(e)

def get_save_file_local(client, filename: str, user_id: str):
    folder_location = f"{path_config['static_path']}{user_id}/"
    file_location = f"{folder_location}{filename}"

    os.makedirs(folder_location, exist_ok=True)

    # download file from s3
    response = client.get_object(s3_config.get("bucket_name"), filename)

    with open(file_location, "wb+") as file_object:
        file_object.write(response.data)