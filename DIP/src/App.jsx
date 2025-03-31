// perfectly working code
// import { useState } from "react";
// import UploadForm from "./components/UploadForm";
// import ProcessedImage from "./components/ProcessedImage";

// const App = () => {
//   const [filename, setFilename] = useState(null);
//   const [filter, setFilter] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
//       <div className="flex flex-col w-3/4 gap-10">
//         {/* Title */}
//         <h1 className="text-center text-5xl font-bold mb-10 text-green-400">
//           Digital Image Processing
//         </h1>

//         {/* Upload and Filter Section */}
//         <div className="flex gap-10">
//           {/* Upload Section */}
//           <div className="flex-1 p-5 bg-gray-800 rounded-lg shadow-md">
//             <UploadForm
//               setFilename={setFilename}
//               setFilter={setFilter}
//               setIsProcessing={setIsProcessing}
//             />
//           </div>

//           {/* Processed Image Section */}
//           <div className="flex-1 p-5 bg-gray-800 rounded-lg shadow-md">
//             <ProcessedImage
//               filename={filename}
//               filter={filter}
//               isProcessing={isProcessing}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

//perfectly working pt 2

// import { useState } from "react";
// import UploadForm from "./components/UploadForm";
// import ProcessedImage from "./components/ProcessedImage";

// const App = () => {
//   const [filename, setFilename] = useState(null);
//   const [filter, setFilter] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   return (
//     <div className="flex h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
//       <div className="flex w-3/4 gap-10 p-10 bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl backdrop-blur-md">
//         {/* Upload Section */}
//         <div className="w-1/2 p-5 bg-gray-700 rounded-lg shadow-md">
//           <h1 className="text-4xl font-extrabold text-teal-400 mb-5 text-center">Digital Image Processing</h1>
//           <UploadForm setFilename={setFilename} setFilter={setFilter} setIsProcessing={setIsProcessing} />
//         </div>

//         {/* Processed Image Section */}
//         <div className="w-1/2 p-5 bg-gray-700 rounded-lg shadow-md">
//           <ProcessedImage filename={filename} filter={filter} isProcessing={isProcessing} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ProcessedImage from "./components/ProcessedImage";

const App = () => {
  const [filename, setFilename] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="flex w-3/4 gap-10 p-10 bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl backdrop-blur-md">
        {/* Upload Section */}
        <div className="w-1/2 p-5 bg-gray-700 rounded-lg shadow-md">
          <h1 className="text-4xl font-extrabold text-teal-400 mb-5 text-center animate-pulse">
            Digital Image Processing
          </h1>
          <UploadForm setFilename={setFilename} setFilter={setFilter} setIsProcessing={setIsProcessing} />
        </div>

        {/* Processed Image Section */}
        <div className="w-1/2 p-5 bg-gray-700 rounded-lg shadow-md">
          <ProcessedImage filename={filename} filter={filter} isProcessing={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default App;
