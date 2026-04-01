const db = require('./db');

async function checkDatabase() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('Conectado com sucesso! Hora no servidor:', res.rows[0].now);
  } catch (err) {
    console.error('Erro ao conectar ao Neon:', err);
  }
}

checkDatabase();