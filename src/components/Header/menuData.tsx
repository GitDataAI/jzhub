import { Menu } from "@/types/menu";
import { useTranslation } from "react-i18next";
import { CgCommunity, CgSupport } from "react-icons/cg";
import {
  GiConcentricCrescents,
  GiDetour,
  GiLaddersPlatform,
  GiOffshorePlatform,
} from "react-icons/gi";
import { GoCodeOfConduct, GoCommentDiscussion } from "react-icons/go";
import {
  GrResources,
  GrShieldSecurity,
  GrSystem,
  GrWorkshop,
} from "react-icons/gr";
import { IoNavigateOutline, IoSearchOutline } from "react-icons/io5";
import { LiaBlogger, LiaIndustrySolid } from "react-icons/lia";
import {
  MdOutlineEngineering,
  MdOutlineFeaturedPlayList,
  MdOutlineHealthAndSafety,
  MdOutlineLeaderboard,
  MdOutlineScience,
  MdOutlineSdStorage,
  MdRoundaboutRight,
} from "react-icons/md";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import {
  RiAlignItemBottomLine,
  RiCopilotLine,
  RiDatabaseLine,
} from "react-icons/ri";
import { RxValue } from "react-icons/rx";
import { SiContributorcovenant, SiDatabricks } from "react-icons/si";
import { SlDocs } from "react-icons/sl";
import { TbBrandBooking } from "react-icons/tb";
import { VscIssues, VscPreview } from "react-icons/vsc";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";

function menuData(): Menu[] {
  const { t } = useTranslation("Header");

  return [
    {
      id: 1,
      title: t("PD"),
      newTab: false,
      submenu: [
        {
          id: 21,
          title: t("DataProductsHub"),
          newTab: false,
          submenu: [
            {
              id: 111,
              title: t("Search"),
              path: "/products/search",
              newTab: false,
              icon: <IoSearchOutline />,
            },
            {
              id: 112,
              title: t("Navigate"),
              path: "/products/navigate",
              newTab: false,
              icon: <IoNavigateOutline />,
            },
            {
              id: 113,
              title: t("Repository"),
              path: "/products/repository",
              newTab: false,
              icon: <RiGitRepositoryCommitsLine />,
            },
            {
              id: 114,
              title: t("Review"),
              path: "/products/review",
              newTab: false,
              icon: <VscPreview />,
            },
            {
              id: 116,
              title: t("Issues"),
              path: "/products/issues",
              newTab: false,
              icon: <VscIssues />,
            },
            {
              id: 116,
              title: t("Discussions"),
              path: "/products/discussions",
              newTab: false,
              icon: <GoCommentDiscussion />,
            },
            {
              id: 117,
              title: t("JZHubCopilot"),
              path: "/products/jzhubCopilot",
              newTab: false,
              icon: <RiCopilotLine />,
            },
            {
              id: 118,
              title: t("ResourceCentre"),
              path: "/products/resourceCentre",
              newTab: false,
              icon: <GrResources />,
            },
          ],
        },
        {
          id: 21,
          title: t("Explore"),
          newTab: false,
          submenu: [
            {
              id: 211,
              title: t("AllFeatures"),
              path: "/products/allFeatures",
              newTab: false,
              icon: <MdOutlineFeaturedPlayList />,
            },
            {
              id: 212,
              title: t("DataTour"),
              path: "/products/dataTour",
              newTab: false,
              icon: <GiDetour />,
            },
            {
              id: 213,
              title: t("DC"),
              path: "https://docs.jzhub.cn",
              newTab: true,
              icon: <SlDocs />,
            },
            {
              id: 214,
              title: t("Blog"),
              path: "https://github.com/orgs/GitDataAI/discussions",
              newTab: true,
              icon: <LiaBlogger />,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: t("SL"),
      newTab: false,
      submenu: [
        {
          id: 22,
          title: t("ByRole"),
          newTab: false,
          submenu: [
            {
              id: 221,
              title: t("DataScientists"),
              path: "/solutions/DS",
              newTab: false,
              icon: <MdOutlineScience />,
            },
            {
              id: 222,
              title: t("DataEngineers"),
              path: "/solutions/DE",
              newTab: false,
              icon: <MdOutlineEngineering />,
            },
            {
              id: 223,
              title: t("ITLeaders"),
              path: "/solutions/ITL",
              newTab: false,
              icon: <MdOutlineLeaderboard />,
            },
            {
              id: 224,
              title: t("PlatformEngineers"),
              path: "/solutions/PE",
              newTab: false,
              icon: <GiOffshorePlatform />,
            },
          ],
        },
        {
          id: 21,
          title: t("ByIndustry"),
          newTab: false,
          submenu: [
            {
              id: 211,
              title: t("Pharmaceutical"),
              path: "/solutions/EMP",
              newTab: false,
              icon: <RiAlignItemBottomLine />,
            },
            {
              id: 212,
              title: t("SupplyChain"),
              path: "/solutions/IUC",
              newTab: false,
              icon: <LiaIndustrySolid />,
            },
            {
              id: 213,
              title: t("HBT"),
              path: "/solutions/HBT",
              newTab: false,
              icon: <MdOutlineHealthAndSafety />,
            },
            {
              id: 214,
              title: t("Manufacturing"),
              path: "/solutions/ME",
              newTab: false,
              icon: <GrSystem />,
            },
            {
              id: 215,
              title: t("Departments"),
              path: "/solutions/UD",
              newTab: false,
              icon: <RiDatabaseLine />,
            },
            {
              id: 216,
              title: t("DLI"),
              path: "/solutions/DLI",
              newTab: false,
              icon: <SiDatabricks />,
            },
            {
              id: 217,
              title: t("DCAI"),
              path: "/solutions/DCAI",
              newTab: false,
              icon: <GiConcentricCrescents />,
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: t("Resources"),
      newTab: false,
      submenu: [
        {
          id: 51,
          title: t("CP"),
          newTab: false,
          submenu: [
            {
              id: 511,
              title: t("AB"),
              path: "/resources/about",
              newTab: false,
              icon: <MdRoundaboutRight />,
            },
            {
              id: 512,
              title: t("TA"),
              path: "/resources/team",
              newTab: false,
              icon: <PiMicrosoftTeamsLogoLight />,
            },
            {
              id: 513,
              title: t("VS"),
              path: "/resources/values",
              newTab: false,
              icon: <RxValue />,
            },
            {
              id: 514,
              title: t("JB"),
              path: "/resources/jobs",
              newTab: false,
              icon: <GrWorkshop />,
            },
            {
              id: 515,
              title: t("BD"),
              path: "/resources/brands",
              newTab: false,
              icon: <TbBrandBooking />,
            },
            // {
            //   id: 516,
            //   title: t("RoadMap"),
            //   path: "/resources/roadMap",
            //   newTab: false,
            //   icon: <RiRoadMapLine />,
            // },
          ],
        },
        {
          id: 52,
          title: t("CM"),
          newTab: false,
          submenu: [
            {
              id: 521,
              title: t("codeOfConduct"),
              path: "/resources/codeOfConduct",
              newTab: false,
              icon: <GoCodeOfConduct />,
            },
            {
              id: 522,
              title: t("contributingToUs"),
              path: "/resources/contributingToUs",
              newTab: false,
              icon: <SiContributorcovenant />,
            },
            {
              id: 523,
              title: t("CommunityLinks"),
              path: "/resources/communityLinks",
              newTab: false,
              icon: <CgCommunity />,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      title: t("Enterprise"),
      newTab: false,
      submenu: [
        {
          id: 61,
          title: t("EnterprisePlatform"),
          path: "/enterprise/enterprisePlatform",
          newTab: false,
          icon: <GiLaddersPlatform />,
        },
        {
          id: 61,
          title: t("AdvancedSecurity"),
          path: "/enterprise/advanceSecurity",
          newTab: false,
          icon: <GrShieldSecurity />,
        },
        {
          id: 61,
          title: t("PremiumSupport"),
          path: "/enterprise/premiumSupport",
          newTab: false,
          icon: <CgSupport />,
        },
        // {
        //   id: 61,
        //   title: t("JZHubCopilot"),
        //   path: "/enterprise/jzhubCopilot",
        //   newTab: false,
        //   icon: <RiCopilotLine />,
        // },
      ],
    },
    // {
    //   id: 6,
    //   title: t("PR"),
    //   newTab: false,
    //   submenu: [
    //     {
    //       id: 61,
    //       title: t("GPU"),
    //       path: "/gpu",
    //       newTab: false,
    //       icon: <MdOutlineSdStorage />,
    //     },
    //   ],
    // },
  ];
}
export default menuData;
