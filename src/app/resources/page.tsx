import PageRoute from "@/components/Common/PageRoute";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResourcesPage: React.FC = () => {
  const { t } = useTranslation();
  const byCompany = [
    { to: "/resources/about", label: t("AB") },
    { to: "/resources/team", label: t("TA") },
    { to: "/resources/values", label: t("VS") },
    { to: "/resources/jobs", label: t("JB") },
    { to: "/resources/brands", label: t("BD") },
    // { to: "/resources/roadMap", label: t("RoadMap") },
  ];
  const byCommunity = [
    { to: "/resources/codeOfConduct", label: t("codeOfConduct") },
    { to: "/resources/contributingToUs", label: t("contributingToUs") },
    { to: "/resources/communityLinks", label: t("CommunityLinks") },
  ];

  // Get current location from useLocation hook
  const location = useLocation();

  // Check if the current path matches the industry or role section
  const isCompany =
    location.pathname.includes("/resources/about") ||
    location.pathname.includes("/resources/team") ||
    location.pathname.includes("/resources/values") ||
    location.pathname.includes("/resources/jobs") ||
    location.pathname.includes("/resources/brands") ||
    location.pathname.includes("/resources/roadMap");
  const isCommunity =
    location.pathname.includes("/resources/codeOfConduct") ||
    location.pathname.includes("/resources/communityLinks") ||
    location.pathname.includes("/resources/contributingToUs");

  return (
    <section className="pt-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-20">
          <div className="lg:col-span-1 min-w-[200px]">
            <PageRoute
              links={isCompany ? byCompany : isCommunity ? byCommunity : []}
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

export default ResourcesPage;
