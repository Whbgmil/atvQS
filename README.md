# Clínica Veterinária — Camada de Negócio (TDD)

Projeto da disciplina Qualidade de Software (2026.1 - BSI).
Sistema simples de cálculo de valores de atendimentos veterinários, desenvolvido
com TDD (Test-Driven Development) em JavaScript, usando Jest.

## Estrutura

```
src/
  Atendimento.js     -> regras de calculo de valor de um atendimento
  Animal.js           -> entidade Animal e seu historico de atendimentos
  ClinicaService.js    -> camada de negocio: cadastro, fidelidade, retorno,
                          e operacoes sobre a lista de animais
  utils.js            -> funcao auxiliar de arredondamento monetario
tests/
  atendimento.test.js     -> 7 testes (regras de valor)
  clinicaService.test.js  -> 8 testes (cadastro, fidelidade, retorno)
  listaAnimais.test.js    -> 8 testes (operacoes sobre listas)
```

Total: 23 testes automatizados, todos passando.

## Como rodar

```bash
npm install       # instala o Jest (so precisa rodar uma vez)
npm test          # roda todos os testes
npm run test:coverage   # roda os testes e mostra a cobertura de codigo
```

## Regras de negócio implementadas

- Consulta de rotina: R$ 100,00 | Urgência: R$ 180,00 | Emergência: R$ 250,00
- Desconto de fidelidade de 10% a partir do atendimento em que o animal já
  possui 5 atendimentos anteriores registrados.
- Procedimentos adicionais somam ao valor base do atendimento.
- Valores de procedimento iguais a zero (ou negativos) são rejeitados.
- O valor final de um atendimento nunca é negativo.
- Um atendimento é considerado "retorno" quando ocorre em até N dias
  (padrão: 7) após o atendimento anterior do mesmo animal.
