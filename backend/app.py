from flask import Flask, request, send_file

from translator import translate_to_malayalam
from speaker import create_audio
from sign_map import SIGN_MAP

from predictor import predict_sign
from explanation import get_explanation
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():

    return "Signora Backend Running"


# -----------------------------------
# TRANSLATE TEXT
# -----------------------------------
@app.route("/translate", methods=["POST"])
def translate():

    data = request.json

    english = data["text"]

    malayalam = translate_to_malayalam(
        english
    )

    return {
        "english": english,
        "malayalam": malayalam
    }


# -----------------------------------
# CREATE AUDIO
# -----------------------------------
@app.route("/speak", methods=["POST"])
def speak():

    data = request.json

    text = data["text"]

    create_audio(text)

    return {
        "message": "Audio Created"
    }


# -----------------------------------
# OLD SIGN ROUTE
# -----------------------------------
@app.route("/process", methods=["POST"])
def process():

    data = request.json

    sign = data["sign"]

    english = SIGN_MAP.get(
        sign,
        "Unknown Sign"
    )

    malayalam = translate_to_malayalam(
        english
    )

    create_audio(
        malayalam
    )

    return {

        "sign": sign,

        "english": english,

        "malayalam": malayalam,

        "audio": "output.mp3"
    }


# -----------------------------------
# AUDIO ROUTE
# -----------------------------------
@app.route("/audio")
def audio():

    return send_file(
        "output.mp3",
        mimetype="audio/mpeg"
    )


# -----------------------------------
# MODEL PREDICTION ROUTE
# -----------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = np.array(
        data["features"]
    )

    english = predict_sign(
        features
    )

    malayalam = translate_to_malayalam(
        english
    )

    create_audio(
        malayalam
    )

    explanation = get_explanation(
        english
    )

    return {

        "english": english,

        "malayalam": malayalam,

        "audio": "output.mp3",

        "explanation": explanation
    }


if __name__ == "__main__":
    app.run(debug=True)