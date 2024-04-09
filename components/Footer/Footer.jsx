import './Footer.sass';
import logo from './img/logo-text.svg';
import fb from './img/fb.svg';
import tw from './img/tw.svg';
import ins from './img/in.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__left">
                        <a href="#" className="footer__link">
                            <img className="footer__logo" src={logo.src} alt=""/>
                        </a>
                        <ul className="footer__social">
                            <li className="footer__social-item">
                                <a className="footer__social-item-link" href="">
                                    <img src={fb.src} alt="Fb"/>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a className="footer__social-item-link" href="">
                                    <img src={ins.src} alt="In"/>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a className="footer__social-item-link" href="">
                                    <img src={tw.src} alt="Tw"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__links">
                        <div className="footer__box">
                            <ul className="footer__pages">
                                <li className="footer__item-title">
                                    Support
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Feedback
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Contact us
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Customer Service
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Terms & condition
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__box">
                            <ul className="footer__pages">
                                <li className="footer__item-title">
                                    Help
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Shipping & Delivery
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Refund Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__box">
                            <ul className="footer__pages">
                                <li className="footer__item-title">
                                    My Account
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Sign Up
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="" className="footer__item-link">
                                        Login
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    Copyright © 2024 420COMRADES. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
