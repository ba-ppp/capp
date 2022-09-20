from keras.applications.inception_v3 import InceptionV3
from keras.models import Model
from keras.layers import Input, Dense, Dropout, LSTM, Embedding, concatenate, RepeatVector, TimeDistributed, Bidirectional



# def CNNModel():
#     vocab_size = 7378
#     max_len = 40
#     rnnConfig = {
#         'embedding_size': 300,
#         'LSTM_units': 256,
#         'dense_units': 256,
#         'dropout': 0.3
#     }

#     embedding_size = rnnConfig['embedding_size']

#     # InceptionV3 outputs a 2048 dimensional vector for each image, which we'll feed to RNN Model
#     image_input = Input(shape=(1000,))


#     image_model_1 = Dropout(rnnConfig['dropout'])(image_input)
#     image_model = Dense(embedding_size, activation='relu')(image_model_1)

#     caption_input = Input(shape=(max_len,))
#     # mask_zero: We zero pad inputs to the same length, the zero mask ignores those inputs. E.g. it is an efficiency.
#     caption_model_1 = Embedding(vocab_size, embedding_size, mask_zero=True)(caption_input)
#     caption_model_2 = Dropout(rnnConfig['dropout'])(caption_model_1)
#     caption_model = LSTM(rnnConfig['LSTM_units'])(caption_model_2)

#     # Merging the models and creating a softmax classifier
#     final_model_1 = concatenate([image_model, caption_model])
#     final_model_2 = Dense(rnnConfig['dense_units'], activation='relu')(final_model_1)
#     final_model = Dense(vocab_size, activation='softmax')(final_model_2)

#     model = Model(inputs=[image_input, caption_input], outputs=final_model)
#     model.compile(loss='categorical_crossentropy', optimizer='adam')
#     return model

def CNNModel():
	model = InceptionV3()

	model.layers.pop()
	model = Model(inputs=model.inputs, outputs=model.layers[-1].output)
	return model