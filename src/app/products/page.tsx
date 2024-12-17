import PageRoute from "@/components/Common/PageRoute";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductsPage: React.FC = () => {
  const { t } = useTranslation();
  const DataProductsHubLinks = [
    { to: "/products/search", label: t("Search") },
    { to: "/products/navigate", label: t("Navigate") },
    { to: "/products/repository", label: t("Repository") },
    { to: "/products/review", label: t("Review") },
    { to: "/products/issues", label: t("Issues") },
    { to: "/products/discussions", label: t("Discussions") },
    { to: "/products/jzhubCopilot", label: t("JZHubCopilot") },
    { to: "/products/resourceCentre", label: t("ResourceCentre") },
  ];

  const ExploreLinks = [
    { to: "/products/allFeatures", label: t("AllFeatures") },
    { to: "/products/dataTour", label: t("DataTour") },
  ];

  // Get current location from useLocation hook
  const location = useLocation();

  // Check if the current path matches DataProductsHubLinks or ExploreLinks
  const isDataProductsHub =
    location.pathname.includes("/products/search") ||
    location.pathname.includes("/products/navigate") ||
    location.pathname.includes("/products/repository") ||
    location.pathname.includes("/products/review") ||
    location.pathname.includes("/products/issues") ||
    location.pathname.includes("/products/discussions") ||
    location.pathname.includes("/products/jzhubCopilot") ||
    location.pathname.includes("/products/resourceCentre");

  const isExplore =
    location.pathname.includes("/products/allFeatures") ||
    location.pathname.includes("/products/dataTour");
  return (
    <section className="pt-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-20">
          <div className="lg:col-span-1 min-w-[200px]">
            <PageRoute
              links={
                isDataProductsHub
                  ? DataProductsHubLinks
                  : isExplore
                  ? ExploreLinks
                  : []
              }
            />
          </div>

          <div className="lg:col-span-4 content">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
