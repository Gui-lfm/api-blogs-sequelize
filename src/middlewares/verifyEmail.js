const { UserService } = require('../services');

const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

module.exports = async (req, res, next) => {
  const { email } = req.body;

  if (!validEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const alreadyExists = await UserService.getUserByEmail(email);
  if (alreadyExists) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};
