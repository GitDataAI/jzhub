import React from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const OpenSourceLarge: React.FC = () => {
  const { t } = useTranslation("HomePowerfulBox");
  return (
    <div
      className="grid hidden grid-cols-24 grid-rows-6 gap-2 lg:grid"
      style={{
        gridTemplateRows: "repeat(6, minmax(0, 1fr))",
        gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
        margin: "0 auto",
      }}
    >
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 col-start-4 row-span-2 col-span-3 flex flex-col items-center justify-center p-3 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color">{t("forks")}</h3>
        <h3 className="text-primary text-3xl font-bold">12</h3>
      </div>
      <div className="row-start-1 col-start-7 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 col-start-10 col-span-6 row-span-6 border flex flex-col items-center justify-center p-6 rounded-[4px] border-primary">
        <h3 className="text-2xl text-primary font-bold mb-4">
          {t("openSource")}
        </h3>
        <p className="text-md text-center text-body-color mb-4">
          {t("JZFSDes")}
        </p>
        <button>
          <Link
            className="flex items-center justify-center gap-1 px-3 py-1.5 whitespace-nowrap border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80"
            to="https://github.com/GitDataAI"
            target="_blank"
          >
            {t("start")}
            <MdOutlineKeyboardArrowRight />
          </Link>
        </button>
      </div>
      <div className="row-start-1 col-start-16 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 col-start-19 row-span-2 col-span-3 flex flex-col items-center justify-center p-3 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color"> {t("stars")}</h3>
        <h3 className="text-primary text-3xl font-bold">86</h3>
      </div>
      <div className="row-start-1 col-start-22 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-1 border border-primary border-dashed rounded-[4px]"></div>

      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 col-start-7 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 col-start-16 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 col-start-22 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-2 border border-primary border-dashed rounded-[4px]"></div>

      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 col-start-16 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-3 border border-primary border-dashed rounded-[4px]"></div>

      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 col-start-16 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-4 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>

      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 col-start-4 row-span-2 col-span-3  flex flex-col items-center justify-center p-3 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color"> {t("contributors")}</h3>
        <h3 className="text-primary text-3xl font-bold">56</h3>
      </div>
      <div className="row-start-5 col-start-7 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 col-start-16 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 col-start-19 row-span-2 col-span-3  flex flex-col items-center justify-center p-3 border border-primary rounded-[4px]">
        <h3 className="text-[14px] text-body-color text-center">{t("PRs")}</h3>
        <h3 className="text-primary text-3xl font-bold">57</h3>
      </div>
      <div className="row-start-5 col-start-22 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-5 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>

      <div className="row-start-6 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 col-start-7 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 col-start-16 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]">
        <img
          src="/images/logo/jzhub.png"
          className="w-full h-full"
        />
      </div>
      <div className="row-start-6 col-start-22 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
      <div className="row-start-6 border border-primary border-dashed rounded-[4px]"></div>
    </div>
  );
};

export default OpenSourceLarge;
