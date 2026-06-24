from deep_translator import GoogleTranslator

def translate_to_malayalam(text):

    translated = GoogleTranslator(
        source='en',
        target='ml'
    ).translate(text)

    return translated