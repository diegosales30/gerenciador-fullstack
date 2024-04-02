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
   update() {};
   delete() {};

}

export default new ClientRepositoy();