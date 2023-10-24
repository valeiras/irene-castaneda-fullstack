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
    <div className="fullpage-container">
      <div className={heroClass}>{children}</div>
      <div className="full-line-container">
        <div></div>
        <ContactLinks
          links={[orcidLink, googleScholarLink, twitterLink, emailLink]}
          hasName={false}
        />
        <ThemeToggle />
      </div>
    </div>
  );
};
export default Fullpage;
