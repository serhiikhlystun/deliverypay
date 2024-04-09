import React from 'react';
import './SpecialItem.sass';
import Link from 'next/link';

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL

const SpecialItem = ({ image, product_name, brand, new_price, price, slug, category }) => {
    return (
        <div className="special-item">
            <Link href={`/products/${category.slug}/${slug}`}>
            <img className="special-item__img" src={`${assetsUrl}/${image}?width=580&height=698`} alt="sale-item-image"/>
            <h3 className="special-item__title">
                {product_name}
            </h3>
            <p className="special-item__subtitle">
                {brand}
            </p>
            <div className="special-item__price-wrapp">
                <p className="special-item__price">
                    {new_price}
                </p>
                <p className="special-item__price old">
                    {price}
                </p>
            </div>
            </Link>
        </div>
    );
}

export default SpecialItem;
