import React, { useState } from "react";
import axios from "axios";
import "./styles.css";


const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState("sharpen");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Show uploaded image instantly
    if (file) {
      setUploadedImageUrl(URL.createObjectURL(file));
      setProcessedImageUrl(null); // Reset processed image
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filter", filter);

    setIsProcessing(true); // Start Processing Effect

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      if (response.data.success) {
        setTimeout(() => {
          setProcessedImageUrl(`http://127.0.0.1:5000/processed/${filter}_${selectedFile.name}`);
          setIsProcessing(false); // Stop Blinking
        }, 2000); // Show effect for 2 seconds
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="sharpen">Sharpen</option>
          <option value="blur">Blur</option>
          <option value="edge_x">Edge Detection</option>
          <option value="emboss">Emboss</option>
          <option value="outline">Outline</option>
          <option value="high_pass">High Pass</option>
        </select>
        <button onClick={handleUpload}>Upload & Apply Filter</button>
      </div>

      <div className="image-container">
        {uploadedImageUrl && (
          <div className="image-box">
            <h3>Original</h3>
            <img src={uploadedImageUrl} alt="Uploaded" className="uploaded-image" />
          </div>
        )}

        {uploadedImageUrl && (
          <div className="image-box">
            <h3>Processed</h3>
            {isProcessing ? (
              <div className="processing-effect">Processing...</div>
            ) : (
              processedImageUrl && <img src={processedImageUrl} alt="Processed" className="processed-image" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
