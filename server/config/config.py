path_config = {
    'static_path': 'static/',
    # 'model_path': 'model/result.hdf5',
    'model_path': 'model/result_v2.hdf5',
    # 'token_path': 'model/tokenizer.pkl',
    'token_path': 'model/tokenizer_v2.pkl',
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