import exitIcon from "../assets/exit.svg";

const UploadContainer = ({ darkMode, setFile, loading, setLoading }) => {
  const handleCLick = () => {
    const file = document.getElementById("file");
    file.click();
  };

  const submitFile = (e) => {
    setLoading(true);
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    // if file size is greater than 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      setLoading(false);
      return;
    }
    setFile(file);
    const url = `${import.meta.env.VITE_APP_URL}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    setLoading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    submitFile(e);
  };

  return (
    <div className="w-full h-full flex justify-center items-center py-36">
      {loading ? (
        <div className="absolute z-10 bg-[#000000AA] w-full h-full flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-t-[#3662E3] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          className={`rounded-lg flex justify-center items-center shadow-md ${darkMode ? "bg-[#1F2937] shadow[#E5E7EB22]" : "shadow-[#12182622] bg-white"} sm:w-[600px] sm:h-[400px] lg:w-[650px] lg:h-[370px] 2xl:w-[1000px] 2xl:h-[600px] w-[80%] h-[300px] xl:w-[800px] xl:h-[500px] p-2`}
        >
          <div
            className={`border-dashed border-[2px] w-full h-full rounded-lg ${darkMode ? "border-[#E5E7Eb22]" : "border-[#12182622]"} flex justify-center items-center gap-6 flex-col`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="w-10 h-10 overflow-hidden">
              <img
                src={exitIcon}
                alt="exit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div
                className={`${darkMode ? "text-[#E5E7EB]" : "text-[#121826]"} font-semibold`}
              >
                Drag & drop a file or
                <span
                  className="text-[#3662E3] hover:text-[#3452f3] cursor-pointer"
                  onClick={handleCLick}
                >
                  &nbsp;browse files
                  <form
                    encType="multipart/form-data"
                    method="post"
                    onChange={submitFile}
                  >
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="hidden"
                      accept=".jpg, .png, .gif"
                    />
                  </form>
                </span>
              </div>
              <p
                className={`text-sm ${darkMode ? "text-[#C2DAF9]" : "text-[#4D5562]"}`}
              >
                JPG, PNG or GIF - Max file size 2MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadContainer;
