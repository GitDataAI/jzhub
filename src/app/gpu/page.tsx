import GPUShow from "@/components/GPU/GPUShow";
import React, { useState } from "react";

const GPUPage = () => {
  React.useEffect(() => {
    document.title = "JZHub | GPU";
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <section className="flex flex-col items-center pt-40">
      <h1 className="mb-10 text-3xl text-primary font-bold">GPU Collections</h1>
      <div className="container max-w-[1200px] flex flex-col items-center">
        <div className="w-full flex flex-row justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Enter your search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 text-base text-body-color bg-[#f8f8f8] border-stroke rounded-[4px] border outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-1 px-3 py-1.5 border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80 focus:outline-none"
          >
            Search
          </button>
        </div>
        <GPUShow />
      </div>
    </section>
  );
};

export default GPUPage;
