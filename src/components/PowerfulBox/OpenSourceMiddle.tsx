import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const OpenSourceMiddle: React.FC = () => {
  const { t } = useTranslation("HomePowerfulBox");
  return (
    <div
      className="grid grid-cols-4 grid-rows-2 gap-4 w-full hidden sm:hidden md:grid lg:hidden"
      style={{
        gridTemplateRows: "repeat(2, minmax(0, 1fr))",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center p-6 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("forks")}</h3>
        <h3 className="text-primary text-3xl font-bold">12</h3>
      </div>
      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center p-6 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("contributors")}</h3>
        <h3 className="text-primary text-3xl font-bold">56</h3>
      </div>
      <div className="col-span-2 row-span-2 col-start-2 row-start-1 p-6 flex flex-col items-center justify-center rounded-[4px] border border-primary">
        <h3 className="text-2xl text-primary font-bold mb-4">
          {t("openSource")}
        </h3>
        <p className="text-md text-body-color mb-4 text-center">
          {t("JZFSDes")}{" "}
        </p>
        <button>
          <Link
            className="flex items-center justify-center gap-1 px-3 py-1.5 whitespace-nowrap border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80"
            to="https://github.com/GitDataAI"
            target="_blank"
          >
            {t("start")} <MdOutlineKeyboardArrowRight />
          </Link>
        </button>
      </div>
      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center p-6 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("stars")}</h3>
        <h3 className="text-primary text-3xl font-bold">86</h3>
      </div>
      <div className="col-span-1 row-span-1 flex flex-col items-center justify-center p-6 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color text-center">{t("PRs")}</h3>
        <h3 className="text-primary text-3xl font-bold">57</h3>
      </div>
    </div>
  );
};

export default OpenSourceMiddle;
