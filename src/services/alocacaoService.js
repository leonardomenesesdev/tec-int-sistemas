import { prisma } from '../config/prisma.js';

// CREATE
export const register = async (alocacaoJson, user) => {
  const { placa, dataAlocacao, dataDevolucao, valorTotal } = alocacaoJson;

  const veiculo = await prisma.veiculo.findUnique({
    where: { placa },
    select: {
      id: true,
      placa: true,
      modelo: true,
      marca: true,
      isDisponivel: true,
    },
  });

  if (!veiculo) {
    throw new Error('Veículo não encontrado');
  }

  if (!veiculo.isDisponivel) {
    throw new Error('Veículo não disponível para alocação');
  }

  const isAlocacaoAtiva = await prisma.alocacao.findFirst({
    where: {
      clienteId: user.id,
      isAtiva: true,
    },
  });

  if (isAlocacaoAtiva) {
    throw new Error('Usuário já possui uma alocação ativa');
  }

  const alocacao = await prisma.alocacao.create({
    data: {
      clienteId: user.id,
      veiculoId: veiculo.id,
      dataAlocacao: new Date(dataAlocacao),
      dataDevolucao: dataDevolucao ? new Date(dataDevolucao) : null,
      valorTotal,
      isAtiva: true,
    },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
        },
      },
    },
  });

  await prisma.veiculo.update({
    where: { id: veiculo.id },
    data: { isDisponivel: false },
  });

  return alocacao;
};

// READ
export const getAllAlocacoes = async () => {
  return await prisma.alocacao.findMany({
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
          isDisponivel: true,
        },
      },
    },
  });
};

export const getAlocacaoById = async (id) => {
  return await prisma.alocacao.findUnique({
    where: { id: Number(id) },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
          isDisponivel: true,
        },
      },
    },
  });
};

export const getAlocacoesByCliente = async (clienteId) => {
  return await prisma.alocacao.findMany({
    where: { clienteId: Number(clienteId) },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
          isDisponivel: true,
        },
      },
    },
  });
};

export const getAlocacoesAtivas = async () => {
  return await prisma.alocacao.findMany({
    where: { isAtiva: true },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
          isDisponivel: true,
        },
      },
    },
  });
};

// DEVOLUÇÃO
export const devolverVeiculo = async (id) => {
  const alocacao = await prisma.alocacao.findUnique({
    where: { id: Number(id) },
  });

  if (!alocacao) {
    throw new Error('Alocação não encontrada');
  }

  if (!alocacao.isAtiva) {
    throw new Error('Essa alocação já foi encerrada');
  }

  const alocacaoAtualizada = await prisma.alocacao.update({
    where: { id: Number(id) },
    data: {
      isAtiva: false,
      dataDevolucao: new Date(),
    },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
        },
      },
    },
  });

  await prisma.veiculo.update({
    where: { id: alocacao.veiculoId },
    data: { isDisponivel: true },
  });

  return alocacaoAtualizada;
};

// UPDATE
export const updateAlocacao = async (id, alocacaoJson) => {
  const { dataAlocacao, dataDevolucao, valorTotal } = alocacaoJson;

  const alocacaoExistente = await prisma.alocacao.findUnique({
    where: { id: Number(id) },
  });

  if (!alocacaoExistente) {
    throw new Error('Alocação não encontrada');
  }

  return await prisma.alocacao.update({
    where: { id: Number(id) },
    data: {
      dataAlocacao: dataAlocacao ? new Date(dataAlocacao) : undefined,
      dataDevolucao: dataDevolucao ? new Date(dataDevolucao) : undefined,
      valorTotal: valorTotal !== undefined ? valorTotal : undefined,
    },
    include: {
      cliente: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      veiculo: {
        select: {
          id: true,
          placa: true,
          modelo: true,
          marca: true,
        },
      },
    },
  });
};

// DELETE
export const deleteAlocacao = async (id) => {
  const alocacao = await prisma.alocacao.findUnique({
    where: { id: Number(id) },
  });

  if (!alocacao) {
    throw new Error('Alocação não encontrada');
  }

  if (alocacao.isAtiva) {
    await prisma.veiculo.update({
      where: { id: alocacao.veiculoId },
      data: { isDisponivel: true },
    });
  }

  return await prisma.alocacao.delete({
    where: { id: Number(id) },
  });
};