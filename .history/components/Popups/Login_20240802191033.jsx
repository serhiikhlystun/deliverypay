import React, { useState } from 'react';
import '../common/Popup.sass';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import fetchData from '@/helpers/fetchData';
import { getCurrentUser, updateUserSession } from '@/queries/Users';
import setData from '@/helpers/setData';

import ShowPasswordIcon from './img/show-password.svg';
import HidePassword from './img/hide-password.svg';
import Image from 'next/image';

const LoginPopup = ({ isOpen, onClose, requestPasswordOpen, csrfToken }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const router = useRouter();
  const [error, setError] = useState(false);
  const closeLoginPopup = () => {
    onClose();
    document.body.style.setProperty('overflow', 'inherit');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: `${window.location.origin}`,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      const userSession = await getSession();
      await fetchData(getCurrentUser, {}, '/system', userSession.user.accessToken).then(user => {
        if (user.session) {
          localStorage.setItem('session_id', user.session.id);
        } else if (localStorage.getItem('session_id')){
          setData(
            updateUserSession,
            { data: { session: { id: localStorage.getItem('session_id') } }, user_id: user?.id },
            '/system',
            userSession.user.accessToken
          );
        }
      });
      closeLoginPopup();
    }
  };

  return (
    <div className={`popup__wrapp ${isOpen ? 'open' : ''}`}>
      <div className="popup__bg"></div>
      <div className="popup__content">
        <div className="popup__close-btn-wrapp">
          <button className="popup__close-btn" onClick={closeLoginPopup}>
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2001_1679)">
                <path
                  d="M16.5958 15.7263C16.8305 15.9835 16.9609 16.3218 16.9478 16.6737C16.9478 17.0256 16.8175 17.3504 16.5698 17.6075C16.3351 17.8511 16.0091 18 15.6701 18C15.3312 18 15.0052 17.8782 14.7575 17.6346L7.3781 9.97444C7.26076 9.85263 7.16949 9.70376 7.1043 9.54135C7.03911 9.37895 7 9.20301 7 9.02707C7 8.85113 7.03911 8.67519 7.1043 8.49925C7.16949 8.33684 7.26076 8.18797 7.3781 8.06616L14.7575 0.406015C14.8748 0.284211 15.0183 0.17594 15.1747 0.108271C15.3442 0.0406015 15.5137 0 15.6832 0C15.8527 0 16.0352 0.0270677 16.1917 0.0947368C16.3481 0.162406 16.4915 0.270677 16.6219 0.392481C16.7392 0.514286 16.8305 0.676692 16.8957 0.839098C16.9739 1.0015 17 1.17744 17 1.36692C17 1.54286 16.9609 1.7188 16.8957 1.8812C16.8305 2.04361 16.7262 2.19248 16.5958 2.32782L10.1421 9.02707L11.3677 10.2857L16.5958 15.7263Z"
                  fill="#151515"
                />
              </g>
              <g clipPath="url(#clip1_2001_1679)">
                <path
                  d="M0.404172 15.7263C0.169492 15.9835 0.039114 16.3218 0.0521517 16.6737C0.0521517 17.0256 0.182529 17.3504 0.430248 17.6075C0.664928 17.8511 0.990873 18 1.32986 18C1.66884 18 1.99479 17.8782 2.2425 17.6346L9.6219 9.97444C9.73924 9.85263 9.83051 9.70376 9.8957 9.54135C9.96089 9.37895 10 9.20301 10 9.02707C10 8.85113 9.96089 8.67519 9.8957 8.49925C9.83051 8.33684 9.73924 8.18797 9.6219 8.06616L2.2425 0.406015C2.12516 0.284211 1.98175 0.17594 1.82529 0.108271C1.6558 0.0406015 1.48631 0 1.31682 0C1.14733 0 0.964798 0.0270677 0.808344 0.0947368C0.651891 0.162406 0.508474 0.270677 0.378097 0.392481C0.260756 0.514286 0.169492 0.676692 0.104302 0.839098C0.0260754 1.0015 0 1.17744 0 1.36692C0 1.54286 0.039114 1.7188 0.104302 1.8812C0.169492 2.04361 0.273794 2.19248 0.404172 2.32782L6.85789 9.02707L5.63233 10.2857L0.404172 15.7263Z"
                  fill="#151515"
                />
              </g>
              <defs>
                <clipPath id="clip0_2001_1679">
                  <rect width="10" height="18" fill="white" transform="translate(7)" />
                </clipPath>
                <clipPath id="clip1_2001_1679">
                  <rect width="10" height="18" fill="white" transform="matrix(-1 0 0 1 10 0)" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="popup__title-wrapp">
          <h2 className="popup__title">LOGIN</h2>
          <p className="popup__subtitle">You will receive 2.5% cashback from each purchase</p>
        </div>
        <form className="popup__form" onSubmit={e => handleSubmit(e)}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="popup__input-wrapp">
            <input
              id="email-address"
              name="email"
              type="email"
              // autoComplete="email"
              className="popup__input"
              required
              placeholder="EMAIL"
            />
            {/* <input
              id="password"
              name="password"
              type="password"
              // autoComplete="current-password"
              required
              className="popup__input"
              placeholder="PASSWORD"
            /> */
            <div className="popup__input-icon-wrapp">
              {isShowPassword ? (
                <Image  onClick={showPassword} className='popup__input-icon' src={ShowPasswordIcon.src} alt="showPass" width={25} height={25} />
              ) : (
                <Image  onClick={showPassword} className='popup__input-icon' src={HidePassword.src} alt="hidePass" width={25} height={25} />
              )}
              <input
                id="password"
                name="password"
                className="popup__input"
                autoComplete="off"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="PASSWORD"
              />
            </div>}
            {error ? <div>{error}</div> : null}
          </div>
          <button className="popup__save-btn" type="submit">
            LOGIN
          </button>
<hr></hr>
          <button className="popup__save-btn success" onClick={requestPasswordOpen}>
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default LoginPopup;