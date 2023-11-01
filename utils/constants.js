export const PUBLICATION_TYPES = {
  PUBLICATION: 'publication',
  PUBLICATION_IN_FRENCH: 'publicationInFrench',
  ORAL_COMMUNICATION: 'oralCommunication',
  POSTER: 'poster',
};

export const TUTORING_TYPES = {
  TEACHING: 'teaching',
  PHD: 'phd',
  MASTER: 'master',
  UNDERGRADUATE: 'undergraduate',
};

export const typesToLabels = {
  [PUBLICATION_TYPES.PUBLICATION]: 'Publications',
  [PUBLICATION_TYPES.PUBLICATION_IN_FRENCH]: 'Publications in French',
  [PUBLICATION_TYPES.ORAL_COMMUNICATION]: 'Oral Communications',
  [PUBLICATION_TYPES.POSTER]: 'Posters',
  [TUTORING_TYPES.TEACHING]: 'Teaching',
  [TUTORING_TYPES.PHD]: 'PhD Students',
  [TUTORING_TYPES.MASTER]: 'Master Students',
  [TUTORING_TYPES.UNDERGRADUATE]: 'Undergraduate Students',
};
