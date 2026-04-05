const jwt = require('jsonwebtoken');
const { prisma } = require('../config/prisma.js');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de acesso não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        try {
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });
};

const authorizeEmployee = (req, res, next) => {
    if (!req.user.isFuncionario) {
        return res.status(403).json({ message: 'Acesso negado: somente funcionários podem criar registros de veículos' });
    }
    next();
};

module.exports = { authenticateToken, authorizeEmployee };