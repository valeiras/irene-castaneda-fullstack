/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { PublicationEditor } from '../components/Admin';

import {
  IFetchPublications,
  IFetchPublicationTypes,
  IPublicationType,
  IPublication,
  IFetchAuthors,
} from '../utils/Interfaces';

export const loader = async () => {
  try {
    const {
      data: { publicationTypes },
    } = await customFetch<IFetchPublicationTypes>('/publications/types');

    const {
      data: { publications },
    } = await customFetch<IFetchPublications>('publications');

    const {
      data: { authors },
    } = await customFetch<IFetchAuthors>('authors');

    return { publicationTypes, publications, authors };
  } catch (error) {
    return error;
  }
};

const AdminPublications: React.FC = () => {
  const { publicationTypes, publications } = useLoaderData() as {
    publicationTypes: IPublicationType[];
    publications: IPublication[];
  };

  return (
    <Wrapper className="AdminPublications hero-container">
      <h1>Publications</h1>
      <div className="publications-container">
        {publicationTypes.map(({ type, label }) => {
          const publicationsCurrentType = publications.filter((pub) => {
            return pub.publicationType === type;
          });

          return (
            <div key={type}>
              <h3>{label}:</h3>
              {publicationsCurrentType?.map((pub) => {
                return <PublicationEditor publication={pub} key={pub._id} />;
              })}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default AdminPublications;

const Wrapper = styled.div`
  gap: 1rem;

  .publications-container {
    border: 1px solid red;
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
  }
`;
