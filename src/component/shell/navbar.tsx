import React, {useEffect} from "react";
import {AppNavbarProps} from "@/data/Navbar";
import {useRouter} from "next/navigation";


export const AppNavbar = (props: AppNavbarProps) => {
    const [Props, setProps] = React.useState(props);
    const nav = useRouter().replace;
    useEffect(() => {
        if (props.tab && window) {
            const query = new URLSearchParams(window.location.search);
            if (query.get("tab")) {
                setProps({
                    tab: true,
                    menu: Props.menu.map((item) => {
                        item.active = item.title === query.get("tab");
                        return item;
                    }),
                    url: Props.url,
                    title: Props.title
                });
            }
        }
    }, []);
    return (
        <div className="navbar">

            {
                Props && (
                    <ul className="navbar-ul">
                        <li className="navbar-logo">
                            {Props.title}
                        </li>
                        {
                            Props.menu.map((item, key) => (
                                <li className={"navbar-li " + (item.active ? "navbar-active" : "")} id={item.id} onClick={() => {
                                    setProps({
                                        tab: Props.tab,
                                        menu: Props.menu.map((item) => {
                                            item.active = false;
                                            return item;
                                        }),
                                        url: Props.url,
                                        title: Props.title
                                    });
                                    if (props.tab) {
                                        const query = new URLSearchParams(window.location.search);
                                        query.set("tab", item.title.toString());
                                        nav(window.location.pathname + "?" + query.toString());
                                    } else {
                                        nav(props.url + item.title.toLowerCase())
                                    }
                                    item.active = true;
                                }} key={key}>
                                   <span className="navbar-span">
                                        {item.icon}{item.title}
                                   </span>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}