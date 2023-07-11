## Installation

1. Clone the repository: `git clone https://github.com/Sankalpsp21/SoundConductor.git`
2. Navigate to the project directory: `cd SoundConductor`
3. Install dependencies: `npm install && cd client && npm install`

## Usage

1. Start the backend server (hot-reloading for development): `npm run dev`
2. Start the front-end application: `npm run dev`
3. Open your browser and access the application at `http://localhost:5173`

# Docker Commands

```
npm run build

sudo docker build -t sound-conductor .

sudo docker-compose up --build

docker tag sound-conductor us-east4-docker.pkg.dev/iconic-star-389300/sound-conductor-web-app/sound-conductor

docker push us-east4-docker.pkg.dev/iconic-star-389300/sound-conductor-web-app/sound-conductor
```
