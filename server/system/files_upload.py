
from fastapi import UploadFile
from config.config import *

async def upload_files_sys(files: list[UploadFile]):
    try:
        for file in files:
            file_location = f"{path_config['static_path']}/{file.filename}"
            # write bytes of images to files
            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())
    except:
        print('Error -> files upload!')