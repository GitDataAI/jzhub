import React from "react";
import { useTranslation } from "react-i18next";
const About = () => {
  React.useEffect(() => {
    document.title = "JZHub | About";
  }, []);
  const { t } = useTranslation("AboutUs");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h1 className="text-3xl text-primary font-bold mb-7">{t("title")}</h1>
          <p className="mb-2 text-body-color">{t("des1")}</p>
          <p className="mb-2 text-body-color">{t("des2")}</p>
          <p className="mb-2 text-body-color">{t("des3")}</p>
          <hr className="my-7" />
          <p className="mb-7 text-body-color">{t("des4")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("hyper-responsive")}
          </h2>
          <p className="mb-2 text-body-color">{t("hyper-responsiveDes")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("collaboration")}
          </h2>
          <p className="mb-2 text-body-color">{t("collaborationDes")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Conversations")}
          </h2>
          <p className="mb-2 text-body-color">{t("ConversationsDes")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("disappear")}
          </h2>
          <p className="mb-2 text-body-color">{t("disappearDes")}</p>
          <hr className="my-7" />
          <p className="mb-2 text-body-color">{t("lastDes")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
