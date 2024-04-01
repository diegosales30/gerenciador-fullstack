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
              const row = JSON.parse(JSON.stringify(response));
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

  login(email, password) {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (error, result) => {
        if (error) return reject(error);
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) return reject(err);
            if (response) {
              // Se a senha está correta, retornamos o usuário
              const user = result[0];
              delete user.password; // Não envie a senha de volta
              const row = JSON.parse(JSON.stringify(user));
              return resolve(row);  
            } else {
              // Se a senha está incorreta, rejeitamos com uma mensagem de erro
              return reject(new Error("Senha incorreta"));
            }
          });
        } else {
          // Se o usuário não está registrado, rejeitamos com uma mensagem de erro
          return reject(new Error("Usuário não registrado"));
        }
      });
    });
  }
  
  findAll() {
    const sql = "SELECT * FROM usuarios"

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if(err) return reject(err);

        const row = JSON.parse(JSON.stringify(result));
        return resolve(row);
      });
    })
      
  };
}

export default new UserRepository();