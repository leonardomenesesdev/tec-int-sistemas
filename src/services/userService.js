import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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