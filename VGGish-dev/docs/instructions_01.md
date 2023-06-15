Setting up a VGGish model training microservice using Flask involves a few steps:

1. Install the necessary dependencies and set up a virtual environment
2. Create the Flask application
3. Define the routes and request handlers
4. Set up the VGGish model for training

Here are the details on how to go about doing this:

## Step 1: Install necessary dependencies and set up a virtual environment

Firstly, you will need to set up a virtual environment. You can use Python's built-in `venv` module for this. If you don't have `venv` installed, you can do so using pip.

NOTE: Make sure to update python and pip so that you can install all of the dependancies properly!

```bash
$ python3 -m pip install --user virtualenv
```

Now, navigate to your project directory and create a new virtual environment. You can do so using the following commands:

```bash
$ cd /path/to/your/project
$ python3 -m venv venv
```

To activate the virtual environment:

```bash
$ source venv/bin/activate
```

After that, you need to install the dependencies:

```bash
$ pip install numpy resampy tensorflow tf_slim six soundfile flask
```

VGGish also requires downloading two data files:
* VGGish model checkpoint, in TensorFlow checkpoint format.
* Embedding PCA parameters, in NumPy compressed archive format.
You can find them [here](https://github.com/tensorflow/models/tree/master/research/audioset/vggish).

## Step 2: Create the Flask application

Next, create a new file for your Flask application. Let's call it `app.py`. You can do this in the terminal with:

```bash
$ touch app.py
```

Then, open this file in a text editor of your choice. In the `app.py` file, import Flask and create a new application object:

```python
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from vggish import vggish_slim, vggish_params, vggish_input

app = Flask(__name__)
```

## Step 3: Define the routes and request handlers

Flask uses routes to define what should happen when a specific URL is accessed. You can use the `app.route` decorator to bind a function to a URL. In this case, you will need a route to receive the training data and another route to send back the trained model.

Here is a simple example of how to define these routes:

```python
@app.route('/train', methods=['POST'])
def train():
    data = request.json['data']
    
    # Process your data here
    # ...
    # Train your model here
    # ...

    return jsonify({"message": "Training initiated."})

@app.route('/model', methods=['GET'])
def get_model():
    # Retrieve your model here
    # ...

    return jsonify({"message": "Model retrieved."})
```

The `train` route receives a POST request with the training data, processes this data, and initiates the training of the model. The `get_model` route sends back the trained model.

Please note that in a production system you would want to make sure your POST and GET requests are appropriately authenticated and secured to prevent unauthorized access.

## Step 4: Set up the VGGish model for training

Finally, you can use the VGGish model to train your sound classifier. The details on how to do this depend on the specific requirements of your project. You would likely need to pre-process your sound data into a format that VGGish can handle, train the model with your data, and then save the trained model somewhere that can be accessed by the `get_model` route.

The following pseudo-code is a simplified example of what the train route might look like:

```python
@app.route('/train', methods=['POST'])
def train():
    data = request.json['data']
    
    # Convert data to VGGish input format
    inputs = vggish_input.wave

form_to_examples(data, vggish_params.SAMPLE_RATE)

    # Set up VGGish model
    with tf.Graph().as_default(), tf.compat.v1.Session() as sess:
        vggish_slim.define_vggish_slim(training=True)
        vggish_slim.load_vggish_slim_checkpoint(sess, 'vggish_model.ckpt')
    
    # Add a new training op to fine-tune some layers
    # ...
    
    # Train the model with your data
    # ...

    return jsonify({"message": "Training initiated."})
```

Keep in mind that this is a highly simplified example and the details will depend on the specifics of your project.

To run the server, in the terminal you can use:

```bash
$ python app.py
```

Please note that the above example doesn't include the mechanism to handle multiple models simultaneously. To handle this, you might want to consider training the models asynchronously, for instance using background jobs, or possibly even distributing the training over multiple machines if the workload is large.

Also note that the code does not include error handling, and in a real-world scenario you would also likely need to add code to handle potential errors and edge cases.

The above guide should provide a rough sketch of how you could set up a Flask microservice to train a VGGish model. But you will likely need to adapt and expand it to meet the needs of your specific project.