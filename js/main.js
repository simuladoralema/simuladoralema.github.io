// ---------------------------------------------------------------------------
// Persistência (localStorage)
// ---------------------------------------------------------------------------

function saveStorage() {
	localStorage.clear();
	var frms = ['myform', 'myform2'];
	$.each(frms, function (i, v) {
		$('form[name="' + v + '"] *').filter(':input').each(function (i, inp) {
			if ($(inp).attr('id')) {
				var ptype = $(inp).prop('type');
				if ((ptype && ptype == 'radio') || ptype == 'checkbox') {
					localStorage.setItem($(inp).attr('id'), $(inp).prop('checked'));
				} else {
					localStorage.setItem($(inp).attr('id'), $(inp).val());
				}
			}
		});
	});
}

function loadStorage() {
	$.each(localStorage, function (key, val) {
		var ptype = $('#' + key).prop('type');
		if ((ptype && ptype == 'radio') || ptype == 'checkbox') {
			$('#' + key).prop('checked', val == 'true');
		} else {
			$('#' + key).val(val);
		}
	});
}

// ---------------------------------------------------------------------------
// Abas (Carreira/Outros, Resumo/Detalhamento)
//
// Antes havia um handler de clique separado para cada simulação
// (.tabs-menu1, .tabs-menu2, .tabs-menu3, .tabs-menu4), então criar uma nova
// simulação — ou um novo grupo de abas dentro de uma simulação existente —
// exigia copiar e colar mais um bloco de código aqui.
//
// Este handler único é delegado (funciona também para conteúdo criado
// dinamicamente pelo js/simulador.js) e descobre sozinho, a partir da classe
// do painel de destino, quais painéis irmãos precisa esconder. Ele funciona
// para qualquer quantidade de simulações/abas sem precisar de alterações.
// ---------------------------------------------------------------------------

function bindTabs() {
	$(document).on('click', '.tabs-menu a', function (event) {
		event.preventDefault();

		var $link = $(this);
		$link.parent().addClass('current').siblings().removeClass('current');

		var $target = $($link.attr('href'));
		if (!$target.length) {
			return;
		}

		// A classe "tab-content<N>" (além da genérica "tab-content") identifica
		// o grupo de abas ao qual esse painel pertence.
		var groupClass = ($target.attr('class') || '')
			.split(' ')
			.find(function (c) {
				return c && c.indexOf('tab-content') === 0 && c !== 'tab-content';
			});

		if (groupClass) {
			$('.' + groupClass).not($target).css('display', 'none');
		}
		$target.fadeIn();
	});
}

$(document).ready(function () {
	bindTabs();
	loadStorage();
});