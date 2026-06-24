from flask import Flask, request, send_file
from translator import translate_to_malayalam
from speaker import create_audio
from sign_map import SIGN_MAP

app = Flask(__name__)


@app.route("/")
def home():

    return "Signora Backend Running"


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


@app.route("/speak", methods=["POST"])
def speak():

    data = request.json

    text = data["text"]

    create_audio(text)

    return {
        "message": "Audio Created"
    }


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


# NEW AUDIO ROUTE
@app.route("/audio")
def audio():

    return send_file(
        "output.mp3",
        mimetype="audio/mpeg"
    )


if __name__ == "__main__":
    app.run(debug=True)