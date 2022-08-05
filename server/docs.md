# Run cloud server
- docker run \
  -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ROOT_USER=AKIAIOSFODNN7EXAMPLE" \
  -e "MINIO_ROOT_PASSWORD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
  quay.io/minio/minio server /data --console-address ":9001"
# Run docker to run locally
- docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx
# Run server real time
<!-- - uvicorn main:app --reload-exclude static -->
- uvicorn main:app --reload-exclude static
# Run postman for testing

- test: /\.(js|mjs|cjs)$/,