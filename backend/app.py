from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
import pandas as pd
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "retina_model.h5")
LABELS_PATH = os.path.join(BASE_DIR, "trainLabels.csv")
CROPPED_LABELS_PATH = os.path.join(BASE_DIR, "trainLabels_cropped.csv")

# Load model
model = load_model(MODEL_PATH)
print(f"✅ Retina model loaded successfully from {MODEL_PATH}")

# Load CSV files once
try:
    labels_df = pd.read_csv(LABELS_PATH)
    cropped_labels_df = pd.read_csv(CROPPED_LABELS_PATH).drop(columns=["Unnamed: 0"], errors='ignore')
    print("✅ CSV files loaded successfully.")
except Exception as e:
    print("❌ Error loading CSV files:", e)
    labels_df = pd.DataFrame()
    cropped_labels_df = pd.DataFrame()

# Preprocess uploaded image
def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

# Predict endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    image = preprocess_image(file.read())
    prediction = model.predict(image)
    predicted_class = int(np.argmax(prediction))

    return jsonify({
        "prediction": predicted_class,
        "probabilities": prediction.tolist()
    })

# Metrics endpoint
@app.route("/metrics", methods=["GET"])
def get_metrics():
    try:
        df = pd.read_csv("train.csv")  # update if needed
        metrics = {
            "accuracy": float(df["accuracy"].iloc[-1]) if "accuracy" in df.columns else None,
            "loss": float(df["loss"].iloc[-1]) if "loss" in df.columns else None,
            "val_accuracy": float(df["val_accuracy"].iloc[-1]) if "val_accuracy" in df.columns else None,
            "val_loss": float(df["val_loss"].iloc[-1]) if "val_loss" in df.columns else None
        }
    except Exception as e:
        metrics = {"error": str(e)}
    return jsonify(metrics)

# New: Labels from trainLabels.csv
@app.route("/labels", methods=["GET"])
def get_labels():
    return labels_df.to_dict(orient="records")

# New: Labels from trainLabels_cropped.csv
@app.route("/cropped-labels", methods=["GET"])
def get_cropped_labels():
    return cropped_labels_df.to_dict(orient="records")

# Root
@app.route("/")
def home():
    return "Retina Model API is live."

if __name__ == "__main__":
    app.run(debug=True)
