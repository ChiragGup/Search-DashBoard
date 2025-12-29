
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="
        px-4 py-2
        rounded-xl
        bg-blue-600
        text-white
        font-medium
        hover:bg-blue-700
        transition
        w-full
        sm:w-auto
      "
    >
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
