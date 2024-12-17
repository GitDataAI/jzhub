import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ContributingToUs: React.FC = () => {
  const { t } = useTranslation("ContributingToUs");
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h1 className="text-3xl text-primary font-bold mb-7">{t("title")}</h1>
          <p className="mb-2 text-body-color">
            {t("des1")}&nbsp;
            <Link
              to="#"
              className="text-primary underline decoration-primary/10 text-md  cursor-pointer"
            >
              CONTRIBUTING.md
            </Link>
            &nbsp;{t("des2")}
          </p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Issues")}
          </h2>
          <p className="mb-2 text-body-color">
            {t("IssuesDes")}&nbsp;
            <Link
              to="#"
              className="text-primary underline decoration-primary/10 text-md  cursor-pointer"
            >
              {t("issue tracker")}
            </Link>
            {t("last")}
          </p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Repository")}
          </h2>
          <p className="mb-2 text-body-color">
            {t("RepositoryDes")}&nbsp;
            <Link
              to="#"
              className="text-primary underline decoration-primary/10 text-md  cursor-pointer"
            >
              {t("githubRepository")}
            </Link>
            {t("last")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContributingToUs;
