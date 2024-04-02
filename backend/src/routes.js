import { Router } from "express";
import UsersControllers from "./app/controllers/UsersControllers.js";
import ClientController from "./app/controllers/ClientController.js";

const router = Router();

//LIST ALL USERS
router.get('/', UsersControllers.findAll)

//REGISTER USER
router.post("/register",  UsersControllers.store);

//LOGIN USER
router.post("/login", UsersControllers.login);


//LISTAR TODOS OS CLIENTES
router.get("/client", ClientController.index);
//listar clientes pelo ID
router.get("/client/:id", ClientController.show);
//add clientes
router.post("/client", ClientController.store);

export default router;
