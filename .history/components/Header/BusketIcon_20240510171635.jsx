import Link from "next/link";
import bucketIcon from './img/bucket-icon.svg';
import Image from "next/image";

export default function BusketIcon({itemsInCart}) {
  return (
  <Link href={'/cart-page'} className="header__icon bucket">
    <p className="header__icon-bucket-message">{itemsInCart}</p>
    <Image src={bucketIcon.src} alt="busket" width={48} height={48} className="header__icon-img" />
  </Link>
  )
};
