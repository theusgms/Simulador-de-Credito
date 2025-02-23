const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipoPessoa: { type: String, enum: ['Fisica', 'Juridica'], required: true },
  tipoImovel: { type: String, required: true },
  valorImovel: { type: Number, required: true },
  localizacao: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
