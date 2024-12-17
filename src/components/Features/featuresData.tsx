import { Feature } from "@/types/feature";
import { TbDatabaseShare } from "react-icons/tb";
import { MdManageHistory } from "react-icons/md";
import { MdDeveloperBoard } from "react-icons/md";
import { useTranslation } from "react-i18next";

function featuresData(): Feature[] {
  const { t } = useTranslation("HomeHero");
  return [
    {
      id: 1,
      icon: <MdDeveloperBoard className="text-primary text-lg" />,
      title: t("build"),
      description: t("buildDes"),
    },
    {
      id: 2,
      icon: <MdManageHistory className="text-primary text-lg" />,
      title: t("manage"),
      description: t("manageDes"),
    },
    {
      id: 3,
      icon: <TbDatabaseShare className="text-primary text-lg" />,
      title: t("share"),
      description: t("shareDes"),
    },
    /*{
      id: 4,
      icon: <TbBrandDatabricks className="text-primary text-lg" />,
      title: "Data-Centric MLOps",
      description:
        "MLOps is rooted in being more data-centric than model-centric.",
    },
    {
      id: 5,
      icon: <TbBrandDatabricks className="text-primary text-lg" />,
      title: "Git Interface",
      description:
        "The JZFS file system is built as the bedrock, which is compatible with Git semantics(behavior), to harness the power of version control and collaboration.",
    },
    {
      id: 6,
      icon: <TbBrandDatabricks className="text-primary text-lg" />,
      title: "ML Reproducibility",
      description:
        "ML reproducibility is the ability to replicate the ML workflow previously carried out and produce the same results as the original work.",
    },*/
  ];
}
export default featuresData;
