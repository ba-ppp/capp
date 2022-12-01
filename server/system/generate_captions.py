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
from concurrent.futures import ProcessPoolExecutor
from multiprocessing import Pool

# Load the tokenizer
# current_path = os.getcwd()
tokenizer_path = path_config.get("token_path")
vi_tokenizer_path = path_config.get("vi_token_path")
model_path = path_config.get("model_path")
vi_model_path = path_config.get("vi_model_path")

tokenizer = load(open(tokenizer_path, "rb"))
vi_tokenizer = load(open(vi_tokenizer_path, "rb"))

# Max sequence length (from training)
max_length = 37
vi_max_length = 46

beam_search_k = 3

# Load the model
caption_model = load_model(model_path)
caption_model.summary()
vi_caption_model = load_model(vi_model_path)
vi_caption_model.summary()


image_model = CNNModel()
vi_image_model = CNNModel('vi')

# Extract features from each image in the directory

# Load and prepare the image
def generate_caption(user_id: str, file_name: str, lang='en'):
    result = ''

    file_extension = os.path.splitext(file_name)[1]

    # if "jpg" in file_extension or "jpeg" in file_extension:
        # Encode image using CNN Model
    image = extract_features(user_id, file_name, image_model if lang=='en' else vi_image_model)

    # Generate caption using Decoder RNN Model + BEAM search
    generated_caption = generate_caption_beam_search(
        caption_model if lang=='en' else vi_caption_model, tokenizer if lang=='en' else vi_tokenizer, image, max_length if lang=='en' else vi_max_length, beam_index=beam_search_k
    )
    # Remove startseq and endseq
    caption = generated_caption.split()[1].capitalize()
    for x in generated_caption.split()[2 : len(generated_caption.split()) - 1]:
        caption = caption + " " + x
    caption += "."

    result = caption
    return result
