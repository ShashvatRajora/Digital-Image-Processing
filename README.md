# Flask Image Filter API with OpenCV

This project is a lightweight Flask-based API that allows users to upload images and apply various filters using OpenCV. It supports a wide range of filters including sharpen, blur, edge detection, outline, high pass and emboss.

## Features

- Upload images via REST API
- Apply multiple custom OpenCV filters
- Get back the processed images
- Automatically deletes older files 
- CORS-enabled for frontend integration
- Supports PNG, JPG, JPEG, BMP, GIF, and WebP formats

## 🧪 Available Filters

| Filter Name    | Description                           |
|----------------|---------------------------------------|
| `sharpen`      | Enhances edges to make image sharper  |
| `blur`         | Applies Gaussian blur                 |
| `edge_detection`       | Sobel edge detection on X-axis        |
| `emboss`       | Emboss-like stylization               |
| `outline`      | Grayscale edge outline via Canny      |
| `high_pass`    | Emphasizes high-frequency details     |




