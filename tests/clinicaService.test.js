const ClinicaService = require('../src/ClinicaService');

describe('ClinicaService - cadastro e regras individuais do animal', () => {
  let clinica;

  beforeEach(() => {
    clinica = new ClinicaService();
  });

  test('teste_registrar_novo_animal_sem_atendimentos', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    expect(animal.nome).toBe('Rex');
    expect(animal.quantidadeAtendimentos()).toBe(0);
  });

  test('teste_animal_inexistente_lanca_excecao', () => {
    expect(() => {
      clinica.buscarAnimalPorId(999);
    }).toThrow('Animal com id 999 nao encontrado');
  });

  test('teste_acumular_valores_varios_atendimentos', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAtendimento(animal.id, 'rotina');
    clinica.registrarAtendimento(animal.id, 'urgencia');

    expect(animal.totalGasto()).toBe(280.00);
  });

  test('teste_consultar_total_gasto_animal_existente', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAtendimento(animal.id, 'rotina');
    clinica.registrarAtendimento(animal.id, 'emergencia');

    expect(clinica.consultarTotalGasto(animal.id)).toBe(350.00);
  });

  test('teste_nao_aplicar_desconto_sem_fidelidade', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    for (let i = 0; i < 4; i++) {
      clinica.registrarAtendimento(animal.id, 'rotina');
    }
    const quinto = clinica.registrarAtendimento(animal.id, 'rotina');
    expect(quinto.valorFinal).toBe(100.00);
  });

  test('teste_aplicar_desconto_fidelidade', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    for (let i = 0; i < 5; i++) {
      clinica.registrarAtendimento(animal.id, 'rotina');
    }
    const sexto = clinica.registrarAtendimento(animal.id, 'rotina');
    expect(sexto.valorFinal).toBe(90.00);
  });

  test('teste_calcular_atendimento_com_desconto', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    for (let i = 0; i < 5; i++) {
      clinica.registrarAtendimento(animal.id, 'rotina');
    }
    const comDesconto = clinica.registrarAtendimento(animal.id, 'rotina', [50]);
    expect(comDesconto.valorFinal).toBe(135.00);
  });

  test('teste_identificar_retorno_dentro_periodo', () => {
    const animal = clinica.registrarAnimal('Rex', 'Joao');
    clinica.registrarAtendimento(animal.id, 'rotina', [], new Date('2026-09-01'));
    clinica.registrarAtendimento(animal.id, 'rotina', [], new Date('2026-09-05'));

    expect(clinica.identificarRetornoDentroPeriodo(animal.id, 7)).toBe(true);
  });
});
