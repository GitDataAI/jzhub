import {
  MdDeveloperBoard,
  MdManageHistory,
  MdOutlineManageHistory,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { TbDatabaseShare } from "react-icons/tb";

interface Content {
  icon: JSX.Element;
  title: string;
  content: JSX.Element;
}
function contentsData(): Content[] {
  const { t } = useTranslation("HomePowerfulBox");
  return [
    {
      icon: <MdDeveloperBoard />,
      title: t("build"),
      content: (
        <img src="images/home/platform.png" className="w-full h-auto rounded" />
      ),
    },
    {
      icon: <MdManageHistory />,
      title: t("manage"),
      content: (
        <img src="images/home/platform.png" className="w-full h-auto rounded" />
      ),
    },
    {
      icon: <TbDatabaseShare />,
      title: t("share"),
      content: (
        <img src="images/home/platform.png" className="w-full h-auto rounded" />
      ),
    },
    /*{
    icon: <MdBackupTable />,
    title: "Reproducibility",
    content: (
      <video
        controls
        className="w-full h-auto rounded"
        src="/videos/terminal-task-runner.mp4"
      >
        Your browser does not support the video tag.
      </video>
    ),
  },
  {
    icon: <MdBackupTable />,
    title: "Deduplication",
    content: (
      <video
        controls
        className="w-full h-auto rounded"
        src="/videos/vim-friendly.mp4"
      >
        Your browser does not support the video tag.
      </video>
    ),
  },*/
  ];
}
export default contentsData;
