// CompanyPage.tsx
import PageRoute from "@/components/Common/PageRoute";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EnterprisePage: React.FC = () => {
  const { t } = useTranslation("Header");
  const links = [
    { to: "/enterprise/enterprisePlatform", label: t("EnterprisePlatform") },
    { to: "/enterprise/advanceSecurity", label: t("AdvancedSecurity") },
    { to: "/enterprise/premiumSupport", label: t("PremiumSupport") },
    // { to: "/enterprise/jzhubCopilot", label: "JZHub Copilot" },
  ];

  return (
    <section className="pt-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-20">
          <div className="lg:col-span-1">
            <PageRoute links={links} />
          </div>

          <div className="lg:col-span-4 content pt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterprisePage;
