import React from "react";
import OpenSourceLarge from "./OpenSourceLarge";
import OpenSourceMiddle from "./OpenSourceMiddle";
import OpenSourceSmall from "./OpenSourceSmall";

const OpenSource: React.FC = () => {
  return (
    <section>
      <div className="w-full mt-10">
        <OpenSourceLarge />
        <OpenSourceMiddle />
        <OpenSourceSmall />
      </div>
    </section>
  );
};

export default OpenSource;
