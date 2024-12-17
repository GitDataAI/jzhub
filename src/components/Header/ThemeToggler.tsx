import { useTheme } from "@/theme/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
const ThemeToggler = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => {
        toggleTheme();
      }}
      className="flex items-center justify-center w-9 h-9 text-dark rounded-full cursor-pointer bg-gray-2 -bg /70"
    >
      <FiSun className="w-5 h-5 stroke-current " />
      <IoMoonOutline className="hidden w-5 h-5 " />
    </button>
  );
};

export default ThemeToggler;
