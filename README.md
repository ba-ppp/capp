# Capp - _Web/app for generating captions_

Capp using combination Inception-V3 and LSTM this is a platform to generate caption for each image.

## ✨UI/Web

- ### Tech

  - ReactJS - HTML enhanced for web apps!
  - TailwindCss - great css framework for modern web apps
  - Material UI - great UI boilerplate for modern web apps
  - MQTT - message protocol

- ### Installation
  ```sh
  cd ui/web
  yarn
  ```
- ### Running
  - Before running:
    - Jump to `node_modules/react-scripts/config/webpack.config.js`
    - Change code in line `469` to `test: /\.(js|mjs|cjs)$/,`
    ```sh
    yarn start
    ```

## 🔥 Server

- ### Prerequisite
  `Docker, Python >= 3.9`
  `source ~/miniforge3/bin/activate`
- ### Installation
  ```sh
  cd server
  pip install -r requirements.txt
  ```
- ### Running

  - Running `Cloud`:

  ```docker run \
   -p 9000:9000 \
   -p 9090:9090 \
   --name minio \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=capp_cloud" \
   -e "MINIO_ROOT_PASSWORD=Abcd@1234" \
   quay.io/minio/minio server /data --console-address ":9090"```

  - Running ```MQTT```:
  ```docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx```
  - Running server:
  ```uvicorn main:app --reload```

## 😏 Testing

- Go to `static` folder in `server` folder:
- Find your images here. Gud luck 😍
