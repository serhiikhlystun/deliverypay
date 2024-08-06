import Link from 'next/link';
import Image from 'next/image';
import facebook from './img/fb.svg';
import x from './img/tw.svg';
import instagram from './img/in.svg';

const icons = {
  facebook,
  x,
  instagram,
}

export default function SocialItem({ social }) {
  const imageTitle = icons[social.Title]

  return (
    <li className="footer__social-item">
      <Link className="footer__social-item-link" href={social.URL}>
        <Image src={social.Icons} alt={social.Title} width={51} height={51} />
      </Link>
    </li>
  )
}
