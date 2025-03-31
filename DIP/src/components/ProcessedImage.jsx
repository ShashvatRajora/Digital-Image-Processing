// completely working code


import React from "react";
import Spinner from "./Spinner";

const ProcessedImage = ({ filename, filter, isProcessing }) => {
  if (!filename) return null;

  const originalImage = `http://127.0.0.1:5000/uploads/${filename}`;
  const processedImage = `http://127.0.0.1:5000/processed/${filter}_${filename}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        {/* Original Image */}
        <img
          src={originalImage}
          alt="Original"
          className="w-1/2 h-auto rounded-lg shadow-xl border-4 border-teal-600 transition-all duration-300 hover:scale-105"
        />

        {/* Processed Image with Spinner */}
        <div className="w-1/2 h-auto flex items-center justify-center bg-gray-800 rounded-lg shadow-xl">
          {isProcessing ? (
            <Spinner />
          ) : (
            filter && (
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-auto rounded-lg shadow-xl border-4 border-teal-600 transition-all duration-300 hover:scale-105"
              />
            )
          )}
        </div>
      </div>

      {/* Download Button */}
      {filter && !isProcessing && (
        <button
          className="mt-4 px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 active:bg-teal-800 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => {
            const link = document.createElement("a");
            link.href = processedImage;
            link.download = `${filter}_processed_${filename}`;
            link.click();
          }}
        >
          📥 Download Processed Image
        </button>
      )}
    </div>
  );
};

export default ProcessedImage;

