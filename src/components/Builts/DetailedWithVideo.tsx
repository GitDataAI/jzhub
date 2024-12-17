import React, { useState } from "react";
import contentData from "./contentData";
import { useTranslation } from "react-i18next";

const DetailedWithVideo: React.FC = () => {
  const contents = contentData();
  const [selectedContent, setSelectedContent] = useState<JSX.Element>(
    contents[0].content
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { t } = useTranslation("HomeBuilts");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-6">
      <div className="flex flex-col pr-0 md:pr-14 lg:pr-14">
        <h1 className="text-2xl mb-5 font-bold !leading-tight text-center lg:text-left text-primary ">
          {t("title")}
        </h1>
        <p className="text-md mb-8 text-center lg:text-left !leading-relaxed text-body-color">
          {t("des")}
        </p>
        {contents.map((item, index) => (
          <div
            key={index}
            className={`p-4 my-1 text-[14px] cursor-pointer rounded ${
              selectedIndex === index ? "border border-primary" : ""
            } hover:bg-gray-200`}
            onClick={() => {
              setSelectedContent(item.content);
              setSelectedIndex(index);
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="text-primary">{item.icon}</div>
              <h3>{item.title}</h3>
            </div>
            <p className="text-body-color">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-full flex items-center rounded">
        {selectedContent}
      </div>
    </div>
  );
};

export default DetailedWithVideo;
