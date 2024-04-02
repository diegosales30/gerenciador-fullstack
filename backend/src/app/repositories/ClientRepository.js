import connection from "../database/connection.js";


class ClientRepositoy {

  create(cliente) {
    const sql = "INSERT INTO clientes SET ?;"
    return new Promise((resolve, reject) => {
      connection.query(sql, cliente, (erro, result) => {
        if(erro) return reject('Não foi possivel cadastrar!');

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      })
    }) 
  };

  findAll() {
    const sql = "SELECT * FROM clientes"

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if(err) return reject(err);

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    })
  };

  findById(id) {
    const sql = `SELECT * FROM clientes WHERE id=?;`
    return new Promise((resolve, reject) => {
      connection.query(sql, id, (erro, result) => {
        if(erro) return reject('Cliente Não localizado!');

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      })
    })
  };

  update(cliente, id) {
  const sql = "UPDATE clientes SET ? WHERE id=?;"
  return new Promise((resolve, reject) => {
    connection.query(sql, [cliente, id], (erro, result) => {
      if(erro) return reject(erro);

      const row = JSON.parse(JSON.stringify(result));
      return resolve(row);
    })
  })
  };

  delete(id) {
  const sqlSelect = `SELECT * FROM clientes WHERE id=?;`;
  const sqlDelete = `DELETE FROM clientes WHERE id=?;`;
  
  return new Promise((resolve, reject) => {
      // Verifica se o cliente existe antes de tentar excluir
      connection.query(sqlSelect, id, (selectError, selectResult) => {
          if (selectError) {
              return reject(selectError);
          }
          
          if (selectResult.length === 0) {
              return reject('Cliente com o ID fornecido não encontrado.');
          }

          // Se o cliente existir, então executa a exclusão
          connection.query(sqlDelete, id, (deleteError, deleteResult) => {
              if (deleteError) {
                  return reject(deleteError);
              }

              const row = JSON.parse(JSON.stringify(deleteResult));
              return resolve(row);
          });
      });
  });
  };

}

export default new ClientRepositoy();