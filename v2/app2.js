// app.js
import { calcularINSS, calcularIRPF, prepararDefinicoes } from './calculos2.js';

import { definicoes, gratLabels } from './definicoes.js';

const container = document.querySelector('#container');

container.className = 'sm:flex sm:flex-row flex-col gap-4 overflow-x-auto p-4';

let nextId = 1;


// Função para preparar definições

prepararDefinicoes(definicoes);

function criarCard(id) {
  let state = {
    carreira: 'alema',
    periodo: 'a25',
    cargo: 'tecnico',
    nivel: 'A1',
    qualificacao: 'graduacao',
    salario: definicoes.alema.a25.cargos.assistente.niveis.A1.salario,
    alimentacao: 0,
    //adicionais: definicoes.alema.a25.cargos.assistente.niveis.A1.adicionais,
    // salario: 0,
    // adicionais: 0,
    // alimentacao: 0,
    // outros: 0,
    aba: 'salario'
  };
  console.log(`Salário inicial: ${state.salario}`),
  console.log(`Qualificação: ${state.qualificacao}`),
  
  function nivelInicial() {
    return Object.keys(definicoes[state.carreira][state.periodo].cargos[state.cargo].niveis)[0];
  }
  // Cria elemento
  const card = document.createElement('div');
  //card.className = 'bg-white p-6 rounded shadow mb-8 w-full sm:w-[500px] flex-shrink-0 relative';
  card.className = 'bg-white p-6 rounded shadow mb-4 w-full max-w-3xl relative sm:mr-4';
  card.classList.add('flex', 'flex-col', 'gap-4');
  //card.classList.add('outline-3', 'outline-offset-1', 'outline-double', 'outline-cyan-500');
  //card.classList.add('shadow-2xl'); //('shadow-xl', 'shadow-xl/20', 'inset-shadow-sm', 'inset-shadow-indigo-500/50');
  card.classList.add('bg-indigo-500', 'shadow-lg', 'shadow-indigo-500/30');
  card.classList.add('relative');
  card.dataset.id = id;
  card.innerHTML = `
    <button data-action="remove" class="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xl" title="Remover">
      ×
    </button>
    <h2 class="text-2xl font-semibold mb-4">Carreira</h2>
    <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <select data-field="periodo" class="border rounded p-2 w-full"></select>
      <select data-field="carreira" class="border rounded p-2 w-full"></select>
      <select data-field="cargo" class="border rounded p-2 w-full"></select>
      <select data-field="nivel" class="border rounded p-2 w-full"></select>
      <select data-field="qualificacao" class="border rounded p-2 w-full"></select>
    </div>
    <div class="mb-4 border-b border-gray-200">
      <nav class="flex space-x-4">
        <button data-tab="salario" class="tab-btn py-2 px-3 font-medium border-b-2 border-transparent">Salário</button>
        <button data-tab="adicionais" class="tab-btn py-2 px-3 font-medium border-b-2 border-transparent">Adicionais</button>
        <button data-tab="outros" class="tab-btn py-2 px-3 font-medium border-b-2 border-transparent">Outros</button>
      </nav>
    </div>
    <form class="mb-6 flex flex-col sm:flex-row sm:space-x-6">
      <div data-content="salario" class="tab-content flex-1">
        <label class="block mb-2">Vencimento básico (R$):
          <input readonly type="text" data-field="salario" class="input-field mt-1 block w-full border rounded p-2" min="0">
        </label>
      </div>
      <div data-content="adicionais" class="tab-content hidden flex-1">
        <label class="block mb-2">Adicionais (R$):
          <input readonly type="text" data-field="adicionais" class="input-field mt-1 block w-full border rounded p-2" min="0">
        </label>
        <label class="block mb-2">Gratificação Legislativa (R$):
          <input readonly type="text" data-field="gratificacao" class="input-field mt-1 block w-full border rounded p-2" min="0">
        </label>
        <label class="block mb-2">Alimentação (R$):
          <input readonly type="text" data-field="alimentacao" class="input-field mt-1 block w-full border rounded p-2" min="0">
        </label>
      </div>
      <div data-content="outros" class="tab-content flex-1">
        <label class="block mb-2">Outros (descontos/extras):
          <input type="text" data-field="outros" class="input-field mt-1 block w-full border rounded p-2">
        </label>
      </div>
    </form>
    <div class="resultado border-t border-gray-200 pt-4 text-gray-800">
    <h2 class="text-2xl font-semibold mb-4">Resultado</h2>
      <p><strong>INSS:</strong> <span data-result="inss">R$ 0,00</span></p>
      <p><strong>IRPF:</strong> <span data-result="irpf">R$ 0,00</span></p>
      <p><strong>Bruto:</strong> <span data-result="bruto">R$ 0,00</span></p>
      <p><strong>Líquido:</strong> <span data-result="liquido">R$ 0,00</span></p>
    </div>
  `;
  // Helpers
 // const selectCarreira = card.querySelector('[data-field="carreira"]');
 
  const selects = {
    periodo: card.querySelector('[data-field="periodo"]'),
    carreira: card.querySelector('[data-field="carreira"]'),
    cargo: card.querySelector('[data-field="cargo"]'),
    nivel: card.querySelector('[data-field="nivel"]'),
    qualificacao: card.querySelector('[data-field="qualificacao"]')
  };
  const inputs = card.querySelectorAll('.input-field');
  const tabs = card.querySelectorAll('.tab-btn');
  const contents = card.querySelectorAll('.tab-content');
  const removeBtn = card.querySelector('[data-action="remove"]');
 
  function atualizarSelects() {
    // Preencher carreiras
    selects.carreira.innerHTML = Object.entries(definicoes).map(([key, val]) =>
      `<option value="${key}">${val.label}</option>`).join('');

    // Verifica se a carreira está selecionada
    const carreira = definicoes[state.carreira];
    if (!carreira) return;

    // Preencher períodos (ex: a25, a26)
    const periodos = Object.entries(carreira)
      .filter(([key]) => key !== "label") // ignora a chave "label"
      .map(([key, val]) => `<option value="${key}">${val.label}</option>`).join('');
    selects.periodo.innerHTML = periodos;

    const periodo = carreira[state.periodo];
    if (!periodo) return;

    // Preencher cargos
    const cargos = Object.entries(periodo.cargos).map(([key, val]) =>
      `<option value="${key}">${val.label}</option>`).join('');
    selects.cargo.innerHTML = cargos;

    const cargo = periodo.cargos[state.cargo];
    if (!cargo) return;

    // Preencher níveis
    const niveis = Object.keys(cargo.niveis).map(key =>
      `<option value="${key}">${key}</option>`).join('');
    selects.nivel.innerHTML = niveis;

    const qualificacao = Object.entries(cargo.qualificacao).map(([key, val]) =>
      `<option value="${key}">${val.label}</option>`).join('');
    selects.qualificacao.innerHTML = qualificacao;
}

  function atualizarValores() {
    // console.log('DEBUG:', {
    //   carreira: state.carreira,
    //   periodo: state.periodo,
    //   cargo: state.cargo,
    //   nivel: state.nivel,
    //   niveisDisponiveis: Object.keys(definicoes[state.carreira]?.[state.periodo]?.cargos?.[state.cargo]?.niveis || {})
    // });
    const dados = definicoes[state.carreira][state.periodo].cargos[state.cargo].niveis[state.nivel];
    console.log('Dados do cargo:', state.carreira);
    if (state.carreira === "trema") {
      //const dados = definicoes[state.carreira][state.periodo].cargos[state.cargo].niveis[state.nivel];
          state.salario = dados.salario;
          state.alimentacao = dados.adicionais.alimentacao;
          state.adicionais = dados.adicionais;
    }
    // const adicionais = definicoes[state.carreira][state.periodo].cargos[state.cargo].adicionais;
    state.salario = dados.salario;
    state.alimentacao = dados.adicionais.alimentacao; 
    state.gratificacao = dados.adicionais.gratificacao; 
    state.qualificacao = dados.qualificacao;
    state.adicionais = dados.total; // soma dos adicionais
    console.log(`Salário: ${state.salario.toFixed(2)} - GRAT: ${state.gratificacao.toFixed(2)}`);
    //state.outros = dados.outros;
  }

  function renderState() {
    selects.carreira.value = state.carreira;
    selects.periodo.value = state.periodo;
    selects.cargo.value = state.cargo;
    selects.nivel.value = state.nivel;
    selects.qualificacao.value = state.qualificacao;



    // inputs.forEach(i => i.value = state[i.dataset.field]);
    inputs.forEach(i => {
      const key = i.dataset.field;
      if (typeof state[key] === 'number') {
        i.value = state[key].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
        i.value = state[key];
      }
    });

    // cálculo do salário continua igual
    const bruto = state.salario + state.adicionais; //+ state.outros;
    console.log(`Adicionais: ${state.adicionais.toFixed(2)} - Tipo: ${typeof state.adicionais}`);
    //const alimentacao = state.alimentacao;
    //console.log(`Alimentação: ${alimentacao.toFixed(2)}`);
    const baseinss = state.salario;
    const inss = calcularINSS(baseinss);
    const baseirpf = bruto - inss;
    // console.log(`Base de cálculo do IRPF: ${baseirpf.toFixed(2)}`);
    const irpf = calcularIRPF(baseirpf);
    const liquido = bruto - inss - irpf;

    card.querySelector('[data-result="inss"]').textContent = `R$ ${inss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    card.querySelector('[data-result="irpf"]').textContent = `R$ ${irpf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    card.querySelector('[data-result="bruto"]').textContent = `R$ ${bruto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    card.querySelector('[data-result="liquido"]').textContent = `R$ ${liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }


  function switchTab(tab) {
    state.aba = tab;
    tabs.forEach(t => {
      t.classList.toggle('border-blue-500', t.dataset.tab === tab);
      t.classList.toggle('text-blue-600', t.dataset.tab === tab);
    });
    contents.forEach(c => {
      c.classList.toggle('hidden', c.dataset.content !== tab);
    });
  }

  // Eventos
  selects.carreira.addEventListener('change', e => {
    state.carreira = e.target.value;

    const labelGrat = card.querySelector('label input[data-field="gratificacao"]').parentElement;
    labelGrat.childNodes[0].nodeValue = gratLabels[state.carreira] || 'Gratificação genérica (R$): ';
    // Pega o primeiro período válido (exclui o "label")
    const periodos = Object.keys(definicoes[state.carreira]).filter(p => p !== "label");
    state.periodo = periodos[0];

    const cargos = definicoes[state.carreira][state.periodo].cargos;
    state.cargo = Object.keys(cargos)[0];

    const niveis = cargos[state.cargo].niveis;
    state.nivel = Object.keys(niveis)[0];

    const qualificacao = cargos[state.cargo].qualificacao;
    state.qualificacao = Object.keys(qualificacao)[0];

    atualizarSelects();
    atualizarValores();
    renderState();
  });

  selects.periodo.addEventListener('change', e => {
    state.periodo = e.target.value;

    const cargos = definicoes[state.carreira][state.periodo].cargos;
    state.cargo = Object.keys(cargos)[0];

    const niveis = cargos[state.cargo].niveis;
    state.nivel = Object.keys(niveis)[0];

    const qualificacao = cargos[state.cargo].qualificacao;
    state.qualificacao = Object.keys(qualificacao)[0];
    //state.nivel = nivelInicial(); 
    
    atualizarSelects();
    atualizarValores();
    renderState();
  });

  selects.cargo.addEventListener('change', e => {
    state.cargo = e.target.value;

    const niveis = definicoes[state.carreira][state.periodo].cargos[state.cargo].niveis;
    state.nivel = Object.keys(niveis)[0];

    const qualificacao = cargos[state.cargo].qualificacao;
    state.qualificacao = Object.keys(qualificacao)[0];
    // state.nivel = nivelInicial();

    atualizarSelects();
    atualizarValores();
    renderState();
  });

  selects.nivel.addEventListener('change', e => {
    state.nivel = e.target.value;
    atualizarValores();
    renderState();
  });


  inputs.forEach(i =>
    i.addEventListener('input', e => {
      state[e.target.dataset.field] = parseFloat(e.target.value) || 0;
      renderState();
    })
  );

  tabs.forEach(t =>
    t.addEventListener('click', () => switchTab(t.dataset.tab))
  );

  removeBtn.addEventListener('click', () => {
    container.removeChild(card);
  });

  // Inicial
  atualizarSelects();
  atualizarValores();
  switchTab(state.aba);
  renderState();

  return card;
}

// Botão principal
document.getElementById('btnAdd').addEventListener('click', () => {
  container.appendChild(criarCard(nextId++));
});

// Dois cards iniciais
container.appendChild(criarCard(nextId++));
//container.appendChild(criarCard(nextId++));
