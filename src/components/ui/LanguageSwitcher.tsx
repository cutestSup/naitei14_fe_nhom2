import { useTranslation } from "../../hooks";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <GlobeAltIcon className="w-5 h-5 text-gray-600" />
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-primary bg-white cursor-pointer"
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

