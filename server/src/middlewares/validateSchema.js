export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    });
  }
};
