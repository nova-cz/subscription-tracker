import { Router } from 'express';
import {getUser, getUsers} from "../controllers/user.controller.js";

const userRouter = Router();

//Este retonna a todos los usuarios
userRouter.get('/', getUsers);

//Este a un usuario en especifico
userRouter.get('/:id', getUser);

//Este sera para crear a un nuevo usuario
userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

//Este para actualizar un usuario
userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

//Este para eliminar a un usuario
userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;