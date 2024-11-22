import Navbar from "./components/Navbar";
import { useState } from "react";
import UploadContainer from "./components/UploadContainer";
import ShowFile from "./components/ShowFile";
import Loader from "./components/Loader";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div
      className={`${darkMode ? "bg-[#121826]" : "bg-[#F9FAFBCC]"} min-h-screen transition-all duration-500`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {file ? (
        <ShowFile
          darkMode={darkMode}
          file={file}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <UploadContainer
          darkMode={darkMode}
          setFile={setFile}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default App;
