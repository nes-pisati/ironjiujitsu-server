import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, loginUser } from '../../controller/users_controller';

const router: Router = express.Router();

//POST
//POST
router.post('/post', createUser)

//LOGIN
router.post('/login', loginUser)

//GETALL
router.get('/get', getAllUsers)

//GETBYID
router.get('/get/:id', getUserById)

//UPDATE
router.put('/edit/:id', updateUser)

//DELETE
router.delete('/delete/:id', deleteUser)

export default router