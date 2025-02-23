// Importações
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicialização do app
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Libera o FrontEnd
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/simulalarcred', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Esquema do Mongoose
const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tipoPessoa: { type: String, enum: ['Física', 'Jurídica'], required: true },
    tipoImovel: { type: String, required: true },
    valorImovel: { type: Number, required: true },
    localizacao: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rotas
app.post('/api/users', async (req, res) => {
    try {
        const novoUsuario = new User(req.body);
        await novoUsuario.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!', data: novoUsuario });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário.', error });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.', error });
    }
});

// Rota de teste
app.get('/api/teste', (req, res) => {
    res.json({ message: "BackEnd conectado com sucesso!" });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
