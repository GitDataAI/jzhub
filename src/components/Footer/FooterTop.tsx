import { Image } from "primereact/image";
import React from "react";
import { FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LiaBrainSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";

const FooterTop: React.FC = () => {
  const { t } = useTranslation(["HomeFT"]);
  return (
    <div className="flex items-center justify-center flex-col pt-24">
      <img
        src="/images/logo/jzhub.png"
        alt="logo"
        width="80px"
        height="80px"
      />
      <h1 className="mb-5 text-2xl text-primary/90 font-bold leading-tight text-black  sm:leading-tight md:leading-tight">
        JZHub
      </h1>
      <p className="mb-8 text-center text-md !leading-relaxed text-body-color px-10">
        {t("des")}
      </p>
      <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 w-full sm:w-auto px-4">
        <Link
          className="flex items-center justify-center gap-1 px-3 py-1.5 border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80 focus:outline-none w-full sm:w-auto"
          to="https://console.jzhub.cn/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LiaBrainSolid className="text-[18px]" />
          {t("start")}
        </Link>

        <Link
          className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-gray-800 bg-white border border-gray-400 rounded-[4px] hover:bg-gray-200 w-full sm:w-auto"
          to="https://github.com/GitdataAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub />
          {t("github")}
        </Link>
      </div>
    </div>
  );
};

export default FooterTop;
