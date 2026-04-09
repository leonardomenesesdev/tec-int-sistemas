import './env.js';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
import alocacaoRoutes from './routes/alocacaoRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
    res.send('Olá, mundo!');
});
app.use('/api/users', userRoutes);
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/alocacoes', alocacaoRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});