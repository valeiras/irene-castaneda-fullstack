import { IContactLink } from '../assets/ts/types';

const ContactLinks: React.FC<{ links: IContactLink[]; hasName: boolean }> = ({
  links,
  hasName = false,
}) => {
  return (
    <div className="contact-links-container">
      {links.map(({ name, url, icon, id }) => {
        return (
          <div className="single-link" key={id}>
            {hasName && `${name}:`}
            <a
              href={url}
              className="link-icon"
              target="_blank"
              rel="noreferrer"
            >
              {icon}
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default ContactLinks;
