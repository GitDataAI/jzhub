import {ProductList} from "@/server/types";

export interface MarketItemProps {
    data: ProductList;
}


export const MarketItem = ({data}: MarketItemProps) => {
    const product = data.data;
    const owner = data.owner;
    return (
        <div className="market-item">

            <div className="market-item-image">
                <div style={{
                    display: "flex",
                    gap: "1rem"
                }}>
                    <img style={{
                        borderRadius: "50%",
                    }} src={owner.avatar || ""} alt={data.owner.uid}/>
                    <span>{product.name}</span>
                </div>
                <span className="price">{product.price === 0 ? <a style={{
                    color: "green"
                }}>
                    Free
                </a> : <a style={{
                    color: "red"
                }}>
                    {`$${product.price}`}
                </a>}</span>
            </div>
            <div className="market-item-info">
                {
                    product.description && (
                        <p>{product.description.substring(0,50)} {product.description.length > 50 ? "..." : ""}</p>
                    )
                }
                <p className="tags">{product.type.split(",").map((tag) => <span key={tag}>{tag}</span>)}</p>
            </div>
        </div>
    )
}