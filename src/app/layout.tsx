import { Providers } from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function LocaleLayout() {
  return (
    <Providers>
      <div className="flex flex-col h-screen">
        <Header />

        <main className="main-content flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </Providers>
  );
}
