export const definicoes = {
  alema: {
    label: "ALEMA",
    a25: {
      label: "2025",
      cargos: {
        assistente: {
          label: "Assistente Leg.",
          base: 5273.17,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.05 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            B: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            C: { quantidade: 4, step: 0.025}
          }
        },
        tecnico: {
          label: "Tec. de Gestão",
          base: 11512.41,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.05 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            B: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            C: { quantidade: 4, step: 0.025}
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        }
      }
    },
    a26: {
      label: "2026",
      cargos: {
        assistente: {
          label: "Assistente Leg.",
          base: 3000,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.05 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            B: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            C: { quantidade: 4, step: 0.025}
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        },
        tecnico: {
          label: "Tec. de Gestão",
          base: 6000,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.05 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            B: { quantidade: 3, step: 0.025, stepInicial: 0.025 },
            C: { quantidade: 4, step: 0.025}
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        }
      }
    }
    // outras carreiras...
  },
  tjma: {
    label: "TJ-MA",
    a25: {
      label: "2025",
      cargos: {
        tecnico: {
          label: "Técnico Judiciário",
          base: 5090.18,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 2152.62
            },
            gratificacao: {
              label: "GAJ",
              valor: 0 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            B: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            C: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            D: { quantidade: 5, step: 0.03 }
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        },
        analista: {
          label: "Analista Judiciário",
          base: 10666.23,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 2152.62
            },
            gratificacao: {
              label: "GAJ",
              valor: 0 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            B: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            C: { quantidade: 5, step: 0.03, stepInicial: 0.04 },
            D: { quantidade: 5, step: 0.03 }
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        }
      }
    }
  },
  trema: {
    label: "TRE-MA",
    a25: {
      label: "2025",
      cargos: {
        tecnico: {
          label: "Técnico Judiciário",
          base: 9000,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.9 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025 },
            B: { quantidade: 3, step: 0.025 },
            C: { quantidade: 3, step: 0.025 },
            D: { quantidade: 3, step: 0.025 }
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        },
        analista: {
          label: "Analista Judiciário",
          base: 13000,
          adicionais: {
            alimentacao: {
              label: "Ticket alimentação",
              valor: 1400
            },
            gratificacao: {
              label: "Gratificação legislativa",
              valor: 0.9 // 5% de gratificação legislativa
            },
          },
          qualificacao: {
            especializacao: 0.05,
            mestrado: 0.08,
            doutorado: 0.13
          },
          grupos: {
            A: { quantidade: 3, step: 0.025 },
            B: { quantidade: 3, step: 0.025 },
            C: { quantidade: 3, step: 0.025 },
            D: { quantidade: 3, step: 0.025 }
          }
          // step: 0.10,       // 10% de aumento por nível
          // niveis: 5         // Vai gerar I, II, III, IV, V
        }
      }
    }
    //...
  }
}

export const gratLabels = {
  alema: 'Gratificação Legislativa (R$): ',
  tjma: 'GAJ (R$): ',
  trema: 'GAJ (R$): ',
  // etc...
};