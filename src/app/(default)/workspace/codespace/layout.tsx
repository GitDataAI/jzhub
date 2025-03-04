import React from "react";


export const metadata = {
    title: 'GitDataAI | CodeSpace ',
};

export default function CodeSpaceLayout(props: { children: React.ReactNode }) {
    return (
        <div className="codeSpace">
            {props.children}
        </div>
    );
}