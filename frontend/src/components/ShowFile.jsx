import { useEffect, useState } from "react";
import Loader from "./Loader";

import linkIcon from "../assets/Link.svg";
import DownloadIcon from "../assets/download.svg";

const ShowFile = ({ darkMode, file, loading, setLoading }) => {
  const [data, setData] = useState(null);
  const url = `${import.meta.env.VITE_APP_URL}/${file.name}`;

  useEffect(() => {
    let objectURL = "";

    const getDataFromUrl = async () => {
      setLoading(true);
      try {
        // The URL returns an image
        const res = await fetch(url);
        const blob = await res.blob(); // A blob is a file-like object of immutable, raw data
        objectURL = URL.createObjectURL(blob); // Create a URL for the object
        setData(objectURL);
      } catch (error) {
        console.error("Error fetching file:", error);
      } finally {
        setLoading(false);
      }
    };

    getDataFromUrl();

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [file, url, setLoading]);

  const handleShare = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  };

  return (
    <>
      {loading ? (
        <Loader darkMode={darkMode} />
      ) : (
        <div className="w-full h-full flex justify-center items-center py-36 flex-col gap-8">
          <div
            className={`rounded-lg flex justify-center items-center shadow-md ${
              darkMode
                ? "bg-[#1F2937] shadow[#E5E7EB22]"
                : "shadow-[#12182622] bg-white"
            } sm:w-[600px] sm:h-[400px] lg:w-[650px] lg:h-[370px] 2xl:w-[1000px] 2xl:h-[600px] w-[80%] h-[300px] xl:w-[800px] xl:h-[500px] p-2`}
          >
            <div className="w-full h-full rounded-lg overflow-hidden object-cover">
              <img
                src={data}
                alt="file"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="buttons flex justify-center items-center gap-4">
            <button
              className="bg-[#3662E3] flex gap-2 justify-center items-center px-4 py-1 rounded-lg text-white font-bold cursor-pointer"
              onClick={handleShare}
            >
              <img src={linkIcon} alt="linkIcon" className="w-3 h-3" />
              Share
            </button>
            <a
              className="bg-[#3662E3] flex gap-2 justify-center items-center px-4 py-1 rounded-lg text-white font-bold"
              href={url}
              download
            >
              <img src={DownloadIcon} alt="DownloadIcon" className="w-3 h-3" />
              Download
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowFile;
