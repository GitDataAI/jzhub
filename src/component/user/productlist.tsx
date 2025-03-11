import {ProductList as ProductListModel, UserDashBored} from "@/server/types";

interface ProductListProps {
    userDash: UserDashBored
}

export const ProductList = ({userDash}: ProductListProps) => {
    const product = userDash.products;
    return (
        <>
            <div className="product-list">
                {product.map((product) => {
                    return <ProductItem products={product} key={product.owner.uid + product.repo.uid + product.data.uid}/>
                })}
            </div>
        </>
    )
}

const ProductItem = ({products,}: { products: ProductListModel }) =>{
    const product = products.data;
    const owner = products.owner;
    const repo = products.repo;
    return (
        <div className="product-item">
            <div className="product-item-info">
                <div className="product-item-info-title">
                    <h1>{owner.username}/{repo.name}-{">"}<a>{product.name}</a></h1>
                    <span>{product.description}</span>
                    <br/>
                    <span>hash: {product.hash}</span>
                </div>
                <div className="product-item-price">
                    {product.price === 0 ? <a style={{
                        color: "green"
                    }}>Free</a> : <a style={{
                        color: "red"
                    }}>
                        {`$${product.price}`}
                    </a>}
                </div>
            </div>
            <div className="product-item-info-but">
                <div style={{
                    display: "flex",
                    gap: "1rem"
                }}>
                    <span>Size: {(product.size /  (1024 * 1024)).toFixed(2)}MB</span>
                    <span>Post: {product.created_at.toString()}</span>
                </div>
                <span className="product-item-info-but-tag">
                    {
                        product.type.split(",")
                            .map((item,key) => {
                                return <span key={key}>{item}</span>
                            })
                    }
                </span>
            </div>
        </div>
    )
}