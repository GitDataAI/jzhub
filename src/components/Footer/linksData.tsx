import { linksItem } from "@/types/links";
import { useTranslation } from "react-i18next";

function linksData(): linksItem[] {
  const { t } = useTranslation(["Header"]);
  return [
    {
      title: t("PD"),
      links: [
        {
          path: "/products/allFeatures",
          name: t("Explore"),
          isExternalLink: false,
        },
        {
          path: "/products/discussions",
          name: t("Discussions"),
          isExternalLink: false,
        },
        {
          path: "https://github.com/GitdataAI",
          name: t("Github"),
          isExternalLink: true,
        },
        {
          path: "https://console.jzhub.cn",
          name: t("Cloud"),
          isExternalLink: true,
        },
        {
          path: "https://docs.jzhub.cn/",
          name: t("DC"),
          isExternalLink: true,
        },
      ],
    },
    {
      title: t("CM"),
      links: [
        {
          path: "/resources/codeOfConduct",
          name: t("codeOfConduct"),
          isExternalLink: false,
        },
        {
          path: "/resources/contributingToUs",
          name: t("contributingToUs"),
          isExternalLink: false,
        },
        {
          path: "/resources/communityLinks",
          name: t("CommunityLinks"),
          isExternalLink: false,
        },
      ],
    },
    {
      title: t("CP"),
      links: [
        {
          path: "/resources/about",
          name: t("AB"),
          isExternalLink: false,
        },
        {
          path: "/resources/team",
          name: t("TA"),
          isExternalLink: false,
        },
        {
          path: "/resources/values",
          name: t("VS"),
          isExternalLink: false,
        },
        {
          path: "/resources/jobs",
          name: t("JB"),
          isExternalLink: false,
        },
        {
          path: "/resources/brands",
          name: t("BD"),
          isExternalLink: false,
        },
        {
          path: "/resources/roadMap",
          name: t("RM"),
          isExternalLink: false,
        },
      ],
    },
    {
      title: t("Social"),
      links: [
        {
          path: "https://x.com/GitDataAI",
          name: t("Twitter"),
          isExternalLink: true,
        },
        {
          path: "https://www.youtube.com/@jzhub",
          name: t("YouTube"),
          isExternalLink: true,
        },
        {
          path: "https://www.linkedin.com/company/jzhub/",
          name: t("LinkedIn"),
          isExternalLink: true,
        },
        {
          path: "https://space.bilibili.com/1616514069",
          name: t("BiliBili"),
          isExternalLink: true,
        },
        {
          path: "https://discord.gg/gpNhGGbT",
          name: t("Discord"),
          isExternalLink: true,
        },
      ],
    },
  ];
}
export default linksData;
