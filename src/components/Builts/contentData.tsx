import { LuFileStack } from "react-icons/lu";
import { RiFlowChart } from "react-icons/ri";
import { AiOutlineExperiment } from "react-icons/ai";
import { useTranslation } from "react-i18next";

interface Content {
  icon: JSX.Element;
  title: string;
  description: string;
  content: JSX.Element;
}

function contentData(): Content[] {
  const { t } = useTranslation("HomeBuilts");

  return [
    {
      icon: <LuFileStack />,
      title: "JZFS",
      description: t("JZFSDes"),
      content: (
        <img
          src="images/home/jzhub-enterprise.png"
          className="w-full h-auto my-auto"
        />
      ),
    },
    {
      icon: <RiFlowChart />,
      title: "JZFlow",
      description: t("JZFlowDes"),
      content: (
        // <video
        //   controls
        //   className="w-full h-full object-cover"
        //   style={{ maxHeight: "400px", maxWidth: "100%" }}
        //   src=""
        // >
        //   Your browser does not support the video tag.
        // </video>
        <img
          src="images/home/jzhub-enterprise.png"
          className="w-full h-auto my-auto"
        />
      ),
    },
    {
      icon: <AiOutlineExperiment />,
      title: "JZLab",
      description: t("JZLabDes"),
      content: (
        // <video
        //   controls
        //   className="w-full h-full object-cover"
        //   style={{ maxHeight: "400px", maxWidth: "100%" }}
        //   src=""
        // >
        //   Your browser does not support the video tag.
        // </video>
        <img
          src="images/home/jzhub-enterprise.png"
          className="w-full h-auto my-auto"
        />
      ),
    },
  ];
}
export default contentData;
