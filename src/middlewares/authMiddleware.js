import jwt from 'jsonwebtoken';
import {prisma} from '../config/prisma.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};

export const verificaFuncionario = (req, res, next) => {
    if (!req.user.isFuncionario) {
        return res.status(403).json({ error: 'Acesso negado. Usuário não é funcionário' });
    }
    next();
};