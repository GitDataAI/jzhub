import React from "react";
import { useTranslation } from "react-i18next";
const CodeOfConduct: React.FC = () => {
  const { t } = useTranslation("CodeOfConduct");
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h2 className="my-5 text-2xl text-primary font-bold">{t("title")}</h2>
          <p className="mb-2 text-body-color">{t("des1")}</p>
          <p className="mb-2 text-body-color">{t("des2")}</p>
          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("OurStandards")}
          </h2>
          <p className="mb-4 text-body-color">{t("behavior")}</p>
          <ul className="list-disc mb-4 pl-6 text-body-color">
            <li className="mb-2">{t("behaviorDes1")}</li>
            <li className="mb-2">{t("behaviorDes2")}</li>
            <li className="mb-2">{t("behaviorDes3")}</li>
            <li className="mb-2">{t("behaviorDes4")}</li>
          </ul>
          <p className="mb-4 text-body-color">{t("unacceptable")}</p>
          <ul className="list-disc mb-4 pl-6 text-body-color">
            <li className="mb-2">{t("unacceptableDes1")} </li>
            <li className="mb-2">{t("unacceptableDes2")} </li>
            <li className="mb-2">{t("unacceptableDes3")} </li>
            <li className="mb-2">{t("unacceptableDes4")} </li>
          </ul>
          {/* <h2 className="my-5 text-2xl text-primary font-bold">Our Pledge </h2>
          <p className="mb-2 text-body-color">
            We as members, contributors, and leaders pledge to make
            participation in our community a harassment-free experience for
            everyone, regardless of age, body size, visible or invisible
            disability, ethnicity, sex characteristics, gender identity and
            expression, level of experience, education, socio-economic status,
            nationality, personal appearance, race, religion, or sexual identity
            and orientation.
          </p>
          <p className="mb-2 text-body-color">
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p>
          <h2 className="my-5 text-2xl text-primary font-bold">Our Pledge </h2>
          <p className="mb-2 text-body-color">
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p>
          <h3 className="my-4 text-xl text-primary font-bold">1.Correction </h3>
          <p className="mb-2 text-body-color">
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p>
          <h3 className="my-4 text-xl text-primary font-bold">2.Warning </h3>
          <p className="mb-2 text-body-color">
            We pledge to act and interact in ways that contribute to an open,
            welcoming, diverse, inclusive, and healthy community.
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default CodeOfConduct;
