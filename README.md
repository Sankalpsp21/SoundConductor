# Sound Conductor - IoT Device Control Using A.I. Sound Classification

Welcome to Sound Conductor! This project is an application that allows users to control their IoT devices using custom sounds. By associating specific sounds with various actions, users can effortlessly trigger actions such as opening blinds, turning on lights, and more, simply by clapping.

Leveraging the power of artificial intelligence, Sound Conductor employs a TensorFlow-based machine learning model to classify different sounds, including single and double claps. The seamless synchronization between the front-end app and robust backend server ensures real-time communication and accurate execution of desired actions.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Folders](#folders)

## Features

-   Custom sound associations with IoT device actions
-   TensorFlow-based machine learning model for sound classification
-   Real-time communication between front-end and backend
-   Seamless integration with SmartThings for device control
-   User-friendly web application built with React, Redux, Tailwind, and TypeScript
-   MongoDB Atlas backend database for efficient data management

## Technologies

-   React
-   Redux Toolkit
-   TypeScript
-   TensorFlow
-   YamNet
-   Node.js
-   Express
-   MongoDB Atlas
-   SmartThings API
-   Google Cloud Functions
-   Google Cloud Run + Google Cloud Artifact Repo 
-   Docker

## Folders

-   `client`: Front-end React application built with TypeScript, Redux Toolkit, and Tailwind. The React application consumes the Google Cloud Run API and machine learning model to provide a user-friendly interface for Sound Conductor users.
-   `google-cloud-functions`: Google Cloud Functions Node Express API that saves/retrieves data from MongoDB Atlas & read/update SmartThings devices via SmartThings API
-   `machine-learning`: Jupyter notebook and custom clap sound training data for training and exporting TensorFlow machine learning model
