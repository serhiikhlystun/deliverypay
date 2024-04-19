import React from 'react';
import './WishListItem.sass';
import bucketIcon from './img/bucket-icon.svg';
import Link from 'next/link';

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

const WishListItem = ({item, deleteFromWishes, addToCart }) => {
  console.log(item);

  return (
    <Link href={`/products/${item.category_slug}/${item.subcategory_slug}/${item.slug}`}>
    <li className="wish-list-item">
      <div className="wish-list-item__img-box">
        <img className="wish-list-item__img" src={`${assetsUrl}/${item.image}?width=580&height=700`} alt="" />
      </div>
      <div className="wish-list-item__content">
        <div className="wish-list-item__title-inn">
          <div className="wish-list-item__title-box">
            <h3 className="wish-list-item__title">{item.product_name}</h3>
            <p className="wish-list-item__subtitle">{item.brand}</p>
          </div>
          <div className="wish-list-item__like">
            <svg
              onClick={(e)=>deleteFromWishes(e, item.product_id)}
              className="wish-list-item__like-icon"
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.25"
                y="0.249908"
                width="37.836"
                height="38.3747"
                rx="18.918"
                stroke="#AAAAAA"
                strokeWidth="0.5"
              />
              <path
                className='wish-list-item__like-icon-path active'
                d="M16.324 14.3662C14.7538 14.3662 13.4805 15.6265 13.4805 17.1813C13.4805 18.4365 13.9781 21.4154 18.8764 24.4267C18.9641 24.4801 19.0648 24.5083 19.1675 24.5083C19.2703 24.5083 19.371 24.4801 19.4587 24.4267C24.357 21.4154 24.8546 18.4365 24.8546 17.1813C24.8546 15.6265 23.5813 14.3662 22.0111 14.3662C20.4409 14.3662 19.1675 16.0724 19.1675 16.0724C19.1675 16.0724 17.8942 14.3662 16.324 14.3662Z"
                stroke="#575757"
                strokeWidth="1.04694"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="wish-list-item__btn-wrapp">
          <div className="wish-list-item__price-wrapp">
            {item.new_price ? (
              <>
                <p className="wish-list-item__price">${item.new_price}</p>
                <p className="wish-list-item__price-old">${item.price}</p>
              </>
            ) : (
              <p className="wish-list-item__price">${item.price}</p>
            )}
          </div>
          <button className="wish-list-item__btn" onClick={(e)=>addToCart(e, item)}>
            <img className="wish-list-item__btn-icon" src={bucketIcon} alt="" />
            ADD
          </button>
        </div>
      </div>
    </li>
    </Link>
  );
};

export default WishListItem;
