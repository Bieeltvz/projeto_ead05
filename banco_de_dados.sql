CREATE USER 'gabriel' @'localhost' IDENTIFIED BY 'senha'
GRANT ALL PRIVILEGES ON *.* TO 'gabriel' @ 'localhost';
SELECT * FROM mysql.user;
CREATE DATABASE biblioteca;

CREATE DATABASE IF NOT EXISTS cadastrodb;
USE cadastrodb;

CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  descricao TEXT,
  valor DECIMAL(10,2) NOT NULL,
  data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

INSERT INTO clientes (nome, email, telefone) VALUES
('João Silva','joao@example.com','(48)99999-9999'),
('Maria Souza','maria@example.com','(48)98888-8888');

INSERT INTO pedidos (cliente_id, descricao, valor) VALUES
(1,'Pedido de teste A', 100.50),
(1,'Pedido de teste B', 50.00),
(2,'Pedido de teste C', 75.00);

SELECT * FROM clientes


