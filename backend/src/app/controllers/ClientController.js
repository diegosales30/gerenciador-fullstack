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
  //Atualiza cliente pelo ID
  async update(req, res) {
    const cliente = req.body;
    const id = req.params.id;
    try {
        const rowCliente = await ClientRepository.update(cliente, id);
        res.status(200).json({ message: "Cliente atualizado com sucesso!", rowCliente });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o cliente", error });
    }
  }
  //Deleta cliente pelo ID
  async delete(req, res) {
    const id = req.params.id;
    try {
        const rowCliente = await ClientRepository.delete(id);
        res.status(200).json({ message: "Cliente deletado com sucesso!", rowCliente });
    } catch (error) {
        res.status(500).json({ message: "Cliente não existe ou já foi excluido!", error });
    }
  };

}

export default new ClientController();