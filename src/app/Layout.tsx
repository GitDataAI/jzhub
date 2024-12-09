import { LayoutHeader } from "../component/layout/Header.tsx";
import { useInfo } from "@/store/useInfo.tsx";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const info = useInfo();
  return (
    <div
      onClick={() => {
        info.setModelShowId(0);
      }}
    >
      <LayoutHeader />
      <div className="layout-content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
