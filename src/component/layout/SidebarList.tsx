import {useState} from "react";

export interface SidebarListProps {
    items:{
        label: string;
        url: string;
        icon?: JSX.Element;
    }[],
    label: string;
    newsLabel: string,
}

export const SidebarList = (props: SidebarListProps) => {
    const [maxLen,setMaxLen] = useState(3);
    return(
        <>
            <h1>
                {props.label}
            </h1>
            <ul className="sidebar-list">
                {props.items.map((item, index) => {
                    if (index < maxLen){
                        return(
                            <li key={index}>
                                <a href={item.url}>
                                    {item.icon}
                                    <span>
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        )
                    }
                })}
                {
                    props.items.length > maxLen && (
                        <li className="sidebar-list-more">
                            <a onClick={()=>setMaxLen(props.items.length)}>
                                ...
                            </a>
                        </li>
                    )
                }
            </ul>
            <button>
                {props.newsLabel}
            </button>
        </>
    )
}