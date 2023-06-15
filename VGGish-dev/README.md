# This microservice allows you to train a VGGish model

## Quick Start

### 1. Set up the virtual environment

You will need to set up a virtual environment. You can use Python's built-in `venv` module for this. If you don't have `venv` installed, you can do so using pip.

NOTE: Make sure to update python and pip so that you can install all of the dependancies properly!

```bash
$ python3 -m pip install --user virtualenv
```

Now, navigate to your project directory and create a new virtual environment. You can do so using the following commands:

Make sure that you are in the following directory:

```bash
$ pwd
.../AtlasMadnes/VGGish-dev/
```

Then create a virtual environment called venv with the following command:

```bash
$ python3 -m venv venv
```

Next, activate the virtual environment:

```bash
$ source venv/bin/activate
```

After that, you need to install the dependencies:

```bash
$ pip install numpy resampy tensorflow tf_slim six soundfile flask
```