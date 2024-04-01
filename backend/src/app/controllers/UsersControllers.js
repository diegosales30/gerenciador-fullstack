import UsersRepository from "../repositories/UsersRepository.js";


class UsersController {

  async findAll(req, res) {
    const user = await UsersRepository.findAll()
    return res.status(200).json(user)
  }

  async store(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UsersRepository.create(email, password);
      // Se chegou aqui, significa que o usuário foi criado com sucesso
      return res.status(201).json({ message: "E-mail cadastrado com sucesso", user });
    } catch (error) {
      // Se houve algum erro ao criar o usuário, retornamos a mensagem de erro
      return res.status(400).json({ error: error.message });
    }
  }
  
  async login(req, res) {
    const {email, password} = req.body;
    try {
      const user = await UsersRepository.login(email, password);
      return res.status(200).json({ message: "Usuário logado", user });
    } catch (error) {
      return res.status(400).json({error: error.message });
    }
  }

}

export default new UsersController();