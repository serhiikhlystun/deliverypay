import React, { useState, useEffect } from 'react';
import './CardItem.sass';
import bucketIcon from './img/bucket-icon.svg';
import Link from 'next/link';
import useStore from '@/store/temp_order';
import { v4 as uuidv4 } from 'uuid';
import setData from '@/helpers/setData';
import getData from '@/queries/getData';
import fetchData from '@/helpers/fetchData';
import { createSession, updateSession, getSession } from '@/queries/sessions';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { updateUserSession } from '@/queries/Users';
import { useSession } from 'next-auth/react';
import { getCurrentUser } from '@/queries/Users';

const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

const CardItem = ({
  image,
  id,
  title,
  brand,
  price,
  priceOld,
  description,
  category,
  slug,
  page_url,
  subcategory,
}) => {
  const { data: userSession, status } = useSession();

  const { data: user, isUserSuccess } = useQuery(
    ['currentUser'],
    async () => await fetchData(getCurrentUser, {}, '/system', userSession.user.accessToken),
    {
      enabled: status === 'authenticated',
    }
  );

  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();
  const [isSessionSet, setSessionSet] = useState(
    typeof window !== 'undefined' && localStorage.getItem('session_id') !== null
  );
  const { data: session, isSuccess } = useQuery(
    'session',
    async () => await getData(getSession, 'session_by_id', { id: localStorage.getItem('session_id') }),
    {
      enabled: isSessionSet,
    }
  );

  const mutation = useMutation(
    newSession => {
      if (!isSessionSet && !user?.session) {
        setData(createSession, { data: newSession }).then(response => {
          localStorage.setItem('session_id', response.create_session_item.id);
          if (user) {
            setData(
              updateUserSession,
              { data: { session: { id: response.create_session_item.id } }, user_id: user?.id },
              '/system',
              userSession.user.accessToken
            );
          }
        });
        setSessionSet(true);
      } else {
        setData(updateSession, { data: newSession, id: localStorage.getItem('session_id') });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('session');
      },
    }
  );

  useEffect(() => {
    localStorage.getItem('session_id') ? setSessionSet(true) : setSessionSet(false);
  });

  const toggleActive = e => {
    e.preventDefault();
    isActive ? deleteFromWishes(id) : addToWishes();
  };

  const {
    addToTempOrder,
    setInitialTempOrder,
    addToWishList,
    setInitialWishList,
    deleteFromWishList,
    updateTempOrder,
  } = useStore();

  useEffect(() => {
    if (isSuccess && session) {
      if (session.temp_order) {
        setInitialTempOrder(session.temp_order);
      }
      if (session.wish_list) {
        setInitialWishList(session.wish_list);
      }
    }
  }, [isSuccess]);

  async function addToCart(e) {
    e.preventDefault();
    if (isSessionSet) {
      const response = await getData(getSession, 'session_by_id', { id: localStorage.getItem('session_id') });
      setInitialTempOrder(response.temp_order);
    }

    let existingItem = useStore.getState().tempOrder.find(item => item.product_id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      updateTempOrder(existingItem.product_id, existingItem.quantity);
    } else {
      addToTempOrder({
        product_id: id,
        quantity: 1,
        image: image,
        brand: brand,
        product_name: title,
        new_price: price,
        price: priceOld,
        id: uuidv4(),
        slug: slug,
        category_slug: category.slug,
        subcategory_slug: subcategory.slug,
      });
    }
    mutation.mutate({
      status: 'draft',
      temp_order: useStore.getState().tempOrder,
    });

    toast.dark('Product added to the cart', {
      position:  "top-center",//toast.POSITION.TOP_RIGHT,
      autoClose: 500, // 3000 milliseconds = 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      
    });
  }

  const addToWishes = e => {
    if (!isActive) {
      addToWishList({
        product_id: id,
        brand: brand,
        product_name: title,
        new_price: price,
        price: priceOld,
        image: image,
        slug: slug,
        category_slug: category.slug,
        subcategory_slug: subcategory.slug,
      });
      mutation.mutate({
        status: 'draft',
        wish_list: useStore.getState().wishList,
      });
      setIsActive(true);
    }
  };

  const deleteFromWishes = id => {
    if (isActive) {
      deleteFromWishList(id);
      mutation.mutate({
        status: 'draft',
        wish_list: useStore.getState().wishList,
      });
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isSuccess && session && session.wish_list) {
      setIsActive(!!session.wish_list.find(item => item.product_id == id));
    }
  }, [isSuccess]);
  
  let link = `/special/${category.slug}/all/${slug}`;
  if (subcategory !== null) {
    link = `/special/${category.slug}/${subcategory.slug}/${slug}`;
  }

  return (
    <Link href={link}>
      <div className="card-item">
        <div className="card-item__img-wrapp">
          <Image
            src={`${assetsUrl}/${image}?width=580&height=700`}
            width={580}
            height={700}
            className="card-item__img"
            alt=""
          />
        </div>
        <div className="card-item__content">
          <div className="card-item__content-inn">
            <div className="card-item__title-inn">
              <div className="card-item__title-box">
                <h3 className="card-item__title">{title}</h3>
                <p className="card-item__subtitle">{brand}</p>
              </div>
              <div className="card-item__like">
                <svg
                  onClick={toggleActive}
                  className="card-item__like-icon"
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
                    className={`card-item__like-icon-path ${isActive ? 'active' : ''}`}
                    d="M16.324 14.3662C14.7538 14.3662 13.4805 15.6265 13.4805 17.1813C13.4805 18.4365 13.9781 21.4154 18.8764 24.4267C18.9641 24.4801 19.0648 24.5083 19.1675 24.5083C19.2703 24.5083 19.371 24.4801 19.4587 24.4267C24.357 21.4154 24.8546 18.4365 24.8546 17.1813C24.8546 15.6265 23.5813 14.3662 22.0111 14.3662C20.4409 14.3662 19.1675 16.0724 19.1675 16.0724C19.1675 16.0724 17.8942 14.3662 16.324 14.3662Z"
                    stroke="#575757"
                    strokeWidth="1.04694"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="card-item__price-wrapp desk">
              {price ? (
                <>
                  <p className="card-item__price">${price}</p>
                  <p className="card-item__price-old">${priceOld}</p>
                </>
              ) : (
                <p className="card-item__price">${priceOld}</p>
              )}
            </div>
            <p className="card-item__descr-title">Short Description</p>
            <p className="card-item__descr-text">{description}</p>
          </div>
          <div className="card-item__btn-wrapp">
            <div className="card-item__price-wrapp mob">
              {price ? (
                <>
                  <p className="card-item__price">${price}</p>
                  <p className="card-item__price-old">${priceOld}</p>
                </>
              ) : (
                <p className="card-item__price">${priceOld}</p>
              )}
            </div>
            <button className="card-item__btn" onClick={e => addToCart(e)}>
              <Image className="card-item__btn-icon" src={bucketIcon.src} width={48} height={48} alt="" />
              ADD
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
