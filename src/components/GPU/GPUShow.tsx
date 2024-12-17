import React from "react";
import GPUData from "./GPUData";

const GPUShow: React.FC = () => {
  const gpus = GPUData();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8 w-full">
      {gpus.map((gpu, index) => (
        <div
          key={index}
          className="w-full p-2 rounded-[4px] border border-gray-300 bg-white hover:border-primary"
        >
          <h3 className="text-center text-[14px] text-primary">{gpu.name}</h3>
          <hr className="my-1" />
          <p className="text-center text-[12px]">Hourly Pricing:</p>
          <div className="flex flex-row justify-around items-center text-[12px]">
            <div>min</div>
            <div>med</div>
            <div>max</div>
          </div>
          <div className="flex flex-row justify-around items-center text-[12px]">
            <div>${gpu.minPrice}</div>
            <div>${gpu.medPrice}</div>
            <div>${gpu.maxPrice}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GPUShow;
