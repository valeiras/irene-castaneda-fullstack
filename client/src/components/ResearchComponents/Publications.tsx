import {
  emailLink,
  googleScholarLink,
  orcidLink,
} from '../../data/contactData';

const Publications: React.FC = () => {
  return (
    <div className="subsection-container">
      <h2 className="title">Publications:</h2>
      <div className="block-container">
        <p className="high-line">
          You can visit my profile on{' '}
          <a
            href={orcidLink.url}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Orcid
          </a>{' '}
          or{' '}
          <a
            href={googleScholarLink.url}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar
          </a>{' '}
        </p>
        <p className="high-line">
          Please{' '}
          <a
            href={emailLink.url}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            email me
          </a>{' '}
          for copies of papers.
        </p>
      </div>
    </div>
  );
};
export default Publications;
