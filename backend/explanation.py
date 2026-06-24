EXPLANATIONS = {

    "doctor":
        "Hand posture matched doctor training examples",

    "food":
        "Finger configuration matched food gesture",

    "help":
        "Palm orientation matched help gesture",

    "medicine":
        "Hand posture matched medicine gesture",

    "pain":
        "Hand shape matched pain gesture",

    "emergency":
        "Gesture strongly resembled emergency examples"
}


def get_explanation(word):

    return EXPLANATIONS.get(
        word.lower(),
        "Gesture matched training samples"
    )