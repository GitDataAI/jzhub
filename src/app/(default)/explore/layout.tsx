import React from "react";


export const metadata = {
    title: 'GitDataAI | Explore ',
};

export default function ExploreLayout(props: { children: React.ReactNode }) {
    return (
        <div className="explore">
            {props.children}
        </div>
    );
}