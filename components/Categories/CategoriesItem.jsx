import React from 'react';
import './CategoriesItem.sass';
import Link from 'next/link';

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL

const CategoriesItem = ({ btnText, image, id, slug }) => {
    return (
        <div className="categories-item">
            <img src={`${assetsUrl}/${image}`} alt="" className="categories-item__img"/>
            <Link href={`/products/${slug}`} id={id} className="categories-item__btn">{ btnText }</Link>
        </div>
    );
}

export default CategoriesItem;
