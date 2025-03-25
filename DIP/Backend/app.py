from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["PROCESSED_FOLDER"] = PROCESSED_FOLDER

# Convolution Function
def apply_custom_convolution(image, kernel):
    image = image.astype(np.float32)
    h, w, c = image.shape
    kh, kw = kernel.shape
    pad_h, pad_w = kh // 2, kw // 2
    padded_image = np.pad(image, ((pad_h, pad_h), (pad_w, pad_w), (0, 0)), mode='constant', constant_values=0)
    output = np.zeros_like(image, dtype=np.float32)

    for i in range(h):
        for j in range(w):
            for channel in range(c):
                output[i, j, channel] = np.sum(kernel * padded_image[i:i+kh, j:j+kw, channel])

    return np.clip(output, 0, 255).astype(np.uint8)

# Kernels
kernels = {
    "sharpen": np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]], dtype=np.float32),
    "blur": np.ones((3, 3), dtype=np.float32) / 9,
    "edge_x": np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=np.float32),
    "emboss": np.array([[-2, -1, 0], [-1, 1, 1], [0, 1, 2]], dtype=np.float32),
    "outline": np.array([[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]], dtype=np.float32),
    "high_pass": np.array([[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]], dtype=np.float32),
}

@app.route("/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files or "filter" not in request.form:
        return jsonify({"error": "No file or filter specified"}), 400

    file = request.files["file"]
    filter_type = request.form["filter"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    # Debug: Check if the image is saved correctly
    if not os.path.exists(file_path):
        return jsonify({"error": "File failed to save"}), 500

    # Read image correctly for OpenCV
    image = cv2.imread(file_path, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Failed to load image"}), 500

    # Apply filter
    if filter_type in kernels:
        processed_image = apply_custom_convolution(image, kernels[filter_type])
    else:
        return jsonify({"error": "Invalid filter"}), 400

    # Save processed image with filter name
    processed_filename = f"{filter_type}_{filename}"
    processed_path = os.path.join(app.config["PROCESSED_FOLDER"], processed_filename)
    cv2.imwrite(processed_path, processed_image)

    return jsonify({
        "success": True,
        "uploaded_image": f"http://127.0.0.1:5000/uploads/{filename}",
        "processed_image": f"http://127.0.0.1:5000/processed/{processed_filename}"
    })

# Route to serve uploaded images
@app.route("/uploads/<filename>")
def get_uploaded_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Route to serve processed images
@app.route("/processed/<filename>")
def get_processed_image(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True)
