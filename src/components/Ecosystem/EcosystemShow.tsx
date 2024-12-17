import React from "react";
import EcosystemData from "./EcosystemData";
import { LuUser } from "react-icons/lu";
import { RxDownload } from "react-icons/rx";

const EcosystemShow: React.FC = () => {
  const ecosystems = EcosystemData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8 w-full">
      {ecosystems.map((ecosystem, index) => (
        <div
          key={index}
          className="w-full p-2 rounded-[4px] border border-gray-300 bg-white hover:border-primary"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] text-primary mb-1">{ecosystem.name}</h3>
            {/* <img src={ecosystem.logo} className="max-h-[16px]" /> */}
            <div className="flex items-center gap-1">
              <RxDownload className="pb-1"/>
              <span className="text-[12px]">{ecosystem.downloadCount}k</span>
            </div>
          </div>
          <p
            className="text-[12px] overflow-hidden text-ellipsis whitespace-nowrap mb-1"
            title={ecosystem.description}
          >
            {ecosystem.description}
          </p>
          <div className="flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1">
              <LuUser />
              <span className="text-[12px]">{ecosystem.author}</span>
            </div>
            {/* <img src={ecosystem.logo} className="max-h-[16px]" /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EcosystemShow;
