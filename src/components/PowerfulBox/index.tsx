import React, { useState } from "react";
import OpenSource from "./OpenSource";
import { useTranslation } from "react-i18next";
import contentsData from "./contentData";

const PowerfulBox: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { t } = useTranslation("HomePowerfulBox");
  const contents = contentsData();

  return (
    <section>
      <div className="container pt-24">
        <div className="flex flex-col items-center">
          <img
            src="/images/logo/jzhub.png"
            className="w-[60px] pb-6"
            alt="JZHub Logo"
          />
          <h1 className="mb-5 text-center text-2xl text-primary/90 font-bold leading-tight text-black ">
            {t("title")}
          </h1>
          <p className="mb-8 text-md !leading-relaxed text-left text-center text-body-color ">
            {t("des1")}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="overflow-x-auto">
            <div className="flex items-center gap-4 pb-2 flex-nowrap">
              {contents.map((item, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 px-4 py-2 min-w-[120px] flex items-center rounded-[4px] justify-center cursor-pointer ${
                    selectedIndex === index ? "border border-primary" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-primary">{item.icon}</div>
                    <h3 className="text-[14px]">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-md text-body-color text-center pt-4 pb-8">
          {t("des3")}
        </p>
        <div>{contents[selectedIndex].content}</div>
        <OpenSource />
      </div>
    </section>
  );
};

export default PowerfulBox;
