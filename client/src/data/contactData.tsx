import { SiGooglescholar } from 'react-icons/si';
import { IContactLink } from '../utils/types';
import { FaOrcid, FaEnvelope, FaTwitter } from 'react-icons/fa';

export const address = [
  'Université de Bordeaux',
  'BIOGECO - UMR INRA 1202',
  'Bâtiment B2, Allée Geoffroy Saint-Hilaire',
  'CS 50023',
  'F-33615 Pessac cedex',
];

export const orcidLink: IContactLink = {
  name: 'Orcid',
  url: 'https://orcid.org/0000-0002-2490-2178',
  icon: <FaOrcid />,
  id: 1,
};

export const googleScholarLink: IContactLink = {
  name: 'Google Scholar',
  url: 'https://scholar.google.fr/citations?user=kcCaUWMAAAAJ',
  icon: <SiGooglescholar />,
  id: 2,
};

export const emailLink: IContactLink = {
  name: 'Email',
  url: 'mailto:irene.castaneda-gonzalez@u-bordeaux.fr',
  icon: <FaEnvelope />,
  id: 3,
};

export const twitterLink: IContactLink = {
  name: 'Twitter',
  url: 'https://twitter.com/i_castanedagonz',
  icon: <FaTwitter />,
  id: 4,
};
