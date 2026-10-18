import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, loginUser } from '../../controller/users_controller';
import authUser from '../../middlewares/users/user_auth';

const router: Router = express.Router();

//POST
router.post('/post', authUser, createUser)

//LOGIN (pubblica)
router.post('/login', loginUser)

//GETALL
router.get('/get', authUser, getAllUsers)

//GETBYID
router.get('/get/:id', authUser, getUserById)

//UPDATE
router.put('/edit/:id', authUser, updateUser)

//DELETE
router.delete('/delete/:id', authUser, deleteUser)

export default router
