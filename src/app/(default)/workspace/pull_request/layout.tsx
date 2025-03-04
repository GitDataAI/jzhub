import React from "react";


export const metadata = {
    title: 'GitDataAI | Pull Request ',
};

export default function PullRequestLayout(props: { children: React.ReactNode }) {
    return (
        <div className="pull_request">
            {props.children}
        </div>
    );
}