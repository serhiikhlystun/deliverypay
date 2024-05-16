'use client';

import './Footer.sass';
import logo from './img/logo-text.svg';
import fb from './img/fb.svg';
import tw from './img/tw.svg';
import ins from './img/in.svg';
import LoginPopup from '../Popups/Login';
import SignUpPopup from '../Popups/SignUp';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useMutation } from 'react-query';
import setData from '@/helpers/setData';
import { logoutUser } from '@/queries/Users';

const Footer = () => {
  const { data: session, status } = useSession();

  // Стан для відображення попапа
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);

  const handleOpenPopup = e => {
    if (e.target.id === 'registration') {
      setIsSignUpPopupOpen(true);
    }
    if (e.target.id === 'login') {
      setIsLoginPopupOpen(true);
    }
    document.body.style.setProperty('overflow', 'hidden');
  };

  // Обробник закриття попапа
  const handleClosePopup = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
  };

  const mutation = useMutation(refresh_token => {
    setData(logoutUser, { refresh_token: refresh_token }, '/system');
  });

  const handleLogout = () => {
    mutation.mutate(session.user.refreshToken);
    signOut();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__left">
            <a href="#" className="footer__link">
              <Image className="footer__logo" src={logo.src} width={231} height={37} alt="" />
            </a>
            <ul className="footer__social">
              <li className="footer__social-item">
                <a className="footer__social-item-link" href="">
                  <Image src={fb.src} alt="Fb" width={51} height={51} />
                </a>
              </li>
              <li className="footer__social-item">
                <a className="footer__social-item-link" href="">
                  <Image src={ins.src} alt="In" width={52} height={51} />
                </a>
              </li>
              <li className="footer__social-item">
                <a className="footer__social-item-link" href="">
                  <Image src={tw.src} alt="Tw" width={52} height={51} />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__links">
            <div className="footer__box">
              <ul className="footer__pages">
                <li className="footer__item-title">Support</li>
                <li className="footer__item">
                  <Link href={'/feedback'} className="footer__item-link">
                    Feedback
                  </Link>
                </li>
                <li className="footer__item">
                  <Link href={'/contact'} className="footer__item-link">
                    Contact us
                  </Link>
                </li>
                <li className="footer__item">
                  <Link href={'/content/service'} className="footer__item-link">
                    Customer Service
                  </Link>
                </li>
                <li className="footer__item">
                  <Link href={'/content/terms'} className="footer__item-link">
                    Terms & condition
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__box">
              <ul className="footer__pages">
                <li className="footer__item-title">Help</li>
                <li className="footer__item">
                  <Link href={'/content/privacy'} className="footer__item-link">
                    Privacy Policy
                  </Link>
                </li>
                <li className="footer__item">
                  <Link href={'/content/delivery'} className="footer__item-link">
                    Shipping & Delivery
                  </Link>
                </li>
                <li className="footer__item">
                  <Link href={'/content/refund'} className="footer__item-link">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__box">
              <ul className="footer__pages">
                <li className="footer__item-title">My Account</li>
                {status === 'authenticated' ? (
                  <>
                    <li className="footer__item">
                      <Link href={'/profile-page'} id="profile" className="footer__item-link">
                        Profile
                      </Link>
                    </li>
                    <li className="footer__item">
                      <div id="logout" className="footer__item-link" onClick={handleLogout}>
                        Logout
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="footer__item">
                      <div id="registration" className="footer__item-link" onClick={handleOpenPopup}>
                        Sign Up
                      </div>
                    </li>
                    <li className="footer__item">
                      <div id="login" className="footer__item-link" onClick={handleOpenPopup}>
                        Login
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__copyright">Copyright © 2024 420COMRADES. All Rights Reserved.</div>
        {isLoginPopupOpen && <LoginPopup onClose={handleClosePopup} />}
        {isSignUpPopupOpen && <SignUpPopup onClose={handleClosePopup} />}
      </div>
    </footer>
  );
};

export default Footer;
