# Sound Conductor React Client

## Installation

1. Clone the repository: `git clone https://github.com/Sankalpsp21/SoundConductor.git`
2. Navigate to the project directory: `cd SoundConductor/client`
3. Install dependencies: `npm install`

## Usage

1. Start the front-end application: `npm run dev`
2. Open your browser and access the application at `http://localhost:5173`

# Docker Commands

Our frontend is hosted on Google Cloud Run. To deploy our frontend, we need to build a Docker image and push it to Google Cloud Artifact Registry. The following commands are used to build and deploy our frontend:

```
npm run build

sudo docker build -t sound-conductor .

sudo docker-compose up --build

docker tag sound-conductor us-east4-docker.pkg.dev/iconic-star-389300/sound-conductor-web-app/sound-conductor

docker push us-east4-docker.pkg.dev/iconic-star-389300/sound-conductor-web-app/sound-conductor
```
