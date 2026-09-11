const { Atendimento } = require('../src/Atendimento');

describe('Atendimento - calculo de valores', () => {
  test('teste_calcular_valor_consulta_rotina', () => {
    const atendimento = new Atendimento('rotina');
    expect(atendimento.valorFinal).toBe(100.00);
  });

  test('teste_calcular_valor_consulta_urgencia', () => {
    const atendimento = new Atendimento('urgencia');
    expect(atendimento.valorFinal).toBe(180.00);
  });

  test('teste_calcular_valor_atendimento_emergencia', () => {
    const atendimento = new Atendimento('emergencia');
    expect(atendimento.valorFinal).toBe(250.00);
  });

  test('teste_aplicar_acrescimo_procedimento_adicional', () => {
    const atendimento = new Atendimento('rotina', [50]);
    expect(atendimento.valorFinal).toBe(150.00);
  });

  test('teste_nao_permitir_valor_servico_zero', () => {
    expect(() => {
      new Atendimento('rotina', [0]);
    }).toThrow('Valor do procedimento deve ser maior que zero');
  });

  test('teste_calcular_valores_decimais', () => {
    const atendimento = new Atendimento('rotina', [10.10, 5.05]);
    expect(atendimento.valorFinal).toBe(115.15);
  });

  test('teste_nao_permitir_valor_negativo', () => {
    const atendimento = new Atendimento('rotina');
    atendimento.aplicarDesconto(1.5);
    expect(atendimento.valorFinal).toBe(0);
  });
});
