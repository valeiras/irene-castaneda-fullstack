const getFormDataFromObject: (obj: object) => FormData = (obj) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value);
  }
  return formData;
};

export default getFormDataFromObject;
