import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { LiaUserPlusSolid } from "react-icons/lia";
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen((prevState) => !prevState); // Toggle menu only when button clicked
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // Screen size detection for closing navbar on lg size and above
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // New state for small screens
  const handleResize = () => {
    if (window.innerWidth >= 970) {
      setIsLgScreen(true);
      setIsSmallScreen(false); // On large screens, it's not a small screen
      setNavbarOpen(false); // Close the navbar on large screens
    } else {
      setIsLgScreen(false);
      setIsSmallScreen(true); // On small screens, it's a small screen
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    window.addEventListener("resize", handleResize); // Listen for window resize

    // Initial resize check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const menus = menuData();
  const { pathname } = useLocation();
  const { t } = useTranslation("Header");

  return (
    <header
      className={`fixed border-b border-primary/10 bg-white h-16 header left-0 top-0 z-40 flex w-full items-center ${
        sticky ? "" : ""
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="px-2">
            <Link to="/" className="header-logo block w-full py-2">
              <Image
                src="/images/logo/jzhub.png"
                alt="logo"
                width="34"
                height="10"
                className="w-full"
              />
            </Link>
          </div>

          <div className="flex w-full items-center justify-between py-3">
            <div>
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-0 top-1/2 block translate-y-[-50%] rounded-[4px] px-2 py-[4px] lg:hidden ml-[10px]"
              >
                <span
                  className={`relative my-1 block h-0.5 w-[24px] bg-black transition-all duration-300 ${
                    navbarOpen ? " top-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`relative my-1 block h-0.5 w-[24px] bg-black transition-all duration-300 ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`relative my-1 block h-0.5 w-[24px] bg-black transition-all duration-300 ${
                    navbarOpen ? " top-[-6px] -rotate-45" : ""
                  }`}
                />
              </button>

              <nav
                id="navbarCollapse"
                className={`navbar absolute rounded-[4px] right-0 z-30 w-[160px] border-[.5px] border-body-color/50 bg-white p-3 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul
                  className={`block lg:flex ${
                    navbarOpen || !isLgScreen ? "flex-col" : "flex-row"
                  } gap-2`}
                >
                  {menus.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          to={menuItem.path}
                          className={`flex text-[14px] p-2 rounded-[4px] hover:bg-primary/10 ${
                            pathname === menuItem.path
                              ? "text-primary"
                              : "text-dark hover:bg-primary/10 /70"
                          }`}
                          target={menuItem.newTab ? "_blank" : "_self"}
                          rel={
                            menuItem.newTab ? "noopener noreferrer" : undefined
                          }
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <div
                            onClick={() => handleSubmenu(index)}
                            className="flex cursor-pointer items-center justify-between p-1.5 text-[14px] text-dark group-hover:bg-primary/10 /70 rounded-[4px]"
                          >
                            {menuItem.title}
                          </div>

                          <div
                            className={`submenu border border-primary/10 relative left-0 top-full rounded-[4px] bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[130%] lg:block lg:p-2 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                            style={{
                              minWidth: menuItem.submenu?.some(
                                (item) => item.submenu
                              )
                                ? "420px"
                                : "210px", // Adjust submenu width based on depth
                            }}
                          >
                            {menuItem.submenu && menuItem.submenu.length > 0 ? (
                              menuItem.submenu.some((item) => item.submenu) ? (
                                // If there is a second-level submenu
                                <div
                                  className={`${
                                    isSmallScreen
                                      ? "grid-cols-1"
                                      : "grid-cols-2 grid-cols-[7fr_9fr]"
                                  } grid gap-2`} // 设置 grid 布局及列间隙
                                >
                                  {menuItem.submenu.map(
                                    (firstLevelItem, firstLevelIndex) => (
                                      <div
                                        key={firstLevelIndex}
                                        className={`flex flex-col ${
                                          isLgScreen && firstLevelIndex === 0
                                            ? "border-r border-primary/10 pr-2"
                                            : ""
                                        }`}
                                      >
                                        <p className="block font-semibold text-[12px] p-1.5 text-body-color">
                                          {firstLevelItem.title}
                                        </p>
                                        {firstLevelItem.submenu &&
                                          firstLevelItem.submenu.map(
                                            (
                                              secondLevelItem,
                                              secondLevelIndex
                                            ) =>
                                              secondLevelItem.path ? (
                                                <Link
                                                  to={secondLevelItem.path}
                                                  key={secondLevelIndex}
                                                  className="block rounded-[4px] text-[14px] text-dark hover:bg-primary/10 /70 p-1.5 flex items-center gap-2"
                                                  target={
                                                    secondLevelItem.newTab
                                                      ? "_blank"
                                                      : "_self"
                                                  }
                                                  rel={
                                                    secondLevelItem.newTab
                                                      ? "noopener noreferrer"
                                                      : undefined
                                                  }
                                                >
                                                  {secondLevelItem.icon && (
                                                    <span className="text-primary">
                                                      {secondLevelItem.icon}
                                                    </span>
                                                  )}
                                                  {secondLevelItem.title}
                                                </Link>
                                              ) : null
                                          )}
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                // If no second-level submenu, just display the first-level submenu
                                <div className="flex flex-col">
                                  {menuItem.submenu.map(
                                    (submenuItem, submenuIndex) =>
                                      submenuItem.path ? (
                                        <Link
                                          to={submenuItem.path}
                                          key={submenuIndex}
                                          className="block rounded-md p-1.5 text-sm text-dark hover:bg-primary/10 flex items-center gap-2"
                                          target={
                                            submenuItem.newTab
                                              ? "_blank"
                                              : "_self"
                                          }
                                          rel={
                                            submenuItem.newTab
                                              ? "noopener noreferrer"
                                              : undefined
                                          }
                                        >
                                          {submenuItem.icon && ( // 如果存在 icon，则渲染出来
                                            <span className="text-primary">
                                              {submenuItem.icon}
                                            </span>
                                          )}
                                          {submenuItem.title}
                                        </Link>
                                      ) : null
                                  )}
                                </div>
                              )
                            ) : null}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center justify-center pr-8 lg:pr-0 ml-20">
              <Link
                className="ease-in-up flex items-center gap-1 whitespace-nowrap px-2 py-1 text-sm text-dark transition duration-300 mr-2 rounded-[4px] bg-white border border-gray-400 hover:bg-gray-200"
                to="https://console.jzhub.cn/login"
              >
                <IoLogInOutline className="text-lg" />
                {t("Login")}
              </Link>
              <Link
                className="px-2 py-1 mr-2 flex items-center gap-1 whitespace-nowrap border border-transparent text-sm bg-primary text-white rounded-[4px] shadow-md hover:bg-primary/80"
                to="https://console.jzhub.cn/register"
              >
                <LiaUserPlusSolid className="text-lg" />
                {t("Register")}
              </Link>
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
