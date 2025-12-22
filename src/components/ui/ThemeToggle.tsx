import { useTheme } from "@/contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <SunIcon className="w-6 h-6 text-yellow-500" /> // Icon mặt trời cho Light mode
      ) : (
        <MoonIcon className="w-6 h-6 text-blue-300" /> // Icon mặt trăng cho Dark mode
      )}
    </button>
  );
};
