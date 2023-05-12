const { passwordSchema } = require('./schema');

module.exports = (req, res, next) => {
  const { password } = req.body;

  const { error } = passwordSchema.validate(password);

  if (error) {
    return res
      .status(400)
      .json({
        message: '"password" length must be at least 6 characters long',
      });
  }

  next();
};
