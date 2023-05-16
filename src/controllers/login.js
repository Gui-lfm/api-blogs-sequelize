const { UserService } = require('../services');
const { createToken } = require('../auth/authFunctions');

const verifyBody = (email, password) => email && password;

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verificando se campos foram devidamente preenchidos
    if (!verifyBody(email, password)) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing' });
    }

    const user = await UserService.getUserByEmail(email);
    // verifica se os dados enviados estão errados ou inexistentes
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    // desconstruindo o objeto usuário, gerando assim um novo objeto de usuário sem o atributo
    // password, o novo objeto será usado na geração do token
    const { password: _password, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);

    return res.status(200).json({ token });
  } catch (error) {
    return res
      .status(500).json({ message: 'Erro de servidor', error: error.message });
  }
};
