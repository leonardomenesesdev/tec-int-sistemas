const express = require('express');
const router = express.Router();
const { register, getAllveiculos, getveiculoByplaca, updateVeiculoController, deleteVeiculoController } = require('../controllers/veiculoController.js');
const { authenticateToken, authorizeEmployee } = require('../middlewares/auth.js');

router.post('/veiculos', authenticateToken, authorizeEmployee, register);
router.get('/veiculos', authenticateToken, getAllveiculos);
router.get('/veiculos/:placa', authenticateToken, getveiculoByplaca);
router.put('/veiculos/:placa', authenticateToken, authorizeEmployee, updateVeiculoController);
router.delete('/veiculos/:placa', authenticateToken, authorizeEmployee, deleteVeiculoController);

module.exports = router;