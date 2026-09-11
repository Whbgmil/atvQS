const { arredondar } = require('./utils');

class Animal {
  constructor(id, nome, responsavel) {
    if (!nome || nome.trim() === '') {
      throw new Error('Nome do animal e obrigatorio');
    }

    this.id = id;
    this.nome = nome;
    this.responsavel = responsavel;
    this.atendimentos = [];
  }

  adicionarAtendimento(atendimento) {
    this.atendimentos.push(atendimento);
  }

  quantidadeAtendimentos() {
    return this.atendimentos.length;
  }

  totalGasto() {
    const total = this.atendimentos.reduce((soma, at) => soma + at.valorFinal, 0);
    return arredondar(total);
  }
}

module.exports = Animal;
