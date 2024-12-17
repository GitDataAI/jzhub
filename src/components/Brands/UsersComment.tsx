import React from "react";
import commentData from "./commentData";
import { useTranslation } from "react-i18next";

const UsersComment: React.FC = () => {
  const { t } = useTranslation("HomeBrands");
  const comments = commentData();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-8">
      <div className="lg:col-span-1 rounded-[4px] border border-primary flex flex-col p-4">
        <h3 className="text-xl mb-6 font-bold">{t("JZHubCommentTitle")}</h3>
        <p className="text-[15px] text-gray-600">
          {t("JZHubComment1")}
          <br />
          <br />
          {t("JZHubComment2")}
          <br />
          <br />
          <span className="bg-primary/10">{t("JZHubComment3")}</span>
          <br />
          <br />
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div>
            <img
              className="w-[36px]"
              src="images/logo/jzhub.png"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[14px]">{t("JZHub")}</h4>
            <p className="text-[11px] text-gray-500">{t("JZHubIdentity")}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-gray-300">
        {comments.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 bg-white"
          >
            <div className="text-[14px] text-gray-500 pb-2">{item.comment}</div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img className="w-[36px] h-[36px]" src={item.avatar} />
                <div>
                  <h3 className="text-[14px]">{item.author}</h3>
                  <p className="text-[11px] text-gray-500">{item.identity}</p>
                </div>
              </div>
              <div className="w-10 relative">
                <img
                  src={item.companyLogo}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersComment;
