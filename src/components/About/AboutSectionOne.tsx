import SectionTitle from "../Common/SectionTitle";
import { useTranslation } from "react-i18next";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const { t } = useTranslation("HomePartOne");

  interface ListProps {
    text: string;
  }

  const List: React.FC<ListProps> = ({ text }) => (
    <p className="mb-5 flex items-center text-sm font-medium text-body-color">
      <span className="mr-2 flex h-[22px] w-[22px] items-center justify-center rounded-lg bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 items-center">
          <div className="lg:w-2/3 w-full mx-auto">
            <SectionTitle title={t("TT")} paragraph={t("TS")} mb="22px" />
            <div className="flex flex-wrap gap-6 sm:gap-6 md:gap-10 lg:gap-10 mb-4">
              <List text={t("T1")} />
              <List text={t("T2")} />
              <List text={t("T3")} />
              <List text={t("T4")} />
            </div>
          </div>
          <div className="lg:w-1/3 w-full">
            <img
              src="/images/logo/jzhub-stack.png"
              alt="about-image"
              className="w-full drop-shadow-three"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
