const { arredondar } = require('./utils');

const TIPOS_ATENDIMENTO = {
  ROTINA: { valor: 100.00 },
  URGENCIA: { valor: 180.00 },
  EMERGENCIA: { valor: 250.00 },
};

class Atendimento {
  constructor(tipo, procedimentosAdicionais = [], data = new Date()) {
    const tipoNormalizado = (tipo || '').toUpperCase();

    if (!TIPOS_ATENDIMENTO[tipoNormalizado]) {
      throw new Error(
        'Tipo de atendimento invalido: "${tipo}". Use rotina, urgencia ou emergencia.'
      );
    }

    this.tipo = tipoNormalizado.toLowerCase();
    this.valorBase = TIPOS_ATENDIMENTO[tipoNormalizado].valor;
    this.procedimentosAdicionais = [];
    this.desconto = 0;
    this.data = data;

    procedimentosAdicionais.forEach((valor) => this.adicionarProcedimento(valor));
  }

  adicionarProcedimento(valor) {
    if (valor <= 0) {
      throw new Error('Valor do procedimento deve ser maior que zero');
    }
    this.procedimentosAdicionais.push(valor);
  }

  aplicarDesconto(percentual) {
    this.desconto = percentual;
  }

  get valorProcedimentos() {
    return this.procedimentosAdicionais.reduce((soma, valor) => soma + valor, 0);
  }

  get valorFinal() {
    const subtotal = this.valorBase + this.valorProcedimentos;
    const valorComDesconto = subtotal - subtotal * this.desconto;
    return Math.max(0, arredondar(valorComDesconto));
  }
}

module.exports = { Atendimento, TIPOS_ATENDIMENTO };
