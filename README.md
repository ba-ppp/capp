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
        - Jump to ```node_modules/react-scripts/config/webpack.config.js```
        - Change code in line ```469``` to ```test: /\.(js|mjs|cjs)$/,```
        ```sh
        yarn start
        ```

## 🔥 Server
- ### Prerequisite
    ```Docker, Python >= 3.9```
- ### Installation
    ```sh
    cd server
    pip install -r requirements.txt 
    ```
- ### Running
    - Running ```MQTT```:
    ```docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083 emqx/emqx```
    - Running server:
    ```uvicorn main:app --reload```