from keras.applications.inception_v3 import InceptionV3
from keras.models import Model

def CNNModel():
	model = InceptionV3()
	model.layers.pop()
	model = Model(inputs=model.inputs, outputs=model.layers[-1].output)
	return model