import React from "react";


export const metadata = {
    title: 'GitDataAI | WorkSpace ',
};

export default function WorkSpaceLayout(props: { children: React.ReactNode }) {
    return (
        <div className="workspace">
            {props.children}
        </div>
    );
}