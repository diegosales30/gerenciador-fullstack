import { Router } from "express";
import bcrypt from 'bcrypt';
import connection from "./app/database/connection.js";
import UsersControllers from "./app/controllers/UsersControllers.js";

//const saltRounds = 10;

const router = Router();


//REGISTER USER
router.post("/register",  UsersControllers.store);

// (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const sql = "SELECT * FROM usuarios WHERE email = ?"

//   connection.query(sql, [email], (err, result) => {
//     if (err) {
//       res.send(err);
//     }
//     if (result.length == 0) {
//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         connection.query(
//           "INSERT INTO usuarios (email, password) VALUE (?,?)",
//           [email, hash],
//           (error, response) => {
//             if (err) {
//               res.send(err);
//             }

//             res.send({ msg: "Usuário cadastrado com sucesso" });
//           }
//         );
//       });
//     } else {
//       res.send({ msg: "Email já cadastrado" });
//     }
//   });
// }

//LOGIN USER
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = "SELECT * FROM usuarios WHERE email = ?"
  connection.query(sql, [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

//LIST ALL REGISTER USER
router.get('/', (req, res) => {
  const sql = "SELECT * FROM usuarios"
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result)
  });
})



export default router;