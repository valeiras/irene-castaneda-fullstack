import formidable from 'formidable';

export const formidableMiddleware = async (req, res, next) => {
  const formidableOptions = {
    filter: function ({ mimetype }) {
      return mimetype && mimetype.includes('image');
    },
  };
  const form = formidable(formidableOptions);

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    for (const [key, value] of Object.entries(fields)) {
      req.body[key] = value;
    }
    for (const [key, value] of Object.entries(files)) {
      req.body[key] = value;
    }
    next();
  });
};
