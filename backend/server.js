// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Criar cliente
app.post('/clients', async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefone]
    );
    res.status(201).json({ id: result.insertId, nome, email, telefone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

// Listar clientes
app.get('/clients', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes ORDER BY criado_em DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

// Criar pedido
app.post('/orders', async (req, res) => {
  const { cliente_id, descricao, valor } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO pedidos (cliente_id, descricao, valor, data_pedido) VALUES (?, ?, ?, ?)',
      [cliente_id, descricao, valor, new Date()]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

// Listagem dos pedidos com dados do cliente (JOIN)
app.get('/orders', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.descricao, p.valor, p.data_pedido, c.id AS cliente_id, c.nome, c.email
       FROM pedidos p
       JOIN clientes c ON p.cliente_id = c.id
       ORDER BY p.data_pedido DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

// Resumo por cliente com total gasto (GROUP BY)
app.get('/orders/summary', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.nome, c.email, COUNT(p.id) AS num_pedidos, IFNULL(SUM(p.valor),0) AS total_gasto
       FROM clientes c
       LEFT JOIN pedidos p ON p.cliente_id = c.id
       GROUP BY c.id, c.nome, c.email
       ORDER BY total_gasto DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no banco de dados' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
