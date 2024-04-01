import { Router } from "express";
import UsersControllers from "./app/controllers/UsersControllers.js";

const router = Router();

//LIST ALL USERS
router.get('/', UsersControllers.findAll)

//REGISTER USER
router.post("/register",  UsersControllers.store);

//LOGIN USER
router.post("/login", UsersControllers.login);

export default router;