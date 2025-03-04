import React from "react";


export const metadata = {
    title: 'GitDataAI | Discussion ',
};

export default function DiscussionLayout(props: { children: React.ReactNode }) {
    return (
        <div className="discussion">
            {props.children}
        </div>
    );
}