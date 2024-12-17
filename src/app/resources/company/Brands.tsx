import { Image } from "primereact/image";
import React from "react";
import { useTranslation } from "react-i18next";

const Brands = () => {
  React.useEffect(() => {
    document.title = "JZHub | Brands";
  }, []);
  const { t } = useTranslation("Brand");

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-7">
        <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
          <h1 className="text-3xl text-primary font-bold mb-7">{t("title")}</h1>
          <p className="mb-2 text-body-color">{t("des1")}</p>
          <p className="mb-2 text-body-color">{t("des2")}</p>
          <p className="mb-7 text-body-color">{t("des3")}</p>

          <h2 className="my-5 text-2xl text-primary font-bold">{t("Logo")}</h2>
          <p className="mb-2 text-body-color">{t("LogoDes")}</p>

          <div className="flex justify-around mb-6">
            <Image
              src="/images/logo/jzhub.png"
              alt="Logo 1"
              className="w-28"
            />
            <Image
              src="/images/logo/jzhub.png"
              alt="Logo 1"
              className="w-28"
            />
            <Image
              src="/images/logo/jzhub.png"
              alt="Logo 1"
              className="w-28"
            />
          </div>

          <h2 className="my-5 text-2xl text-primary font-bold">
            {t("Logomark")}
          </h2>
          <p className="mb-2 text-body-color">{t("LogomarkDes")}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src="/images/logo/jzhub.png"
              alt="Logomark 1"
              className=" object-cover p-4 bg-gray-300"
            />
            <img
              src="/images/logo/jzhub.png"
              alt="Logomark 2"
              className=" object-cover p-4 bg-gray-300"
            />
          </div>

          {/* <h2 className="my-5 text-2xl text-primary font-bold">App icon</h2>
          <p className="mb-2 text-body-color">
            When discussing data on GitHub, you often need to commit and push
            before you can get feedback. By integrating conversation and
            collaboration into the tool itself, we make it easy to discuss any
            part of your data, whether it’s been stored for months or updated
            moments ago.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-40 bg-gray-200">
              <img
                src="/images/logo/jzhub.png"
                alt="App Icon 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-40 bg-gray-200">
              <img
                src="/images/logo/jzhub.png"
                alt="App Icon 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Brands;
