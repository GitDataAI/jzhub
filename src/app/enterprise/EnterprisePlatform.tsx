import React from "react";
import { useTranslation } from "react-i18next";

const Search: React.FC = () => {
  React.useEffect(() => {
    document.title = "JZHub.AI | Git Based Data Products Hub";
  }, []);
  const { t } = useTranslation("EnterPrise");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h1 className="text-3xl text-primary font-bold mb-7">{t("DCMEP")}</h1>
          <p className="mb-2 text-body-color">{t("des1")} </p>
          <img
            src="/images/home/platform.png"
            className="my-5"
            alt="Enterprise Platform"
          />
          <p className="mb-7 text-body-color">{t("des2")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">JZFS</h2>
          <p className="mb-2 text-body-color">{t("JZFSDes")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">JZFlow</h2>
          <p className="mb-2 text-body-color">{t("JZFlowDes")} </p>
          <h2 className="my-5 text-2xl text-primary font-bold">JZLab</h2>
          <p className="mb-2 text-body-color">{t("JZLabDes")} </p>
          <hr className="my-7" />
          <p className="mb-2 text-body-color">{t("last")} </p>
        </div>
      </div>
    </section>
  );
};

export default Search;
