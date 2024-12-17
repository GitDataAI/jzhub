import React from "react";
import DetailedWithVideo from "./DetailedWithVideo";
import More from "./MoreBuilts";

const Crafted: React.FC = () => {
  return (
    <section className="pt-24 px-4">
      <div className="container">
        <DetailedWithVideo />
        <More />
      </div>
    </section>
  );
};

export default Crafted;
