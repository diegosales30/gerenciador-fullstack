import connection from "../database/connection.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

class UserRepository {

  create(email, password) {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (error, result) => {
        if (error) return reject(error);
        if (result.length == 0) {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            connection.query("INSERT INTO usuarios (email, password) VALUE (?,?)",[email, hash],(error, response) => {
              if (error) return reject(error);
              // Se chegou aqui, significa que o usuário foi inserido com sucesso
              const row = JSON.parse(JSON.stringify(result));
              return resolve(row);
            });
          });
        } else {
          // Se o e-mail já existe, rejeitamos a promessa com uma mensagem de erro personalizada
          return reject(new Error("E-mail já cadastrado"));
        }
      });
    });
  };

  update() {};
  findAll() {};
}

export default new UserRepository();