import styled from 'styled-components';
import {
  emailLink,
  googleScholarLink,
  orcidLink,
  twitterLink,
} from '../data/contactData';
import { ContactLinks } from './';

import ThemeToggle from './ThemeToggle';

const Fullpage: React.FC<{
  children: React.ReactNode;
  heroClass?: string;
}> = ({ children, heroClass = 'hero-container space-evenly' }) => {
  return (
    <Wrapper className="Fullpage">
      <div className={heroClass}>{children}</div>
      <div className="full-line-container">
        <div />
        <ContactLinks
          links={[orcidLink, googleScholarLink, twitterLink, emailLink]}
          hasName={false}
        />
        <ThemeToggle />
      </div>
    </Wrapper>
  );
};
export default Fullpage;
const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100dvh - var(--height-navbar));
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .full-line-container {
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    font-size: 2rem;
  }
`;
