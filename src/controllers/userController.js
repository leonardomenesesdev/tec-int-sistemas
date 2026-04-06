import * as userService from '../services/userService.js';

export const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }  
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    const userLogado = req.user; // Vindo do middleware de autenticação

    try {
        let updatedUser;
        
        if (userLogado.isFuncionario) {
            updatedUser = await userService.updateFuncionario(id, req.body);
        } else {
            updatedUser = await userService.updateCliente(id, req.body);
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const changePassword = async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'A nova senha deve ter pelo menos 6 caracteres.' });
    }

    try {
        await userService.updatePassword(id, newPassword);
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar alteração de senha.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id);
        res.status(204).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};