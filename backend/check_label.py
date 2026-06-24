import pickle

label_map = pickle.load(
    open("label_map.pkl", "rb")
)

print(label_map)
print(type(label_map))