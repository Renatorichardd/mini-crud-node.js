// Mini CRUD em Node.js com Express
// ----------------------------------
// Objetivo: criar um CRUD de "usuários" com rotas para criar, listar, atualizar e deletar
// Os dados serão armazenados em memória (array) para simplificar

const express = require('express'); // importa o framework Express
const app = express(); // cria uma instância do app
console.log("O arquivo index.js está sendo executado!");
const PORT = 3000; // define a porta do servidor

app.use(express.json()); // habilita o uso de JSON no body das requisições

// Banco de dados fake (em memória)
let users = []; // array de usuários
let idCounter = 1; // contador para gerar IDs únicos

// Rota: Criar usuário (CREATE)
app.post('/users', (req, res) => {
  const { name, email } = req.body; // extrai nome e email do corpo da requisição

  const newUser = {
    id: idCounter++,
    name,
    email
  };

  users.push(newUser); // adiciona no array
  res.status(201).json(newUser); // retorna o novo usuário criado
});

// Rota: Listar todos os usuários (READ)
app.get('/users', (req, res) => {
  res.json(users); // retorna o array completo
});

// Rota: Buscar usuário por ID (READ)
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id); // pega o ID da URL e converte pra número
  const user = users.find(u => u.id === id); // busca o usuário no array

  if (user) {
    res.json(user); // retorna o usuário encontrado
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Rota: Atualizar usuário (UPDATE)
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { id, name, email }; // atualiza os dados
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Rota: Deletar usuário (DELETE)
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id); // remove o usuário do array
  res.json({ message: 'Usuário deletado com sucesso' });
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
