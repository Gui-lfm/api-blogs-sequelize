const { displayNameSchema } = require('./schema');

module.exports = (req, res, next) => {
  const { displayName } = req.body;

  const { error } = displayNameSchema.validate(displayName);

  if (error) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};
