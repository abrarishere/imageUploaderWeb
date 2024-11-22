import { useEffect, useState } from "react";

import linkIcon from "../assets/Link.svg";
import DownloadIcon from "../assets/download.svg";

const ShowFile = ({ darkMode, file }) => {
  const [data, setData] = useState(null);
  const url = `${import.meta.env.VITE_APP_URL}/${file.name}`;
  let objectURL = "";

  const getDataFromUrl = async () => {
    //the url return a image
    const res = await fetch(url);
    const blob = await res.blob(); // a blob is a file-like object of immutable, raw data
    objectURL = URL.createObjectURL(blob); // create a URL for the object
    setData(objectURL);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  };

  useEffect(() => {
    getDataFromUrl();
    return () => {
      URL.revokeObjectURL(objectURL);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <div className="w-full h-full flex justify-center items-center py-36 flex-col gap-8">
      <div
        className={`rounded-lg flex justify-center items-center shadow-md ${darkMode ? "bg-[#1F2937] shadow[#E5E7EB22]" : " shadow-[#12182622] bg-white"} sm:w-[600px] sm:h-[400px] lg:w-[650px] lg:h-[370px] 2xl:w-[1000px] 2xl:h-[600px] w-[80%] h-[300px] xl:w-[800px] xl:h-[500px] p-2 `}
      >
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img src={data} alt="file" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="buttons flex justify-center items-center gap-4">
        <a
          className="bg-[#3662E3] flex gap-2 justify-center items-center px-4 py-1 rounded-lg text-white font-bold cursor-pointer"
          onClick={handleShare}
        >
          <img src={linkIcon} alt="linkIcon" className="w-3 h-3" />
          Share
        </a>
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
  );
};

export default ShowFile;
