const Animal = require('./Animal');
const { Atendimento } = require('./Atendimento');
const { arredondar } = require('./utils');

const LIMIAR_FIDELIDADE = 5;
const DESCONTO_FIDELIDADE = 0.10;

class ClinicaService {
  constructor() {
    this.animais = [];
    this.proximoId = 1;
  }

  // cadastro
  registrarAnimal(nome, responsavel) {
    const animal = new Animal(this.proximoId, nome, responsavel);
    this.proximoId += 1;
    this.animais.push(animal);
    return animal;
  }

  buscarAnimalPorId(id) {
    const animal = this.animais.find((a) => a.id === id);
    if (!animal) {
      throw new Error(`Animal com id ${id} nao encontrado`);
    }
    return animal;
  }

  // atendimentos
  registrarAtendimento(animalId, tipo, procedimentosAdicionais = [], data = new Date()) {
    const animal = this.buscarAnimalPorId(animalId);
    const atendimento = new Atendimento(tipo, procedimentosAdicionais, data);

    if (animal.quantidadeAtendimentos() >= LIMIAR_FIDELIDADE) {
      atendimento.aplicarDesconto(DESCONTO_FIDELIDADE);
    }

    animal.adicionarAtendimento(atendimento);
    return atendimento;
  }

  consultarTotalGasto(animalId) {
    return this.buscarAnimalPorId(animalId).totalGasto();
  }

  identificarRetornoDentroPeriodo(animalId, diasLimite = 7) {
    const animal = this.buscarAnimalPorId(animalId);
    if (animal.atendimentos.length < 2) {
      return false;
    }

    const [penultimo, ultimo] = animal.atendimentos.slice(-2);
    const diffDias = (ultimo.data - penultimo.data) / (1000 * 60 * 60 * 24);
    return diffDias <= diasLimite;
  }

  // operacoes na lista de animais
  listarAnimais() {
    return [...this.animais];
  }

  buscarAnimalPorNome(nome) {
    return this.animais.filter((a) =>
      a.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  filtrarAnimaisComGastoAcimaDe(valorLimite) {
    return this.animais.filter((a) => a.totalGasto() > valorLimite);
  }

  ordenarAnimaisPorTotalGasto(ordem = 'desc') {
    const copia = [...this.animais];
    copia.sort((a, b) =>
      ordem === 'desc'
        ? b.totalGasto() - a.totalGasto()
        : a.totalGasto() - b.totalGasto()
    );
    return copia;
  }

  removerAnimaisSemAtendimentos() {
    this.animais = this.animais.filter((a) => a.quantidadeAtendimentos() > 0);
    return this.animais;
  }

  somarFaturamentoTotal() {
    const total = this.animais.reduce((soma, a) => soma + a.totalGasto(), 0);
    return arredondar(total);
  }

  rankingPorTotalGasto() {
    return this.ordenarAnimaisPorTotalGasto('desc').map((a, index) => ({
      posicao: index + 1,
      nome: a.nome,
      totalGasto: a.totalGasto(),
    }));
  }
}

module.exports = ClinicaService;
