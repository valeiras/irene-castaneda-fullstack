import styled from 'styled-components';
import { IContactLink } from '../utils/types';

const ContactLinks: React.FC<{ links: IContactLink[]; hasName: boolean }> = ({
  links,
  hasName = false,
}) => {
  return (
    <Wrapper className="ContactLinks">
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
    </Wrapper>
  );
};
export default ContactLinks;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-items: center;
  align-items: flex-start;
  font-size: 1.2rem;

  .single-link {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .link-icon {
    font-size: 1.5rem;
    transition: var(--transform-transition);
  }

  .link-icon:hover {
    transform: scale(1.05);
  }
`;
