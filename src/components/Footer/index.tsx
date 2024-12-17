import LeftInfo from "./LeftInfo";
import RightLink from "./RightLink";

const Footer = () => {
  return (
    <>
      <footer className="relative w-full z-10 bg-primary py-10 md:py-10 mt-16">
        <div className="container">
          <div className="flex flex-wrap gap-20 sm:gap-10 md:gap-10 lg:gap-40">
            <LeftInfo />
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              <RightLink />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
