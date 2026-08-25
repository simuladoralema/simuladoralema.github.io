// ---------------------------------------------------------------------------
// Gerador das simulações
//
// As duas simulações são idênticas em estrutura (campos, ids, abas...),
// mudando apenas um sufixo numérico. Antes esse HTML existia duplicado no
// arquivo .html: qualquer campo novo, removido ou renomeado tinha que ser
// replicado manualmente na segunda simulação, com muito cuidado para ajustar
// os ids/nomes corretamente.
//
// Agora existe um único template (a tag <template id="sim-template"> no
// final do <body>) com marcadores de posição:
//   __N__   -> número da simulação (1 ou 2) — usado nos ids dos campos
//   __RN__  -> número do grupo de abas de resultado (3 ou 4)
//   __FS__  -> sufixo do nome do formulário ("" para "myform", "2" para "myform2")
//
// Este arquivo apenas clona esse template duas vezes, substituindo os
// marcadores. js/calculos.js e js/main.js continuam funcionando exatamente
// como antes, pois o HTML final gerado tem os MESMOS ids/names de sempre
// (ddAno1, ddAno2, myform, myform2, tabdetails-rend-1, etc.).
// ---------------------------------------------------------------------------

(function () {
	'use strict';

	function build(n, formSuffix, resultTabNum) {
		var template = document.getElementById('sim-template');
		return template.innerHTML
			.split('__RN__').join(resultTabNum)
			.split('__N__').join(n)
			.split('__FS__').join(formSuffix);
	}

	function generateSimulations() {
		document.getElementById('sim-container-1').innerHTML = build(1, '', 3);
		document.getElementById('sim-container-2').innerHTML = build(2, '2', 4);
	}

	// Roda de forma síncrona: como este <script> fica no final do <body>,
	// os containers e a <template> já existem no DOM neste ponto.
	generateSimulations();

	// A partir daqui os formulários "myform" e "myform2" já existem e ficam
	// acessíveis globalmente pelo atributo name (comportamento padrão do
	// HTML), então firstload() — definida em calculos.js — funciona
	// sem nenhuma alteração.
	firstload();
})();