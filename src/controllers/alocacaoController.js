import * as alocacaoService from '../services/alocacaoService.js';

export const register = async (req, res) => {
  try {
    const alocacao = await alocacaoService.register(req.body, req.user);
    res.status(201).json(alocacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAlocacoes = async (req, res) => {
  try {
    const alocacoes = await alocacaoService.getAllAlocacoes();
    res.status(200).json(alocacoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAlocacaoById = async (req, res) => {
  try {
    const alocacao = await alocacaoService.getAlocacaoById(req.params.id);

    if (!alocacao) {
      return res.status(404).json({ error: 'Alocação não encontrada' });
    }

    res.status(200).json(alocacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAlocacoesByCliente = async (req, res) => {
  try {
    const alocacoes = await alocacaoService.getAlocacoesByCliente(req.params.clienteId);
    res.status(200).json(alocacoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAlocacoesAtivas = async (req, res) => {
  try {
    const alocacoes = await alocacaoService.getAlocacoesAtivas();
    res.status(200).json(alocacoes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const devolverVeiculo = async (req, res) => {
  try {
    const alocacao = await alocacaoService.devolverVeiculo(req.params.id);
    res.status(200).json(alocacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAlocacao = async (req, res) => {
  try {
    const alocacao = await alocacaoService.updateAlocacao(req.params.id, req.body);
    res.status(200).json(alocacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAlocacao = async (req, res) => {
  try {
    const alocacao = await alocacaoService.deleteAlocacao(req.params.id);
    res.status(200).json({ message: 'Alocação deletada com sucesso!', alocacao });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};