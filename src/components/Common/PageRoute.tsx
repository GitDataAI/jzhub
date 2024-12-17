import React from "react";
import { Link, useLocation } from "react-router-dom";

// Helper function to determine if the link is active
const isActive = (location: string, path: string) => {
  return location === path ? "bg-primary/10 text-primary border-primary" : "";
};

interface PageRouteProps {
  links: { to: string; label: string }[];
}

const PageRoute: React.FC<PageRouteProps> = ({ links }) => {
  const location = useLocation();

  return (
    <div className="menu flex-shrink-0 flex flex-row lg:flex-col overflow-auto pb-4 text-[14px]">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`border-b md:border-b-0 md:border-l lg:border-b-0 lg:border-l w-auto whitespace-nowrap px-2.5 py-1 text-sm font-medium text-gray-700 hover:text-primary ${isActive(
            location.pathname,
            link.to
          )}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default PageRoute;
