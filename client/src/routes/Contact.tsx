import { ContactLinks, Fullpage } from '../components';
import {
  address,
  emailLink,
  googleScholarLink,
  orcidLink,
  twitterLink,
} from '../data/contactData';

const Contact: React.FC = () => {
  return (
    <Fullpage>
      <div className="block-container">
        <h4>Office Address:</h4>
        {address.map((line) => {
          return <p>{line}</p>;
        })}
      </div>
      <div className="block-container">
        <ContactLinks
          links={[orcidLink, googleScholarLink, emailLink, twitterLink]}
          hasName={true}
        />
      </div>
    </Fullpage>
  );
};
export default Contact;
