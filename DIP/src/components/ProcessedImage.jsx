import "./styles.css";

const ProcessedImage = ({ filename, filter }) => {
    if (!filename) return null;
  
    const originalImage = `http://127.0.0.1:5000/uploads/${filename}`;
    const processedImage = `http://127.0.0.1:5000/processed/${filter}_${filename}`;
  
    // Function to download the processed image
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = processedImage;
        link.download = `${filter}_processed_${filename}`; // Unique filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
      <div className="image-container">
        <div className="image-box">
          <h3>Original</h3>
          <img src={originalImage} alt="Original" className="uploaded-image" />
        </div>

        <div className="image-box">
          <h3>Processed</h3>
          <img src={processedImage} alt="Processed" className="processed-image" />

          {/* Ensure the button is inside the processed image box */}
          <div className="button-container">
            <button className="download-btn" onClick={handleDownload}>
              📥 Download Image
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProcessedImage;
