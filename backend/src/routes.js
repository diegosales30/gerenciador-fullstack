import { Router } from "express";
import UsersControllers from "./app/controllers/UsersControllers.js";
import ClientController from "./app/controllers/ClientController.js";

const router = Router();

/*ROTAS ADMIN USERS */
//LIST ALL USERS
router.get('/', UsersControllers.findAll)
//REGISTER USER
router.post("/register",  UsersControllers.store);
//LOGIN USER
router.post("/login", UsersControllers.login);

/*ROTAS CLIENTS */
//LISTAR TODOS OS CLIENTES
router.get("/client", ClientController.index);
//listar clientes pelo ID
router.get("/client/:id", ClientController.show);
//add clientes
router.post("/client", ClientController.store);
//update clientes
router.put("/client/:id", ClientController.update);
//delete clientes
router.delete("/client/:id", ClientController.delete)
export default router;
