import styled from 'styled-components';
import {
  emailLink,
  googleScholarLink,
  orcidLink,
} from '../../data/contactData';

const Publications: React.FC = () => {
  return (
    <Wrapper className="Publications subsection-container">
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
    </Wrapper>
  );
};
export default Publications;
const Wrapper = styled.div`
  .text-link {
    font-weight: 700;
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.2s ease-in-out;
  }

  .text-link:hover {
    text-decoration-color: inherit;
  }

  .high-line {
    line-height: 2;
  }
`;
