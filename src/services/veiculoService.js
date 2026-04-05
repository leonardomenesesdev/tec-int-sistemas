const { prisma } = require('../config/prisma.js');

//CREATE
const register = async(veiculoJson) => {
    const { placa, modelo, marca,ano,cor,quilometragem,isAutomatico,isDisponivel,tipo  } = veiculoJson;

    const alreadyExists = await prisma.veiculo.findUnique({ where: { placa } });
    if (alreadyExists) {
        throw new Error('veículo já registrado');
    }
    if (!tipo){
        throw new Error("esse tipo de veiculo não pode ser cadastrado");
    }


    return await prisma.veiculo.create({
        data: {
            placa,
            modelo,
            marca,
            ano,
            cor,
            quilometragem,
            tipo,
            isAutomatico,
            isDisponivel,
        }
    });
}
//READ
const getAllveiculos = async() => {
    return await prisma.veiculo.findMany({
        select: {
             placa:true,
            modelo:true,
            marca:true,
            ano:true,
            cor:true,
            quilometragem:true,
            tipo:true,
            isAutomatico:true,
            isDisponivel:true,
        }
    });
}

const getveiculoByplaca = async(placa) => {
    return await prisma.veiculo.findUnique({
        where: { placa },
        select: { 
            placa:true,
            modelo:true,
            marca:true,
            ano:true,
            cor:true,
            quilometragem:true,
            tipo:true,
            isAutomatico:true,
            isDisponivel:true,
        }
    });
}

//UPDATE - editar veículo
const updateVeiculo = async (placa, veiculoJson, user) => {
    if (!user || !user.isFuncionario) {
        throw new Error('Acesso negado: somente funcionários podem atualizar veículos');
    }

    const {  modelo, marca, ano, cor, quilometragem, tipo, isAutomatico, isDisponivel } = veiculoJson;
       
    const data = {};
    if (modelo !== undefined) data.modelo = modelo;
    if (marca !== undefined) data.marca = marca;
    if (ano !== undefined) data.ano = ano;
    if (cor !== undefined) data.cor = cor;
    if (quilometragem !== undefined) data.quilometragem = quilometragem;
    if (tipo !== undefined) data.tipo = tipo;
    if (isAutomatico !== undefined) data.isAutomatico = isAutomatico;
    if (isDisponivel !== undefined) data.isDisponivel = isDisponivel;

    if (Object.keys(data).length === 0) {
        throw new Error('Nenhum campo para atualizar');
    }

    return await prisma.veiculo.update({
        where: { placa },
        data,
    });
};

//DELETE
const deleteveiculo = async(placa) => {
    return await prisma.veiculo.delete({ where: { placa } });
}

module.exports = { register, getAllveiculos, getveiculoByplaca, updateVeiculo, deleteveiculo };