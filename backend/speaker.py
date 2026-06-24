from gtts import gTTS

def create_audio(text):

    tts = gTTS(
        text=text,
        lang='ml'
    )

    tts.save("output.mp3")

    return "output.mp3"