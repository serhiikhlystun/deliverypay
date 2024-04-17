import './Card.sass';
import CardItem from './CardItem';

const CardList = ({ products, getLoadMoreProducts, page_url }) => {
  return (
    <section className="products">
      <div className="container">
        <div className="card__list">
          {products
            ? products.map((product, index) => (
                <CardItem
                  key={index}
                  id={product.id}
                  image={product.product_image ? product.product_image.id : null}
                  title={product.product_name}
                  brand={product.brand}
                  price={product.new_price}
                  priceOld={product.price}
                  description={product.product_description}
                  category={product.product_categories[0].categories_id}
                  slug={product.slug}
                  page_url={page_url}
                  subcategory={product.subcategory}
                />
              ))
            : null}
        </div>
        <div className="card__more">
          <button className="card__more-btn" onClick={getLoadMoreProducts}>
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardList;
