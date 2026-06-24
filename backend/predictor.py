import pickle

model = pickle.load(
    open("sign_model.pkl", "rb")
)

label_map = pickle.load(
    open("label_map.pkl", "rb")
)

def predict_sign(features):

    prediction = model.predict(
        [features]
    )[0]

    return label_map[prediction]