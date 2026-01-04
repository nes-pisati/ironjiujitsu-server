import express, { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../../controller/users_controller';
//psw encrypt

const router: Router = express.Router();

//POST
router.post('/post', createUser) //psw encrypt

//GETALL
router.get('/get', getAllUsers)

//GETBYID
router.get('/get/:id', getUserById)

//UPDATE
router.put('/edit/:id', updateUser)

//DELETE
router.delete('/delete/:id', deleteUser)