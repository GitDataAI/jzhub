import PageRoute from "@/components/Common/PageRoute";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SolutionsPage: React.FC = () => {
  const { t } = useTranslation();
  const byIndustryLinks = [
    { to: "/solutions/EMP", label: t("Pharmaceutical") },
    { to: "/solutions/IUC", label: t("SupplyChain") },
    { to: "/solutions/HBT", label: t("HBT") },
    { to: "/solutions/ME", label: t("Manufacturing") },
    { to: "/solutions/UD", label: t("Departments") },
    { to: "/solutions/DLI", label: t("DLI") },
    { to: "/solutions/DCAI", label: t("DCAI") },
  ];
  const byRoleLinks = [
    { to: "/solutions/DS", label: t("DataScientists") },
    { to: "/solutions/DE", label: t("DataEngineers") },
    { to: "/solutions/ITL", label: t("ITLeaders") },
    { to: "/solutions/PE", label: t("PlatformEngineers") },
  ];

  // Get current location from useLocation hook
  const location = useLocation();

  // Check if the current path matches the industry or role section
  const isByIndustry =
    location.pathname.includes("/solutions/EMP") ||
    location.pathname.includes("/solutions/IUC") ||
    location.pathname.includes("/solutions/HBT") ||
    location.pathname.includes("/solutions/ME") ||
    location.pathname.includes("/solutions/UD") ||
    location.pathname.includes("/solutions/DLI") ||
    location.pathname.includes("/solutions/DCAI");

  const isByRole =
    location.pathname.includes("/solutions/DS") ||
    location.pathname.includes("/solutions/DE") ||
    location.pathname.includes("/solutions/ITL") ||
    location.pathname.includes("/solutions/PE");

  return (
    <section className="pt-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-20">
          <div className="lg:col-span-1 min-w-[200px]">
            {/* Conditionally pass the appropriate links */}
            <PageRoute
              links={
                isByIndustry ? byIndustryLinks : isByRole ? byRoleLinks : []
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

export default SolutionsPage;
