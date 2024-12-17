import { createBrowserRouter } from "react-router-dom";
import BlogDetailsPage from "@/app/blog-details/page";
import Blog from "@/app/blog/page";
import LocaleLayout from "@/app/layout";
import About from "@/app/resources/company/About";
import Team from "@/app/resources/company/Team";
import Values from "@/app/resources/company/Values";
import Jobs from "@/app/resources/company/Jobs";
import Brands from "@/app/resources/company/Brands";
import Products from "@/app/page";
import GPUPage from "@/app/gpu/page";
import EMP from "@/app/solutions/byIndustry/EMP";
import IUC from "@/app/solutions/byIndustry/IUC";
import HBT from "@/app/solutions/byIndustry/HBT";
import ME from "@/app/solutions/byIndustry/ME";
import UD from "@/app/solutions/byIndustry/UD";
import DLI from "@/app/solutions/byIndustry/DLI";
import DCAI from "@/app/solutions/byIndustry/DCAI";
import ResourcesPage from "@/app/resources/page";
import SolutionsPage from "@/app/solutions/page";
import ProductsPage from "@/app/products/page";
import DE from "@/app/solutions/byRole/DE";
import DS from "@/app/solutions/byRole/DS";
import ITL from "@/app/solutions/byRole/ITL";
import PE from "@/app/solutions/byRole/PE";
import CodeOfConduct from "@/app/resources/community/CodeOfConduct";
import CommunityLinks from "@/app/resources/community/CommunityLinks";
import ContributingToUs from "@/app/resources/community/ContributingToUs";
import EnterprisePlatform from "@/app/enterprise/EnterprisePlatform";
import EnterprisePage from "@/app/enterprise/page";
import AdvanceSecurity from "@/app/enterprise/AdvanceSecurity";
import PremiumSupport from "@/app/enterprise/PremiumSupport";
import Extensions from "@/app/extensions/page";
import AllFeatures from "@/app/products/Explore/AllFeatures";
import RoadMap from "@/app/resources/company/RoadMap";
import Search from "@/app/products/DataProductsHub/Search";
import Navigate from "@/app/products/DataProductsHub/Navigate";
import DataTour from "@/app/products/Explore/DataTour";
import Review from "@/app/products/DataProductsHub/Review";
import Issues from "@/app/products/DataProductsHub/Issues";
import Discussions from "@/app/products/DataProductsHub/Discussions";
import ResourceCentre from "@/app/products/DataProductsHub/ResourceCentre";
import Repository from "@/app/products/DataProductsHub/Repository";
import JZHubCopilot from "@/app/products/DataProductsHub/JZHubCopilot";
const Routers = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <LocaleLayout />,
      children: [
        {
          path: "/",
          element: <Products />,
        },
        {
          path: "/public",
          element: <Products />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/blog-details",
          element: <BlogDetailsPage />,
        },
        {
          path: "/resources",
          element: <ResourcesPage />,
          children: [
            {
              path: "about",
              element: <About />,
            },
            {
              path: "team",
              element: <Team />,
            },
            {
              path: "values",
              element: <Values />,
            },
            {
              path: "jobs",
              element: <Jobs />,
            },
            {
              path: "brands",
              element: <Brands />,
            },
            {
              path: "codeOfConduct",
              element: <CodeOfConduct />,
            },
            {
              path: "communityLinks",
              element: <CommunityLinks />,
            },
            {
              path: "contributingToUs",
              element: <ContributingToUs />,
            },
            {
              path: "roadMap",
              element: <RoadMap />,
            },
          ],
        },
        {
          path: "/products",
          element: <ProductsPage />,
          children: [
            {
              path: "search",
              element: <Search />,
            },
            {
              path: "navigate",
              element: <Navigate />,
            },
            {
              path: "repository",
              element: <Repository />,
            },
            {
              path: "review",
              element: <Review />,
            },
            {
              path: "issues",
              element: <Issues />,
            },
            {
              path: "discussions",
              element: <Discussions />,
            },
            {
              path: "jzhubCopilot",
              element: <JZHubCopilot />,
            },
            {
              path: "resourceCentre",
              element: <ResourceCentre />,
            },
            {
              path: "allFeatures",
              element: <AllFeatures />,
            },
            {
              path: "dataTour",
              element: <DataTour />,
            },
          ],
        },
        {
          path: "/enterprise",
          element: <EnterprisePage />,
          children: [
            {
              path: "enterprisePlatform",
              element: <EnterprisePlatform />,
            },
            {
              path: "advanceSecurity",
              element: <AdvanceSecurity />,
            },
            {
              path: "premiumSupport",
              element: <PremiumSupport />,
            },
          ],
        },
        {
          path: "/solutions",
          element: <SolutionsPage />,
          children: [
            {
              path: "EMP",
              element: <EMP />,
            },
            {
              path: "IUC",
              element: <IUC />,
            },
            {
              path: "HBT",
              element: <HBT />,
            },
            {
              path: "ME",
              element: <ME />,
            },
            {
              path: "UD",
              element: <UD />,
            },
            {
              path: "DLI",
              element: <DLI />,
            },
            {
              path: "DCAI",
              element: <DCAI />,
            },
            {
              path: "DE",
              element: <DE />,
            },
            {
              path: "DS",
              element: <DS />,
            },
            {
              path: "ITL",
              element: <ITL />,
            },
            {
              path: "PE",
              element: <PE />,
            },
          ],
        },
        {
          path: "/gpu",
          element: <GPUPage />,
        },
        {
          path: "/extensions",
          element: <Extensions />,
        },
        {
          path: "/allFeatures",
          element: <AllFeatures />,
        },
      ],
    },
  ]);
};

export default Routers;
