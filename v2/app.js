// app.js (refatorado e otimizado)
import { calcularINSS, calcularIRPF, prepararDefinicoes } from './calculos2.js';
import { definicoes, gratLabels } from './definicoes.js';

const container = document.querySelector('#container');
container.className = 'sm:flex sm:flex-row flex-col gap-4 overflow-x-auto p-4';
let nextId = 1;

prepararDefinicoes(definicoes);

document.getElementById('btnAdd').addEventListener('click', () => {
  container.appendChild(criarCard(nextId++));
});

container.appendChild(criarCard(nextId++));

function criarCard(id) {
  const state = { carreira: '', periodo: '', cargo: '', nivel: '', qualificacao: '', salario: 0, alimentacao: 0, adicionais: 0, gratificacao: 0, outros: 0, aba: 'salario' };

  const card = document.createElement('div');
  card.className = 'bg-white p-6 rounded shadow mb-4 w-full max-w-3xl relative sm:mr-4 flex flex-col gap-4 bg-indigo-500 shadow-lg shadow-indigo-500/30';
  card.dataset.id = id;
  card.innerHTML = `
    <button data-action="remove" class="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-xl">×</button>
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
          <input readonly type="text" data-field="salario" class="input-field mt-1 block w-full border rounded p-2">
        </label>
      </div>
      <div data-content="adicionais" class="tab-content hidden flex-1">
        <label class="block mb-2">Adicionais (R$):
          <input readonly type="text" data-field="adicionais" class="input-field mt-1 block w-full border rounded p-2">
        </label>
        <label class="block mb-2">Qualificação (R$):
          <input readonly type="text" data-field="qualificacao" class="input-field mt-1 block w-full border rounded p-2">
        </label>
        <label class="block mb-2">Gratificação Legislativa (R$):
          <input readonly type="text" data-field="gratificacao" class="input-field mt-1 block w-full border rounded p-2">
        </label>
        <label class="block mb-2">Alimentação (R$):
          <input readonly type="text" data-field="alimentacao" class="input-field mt-1 block w-full border rounded p-2">
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

  const selects = ['carreira', 'periodo', 'cargo', 'nivel', 'qualificacao'].reduce((acc, key) => {
    acc[key] = card.querySelector(`[data-field="${key}"]`);
    return acc;
  }, {});

  const inputs = card.querySelectorAll('.input-field');
  const tabs = card.querySelectorAll('.tab-btn');
  const contents = card.querySelectorAll('.tab-content');

  function atualizarSelects() {
    selects.carreira.innerHTML = Object.entries(definicoes).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
    state.carreira ||= Object.keys(definicoes)[0];

    const carreira = definicoes[state.carreira];
    const periodos = Object.keys(carreira).filter(k => k !== 'label');
    selects.periodo.innerHTML = periodos.map(p => `<option value="${p}">${carreira[p].label}</option>`).join('');
    state.periodo ||= periodos[0];

    const cargos = carreira[state.periodo]?.cargos ? Object.entries(carreira[state.periodo].cargos) : [];
    selects.cargo.innerHTML = cargos.map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
    state.cargo ||= cargos[0]?.[0] || '';

    const cargo = carreira[state.periodo]?.cargos?.[state.cargo];
    const niveis = cargo?.niveis ? Object.keys(cargo.niveis) : [];
    selects.nivel.innerHTML = niveis.map(n => `<option value="${n}">${n}</option>`).join('');
    state.nivel ||= niveis[0] || '';

    const qualificacoes = cargo?.qualificacao ? Object.entries(cargo.qualificacao) : [];
    selects.qualificacao.innerHTML = qualificacoes.map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
    state.qualificacao ||= qualificacoes[0]?.[0] || '';

    Object.entries(selects).forEach(([key, select]) => {
      if (select && state[key]) select.value = state[key];
    });
  }

  function atualizarValores() {
    const dados = definicoes[state.carreira]?.[state.periodo]?.cargos?.[state.cargo]?.niveis?.[state.nivel];
    if (!dados) return;
    state.salario = dados.salario;
    state.alimentacao = dados.adicionais?.alimentacao || 0;
    state.gratificacao = dados.adicionais?.gratificacao || 0;
    //state.qualificacao = dados.qualificacao || 666;
    state.adicionais = dados.total || 0;
  }

  function renderState() {
    inputs.forEach(i => {
      const key = i.dataset.field;
      const val = state[key];
      i.value = typeof val === 'number' ? val.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : val;
    });

    const bruto = state.salario + state.adicionais;
    const inss = calcularINSS(state.salario);
    const irpf = calcularIRPF(bruto - inss);
    const liquido = bruto - inss - irpf;

    card.querySelector('[data-result="inss"]').textContent = `R$ ${inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    card.querySelector('[data-result="irpf"]').textContent = `R$ ${irpf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    card.querySelector('[data-result="bruto"]').textContent = `R$ ${bruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    card.querySelector('[data-result="liquido"]').textContent = `R$ ${liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }

  function switchTab(tab) {
    state.aba = tab;
    tabs.forEach(t => {
      t.classList.toggle('border-blue-500', t.dataset.tab === tab);
      t.classList.toggle('text-blue-600', t.dataset.tab === tab);
    });
    contents.forEach(c => c.classList.toggle('hidden', c.dataset.content !== tab));
  }

  Object.entries(selects).forEach(([key, select]) => {
    select.addEventListener('change', e => {
      state[key] = e.target.value;
      atualizarSelects();
      atualizarValores();
      renderState();
    });
  });

  inputs.forEach(input => {
    input.addEventListener('input', e => {
      const field = e.target.dataset.field;
      state[field] = parseFloat(e.target.value.replace(',', '.')) || 0;
      renderState();
    });
  });

  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  card.querySelector('[data-action="remove"]').addEventListener('click', () => container.removeChild(card));

  atualizarSelects();
  atualizarValores();
  switchTab(state.aba);
  renderState();

  return card;
}
