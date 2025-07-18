// calculos.js
export function calcularINSS(salario) {
    let valor = 0;
    const base = salario;

    if (base <= 1412.0) {
        //salario minimo
        valor = 0.075 * base;
    } else if (base >= 1412.01 && base <= 2666.68) {
        valor = (base - 1412.0) * 0.09 + 112;
    } else if (base >= 2666.69 && base <= 4000.03) {
        valor = (base - 2666.68) * 0.12 + 218.82;
    } else if (base >= 4000.04 && base <= 7786.02) {
        //teto
        valor = (base - 4000.03) * 0.14 + 378.82;
    } else if (base >= 7786.03 && base <= 13333.48) {
       valor = (base - 7786.02) * 0.145 + 908.86;
    } else if (base >= 13333.49 && base <= 26666.94) {
        valor = (base - 13333.48) * 0.165 + 1713.24;
    } else if (base >= 26666.95 && base <= 52000.54) {
        valor = (base - 26666.94) * 0.19 + 3913.26;
    } else {
        valor = base * 0.22;
    }
      // valor = base * 0.145;
    
    return Math.floor(valor * 100) / 100;
}

export function calcularIRPF(salario) {
  let aliquota = 0;
  // const inss = calcularINSS(salario);
  const base = salario;

  // console.log(`Base de cálculo do IRPF: ${base.toFixed(2)}`);

  if (base <= 2259.20) {
      aliquota = 0;
  } else if (base >= 2259.21 && base <= 2826.65) {
      aliquota = base * 0.075 - 186.16;
  } else if (base >= 2826.66 && base <= 3751.05) {
      aliquota = base * 0.15 - 394.16;
  } else if (base >= 3751.06 && base <= 4664.68) {
      aliquota = base * 0.225 - 675.49;
  } else if (base > 4664.68) {
      aliquota = base * 0.275 - 908.73;
  }
  return Math.floor(aliquota * 100) / 100;
  //return base * 0.275 - 869.36;
}

export function prepararDefinicoes(definicoes) {
  for (const orgKey in definicoes) {
    const org = definicoes[orgKey];
    for (const periodoKey in org) {
      if (periodoKey === 'label') continue;

      const periodo = org[periodoKey];
      for (const cargoKey in periodo.cargos) {
        const cargo = periodo.cargos[cargoKey];

        // Só gerar níveis se não existirem
        if (!cargo.niveis) {
          const base = cargo.base; // || 1000;
         // const gratificacao = cargo.gratificacao || 0; // 5% de gratificação legislativa
          // const grat = ;// || 0; // 5% de gratificação legislativa
          // const adicionaisBase = cargo.adicionais + base * cargo.gratificacao + cargo.alimentacao; //|| 100;
          const grupos = cargo.grupos;
          // Soma os adicionais, tratando % e valores fixos
          let adicionaisNome = '',
              adicionaisBase = 0,
              qualificacaoNome = '',
              qualificacaoBase = 0;

          for (const adicionalKey in cargo.adicionais) {
            const adicional = cargo.adicionais[adicionalKey];
            if (adicional.valor < 1) {
              // Percentual (ex: 0.05 => 5%)
              adicionaisNome = adicionalKey;
              // console.log(`Adicional: ${adicionalKey} - Valor: ${adicional.valor}`);
              adicionaisBase += base * adicional.valor;
            } else {
              // Valor fixo
              adicionaisNome = adicionalKey;
              // console.log(`Adicional: ${adicionalKey} - Valor: ${adicional.valor}`);
              adicionaisBase += adicional.valor;
            }
          } 

         for (const qualificacaoKey in cargo.qualificacao) {
            const qualificacao = cargo.qualificacao[qualificacaoKey];
            if (qualificacao.valor < 1) {
              // Percentual (ex: 0.05 => 5%)
              qualificacaoNome = qualificacaoKey;
              // console.log(`Adicional: ${adicionalKey} - Valor: ${adicional.valor}`);
              qualificacaoBase += base * qualificacao.valor;
            } else {
              // Valor fixo
              qualificacaoNome = qualificacaoKey;
              // console.log(`Adicional: ${adicionalKey} - Valor: ${adicional.valor}`);
              qualificacaoBase += qualificacao.valor;
            }
          } 

          cargo.niveis = {};
          //console.log(`Criando níveis para ${cargo.label} (${periodoKey}) - Base: ${base}, Adicionais: ${adicionaisNome} = ${adicionaisBase}`);
          let salarioAtual = base;
          let adicionaisAtual = adicionaisBase;
          let qualificacaoAtual = qualificacaoBase;
          // let alimentacaoAtual = cargo.alimentacao || 0;
          
          const nomesGrupos = Object.keys(grupos);
          let contadorNivel = 1;

          for (let g = 0; g < nomesGrupos.length; g++) {
            const grupo = nomesGrupos[g];
            const { quantidade, step, stepInicial } = grupos[grupo];
          
            for (let i = 1; i <= quantidade; i++) {
              if (orgKey === 'alema') {
                const nivel = `${grupo}${i}`;
                cargo.niveis[nivel] = {
                  salario: parseFloat(salarioAtual.toFixed(2)),
                  adicionais: {
                    gratificacao: parseFloat((salarioAtual * cargo.adicionais.gratificacao.valor).toFixed(2)),
                    alimentacao: parseFloat((cargo.adicionais.alimentacao.valor).toFixed(2))
                  },
                  qualificacao: parseFloat(qualificacaoAtual.toFixed(2)),
                  total: parseFloat(adicionaisAtual.toFixed(2)) 
                };
              }
              else if (orgKey === 'tjma' || orgKey === 'trema') {
                const nivel = `${grupo}${contadorNivel}`;
                cargo.niveis[nivel] = {
                  salario: parseFloat(salarioAtual.toFixed(2)),
                  adicionais: {
                    gratificacao: parseFloat((salarioAtual * cargo.adicionais.gratificacao.valor).toFixed(2)),
                    alimentacao: parseFloat((cargo.adicionais.alimentacao.valor).toFixed(2))
                  },
                  total: parseFloat(adicionaisAtual.toFixed(2)) 
                };
                contadorNivel++;
              }
            
              // Aplica step apenas se ainda houver próximos níveis no mesmo grupo
              if (i < quantidade) {
                salarioAtual *= 1 + step;
                adicionaisAtual *= 1 + step;
              }
            }
          
            // Aplica stepInicial **após** o grupo, se existir
            if (stepInicial) {
              salarioAtual *= 1 + stepInicial;
              adicionaisAtual *= 1 + stepInicial;
            }
          }
        }
        else {
          console.warn(`Cargo ${cargo.label} não possui grupos definidos!`);
                    const base = cargo.base; // || 1000;
          let adicionaisNome = '';
          let adicionaisBase = 0;
          for (const adicionalKey in cargo.adicionais) {
            const adicional = cargo.adicionais[adicionalKey];
            if (adicional.valor < 1) {
              adicionaisNome = adicionalKey;
              // console.log(`Adicional: ${adicionalKey} - Valor: ${adicional.valor}`);
              adicionaisBase += base * adicional.valor;
            } else {
              adicionaisNome = adicionalKey;
              adicionaisBase += adicional.valor;
            }
          } 
          cargo.niveis = {};
          let salarioAtual = base;
          let adicionaisAtual = adicionaisBase;
          continue;
        }
      }
    }
  }
}