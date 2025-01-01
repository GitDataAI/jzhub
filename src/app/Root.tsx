import RootHeader from "../component/root/RootHeader.tsx";
import useUser from "../store/useUser.tsx";
import { useEffect, useState } from "react";
import RootSidebar from "../component/root/RootSidebar.tsx";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    const user = useUser();
    const [expandSidebar, setExpandSidebar] = useState(false);
    const [pin, setPin] = useState(false);
    const [delayedexpandSidebar, setDelayedexpandSidebar] = useState(false);
    useEffect(() => {
        user.init();
    }, []);

    useEffect(() => {
        if (pin || expandSidebar) {
            const timer = setTimeout(() => {
                setDelayedexpandSidebar(expandSidebar)
            }, 500);

            return () => clearTimeout(timer);
        }else {
            setDelayedexpandSidebar(false)
        }
    }, [pin, expandSidebar]);

    return (
        <div className="root">
            <RootHeader />
            <div className="root-context">
                <div
                    onMouseEnter={() => {
                        if (!pin) {
                            setExpandSidebar(true);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!pin) {
                            setExpandSidebar(false);
                        }
                    }}
                    className="root-sidebar"
                    style={{
                        width: pin ? "200px" : expandSidebar ? "200px" : "80px",
                    }}
                >
                    <RootSidebar setPin={setPin} Pin={pin} exp={delayedexpandSidebar} />
                </div>
                <div
                    className="root-context-main"
                    style={{
                        width: pin ? "calc(100vw - 200px)" : "calc(100vw - 80px)",
                        marginLeft: pin ? "200px" : expandSidebar ? "80px" : "80px",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
