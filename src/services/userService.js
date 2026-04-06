import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//CREATE
export const register = async(userJson) => {
    const { email, password, name, dataNascimento, isFuncionario, matricula } = userJson;

    const alreadyExists = await prisma.user.findUnique({ where: { email } });
    if (alreadyExists) {
        throw new Error('Usuário já existe');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword,
            dataNascimento: new Date(dataNascimento),
            isFuncionario: isFuncionario ?? false,
            matricula: matricula ?? null,
        }
    });
}

export const login = async(userJson) => {
    const {email, password} = userJson;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Senha inválida');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { email: user.email, token };
}

//READ
export const getAllUsers = async() => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            dataNascimento: true,
            isFuncionario: true
        }
    });
}

export const getUserById = async(id) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            dataNascimento: true,
            isFuncionario: true
        }
    });
}

//UPDATE - editar usuário
export const updateFuncionario = async (id, userJson) => {
    // Note que NÃO desestruturamos o 'password' aqui
    const { name, email, dataNascimento, isFuncionario, matricula } = userJson;
    
    return await prisma.user.update({
        where: { id: Number(id) },
        data: {
            name,
            email,
            isFuncionario,
            matricula,
            dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined
        },
        select: { id: true, name: true, email: true }
    });
};

export const updateCliente = async (id, userJson) => {
    const { name, email, dataNascimento } = userJson;
    
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (dataNascimento) data.dataNascimento = new Date(dataNascimento);

    return await prisma.user.update({
        where: { id: Number(id) },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            dataNascimento: true
        }
    });
};

export const updatePassword = async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    return await prisma.user.update({
        where: { id: Number(id) },
        data: { password: hashedPassword }
    });
};

//DELETE
export const deleteUser = async(id) => {
    return await prisma.user.delete({ where: { id: Number(id) } });
}