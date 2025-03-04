import React from "react";


export const metadata = {
    title: 'GitDataAI | Issues ',
};

export default function IssuesLayout(props: { children: React.ReactNode }) {
    return (
        <div className="issues">
            {props.children}
        </div>
    );
}