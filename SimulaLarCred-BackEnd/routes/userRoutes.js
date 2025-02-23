const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota GET para buscar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
});

module.exports = router;
