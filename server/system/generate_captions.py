from xml.etree.ElementInclude import include
import numpy as np
from PIL import Image
from pickle import load
from keras.models import load_model
from .utils.model import *
from .utils.process import generate_caption_beam_search
from .utils.preprocess import extract_features
import os
from config.config import path_config
import asyncio
from concurrent.futures import ProcessPoolExecutor
from multiprocessing import Pool


# Load the tokenizer
# current_path = os.getcwd()
tokenizer_path = path_config.get("token_path")
model_path = path_config.get("model_path")

tokenizer = load(open(tokenizer_path, "rb"))

# Max sequence length (from training)
max_length = 40

beam_search_k = 10

# Load the model
caption_model = load_model(model_path)

image_model = CNNModel()

# Extract features from each image in the directory

# Load and prepare the image
def generate_caption(user_id: str, file_name: str):
    captions_array = []


    file_extension = os.path.splitext(file_name)[1]
    
    if "jpg" in file_extension or "jpeg" in file_extension:
        # Encode image using CNN Model
        image = extract_features(user_id, file_name, image_model)

        # Generate caption using Decoder RNN Model + BEAM search
        generated_caption = generate_caption_beam_search(
            caption_model, tokenizer, image, max_length, beam_index=beam_search_k
        )
        # Remove startseq and endseq
        caption = "Caption: " + generated_caption.split()[1].capitalize()
        for x in generated_caption.split()[2 : len(generated_caption.split()) - 1]:
            caption = caption + " " + x
        caption += "."

        captions_array.append(caption)
    return captions_array


def run_with_multiple_workers(i):
    # CPU core
    image_paths = os.listdir(path_config.get("static_path"))
    executor = ProcessPoolExecutor(10)
    loop = asyncio.get_event_loop()
    print("a", loop.run_in_executor(executor, generate_caption(image_paths[i])))
    return loop.run_in_executor(executor, generate_caption(image_paths[i]))


def run_background_generate_captions(image_paths):
    pool = Pool(processes=4)

    # run all files at the same time
    r = pool.map_async(run_with_multiple_workers, range(len(image_paths)))
