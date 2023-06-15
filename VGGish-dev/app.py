import os

from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from vggish import vggish_slim, vggish_params, vggish_input

APP_NAME = 'VGGish-dev'

# Create Flask app
# Path: .../AtlasMadness/VGGish-dev/app.py
app = Flask(APP_NAME)

# Configure upload folder
app.config['UPLOAD_FOLDER'] = './uploads'

@app.route('/train', methods=['POST'])
def train():
    if 'file' not in request.files:
        return jsonify({"message": "No file part in the request."}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No file selected."}), 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        # Load the wav file
        wav_data = tf.io.read_file(filepath)
        audio, sample_rate = tf.audio.decode_wav(wav_data)

        # Convert audio to VGGish input format
        inputs = vggish_input.wavfile_to_examples(audio.numpy(), sample_rate.numpy())

        # Set up VGGish model
        with tf.Graph().as_default(), tf.compat.v1.Session() as sess:
            vggish_slim.define_vggish_slim(training=True)
            vggish_slim.load_vggish_slim_checkpoint(sess, 'vggish_model.ckpt')

        # Add a new training op to fine-tune some layers
        # ...
    
        # Train the model with your data
        # ...

        return jsonify({"message": "Training initiated."})

@app.route('/model', methods=['GET'])
def get_model():
    # Retrieve your model here
    # ...

    return jsonify({"message": "Model retrieved."})

