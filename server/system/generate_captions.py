import numpy as np
from PIL import Image
from pickle import load
from keras.models import load_model
from .utils.model import *
from .utils.process import generate_caption_beam_search
from .utils.preprocess import extract_features
import os
from config.config import path_config


# Load the tokenizer
# current_path = os.getcwd() 
tokenizer_path = path_config.get('token_path')
model_path = path_config.get('model_path')

tokenizer = load(open(tokenizer_path, "rb"))

# Max sequence length (from training)
max_length = 40

beam_search_k = 10

# Load the model
caption_model = load_model(model_path)

image_model = CNNModel()

# Extract features from each image in the directory

# Load and prepare the image
def generate_caption(image_file):
    captions_array = []
    
    if image_file.split(".")[1] == "jpg" or image_file.split(".")[1] == "jpeg":
        # Encode image using CNN Model
        image = extract_features(image_file, image_model)

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

