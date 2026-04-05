const veiculoService = require('../services/veiculoService.js');

const register = async (req, res) => {
    try {
        const veiculo = await veiculoService.register(req.body);
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllveiculos = async (req, res) => {
    try {
        const veiculos = await veiculoService.getAllveiculos();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }  
};
const getveiculoByplaca = async (req, res) => {
    try {
        const veiculo = await veiculoService.getveiculoByplaca(req.params.placa);
        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado' });
        }
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateVeiculoController = async (req, res) => {
    try {
        const veiculo = await veiculoService.updateVeiculo(req.params.placa, req.body, req.user);
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteVeiculoController = async (req, res) => {
    try {
        const veiculo = await veiculoService.deleteveiculo(req.params.placa);
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, getAllveiculos, getveiculoByplaca, updateVeiculoController, deleteVeiculoController };