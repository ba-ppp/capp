path_config = {
    'static_path': 'static/',
    'model_path': 'model/result.hdf5',
    'token_path': 'model/tokenizer.pkl',
}

socket_config = {
    # "broker": 'broker.emqx.io',
    "broker": 'localhost',
    "port": 1883,
    "channel": "generate/captions",
}