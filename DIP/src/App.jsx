import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ProcessedImage from "./components/ProcessedImage";

const App = () => {
  const [filename, setFilename] = useState(null);
  const [filter, setFilter] = useState(null);

  return (
    <div style={{ textAlign: "center", padding: "20px" , marginLeft:"20vw" , marginTop:"-250px"  }}>
      <h1>Digital Image Processing </h1>
      <UploadForm setFilename={setFilename} setFilter={setFilter} />
      <ProcessedImage filename={filename} filter={filter} />
    </div>
  );
};

export default App;
