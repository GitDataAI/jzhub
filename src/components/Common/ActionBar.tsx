import React from "react";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";

const ActionBar: React.FC = () => {
  const { t } = useTranslation("HomeHero");

  return (
    <section className="pt-16">
      <div
        className="container w-full h-8 text-sm text-center"
        style={{
          background:
            "linear-gradient(to right, rgba(243, 77, 1, 0), rgba(243, 77, 1, 0.1), rgba(243, 77, 1, 0.1), rgba(243, 77, 1, 0))",
        }}
      >
        <Link
          to="https://cacm.acm.org/opinion/the-5th-paradigm-ai-driven-scientific-discovery/"
          className="flex w-full h-full items-center justify-center text-primary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read the article"
        >
          {t("actionBarText")}
          <GoArrowUpRight className="mx-1" />
        </Link>
      </div>
    </section>
  );
};

export default ActionBar;
