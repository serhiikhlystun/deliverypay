import Link from "next/link";
import bucketIcon from './img/bucket-icon.svg';
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BusketIcon({itemsInCart}) {
  return (
  <Link href={'/cart-page'} className="header__icon bucket">
      <ToastContainer />
    <p className="header__icon-bucket-message">{itemsInCart}</p>
    <Image src={bucketIcon.src} alt="busket" width={48} height={48} className="header__icon-img" />
  </Link>
  )
};
