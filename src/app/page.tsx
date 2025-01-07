import React from "react";
import Brands from "../components/Brands";
import ScrollUp from "../components/Common/ScrollUp";
import Features from "../components/Features";
import Hero from "../components/Hero";
import ActionBar from "@/components/Common/ActionBar";
import FooterTop from "@/components/Footer/FooterTop";
import Crafted from "@/components/Builts";
import PowerfulBox from "@/components/PowerfulBox";
import Ecosystem from "@/components/Ecosystem";

function Products() {
  React.useEffect(() => {
    document.title = "JZHub.AI";
  }, []);

  return (
    <>
      <ScrollUp />
      <ActionBar />
      <Hero />
      <Features />
      <Brands />
      <PowerfulBox />
      <Ecosystem />
      <Crafted />
      <FooterTop />
    </>
  );
}
export default Products;
