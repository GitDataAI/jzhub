import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import linksData from "./linksData";

const RightLink: React.FC = () => {
  const linkData = linksData();

  return (
    <>
      {linkData.map((item, index) => (
        <div
          key={index}
          className={`h-40 flex flex-col border-0 pl-0 sm:pl-4 md:pl-4 lg:pl-4 mb-6 border-l-0 sm:border-l-[0.5px] sm:border-l-lightPrimary md:border-l-[0.5px] md:border-l-lightPrimary lg:border-l-[0.5px] lg:border-l-lightPrimary`}
        >
          <h3 className="text-md font-bold text-white mb-2">{item.title}</h3>
          {item.links.map((linkItem, idx) =>
            linkItem.isExternalLink ? (
              // External link with <a> tag
              <a
                key={idx}
                href={linkItem.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex gap-1 items-center text-white text-[14px] mb-[2px] underline decoration-lightPrimary decoration-[0.5px]"
              >
                {linkItem.name}
                <GoArrowUpRight className="text-lightPrimary" />
              </a>
            ) : (
              // Internal link with <Link> component
              <Link
                key={idx}
                to={linkItem.path}
                className="block flex gap-1 items-center text-white text-[14px] mb-[2px] underline decoration-lightPrimary decoration-[0.5px]"
              >
                {linkItem.name}
              </Link>
            )
          )}
        </div>
      ))}
    </>
  );
};

export default RightLink;
