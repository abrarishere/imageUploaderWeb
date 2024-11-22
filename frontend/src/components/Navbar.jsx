import logoImg from "../assets/logo.svg";
import imageSun from "../assets/Sun_fill.svg";
import imageMoon from "../assets/Moon_fill.svg";
import logoSmall from "../assets/logo-small.svg";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav
      className={`flex justify-between items-center h-16 py-10 lg:px-20 xl:px-24 px-4 md:px-16 sm:px-10 border-b ${darkMode ? "bg-[#121826] border-[#E5E7EB22]" : "border-[#12182622] bg-[#F9FAFBCC]"}`}
    >
      <div className="flex gap-3 text-black items-center justify-center">
        <img src={darkMode ? logoSmall : logoImg} alt="logo" />
        {darkMode && (
          <h1 className="text-white text-sm font-bold">ImageUpload</h1>
        )}
      </div>
      <div className="">
        <button
          className={`flex items-center justify-center p-2  rounded-md border-[1px] ${darkMode ? "bg-[#4D5562] border-[#E5E7EB22]" : " border-[#12182622]"}`}
        >
          {darkMode ? (
            <img src={imageSun} alt="sun" onClick={() => setDarkMode(false)} />
          ) : (
            <img src={imageMoon} alt="moon" onClick={() => setDarkMode(true)} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
