import { FiGithub } from "react-icons/fi";
import { LiaBrainSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("HomeHero");

  return (
    <section id="home" className="relative z-10 overflow-hidden bg-white pt-32">
      <div className="container">
        <div className=" flex flex-wrap">
          <div className="w-full">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-5 text-2xl md:text-3xl lg:text-4xl text-primary/90 font-bold leading-tight text-black sm:leading-tight md:leading-tight">
                {t("title1")}
              </h1>
              <p className="text-center mb-8 text-md !leading-relaxed text-body-color px-2">
                {t("title2")}
                <br />
                {t("title3")}
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 w-full">
                <Link
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm whitespace-nowrap bg-primary text-white border border-transparent rounded-[4px] shadow-md hover:bg-primary/80 focus:outline-none w-full sm:w-auto"
                  to="https://console.jzhub.cn/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LiaBrainSolid className="text-[18px]" />
                  {t("start")}
                </Link>

                <Link
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm whitespace-nowrap bg-white text-gray-800 border border-gray-400 rounded-[4px] hover:bg-gray-200 w-full sm:w-auto"
                  to="https://github.com/GitdataAI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub />
                  {t("explore")}
                </Link>
              </div>
              <p className="text-center py-4 text-sm !leading-relaxed text-body-color px-2">
                {t("des1")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
