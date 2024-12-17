import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import EcosystemShow from "./EcosystemShow";
import { useTranslation } from "react-i18next";

const Ecosystem: React.FC = () => {
  const { t } = useTranslation("HomeEcosystem");
  return (
    <section>
      <div className="container">
        <div className="pt-24 relative">
          <div className="text-center">
            <h1 className="mb-5 text-2xl text-primary/90 font-bold leading-tight text-black sm:leading-tight md:leading-tight">
              {t("title")}
            </h1>
            <p className="mb-8 px-4 lg:px-60 mx-auto text-md !leading-relaxed text-body-color">
              {t("des")}
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full">
              <Link
                className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm whitespace-nowrap bg-primary text-white border border-transparent rounded-[4px] shadow-md hover:bg-primary/80 focus:outline-none w-full sm:w-auto"
                to="#"
              >
                {t("create")}
                <MdOutlineKeyboardArrowRight />
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
          <EcosystemShow />
        </div>
        <p className="text-[14px] text-center mt-14 px-2">
          {t("more")}
          <Link to="/extensions" className="text-primary">
            {t("viewAll")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Ecosystem;
