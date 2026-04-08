import './env.js';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import veiculoRoutes from './routes/veiculoRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/veiculos', veiculoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});