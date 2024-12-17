import { useTranslation } from "react-i18next";

interface comment {
  id: number;
  comment: string;
  author: string;
  company: string;
  identity: string;
  companyLogo: string;
  avatar: string;
}

function commentData(): comment[] {
  const { t } = useTranslation("HomeBrands");

  return [
    {
      id: 1,
      comment: t("AndrewNgComment"),
      author: t("AndrewNg"),
      company: "LandingAI",
      identity: t("AndrewNgIdentity"),
      companyLogo: "images/brands/landingai.png",
      avatar: "images/brands/andrew-ng.jpg",
    },
    {
      id: 2,
      comment: t("PalantirComment"),
      author: t("Palantir"),
      company: "Palantir",
      identity: t("PalantirIdentity"),
      companyLogo: "images/brands/palantir.png",
      avatar: "images/brands/palantir.png",
    },
    {
      id: 3,
      comment: t("DavidMarianiComment"),
      author: t("DavidMariani"),
      company: "AtScale",
      identity: t("DavidMarianiIdentity"),
      companyLogo: "images/brands/atscale.png",
      avatar: "images/brands/david.png",
    },
    {
      id: 4,
      comment: t("VinayIyengarComment"),
      author: t("VinayIyengar"),
      company: "Foundation Capital",
      identity: t("VinayIyengarIdentity"),
      companyLogo: "images/brands/foundation-captial.png",
      avatar: "images/brands/vinay.png",
    },
  ];
}
export default commentData;
