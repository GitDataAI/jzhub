import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const OpenSourceSmall: React.FC = () => {
  const { t } = useTranslation("HomePowerfulBox");
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-4 w-full h-full sm:grid md:hidden lg:hidden">
      <div className="col-span-2 row-span-2 p-6 flex flex-col items-center justify-center rounded-[4px] border border-primary">
        <h3 className="text-xl text-primary font-bold mb-2">
          {t("openSource")}
        </h3>
        <p className="text-sm text-center text-body-color mb-2 px-2">
          {t("JZFSDes")}
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full">
          <Link
            className="flex items-center justify-center gap-1 px-3 py-1.5 whitespace-nowrap border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80 w-full sm:w-auto md:w-auto lg:w-auto"
            to="https://github.com/GitDataAI"
          >
            {t("start")} <MdOutlineKeyboardArrowRight />
          </Link>
        </div>
      </div>

      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("forks")}</h3>
        <h3 className="text-primary text-xl font-bold">12</h3>
      </div>

      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("contributors")}</h3>
        <h3 className="text-primary text-xl font-bold">56</h3>
      </div>

      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("stars")}</h3>
        <h3 className="text-primary text-xl font-bold">86</h3>
      </div>

      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center border border-primary rounded-[4px]">
        <h3 className="text-center text-[14px] text-body-color">{t("PRs")}</h3>
        <h3 className="text-primary text-xl font-bold">57</h3>
      </div>
    </div>
  );
};

export default OpenSourceSmall;
