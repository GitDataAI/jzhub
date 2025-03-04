import React from "react";


export const metadata = {
    title: 'GitDataAI | MarketPlace ',
};

export default function MarketPlaceLayout(props: { children: React.ReactNode }) {
    return (
        <div className="marketPlace">
            {props.children}
        </div>
    );
}