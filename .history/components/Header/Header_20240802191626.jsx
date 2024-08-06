'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Header.sass';
import profileIcon from './img/profile-icon.svg';
import logo from './img/logo.svg';
import './Hamburger.sass';
import LoginPopup from '../Popups/Login';
import SignUpPopup from '../Popups/SignUp';
import RequestPasswordPopup from '../Popups/RequestPassword';

import LoginOrSignUp from '../Popups/LoginOrSignUp';
import setData from '@/helpers/setData';
import { useQuery, useMutation } from 'react-query';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { logoutUser } from '@/queries/Users';
import BusketIcon from './BusketIcon';
import { getSession } from '@/queries/sessions';
import getData from '@/queries/getData';
import useStore, { useCartItemCount } from '@/store/temp_order';
import Logout from './img/logout.svg';

const Header = () => {
  const { data: userSession, status } = useSession();
  const store = useStore();

  const itemsInCart = useCartItemCount(store);

  // Стан для відображення попапа
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isRequestPasswordPopupOpen, setIsRequestPasswordPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = e => {
    e.preventDefault();
    setIsPopupOpen(true);
    document.body.style.setProperty('overflow', 'hidden');
  };

  const loginOpen = e => {
    e.preventDefault();
    setIsLoginPopupOpen(true);
    setIsPopupOpen(false);
    document.body.style.setProperty('overflow', 'hidden');
  };

  const signUpOpen = e => {
    e.preventDefault();
    setIsSignUpPopupOpen(true);
    setIsPopupOpen(false);
    document.body.style.setProperty('overflow', 'hidden');
  };

  const requestPasswordOpen = e => {
    e.preventDefault();
    setIsRequestPasswordPopupOpen(true);
    setIsPopupOpen(false);
    document.body.style.setProperty('overflow', 'hidden');
  };

  // Обробник закриття попапа
  const handleClosePopup = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const hamburgerToggle = document.querySelectorAll('.hamburger-close');
    const overlay = document.getElementById('overlay');

    const clickHandler = () => {
      overlay.classList.toggle('open');
    };

    const hamburgerLogic = () => {
      if (!hamburgerToggle || !overlay) {
        return;
      }

      hamburgerToggle.forEach(activeBtn => {
        activeBtn.addEventListener('click', clickHandler);
      });
    };

    hamburgerLogic();

    return () => {
      hamburgerToggle.forEach(activeBtn => {
        activeBtn.removeEventListener('click', clickHandler);
      });
    };
  }, []);

  const mutation = useMutation(refresh_token => {
    setData(logoutUser, { refresh_token: refresh_token }, '/system');
  });

  const handleLogout = () => {
    mutation.mutate(userSession.user.refreshToken);
    signOut();
    localStorage.removeItem('session_id');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="hamburger hamburger-close">
            <div className="hamburger__box">
              <div className="hamburger__btn">
                <span className="hamburger__btn_item top"></span>
                <span className="hamburger__btn_item middle"></span>
                <span className="hamburger__btn_item bottom"></span>
              </div>
            </div>
            <div className="hamburger__overlay" id="overlay">
              <div className="hamburger__overlay-btn hamburger-toggle"></div>
              <div className="hamburger__overlay-box">
                <div className="hamburger__box hamburger-toggle active">
                  <div className="hamburger__btn hamburger__btn-open">
                    <svg
                      width="10"
                      height="18"
                      viewBox="0 0 10 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1_1091)">
                        <path
                          d="M9.59583 15.7263C9.83051 15.9835 9.96089 16.3218 9.94785 16.6737C9.94785 17.0256 9.81747 17.3504 9.56975 17.6075C9.33507 17.8511 9.00913 18 8.67014 18C8.33116 18 8.00521 17.8782 7.7575 17.6346L0.378096 9.97444C0.260756 9.85263 0.169492 9.70376 0.104302 9.54135C0.0391134 9.37895 0 9.20301 0 9.02707C0 8.85113 0.0391134 8.67519 0.104302 8.49925C0.169492 8.33684 0.260756 8.18797 0.378096 8.06616L7.7575 0.406015C7.87484 0.284211 8.01825 0.17594 8.17471 0.108271C8.3442 0.0406015 8.51369 0 8.68318 0C8.85267 0 9.0352 0.0270677 9.19166 0.0947368C9.34811 0.162406 9.49153 0.270677 9.6219 0.392481C9.73924 0.514286 9.83051 0.676692 9.8957 0.839098C9.97392 1.0015 10 1.17744 10 1.36692C10 1.54286 9.96089 1.7188 9.8957 1.8812C9.83051 2.04361 9.72621 2.19248 9.59583 2.32782L3.14211 9.02707L4.36767 10.2857L9.59583 15.7263Z"
                          fill="#151515"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_1091">
                          <rect width="10" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="hamburger__overlay-list">
                  <div className="hamburger__overlay-group">
                    <h4 className="hamburger__overlay-title">Shop:</h4>
                    <ul>
                      <li className="hamburger__overlay-list_item">
                        <Link href="/" className="hamburger__overlay-list_item-link active">
                          HOME
                        </Link>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_1060)">
                            <path
                              d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                              fill="#171717"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_1060">
                              <rect
                                width="6"
                                height="12"
                                fill="white"
                                transform="translate(6 12) rotate(-180)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </li>
                      <li className="hamburger__overlay-list_item">
                        <Link href="/products" className="hamburger__overlay-list_item-link">
                          All Products
                        </Link>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_1060)">
                            <path
                              d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                              fill="#171717"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_1060">
                              <rect
                                width="6"
                                height="12"
                                fill="white"
                                transform="translate(6 12) rotate(-180)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </li>
                      <li className="hamburger__overlay-list_item">
                        <Link href={'/special'} className="hamburger__overlay-list_item-link">
                          TODAY Specials
                        </Link>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_1060)">
                            <path
                              d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                              fill="#171717"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_1060">
                              <rect
                                width="6"
                                height="12"
                                fill="white"
                                transform="translate(6 12) rotate(-180)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </li>
                      <li className="hamburger__overlay-list_item">
                        <Link href={'/content/delivery'} className="hamburger__overlay-list_item-link">
                          Delivery
                        </Link>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_1060)">
                            <path
                              d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                              fill="#171717"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_1060">
                              <rect
                                width="6"
                                height="12"
                                fill="white"
                                transform="translate(6 12) rotate(-180)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </li>
                      <li className="hamburger__overlay-list_item">
                        <Link href={'/content/contact'} className="hamburger__overlay-list_item-link">
                          Contacts
                        </Link>
                        <svg
                          width="6"
                          height="12"
                          viewBox="0 0 6 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1_1060)">
                            <path
                              d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                              fill="#171717"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_1060">
                              <rect
                                width="6"
                                height="12"
                                fill="white"
                                transform="translate(6 12) rotate(-180)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="hamburger__overlay-list">
                  <div className="hamburger__overlay-group">
                    <h4 className="hamburger__overlay-title">Account:</h4>
                    <ul>
                      {status !== 'authenticated' ? (
                        <>
                          <li className="hamburger__overlay-list_item">
                            <div id="login" className="hamburger__overlay-list_item-link" onClick={loginOpen}>
                              Login
                            </div>
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1_1060)">
                                <path
                                  d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                                  fill="#171717"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1060">
                                  <rect
                                    width="6"
                                    height="12"
                                    fill="white"
                                    transform="translate(6 12) rotate(-180)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </li>
                          <li className="hamburger__overlay-list_item">
                            <div
                              id="registration"
                              className="hamburger__overlay-list_item-link"
                              onClick={signUpOpen}
                            >
                              Registration
                            </div>
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1_1060)">
                                <path
                                  d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                                  fill="#171717"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1060">
                                  <rect
                                    width="6"
                                    height="12"
                                    fill="white"
                                    transform="translate(6 12) rotate(-180)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="hamburger__overlay-list_item">
                            <Link href={'/profile-page'} className="hamburger__overlay-list_item-link">
                              Profile
                            </Link>
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1_1060)">
                                <path
                                  d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                                  fill="#171717"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1060">
                                  <rect
                                    width="6"
                                    height="12"
                                    fill="white"
                                    transform="translate(6 12) rotate(-180)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </li>
                          <li className="hamburger__overlay-list_item">
                            <div onClick={handleLogout} className="hamburger__overlay-list_item-link">
                              LogOut
                            </div>
                            <svg
                              width="6"
                              height="12"
                              viewBox="0 0 6 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_1_1060)">
                                <path
                                  d="M0.242503 1.51579C0.101695 1.34436 0.023468 1.1188 0.0312905 0.884212C0.0312906 0.649625 0.109518 0.433083 0.258149 0.261654C0.398957 0.0992484 0.594524 4.81113e-07 0.797914 4.98893e-07C1.0013 5.16674e-07 1.19687 0.081204 1.3455 0.24361L5.77314 5.35038C5.84355 5.43158 5.89831 5.53083 5.93742 5.6391C5.97653 5.74737 6 5.86466 6 5.98196C6 6.09925 5.97653 6.21654 5.93742 6.33384C5.89831 6.44211 5.84355 6.54135 5.77314 6.62256L1.3455 11.7293C1.2751 11.8105 1.18905 11.8827 1.09518 11.9278C0.99348 11.9729 0.891786 12 0.790091 12C0.688396 12 0.578878 11.982 0.485005 11.9368C0.391133 11.8917 0.305084 11.8195 0.226857 11.7383C0.156453 11.6571 0.101694 11.5489 0.0625806 11.4406C0.0156441 11.3323 -8.85051e-07 11.215 -8.74008e-07 11.0887C-8.63754e-07 10.9714 0.0234672 10.8541 0.0625807 10.7459C0.101694 10.6376 0.164275 10.5383 0.242502 10.4481L4.11473 5.98196L3.3794 5.14286L0.242503 1.51579Z"
                                  fill="#171717"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_1060">
                                  <rect
                                    width="6"
                                    height="12"
                                    fill="white"
                                    transform="translate(6 12) rotate(-180)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className={'header__nav'}>
            <li className={'header__nav-item active'}>
              <Link href={'/'} alt="home">
                HOME
              </Link>
            </li>
            <li className={'header__nav-item'}>
              <Link href={'/products'} alt="products">
                ALL PRODUCTS
              </Link>
            </li>
            <li className={'header__nav-item'}>
              <Link href={'/special'} alt="special">
                TODAY’S SPECIAL
              </Link>
            </li>
          </ul>
          <Link href="/" className="header__logo">
            <Image src={logo.src} alt="logo" width={231} height={96} className="header__logo-img" />
          </Link>
          <div className="header__right">
            <ul className={'header__nav'}>
              <li className={'header__nav-item'}>
                <Link href={'/content/delivery'}>DELIVERY</Link>
              </li>
              <li className={'header__nav-item'}>
                <Link href={'/content/contact'}>CONTACT</Link>
              </li>
            </ul>
            <div className="header__icon-wrapp">
              <div className="header__icon">
                {status === 'authenticated' ? (
                  <>
                    <Link href={'/profile-page'}>
                      <Image
                        src={profileIcon.src}
                        alt="profile"
                        width={48}
                        height={48}
                        className="header__icon-img"
                      />
                    </Link>
                    <Image
                      src={Logout.src}
                      alt="LogOut"
                      width={45}
                      height={43}
                      className="header__icon-img logout"
                      onClick={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    <button type="button" className="header__icon btn">
                      <Image
                        id="login-btn"
                        onClick={handleOpenPopup}
                        src={profileIcon.src}
                        width={48}
                        height={48}
                        alt="profile"
                        className="header__icon-img"
                      />
                    </button>
                  </>
                )}
              </div>
              <BusketIcon itemsInCart={itemsInCart} />
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <LoginOrSignUp onClose={handleClosePopup} loginOpen={loginOpen} signUpOpen={signUpOpen} />
        )}
        {isLoginPopupOpen && <LoginPopup onClose={handleClosePopup} />}
        {isSignUpPopupOpen && <SignUpPopup onClose={handleClosePopup} />}
        {isRequestPasswordPopupOpen && <RequestPasswordPopup onClose={handleClosePopup} />}
      </div>
    </header>
  );
};

export default Header;
