import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import React from "react";



const ContactPage = () => {
  React.useEffect(() => {
    document.title =
      "JZHub | Contact";
  }, []);
  
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
