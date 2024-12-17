import brandsData from "./brandsData";
import SingleBrand from "./SingleBrand";
import UsersComment from "./UsersComment";
import { useTranslation } from "react-i18next";

const Brands = () => {
  const { t } = useTranslation("HomeBrands");
  return (
    <section className="pt-24">
      <div className="container">
        <div className="text-center">
          <h1 className="mb-5 text-2xl text-primary/90 font-bold leading-tight text-black  sm:leading-tight md:leading-tight">
            {t("title")}
          </h1>
          <p className="mb-8 text-md !leading-relaxed text-body-color ">
            {t("des")}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
        <UsersComment />
      </div>
    </section>
  );
};

export default Brands;
