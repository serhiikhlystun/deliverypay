import SocialItem from './SocialItem';

export default function SocialList({ socials }) {
  return (
    <ul className="footer__social">
      {socials.map((social, index) => (
        <SocialItem key={index} social={social} />
      ))}
    </ul>
  );
}
