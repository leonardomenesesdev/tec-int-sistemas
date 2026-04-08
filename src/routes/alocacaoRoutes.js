import express from 'express';
import {
  register,
  getAllAlocacoes,
  getAlocacaoById,
  getAlocacoesByCliente,
  getAlocacoesAtivas,
  devolverVeiculo,
  updateAlocacao,
  deleteAlocacao,
} from '../controllers/alocacaoController.js';
import { authMiddleware, verificaFuncionario } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, register);
router.get('/', authMiddleware, verificaFuncionario, getAllAlocacoes);
router.get('/ativas', authMiddleware, verificaFuncionario, getAlocacoesAtivas);
router.get('/cliente/:clienteId', authMiddleware, verificaFuncionario, getAlocacoesByCliente);
router.get('/:id', authMiddleware, verificaFuncionario, getAlocacaoById);
router.patch('/:id/devolucao', authMiddleware, verificaFuncionario, devolverVeiculo);
router.put('/:id', authMiddleware, verificaFuncionario, updateAlocacao);
router.delete('/:id', authMiddleware, verificaFuncionario, deleteAlocacao);

export default router;