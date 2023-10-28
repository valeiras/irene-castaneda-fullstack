import { authorsQuery } from '../../utils/queries';
import { useQuery } from '@tanstack/react-query';
import { IPublication } from '../../utils/types';

const AuthorsList: React.FC<{ publication: IPublication }> = ({
  publication,
}) => {
  const { data: allAuthors } = useQuery(authorsQuery);
  if (!allAuthors) return <></>;

  return (
    <>
      {publication.authorIds.map((authorId, idx) => {
        const currAuthor = allAuthors.find(({ _id }) => {
          return _id === authorId;
        });
        return (
          <span style={currAuthor?.highlighted ? { fontWeight: '500' } : {}}>
            {idx < publication.authorIds.length - 2
              ? `${currAuthor?.name}, `
              : idx === publication.authorIds.length - 2
              ? `${currAuthor?.name} and `
              : `${currAuthor?.name} `}
          </span>
        );
      })}
    </>
  );
};
export default AuthorsList;
