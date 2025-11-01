import { Router } from 'express';

const userRouter = Router();

//Este retonna a todos los usuarios
userRouter.get('/', (req, res) => res.send({title: 'GET all users'}));

//Este a un usuario en especifico
userRouter.get('/:id', (req, res) => res.send({title: 'GET user details'}));

//Este sera para crear a un nuevo usuario
userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

//Este para actualizar un usuario
userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

//Este para eliminar a un usuario
userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;