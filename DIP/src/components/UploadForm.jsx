//completely working code

// import React, { useState } from "react";
// import axios from "axios";

// const UploadForm = ({ setFilename, setFilter, setIsProcessing }) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setFilename(file.name);  // ✅ Immediately set filename for the original image display
//   };

//   const handleUpload = async (filterType) => {
//     if (!selectedFile) {
//       alert("Please select an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     formData.append("filter", filterType);

//     setIsProcessing(true);  // ✅ Show the loader

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/upload", formData);
//       const data = response.data;

//       if (data.success) {
//         setFilter(filterType);  // ✅ Update the filter type
//         setFilename(selectedFile.name);  // ✅ Ensure the filename is set correctly
//       } else {
//         alert("Error: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//       alert("Failed to process the image.");
//     } finally {
//       setIsProcessing(false);  // ✅ Hide the loader
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <input
//         type="file"
//         onChange={handleFileChange}
//         className="block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
//       />
//       <div className="grid grid-cols-3 gap-2 mt-4">
//         {["sharpen", "blur", "edge_x", "emboss", "outline", "high_pass"].map((filter) => (
//           <button
//             key={filter}
//             onClick={() => handleUpload(filter)}
//             className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-800"
//           >
//             {filter.charAt(0).toUpperCase() + filter.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UploadForm;


import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ setFilename, setFilter, setIsProcessing }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFilename(file.name);
  };

  const handleUpload = async (filterType) => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filter", filterType);

    setIsProcessing(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      const data = response.data;

      if (data.success) {
        setFilter(filterType);
        setFilename(selectedFile.name);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process the image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md cursor-pointer"
      />
      <div className="grid grid-cols-3 gap-2 mt-4">
        {["sharpen", "blur", "edge_x", "emboss", "outline", "high_pass"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleUpload(filter)}
            className="px-4 py-2 bg-teal-600 rounded-md hover:bg-teal-700 active:bg-teal-800 shadow-md hover:shadow-lg transition-all duration-300"
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UploadForm;
