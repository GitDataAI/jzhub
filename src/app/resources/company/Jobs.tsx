import React from "react";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  React.useEffect(() => {
    document.title = "JZHub | Jobs";
  }, []);
  const { t } = useTranslation("Jobs");

  const reasonData = [
    {
      title: t("Work-LifeBalance"),
      reason: [
        t("Work-LifeBalanceDes1"),
        t("Work-LifeBalanceDes2"),
        t("Work-LifeBalanceDes3"),
      ],
    },
    {
      title: t("ProfessionalGrowth"),
      reason: [
        t("ProfessionalGrowthDes1"),
        t("ProfessionalGrowthDes2"),
        t("ProfessionalGrowthDes3"),
      ],
    },
    {
      title: t("CompetitiveBenefits"),
      reason: [
        t("CompetitiveBenefitsDes1"),
        t("CompetitiveBenefitsDes2"),
        t("CompetitiveBenefitsDes3"),
      ],
    },
  ];

  return (
    <>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-7">
          <div className="sm:col-span-7 md:col-span-7 lg:col-span-6">
            <h1 className="text-3xl text-primary font-bold mb-10">
              {t("title")}
            </h1>
            <p className="text-md text-body-color mb-8">{t("des")}</p>
            {/* <h2 className="text-2xl text-primary font-bold mb-6">
              Open Positions
            </h2>
            <div className="flex flex-col gap-1 mb-10">
              <Link
                to="#"
                className="flex items-center gap-1 text-primary decoration-primary/10 underline underline-offset-2"
              >
                Rust Engineer
                <GoArrowUpRight className="text-primary" />
              </Link>
              <Link
                to="#"
                className="flex items-center gap-2 text-primary decoration-primary/10 underline underline-offset-2"
              >
                AI Engineer
                <GoArrowUpRight className="text-primary" />
              </Link>
            </div> */}
            <h2 className="text-2xl text-primary font-bold mb-6">
              {t("PerksandBenefits")}
            </h2>
            <p className="text-md mb-3 text-body-color">
              {t("PerksandBenefitsDes")}
            </p>
            <div className="flex flex-col">
              {reasonData.map((value, index) => (
                <div
                  key={index}
                  className="w-2/3 flex flex-col items-stretch min-h-[100px] rounded-[4px] border border-gray-300 p-4 my-4" // 使用 flex-col 来让内容垂直排列
                >
                  <h4 className="text-primary text-xl mb-3">{value.title}</h4>
                  <ul className="list-disc list-inside text-gray-700 pl-2">
                    {value.reason.map((item, i) => (
                      <li key={i} className="text-body-color">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
