import './Card.sass';
import CardItem from "./CardItem";

const CardList = ({products, getLoadMoreProducts}) => {
    
    return (
        <section className="products">
            <div className="container">
                <div className="card__list">
                    {products.map((product, index) => (
                        <CardItem
                            key={index}
                            image={product.product_image ? (product.product_image.id): (null)}
                            title={product.product_name}
                            brand={product.brand}
                            price={product.new_price}
                            priceOld={product.price}
                            description={product.product_description}
                            category={product.product_categories[0].categories_id}
                            slug={product.slug}
                        />
                    ))}
                </div>
                <div className="card__more">
                    <button className="card__more-btn" onClick={getLoadMoreProducts}>
                        Load more
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CardList;
