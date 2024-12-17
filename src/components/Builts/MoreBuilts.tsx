import React from "react";
import moreData from "./moreBuiltsData";
import { useTranslation } from "react-i18next";

const More: React.FC = () => {
  const moreBuilts = moreData();
  const { t } = useTranslation("HomeBuilts");
  return (
    <div className="flex flex-col pt-8">
      <p className="py-2 text-[14px] text-body-color text-center lg:text-start">
        {t("more")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] bg-gray-300">
        {moreBuilts.map((item, index) => (
          <div key={index} className="bg-white p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-primary"> {item.icon}</div>
              <h3 className="text-[14px]">{item.title}</h3>
            </div>
            <p className="text-[14px] text-body-color">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default More;
