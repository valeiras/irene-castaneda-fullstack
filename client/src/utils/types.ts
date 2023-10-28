export interface IPublication {
  title: string;
  year: string;
  authorIds: string[];
  journal: string;
  pages?: string;
  link?: string;
  isNew?: boolean;
  publicationType: string;
  _id: string;
}

export interface IPublicationType {
  type: string;
  label: string;
}

export interface IAuthor {
  name: string;
  link?: string;
  highlighted: boolean;
  _id: string;
}

export interface IProject {
  name: string;
  description: string;
  cloudinaryUrl: string;
  _id: string;
}

export interface IFetchPublications {
  publications: IPublication[];
}

export interface IFetchPublicationTypes {
  publicationTypes: IPublicationType[];
}

export interface IFetchAuthors {
  authors: IAuthor[];
}

export interface IFetchProjects {
  projects: IProject[];
}

export type ActionFunctionReturn = ({
  request,
}: {
  request: Request;
}) => Promise<unknown>;

export type LoaderFunctionReturn = () => Promise<unknown>;
