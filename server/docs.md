# Run docker to run locally
- docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx
# Run server real time
- uvicorn main:app --reload-exclude static
# Run postman for testing