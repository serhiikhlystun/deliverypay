'use client';

import React from 'react';
import './Special.sass';
import SpecialItem from './SpecialItem'; // Import the SpecialItem component

const Special = ({ products }) => {
  return (
    <section className="special">
      <div className="container">
        <div className="special__wrapp">
          <div className="special__title-wrapp">
            <h2 className="special__title">TODAY’S SPECIAL</h2>
            <svg
              className="special__title-arrow"
              width="6"
              height="12"
              viewBox="0 0 6 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2015_1020)">
                <path
                  d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312907 0.884212C0.0312907 0.649625 0.109518 0.433083 0.258149 0.261655C0.398957 0.0992488 0.594524 7.38174e-07 0.797914 7.55955e-07C1.0013 7.73736e-07 1.19687 0.0812042 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891785 12 0.790091 12C0.688396 12 0.578878 11.982 0.485006 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625805 11.4406C0.0156444 11.3323 -9.42945e-07 11.215 -9.31902e-07 11.0887C-9.21648e-07 10.9714 0.0234671 10.8541 0.0625805 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                  fill="#171717"
                />
              </g>
              <defs>
                <clipPath id="clip0_2015_1020">
                  <rect width="6" height="12" fill="white" transform="translate(6 12) rotate(-180)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="special__subtitle">Check out most promising product</p>
          <div className="special__list">
            {products.map((product, index) => (
              <SpecialItem
                key={index}
                image={product.product_image && product.product_image.id}
                product_name={product.product_name}
                brand={product.brand}
                new_price={`$${product.new_price}`}
                price={`$${product.price}`}
                slug={product.slug}
                category={product.product_categories[0].categories_id}
                subcategory={product.subcategory}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Special;
