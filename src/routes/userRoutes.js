import * as userController from '../controllers/userController.js';
import express from 'express';
import { authMiddleware, verificaFuncionario } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
//usuário deve estar logado e ser funcionário
router.get('/',authMiddleware, verificaFuncionario, userController.getAllUsers);
router.get('/:id', authMiddleware, verificaFuncionario, userController.getUserById);
export default router;