import { MdOutlineMedicalInformation } from "react-icons/md";
import { MdCastForEducation } from "react-icons/md";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { SiTravisci } from "react-icons/si";
import { MdOutlineTransferWithinAStation } from "react-icons/md";
import { MdBiotech } from "react-icons/md";
import { GrCloudSoftware } from "react-icons/gr";
import { MdOutlineEngineering } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface MoreItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

function moreData(): MoreItem[] {
  const { t } = useTranslation("HomeBuilts");

  return [
    {
      icon: <MdOutlineMedicalInformation />,
      title: t("Medical"),
      description: t("MedicalDes"),
    },
    {
      icon: <MdCastForEducation />,
      title: t("Education"),
      description: t("EducationDes"),
    },
    {
      icon: <MdOutlinePrecisionManufacturing />,
      title: t("Manufacturing"),
      description: t("ManufacturingDes"),
    },
    {
      icon: <MdBiotech />,
      title: t("BioTech"),
      description: t("BioTechDes"),
    },
    {
      icon: <SiTravisci />,
      title: t("DataScientists"),
      description: t("DataScientistsDes"),
    },
    {
      icon: <MdOutlineTransferWithinAStation />,
      title: t("ITLeaders"),
      description: t("ITLeadersDes"),
    },
    {
      icon: <MdOutlineEngineering />,
      title: t("DataEngineer"),
      description: t("DataEngineerDes"),
    },
    {
      icon: <GrCloudSoftware />,
      title: t("PlatformEngineer"),
      description: t("PlatformEngineerDes"),
    },
  ];
}
export default moreData;
