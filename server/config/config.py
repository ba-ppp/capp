path_config = {
    'static_path': 'static/',
    'model_path': 'model/khoi_eng_17.hdf5',
    'vi_model_path': 'model/khoi-17.hdf5',
    'vi_token_path': 'model/tokenizer.pkl',
    'token_path': 'model/eng_tokenizer.pkl',
}

socket_config = {
    # "broker": 'broker.emqx.io',
    "broker": 'localhost',
    "port": 1883,
    "channel": "generate/captions",
}

s3_config = {
    "endpoint": "localhost:9000",
    "access_key": "capp_cloud",
    "secret_key": "Abcd@1234",
    "bucket_name": "capp-cloud-uploads",
    "bucket_export_name": "capp-cloud-exports",
}