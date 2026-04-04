import * as userController from '../controllers/userController.js';
import express from 'express';
import { authMiddleware, isFuncionarioOuCliente, onlyCurrentUser, verificaFuncionario } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
//usuário deve estar logado e ser funcionário
router.get('/',authMiddleware, verificaFuncionario, userController.getAllUsers);
router.get('/:id', authMiddleware, verificaFuncionario, userController.getUserById);

router.put('/funcionario/:id', authMiddleware, verificaFuncionario, userController.update);
router.put('/cliente/:id', authMiddleware, isFuncionarioOuCliente, userController.update);
router.patch('/:id/password', authMiddleware, onlyCurrentUser, userController.changePassword);
export default router;