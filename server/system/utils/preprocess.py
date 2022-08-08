import tensorflow as tf
from keras.applications.inception_v3 import preprocess_input
from config.config import path_config 

def extract_features(user_id, filename, model):
  target_size = (299, 299)
  # Loading and resizing image
  image = tf.keras.utils.load_img(f"{path_config.get('static_path')}{user_id}/{filename}", target_size=target_size)

  # Convert the image pixels to a numpy array
  image = tf.keras.utils.img_to_array(image)

  # Reshape data for the model
  image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))

  # Prepare the image for the CNN Model model
  image = preprocess_input(image)

  # Pass image into model to get encoded features
  features = model.predict(image, verbose=0)
  return features