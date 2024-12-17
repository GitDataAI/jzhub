import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommunityLinks: React.FC = () => {
  const { t } = useTranslation("CommunityLinks");
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h1 className="text-3xl text-primary font-bold mb-7">{t("title")}</h1>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("ForumsandCommunity")}
          </h2>
          <ul className="list-disc pl-6 text-body-color">
            <li className="mb-2">
              <Link
                to="#"
                className=" text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("GitHubDiscussions")}
              </Link>
            </li>
            {/* <li className="mb-2 text-body-color">
              {t("Discord Community")}
              <ul className="list-disc pl-8">
                <li className="mb-2">{t("DiscordCommunityDes1")}</li>
              </ul>
            </li> */}
          </ul>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Support and Feedback")}
          </h2>
          <ul className="list-disc pl-6 text-body-color">
            <li className="mb-2">
              <Link
                to="https://github.com/GitDataAI/jzfs/issues"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("SupportDes1")}
              </Link>
            </li>
            {/* <li className="mb-2">
              <Link
                to="#"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("SupportDes2")}
              </Link>
            </li> */}
          </ul>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Social Media")}
          </h2>
          <ul className="list-disc pl-6 text-body-color">
            <li className="mb-2">
              <Link
                to="https://x.com/GitDataAI"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("x")}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="https://space.bilibili.com/1616514069"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("bilibili")}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="https://www.youtube.com/@jzhub"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("YouTube")}
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="https://www.linkedin.com/company/jzhub/"
                className="text-primary underline decoration-primary/10 text-md cursor-pointer"
              >
                {t("LinkedIn")}
              </Link>
            </li>
          </ul>
          <p className="mt-7 mb-2 text-body-color">{t("last")}</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityLinks;
