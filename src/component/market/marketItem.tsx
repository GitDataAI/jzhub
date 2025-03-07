import {MarketplaceData} from "@/app/(default)/marketplace/data";

export interface MarketItemProps {
    data: MarketplaceData;
}


export const MarketItem = ({data}: MarketItemProps) => {
    return (
        <div className="market-item">

            <div className="market-item-image">
                <div style={{
                    display: "flex",
                    gap: "1rem"
                }}>
                    <img src={data.image} alt={data.name}/>
                    <span>{data.name}</span>
                </div>
                <span className="price">{data.price}</span>
            </div>
            <div className="market-item-info">
                <p>{data.description.substring(0,50)} {data.description.length > 50 ? "..." : ""}</p>
                <p className="tags">{data.tags.map((tag) => <span key={tag}>{tag}</span>)}</p>
            </div>
        </div>
    )
}