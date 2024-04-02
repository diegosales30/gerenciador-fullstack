import ClientRepository from "../repositories/ClientRepository.js";


class ClientController {

  //LISTAR TODOS OS CLIENTES JA CRIADOS
  async index(req, res) {
    const clientes = await ClientRepository.findAll();
    return res.status(200).json(clientes);
  };

  //mostrar pelo ID
  async show(req, res) {
    const id = req.params.id;
    const clientes = await ClientRepository.findById(id);
    if (clientes.length > 0) {
        const cliente = clientes[0];
        return res.status(200).json(cliente);
    } else {
        return res.status(404).json({ error: "Nenhum usuário encontrado" });
    }
  };

  //CRIAR NOVO CLIENTE -> LIKE A CREATE
  async store(req, res) {
    const cliente = req.body;
    const rowCliente = await ClientRepository.create(cliente)
    return res.status(201).json({ message: "Cliente cadastrado com sucesso!", rowCliente });
  };
  
  update(req, res) {};
  delete(req, res) {};

}

export default new ClientController();