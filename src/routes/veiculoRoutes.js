import express from 'express';
import { register, getAllveiculos, getveiculoByplaca, updateVeiculoController, deleteVeiculoController } from '../controllers/veiculoController.js';
import { authMiddleware, verificaFuncionario } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, verificaFuncionario, register);
router.get('/', authMiddleware, getAllveiculos);
router.get('/:placa', authMiddleware, getveiculoByplaca);
router.put('/:placa', authMiddleware, verificaFuncionario, updateVeiculoController);
router.delete('/:placa', authMiddleware, verificaFuncionario, deleteVeiculoController);

export default router;