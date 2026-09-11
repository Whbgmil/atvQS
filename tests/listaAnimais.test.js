const ClinicaService = require('../src/ClinicaService');

describe('ClinicaService - operacoes sobre listas de animais', () => {
  let clinica;

  beforeEach(() => {
    clinica = new ClinicaService();
  });

  test('teste_registrar_varios_animais_em_lista', () => {
    clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAnimal('Mimi', 'Maria');
    clinica.registrarAnimal('Bidu', 'Carlos');

    expect(clinica.listarAnimais()).toHaveLength(3);
  });

  test('teste_calcular_total_gasto_lista_animais', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    const a2 = clinica.registrarAnimal('Mimi', 'Maria');

    clinica.registrarAtendimento(a1.id, 'rotina');
    clinica.registrarAtendimento(a2.id, 'urgencia');

    expect(clinica.somarFaturamentoTotal()).toBe(280.00);
  });

  test('teste_filtrar_animais_com_gasto_acima_de_limite', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    const a2 = clinica.registrarAnimal('Mimi', 'Maria');

    clinica.registrarAtendimento(a1.id, 'emergencia');
    clinica.registrarAtendimento(a2.id, 'rotina');

    const acimaDe150 = clinica.filtrarAnimaisComGastoAcimaDe(150);
    expect(acimaDe150).toHaveLength(1);
    expect(acimaDe150[0].nome).toBe('Rex');
  });

  test('teste_ordenar_animais_por_total_gasto', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    const a2 = clinica.registrarAnimal('Mimi', 'Maria');
    const a3 = clinica.registrarAnimal('Bidu', 'Carlos');

    clinica.registrarAtendimento(a1.id, 'rotina');
    clinica.registrarAtendimento(a2.id, 'emergencia');
    clinica.registrarAtendimento(a3.id, 'urgencia');

    const ordenado = clinica.ordenarAnimaisPorTotalGasto('desc');
    expect(ordenado.map((a) => a.nome)).toEqual(['Mimi', 'Bidu', 'Rex']);
  });

  test('teste_remover_animais_sem_atendimentos', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAnimal('Mimi', 'Maria');

    clinica.registrarAtendimento(a1.id, 'rotina');

    const restantes = clinica.removerAnimaisSemAtendimentos();
    expect(restantes).toHaveLength(1);
    expect(restantes[0].nome).toBe('Rex');
  });

  test('teste_buscar_animal_por_nome', () => {
    clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAnimal('Mimi', 'Maria');

    const resultado = clinica.buscarAnimalPorNome('rex');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe('Rex');
  });

  test('teste_somar_faturamento_total_lista', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    const a2 = clinica.registrarAnimal('Mimi', 'Maria');

    clinica.registrarAtendimento(a1.id, 'rotina');
    clinica.registrarAtendimento(a2.id, 'emergencia');

    expect(clinica.somarFaturamentoTotal()).toBe(350.00);
  });

  test('teste_ranking_animais_por_total_gasto', () => {
    const a1 = clinica.registrarAnimal('Rex', 'Joao');
    const a2 = clinica.registrarAnimal('Mimi', 'Maria');

    clinica.registrarAtendimento(a1.id, 'rotina');
    clinica.registrarAtendimento(a2.id, 'emergencia');

    const ranking = clinica.rankingPorTotalGasto();
    expect(ranking[0].nome).toBe('Mimi');
    expect(ranking[0].posicao).toBe(1);
    expect(ranking[1].nome).toBe('Rex');
  });
});
