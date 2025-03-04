import React from "react";


export const metadata = {
    title: 'GitDataAI | Repository ',
};

export default function RepositoryLayout(props: { children: React.ReactNode }) {
    return (
        <div className="repository">
            {props.children}
        </div>
    );
}