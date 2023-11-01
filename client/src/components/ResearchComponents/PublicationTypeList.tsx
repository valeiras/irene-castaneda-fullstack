/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { IPublication } from '../../utils/types';
import { AuthorsList } from '.';

const PublicationTypeList: React.FC<{
  label: string;
  publications: IPublication[];
}> = ({ label, publications }) => {
  return (
    <Wrapper className="PublicationTypeList type-list-container">
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
                  className="underline-on-hover"
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
  .journal {
    font-style: italic;
  }
`;
