import React from "react";
import { useTranslation } from "react-i18next";

const Values = () => {
  React.useEffect(() => {
    document.title = "JZHub | Values";
  }, []);
  const { t } = useTranslation("Values");

  const values = [
    {
      title: t("Collaborative"),
      description: t("CollaborativeDes"),
    },
    {
      title: t("Innovation"),
      description: t("InnovationDes"),
    },
    {
      title: t("Transparent"),
      description: t("TransparentDes"),
    },
    {
      title: t("Community-driven"),
      description: t("Community-drivenDes"),
    },
    {
      title: t("Open-sourced"),
      description: t("Open-sourcedDes"),
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <div className="container">
            <h3 className="text-3xl text-primary font-bold mb-7">
              {t("title")}
            </h3>
            <div className="flex flex-col">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-stretch min-h-[100px] rounded-[4px] border border-gray-300 p-4 my-4"
                >
                  <h3 className="text-2xl text-primary font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-body-color text-[15px]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
