import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation("Header");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: t("EN") },
    { code: "zh-CN", label: t("CN") },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative mr-2">
      <button
        className="flex items-center space-x-2 px-1.5 py-1 border border-gray-400 rounded-[4px] hover:bg-gray-200 focus:outline-none transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GrLanguage className="text-sm /70" />
        <span className="text-sm text-dark /70 hidden sm:block overflow-hidden whitespace-nowrap text-ellipsis">
          {languages.find((lang) => lang.code === i18n.language)?.label}
        </span>
        {isOpen ? (
          <FaCaretUp className="text-sm /70" />
        ) : (
          <FaCaretDown className="text-sm /70" />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-white  shadow-lg rounded-[4px] mt-2 w-30 transition-all duration-300 ease-in-out z-10">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              className={`w-full text-[13px] text-left text-dark px-5 py-1 hover:text-primary transition duration-200 whitespace-nowrap ${
                index === languages.length - 1 ? "rounded-b-sm" : "rounded-t-sm"
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
