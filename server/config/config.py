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

s3_config = {
    "endpoint": "play.min.io",
    "access_key": "capp_cloud",
    "secret_key": "Ii4*4LCr6ZFxntSsaXn2ki$prST9FW!idWq&pBZe",
    "bucket_name": "capp-cloud-uploads"
}