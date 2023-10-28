/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { IPublication } from '../../utils/types';
import { AuthorsList } from '.';

const PublicationTypeList: React.FC<{
  label: string;
  publications: IPublication[];
}> = ({ label, publications }) => {
  return (
    <Wrapper className="PublicationTypeList">
      <h3>{label}:</h3>
      <ol reversed className="type-container">
        {publications.map((pub) => {
          return (
            <li className="publication" key={pub._id}>
              <AuthorsList publication={pub} />
              {`(${pub.year}). `}
              {pub.link ? (
                <a
                  href={pub.link}
                  target="_blank"
                  // ref="noreferrer"
                >{`${pub.title}. `}</a>
              ) : (
                `${pub.title}. `
              )}
              <span className="journal">{`${pub.journal}, `}</span>
              {`${pub.pages}.`}
            </li>
          );
        })}
      </ol>
    </Wrapper>
  );
};
export default PublicationTypeList;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  h3 {
    margin-bottom: 0.25rem;
  }

  ol.type-container {
    /* list-style-position: inside; */
  }

  li {
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .journal {
    font-style: italic;
  }
`;
