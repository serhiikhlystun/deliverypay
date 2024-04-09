import React, { useState } from 'react';
import 'swiper/scss';
import './ProductItem.sass';
import bucketIcon from './img/bucket-icon.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import img_01 from './img/card-img-01.jpg';
import img_02 from './img/card-img-02.jpg';
import img_03 from './img/card-img-03.jpg';
import img_04 from './img/card-img-04.jpg';

const ProductItem = ({ product }) => {
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);

  const toggleActive = e => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const handleClickBack = () => {
    window.history.back();
  };

  const removeTopElements = () => {
    if (window.innerWidth > 440) {
      return;
    }

    document.querySelector('.header').style.setProperty('display', 'none');
    document.querySelector('.text-slider').style.setProperty('display', 'none');
  };

  const hendleIncrement = () => {
    setCount(count + 1);
  };
  const hendleDecrement = () => {
    setCount(() => (count > 1 ? count - 1 : count));
  };

  const handleChangeInput = e => {
    let number = e.target.value.match(/\d+/g);
    if (number[1] !== undefined) {
      setCount(() => Number(number[1]));
    } else {
      setCount(number[0].charAt(number[0].length - 1));
    }
  };

  return (
    <section>
      <div className="container">
        <div className="product-item">
          <a href="#" className="product-item__nav-mob" onClick={handleClickBack}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2015_963)">
                <path
                  d="M9.59583 15.7263C9.83051 15.9835 9.96089 16.3218 9.94785 16.6737C9.94785 17.0256 9.81747 17.3504 9.56975 17.6075C9.33507 17.8511 9.00913 18 8.67014 18C8.33116 18 8.00521 17.8782 7.7575 17.6346L0.378096 9.97444C0.260756 9.85263 0.169492 9.70376 0.104302 9.54135C0.0391134 9.37895 0 9.20301 0 9.02707C0 8.85113 0.0391134 8.67519 0.104302 8.49925C0.169492 8.33684 0.260756 8.18797 0.378096 8.06617L7.7575 0.406015C7.87484 0.284211 8.01825 0.17594 8.17471 0.108271C8.3442 0.0406015 8.51369 0 8.68318 0C8.85267 0 9.0352 0.0270677 9.19166 0.0947368C9.34811 0.162406 9.49153 0.270677 9.6219 0.392481C9.73924 0.514286 9.83051 0.676692 9.8957 0.839098C9.97392 1.0015 10 1.17744 10 1.36692C10 1.54286 9.96089 1.7188 9.8957 1.8812C9.83051 2.04361 9.72621 2.19248 9.59583 2.32782L3.14211 9.02707L4.36767 10.2857L9.59583 15.7263Z"
                  fill="#F4F4F4"
                />
              </g>
              <defs>
                <clipPath id="clip0_2015_963">
                  <rect width="10" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <div className="product-item__slider">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              scrollbar={{ draggable: true }}
            >
              <SwiperSlide>
                <img src={img_01.src} alt="Slide 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={img_02.src} alt="Slide 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={img_03.src} alt="Slide 3" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={img_04.src} alt="Slide 4" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="product-item__content">
            <div className="product-item__title-inn">
              <div className="product-item__title-box">
                <h3 className="product-item__title">{product.product_name}</h3>
              </div>
              <div className="product-item__like">
                <svg
                  onClick={toggleActive}
                  className="product-item__like-icon"
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
                    className={`product-item__like-icon-path ${isActive ? 'active' : ''}`}
                    d="M16.324 14.3662C14.7538 14.3662 13.4805 15.6265 13.4805 17.1813C13.4805 18.4365 13.9781 21.4154 18.8764 24.4267C18.9641 24.4801 19.0648 24.5083 19.1675 24.5083C19.2703 24.5083 19.371 24.4801 19.4587 24.4267C24.357 21.4154 24.8546 18.4365 24.8546 17.1813C24.8546 15.6265 23.5813 14.3662 22.0111 14.3662C20.4409 14.3662 19.1675 16.0724 19.1675 16.0724C19.1675 16.0724 17.8942 14.3662 16.324 14.3662Z"
                    stroke="#575757"
                    strokeWidth="1.04694"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <p className="product-item__descr-title">Description</p>
            <p className="product-item__descr-text">{product.product_description}</p>
            <div className="product-item__counter">
              <svg
                onClick={hendleDecrement}
                className="product-item__counter-item"
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2079_1831)">
                  <path
                    d="M-1.89961 8.75V8.8H-1.84961H14.835H14.885V8.75V7.27051V7.22051H14.835H-1.84961H-1.89961V7.27051V8.75Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2079_1831">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <input
                className="product-item__counter-input"
                type="text"
                value={`${count}X`}
                onChange={handleChangeInput}
              />
              <svg
                onClick={hendleIncrement}
                className="product-item__counter-item"
                width="20"
                height="20"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.09805 0.95H7.04805V1V7.55H0.498047H0.448047V7.6V9.4V9.45H0.498047H7.04805V16V16.05H7.09805H8.89805H8.94805V16V9.45H15.498H15.548V9.4V7.6V7.55H15.498H8.94805V1V0.95H8.89805H7.09805Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="0.1"
                />
              </svg>
            </div>
            <div className="product-item__btn-wrapp">
              <div className="product-item__price-wrapp">
                {product.new_price ? (
                  <>
                    <p className="product-item__price">{product.new_price}</p>
                    <p className="product-item__price-old">{product.price}</p>
                  </>
                ) : (
                  <p className="product-item__price">{product.price}</p>
                )}
              </div>
              <button className="product-item__btn">
                <img className="product-item__btn-icon" src={bucketIcon} alt="" />
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
