import React from "react";

const Loader = ({ darkMode }) => {
  return (
    <div className="w-full h-full flex justify-center items-center min-h-screen">
      <div
        className={`flex flex-col gap-4 justify-center items-center ${darkMode ? "bg-[#1F2937] shadow[#E5E7EB22]" : "shadow-[#12182622] bg-white"} sm:w-[500px] sm:h-[130px] lg:w-[530px] lg:h-[160px] 2xl:w-[800px] 2xl:h-[210px] w-[80%] h-[130px] xl:w-[600px] xl:h-[180px] rounded-lg p-2`}
      >
        <div className="flex justify-center items-center">
          <p
            className={` font-bold ${darkMode ? "text-[#E5E7EB]" : "text-[#121826]"}`}
          >
            Uploading,
          </p>
          <span
            className={`text-sm ${darkMode ? "text-[#E5E7EB]" : "text-[#212936]"} `}
          >
            &nbsp;please wait...
          </span>
        </div>
        <div className="long-line w-[70%] h-2 bg-[#E5E7EB] rounded-full">
          <div className="short-line w-1/5 h-2 bg-[#3662E3] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
