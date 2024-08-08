"use client";

import "./TextSlider.sass";
import React, { useRef, useEffect } from "react";
import SwiperCore from "swiper/core";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { TextForSlider } from "@/queries/ProductsQueries";
import { useQuery } from "react-query";
import fetchData from "@/helpers/fetchData";
import getData from "@/queries/getData";

SwiperCore.use([Autoplay]);

const TextSlider = () => {
  const sliderRef = useRef(null);
  let swiper;

  const { data: data, isSuccess } = useQuery(
    ["textForSlider"],
    async () =>
      await fetchData(TextForSlider, { variables: { status: "published" } })
  );

  useEffect(() => {
    let swiperInstance = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (sliderRef.current && !swiperInstance.current && isSuccess) {
      swiperInstance.current = new SwiperCore(sliderRef.current, {
        modules: [Autoplay],
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true
        }
      });
    }
    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [isSuccess]);

  const slideNext = () => {
    if (swiperInstance.current) {
      swiperInstance.current.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperInstance.current) {
      swiperInstance.current.slidePrev();
    }
  };

  return (
    <section className="text-slider">
      <div className="container text-slider__wrapp">
        <div className="text-slider-prev" onClick={slidePrev}>
          <svg
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.515 3.03158C11.7966 2.68872 11.9531 2.2376 11.9374 1.76842C11.9374 1.29925 11.781 0.866166 11.4837 0.523309C11.2021 0.198497 10.811 9.45123e-07 10.4042 9.09562e-07C9.99739 8.74e-07 9.60626 0.162408 9.309 0.48722L0.453717 10.7008C0.312909 10.8632 0.203391 11.0617 0.125164 11.2782C0.0469372 11.4947 1.07274e-06 11.7293 1.05223e-06 11.9639C1.03172e-06 12.1985 0.0469371 12.4331 0.125164 12.6677C0.203391 12.8842 0.312908 13.0827 0.453717 13.2451L9.309 23.4586C9.4498 23.6211 9.6219 23.7654 9.80965 23.8556C10.013 23.9459 10.2164 24 10.4198 24C10.6232 24 10.8422 23.9639 11.03 23.8737C11.2177 23.7835 11.3898 23.6391 11.5463 23.4767C11.6871 23.3143 11.7966 23.0977 11.8748 22.8812C11.9687 22.6647 12 22.4301 12 22.1774C12 21.9429 11.9531 21.7083 11.8748 21.4917C11.7966 21.2752 11.6714 21.0767 11.515 20.8962L3.77054 11.9639L5.2412 10.2857L11.515 3.03158Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="swiper-container" ref={sliderRef}>
          <div className="swiper-wrapper text-slider__wrapp">
            {isSuccess &&
              data.data.text_for_slider.map((text, index) =>
                <div className="swiper-slide text-slider__item" key={index}>
                  {text.Text}
                </div>
              )}
          </div>
        </div>
        <div className="text-slider-next" onClick={slideNext}>
          <svg
            width="12"
            height="24"
            viewBox="0 0 12 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2005_556)">
              <path
                d="M0.485008 3.03158C0.203391 2.68872 0.0469379 2.23759 0.062583 1.76842C0.062583 1.29925 0.219037 0.866164 0.516299 0.523307C0.797916 0.198495 1.18905 -9.45123e-07 1.59583 -9.09562e-07C2.00261 -8.74e-07 2.39374 0.162406 2.69101 0.487218L11.5463 10.7008C11.6871 10.8632 11.7966 11.0617 11.8748 11.2782C11.9531 11.4947 12 11.7293 12 11.9639C12 12.1985 11.9531 12.4331 11.8748 12.6677C11.7966 12.8842 11.6871 13.0827 11.5463 13.2451L2.691 23.4586C2.5502 23.6211 2.3781 23.7654 2.19035 23.8556C1.98696 23.9459 1.78357 24 1.58018 24C1.37679 24 1.15776 23.9639 0.970013 23.8737C0.782269 23.7835 0.610169 23.6391 0.453715 23.4767C0.312907 23.3143 0.203389 23.0977 0.125163 22.8812C0.0312902 22.6647 1.37247e-07 22.4301 1.59333e-07 22.1774C1.79841e-07 21.9429 0.0469362 21.7083 0.125163 21.4917C0.203389 21.2752 0.328553 21.0767 0.485007 20.8962L8.22947 11.9639L6.7588 10.2857L0.485008 3.03158Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2005_556">
                <rect
                  width="12"
                  height="24"
                  fill="white"
                  transform="translate(12 24) rotate(-180)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TextSlider;
