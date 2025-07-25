let liq1 = 0;
let liq2 = 0;
const descontoSimplificado = 564.8;

let base = 0;

const base2023 = 17154.93, // 17154.92055,
    base2024 = 17789.66, // 17789.6526,
    base2025 = (base2024 * 1.217) * 1.04, // 23159.15055;
    base2026 = (base2025 * 1.061) * 1.04,
    base2027 = (base2026 * 1.05) * 1.04,
    aq2025 = 1.19,
    aq2026 = aq2025 * 1.04,
    aq2027 = aq2026 * 1.04;

// Zera tudo ao carregar a página e ao pressionar o botão
function zeraForm(form){
    // Zera os campos do formulário 1 ("Simulação 1")
        // Aba "Carreira"
        form.ddAno.value = 2;
        form.numProposta.value = 0;
        form.grat.checked = true;
        form.txGrat.value = "R$ 0,00";
        form.txAQ.value = "R$ 0,00";
	    form.txFG.value = "R$ 0,00";
        form.txCursos.value = "R$ 0,00";
        form.txQualif.value = "R$ 0,00";
        form.txAdicionais.value = "R$ 0,00";
        form.ddCargo.value = 1;
        form.ddNivel.value = 1;
        form.numQuinquenio.value = 0;
        form.ddQuali.value = 0;
        form.cursos.value = 0;
        form.ddInsa.value = 0;
        form.txInsa.value = "R$ 0,00";
        form.numDepIRRF.value = 0;
        form.txDepIRRF.value = "R$ 0,00";
        form.ticket.checked = false;
        form.txTicket.value = "R$ 0,00";
        form.ddSindTipo.value = "nao";
        form.txSindicato.value = "R$ 0,00";
        form.funben.checked = false;
        form.txFunbenTit.value = "R$ 0,00";
        updateVisibilidade(form,"depsFunbenLabel", "hidden");
        form.numDepFunben.value = 0;
        form.txDepsFunben.value = "R$ 0,00"
        form.retrobox.checked = false;
        updateVisibilidade(form,"quantosDias", "hidden");
        form.retro.value = 0;
        form.txVBretro.value = "R$ 0,00";
        form.txInsalRetro.value = "R$ 0,00";
        form.txAQretro.value = "R$ 0,00";
        form.txGratRetro.value = "R$ 0,00";
        form.txFerias.value = "R$ 0,00";
        // Aba "Outros"
        form.numOutrosRendTrib0.value = 0;
        form.numOutrosRendTrib1.value = 0;
        form.numOutrosRendTrib2.value = 0;
        form.outrosFEPA0.checked = false;
        form.outrosFEPA1.checked = false;
        form.outrosFEPA2.checked = false;
        form.outrosIR0.checked = false;
        form.outrosIR1.checked = false;
        form.outrosIR2.checked = false;
        form.ferias.checked = false;
        /* form.diffReajuste.value = 0;
        form.txDifVB.value = "R$ 0,00";
        form.txDifGT.value = "R$ 0,00";
        form.txDifRisco.value = "R$ 0,00"; */
        form.numOutrosRendIsnt.value = 0;
        form.numOutros.value = "R$ 0,00";
        form.numTempo.value = 0;
        updateVisibilidade(form,"gratdiv", "visible");
        updateQuali(form);
}

function updateVisibilidade (form, id, estado) {
    if (form.name == "myform"){
        $("#" + id + "1").css('visibility', estado);
    } else if (form.name == "myform2"){
        $("#" + id + "2").css('visibility', estado);
    }
    //calcSalario(form);
}

// Função para atualizar lista de Adicional de Qualificação
function updateQuali(form) {
    let periodo = parseInt(form.ddAno.value, 10);
    let alloptions = Array("Exigência minima", "Graduação", "Especialização", "Mestrado", "Doutorado");
    let allvalues = Array(0, 1, 2, 3, 4);
    let newoptions = Array();
    let newvalues = Array();
    let curValue = form.ddQuali.value;
    let cargo = parseInt(form.ddCargo.value, 10);
    if (periodo == 0 || periodo == 1) {
        if (cargo == -1 || cargo == 0) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(2, alloptions.length);
            newvalues.splice(2, allvalues.length);
        } else if (cargo == 1 || cargo == 2) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(1, 1);
            newvalues.splice(1, 1);
        }
    } 
    else if (periodo >= 2){
        
        if (cargo == -1 || cargo == 0) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.slice(0, alloptions.length);
            newvalues.slice(0, allvalues.length);
        } else if (cargo == 1 || cargo == 2) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(1, 1);
            newvalues.splice(1, 1);
        }
    }

    while (form.ddQuali.options.length) form.ddQuali.options[0] = null;
    for (i = 0; i < newoptions.length; i++) {
        // Create a new drop down option with the
        // display text and value from arr
        option = new Option(newoptions[i], newvalues[i]);
        // Add to the end of the existing options
        form.ddQuali.options[form.ddQuali.length] = option;
    }
    if (newvalues.includes(parseInt(curValue, 10))) {
        form.ddQuali.value = curValue;
    }
    updateCargos(form);
    atualizaNiveis(form);
    calcSalario(form);
}

function updateCargos(form) {
    let periodo = parseInt(form.ddAno.value, 10);
    let cargos = Array("Auxiliar Leg. Ope.", "Assistente Leg. Adm.", "Técnico de Gestão Adm.", "Consultor Leg. Especial");
    let cargos2 = Array("Auxiliar Legislativo", "Técnico Legislativo", "Analista Legislativo", "Consultor Legislativo");
    let valores = Array(-1, 0, 1, 2);
    let novosCargos = Array();
    let novosValores = Array();
    let curValue = form.ddCargo.value;
    //let cargo = parseInt(form.ddCargo.value, 10);
    if (periodo < 4) {
        novosCargos = cargos;
        novosValores = valores;
    } 
    else if (periodo >= 4){
        novosCargos = cargos2;
        novosValores = valores;
    }

    while (form.ddCargo.options.length) form.ddCargo.options[0] = null;
    for (i = 0; i < novosCargos.length; i++) {
        // Create a new drop down option with the
        // display text and value from arr
        option = new Option(novosCargos[i], novosValores[i]);
        // Add to the end of the existing options
        form.ddCargo.options[form.ddCargo.length] = option;
    }
    if (novosValores.includes(parseInt(curValue, 10))) {
        form.ddCargo.value = curValue;
    }
    calcSalario(form);
}

function valorFG(FG, periodo) {
    //FG 1-9 + FCC;
    let FG2024 = Array(0, 1439.25, 0);
    let FG2025 = Array(0, 1945.86, 1496.82);
    let FG2026 = Array(0, 2023.70, 1556.69);
    let FG2027 = Array(0, 2104.64, 1618.96);
	
    let valor = 0;
    if (periodo <= 1) {
        valor = FG2024[FG];
    } else if (periodo == 2) {
        //a partir de maio/2025
        valor = FG2025[FG];
    } else if (periodo == 3) {
        //a partir de maio/2026
        valor = FG2026[FG];
    } else if (periodo >= 4) {
        //a partir de maio/2027
        valor = FG2027[FG];
    }
    return valor;
}

// Função para rodar a primeira vez
function firstload() {
    updateQuali(myform);
    updateQuali(myform2);
    //enSind();
    zeraForm(myform);
    zeraForm(myform2);
}

// Formata o valor para R$
function formatValor(valor) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        valor,
      );
}

// Calcula o Imposto de Renda
function valorIRRF(base, periodo) {
    let aliquota = 0;
    if (periodo <= 1) { 
        // Ano 2024
        if (base <= 2259.20) {
            aliquota = 0;
        } else if (base >= 2259.21 && base <= 2826.65) {
            aliquota = base * 0.075 - 169.44;
        } else if (base >= 2826.66 && base <= 3751.05) {
            aliquota = base * 0.15 - 381.44;
        } else if (base >= 3751.06 && base <= 4664.68) {
            aliquota = base * 0.225 - 662.77;
        } else if (base > 4664.68) {
            aliquota = base * 0.275 - 896.00;
        }
    }
    else if (periodo >= 2) {
        // a partir de maio/2025
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
    }
    else {
	// periodos futuros	
    }
    return Math.floor(aliquota * 100) / 100;
}

// Calcula Previdência (FEPA)
function calcPSS(periodo, base) {
    let valor = 0;
    if (periodo < 0) {
        valor = base * 0.11;
    } 
    else if (periodo >= 0) {
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
    }
    return Math.floor(valor * 100) / 100;
}

// Desconta dependentes na aliquota do IR
function dependentesIR(deps, periodo) {
    let aliq = 0;
    //let deps = 0;
    if (periodo >= 0) {
        // Ano 2024
        aliq = deps * 189.59;
    } else {
        // aliq = deps * 189.59;
    }
    return Math.floor(aliq * 100) / 100;
}

// Calcula valor da aliquota por dependentes do FEPA
function dependentesFunben(deps) {
    let aliq = deps * 0.01;
    return Math.floor(aliq * 100) / 100;
}

// Calcula salario com o novo PCCV
function calcNovoPCCV(salarioBase, nivelDesejado, correl) {
    const correlacao = correl;
    const niveis = [1,2,3,4,5,6,7,8,9,10,11,12];

    let salarioAtual = salarioBase * correlacao;
    
    for (let i = 1; i < nivelDesejado; i++) {
        let aumento = 0.03;
        
        if ((niveis[i] === 3 && niveis[i + 1] === 4) ||
            (niveis[i] === 6 && niveis[i + 1] === 7) ||
            (niveis[i] === 9 && niveis[i + 1] === 10)) {
            aumento = 0.05;
        }
        
        salarioAtual += salarioAtual * aumento;
    }
    
    return salarioAtual;
}

// Calcula diferença entre períodos
function calcDiff(vencimento1,vencimento2,dias){

}

function calcTempo(form){
    let tempo = parseFloat(form.numTempo.value);
    let periodo = parseInt(form.ddAno.value, 10);

    if(tempo < 5){
        form.numQuinquenio.value = 0;
    } else if(tempo >= 5 && tempo < 10){
        form.numQuinquenio.value = 5;
    } else if(tempo >= 10 && tempo < 15){
        form.numQuinquenio.value = 10;
    } else if(tempo >= 15 && tempo < 20){
        form.numQuinquenio.value = 15;
    } else if(tempo >= 20 && tempo < 25){
        form.numQuinquenio.value = 20;
    } else if(tempo >= 25 && tempo < 30){
        form.numQuinquenio.value = 25;
    } else if(tempo >= 30 && tempo < 35){
        form.numQuinquenio.value = 30;
    } else if(tempo >= 35){
        form.numQuinquenio.value = 35;
    }

    if(periodo <= 3){
        if(tempo < 3){
            form.ddNivel.value = 1;
            form.ddPadrao.value = 1;
        } else if(tempo >= 3 && tempo < 5.5){
            form.ddNivel.value = 2;
            form.ddPadrao.value = 2;
        } else if(tempo >= 5.5 && tempo < 8){
            form.ddNivel.value = 3;
            form.ddPadrao.value = 3;
        } else if(tempo >= 8 && tempo < 10.5){
            form.ddNivel.value = 4;
            form.ddPadrao.value = 4;
        } else if(tempo >= 10.5 && tempo < 13){
            form.ddNivel.value = 5;
            form.ddPadrao.value = 5;
        } else if(tempo >= 13 && tempo < 15.5){
            form.ddNivel.value = 6;
            form.ddPadrao.value = 6;
        } else if(tempo >= 15.5 && tempo < 18){
            form.ddNivel.value = 7;
            form.ddPadrao.value = 7;
        } else if(tempo >= 18 && tempo < 20.5){
            form.ddNivel.value = 8;
            form.ddPadrao.value = 8;
        } else if(tempo >= 20.5 && tempo < 23){
            form.ddNivel.value = 9;
            form.ddPadrao.value = 9;
        } else if(tempo >= 23){
            form.ddNivel.value = 10;
            form.ddPadrao.value = 10;
        }
    } else if(periodo == 4){
        if(tempo < 3){
            form.ddNivel.value = 1;
            form.ddPadrao.value = 1;
        } else if(tempo >= 3 && tempo < 5){
            form.ddNivel.value = 2;
            form.ddPadrao.value = 2;
        } else if(tempo >= 5 && tempo < 7){
            form.ddNivel.value = 3;
            form.ddPadrao.value = 3;
        } else if(tempo >= 7 && tempo < 10){
            form.ddNivel.value = 4;
            form.ddPadrao.value = 4;
        } else if(tempo >= 10 && tempo < 12){
            form.ddNivel.value = 5;
            form.ddPadrao.value = 5;
        } else if(tempo >= 12 && tempo < 14){
            form.ddNivel.value = 6;
            form.ddPadrao.value = 6;
        } else if(tempo >= 14 && tempo < 17){
            form.ddNivel.value = 7;
            form.ddPadrao.value = 7;
        } else if(tempo >= 17 && tempo < 19){
            form.ddNivel.value = 8;
            form.ddPadrao.value = 8;
        } else if(tempo >= 19 && tempo < 21){
            form.ddNivel.value = 9;
            form.ddPadrao.value = 9;
        } else if(tempo >= 21 && tempo < 24){
            form.ddNivel.value = 10;
            form.ddPadrao.value = 10;
        } else if(tempo >= 24 && tempo < 26){
            form.ddNivel.value = 11;
            form.ddPadrao.value = 11;
        } else if(tempo >= 26){
            form.ddNivel.value = 12;
            form.ddPadrao.value = 12;
        }
    }
    
    calcSalario(form);
}

function atualizaNiveis(form){
    let periodo = parseInt(form.ddAno.value, 10);
    let alloptions = Array("A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "C4");
    let allvalues = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    let newoptions = Array();
    let newvalues = Array();
    let curValue = form.ddNivel.value;
    let cargo = parseInt(form.ddCargo.value, 10);
    if (periodo < 4) {
        if (cargo == 2) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(9, alloptions.length);
            newvalues.splice(9, allvalues.length);
        } else if (cargo < 2) {
            newoptions = alloptions;
            newvalues = allvalues;
        }
    }

    while (form.ddNivel.options.length) form.ddNivel.options[0] = null;
    for (i = 0; i < newoptions.length; i++) {
        // Create a new drop down option with the
        // display text and value from arr
        option = new Option(newoptions[i], newvalues[i]);
        // Add to the end of the existing options
        form.ddNivel.options[form.ddNivel.length] = option;
    }
    if (newvalues.includes(parseInt(curValue, 10))) {
        form.ddNivel.value = curValue;
    }
    //updateQuali(form);
}

// Função principal: calcula o salário sempre que chamada pela aplicação
function calcSalario(form) {  

    // Seleciona o período para cálculo
    let periodo = parseInt(form.ddAno.value, 10);

    if (periodo == 4){
        var grat = 0;
        updateVisibilidade(form,"gratdiv", "hidden");
    } else {
        updateVisibilidade(form,"gratdiv", "visible");
    }

    // Adiciona o tiquete alimentação no cálculo
    let ticket = 0;

    if (form.ticket.checked){
        ticket = 1400.0;
        updateVisibilidade(form,"ticketdiv", "visible");
    } 
    else {
        ticket = 0;
        updateVisibilidade(form,"ticketdiv", "hidden");
    }

        // Fator de step
    let ftstep = 1.025;

    let nivel = 1,
        correlacoes = [0.096243475, 0.2341963333, 0.51129858, 1];

    if (periodo <= 3) {
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().show();
            $('#ddPadrao1').parent().parent().hide();
        } else {
            $('#ddNivel2').parent().parent().show();
            $('#ddPadrao2').parent().parent().hide();
        }
        nivel = parseInt(form.ddNivel.value);
    } else if (periodo >= 4) {
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().hide();
            $('#ddPadrao1').parent().parent().show();
        } else {
            $('#ddNivel2').parent().parent().hide();
            $('#ddPadrao2').parent().parent().show();
        }
        nivel = form.ddPadrao.value;
    } 
    
    let correl = correlacoes[parseInt(form.ddCargo.value, 10) + 1];

    let ftvb = nivel - 1;

    let vencimento;
    
    if (periodo == 0) {
        base = base2023;
        //ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 1) {
        base = base2024; // Aumento de 3,7%, em 2024
        //ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 2) {
        //base = 17154.92055;
        base = base2025; // Aumento de 3,7%, em 2024
        //ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 3) {
        //base = 17154.92055;
        base = base2026; // Aumento de 3,7%, em 2024
        //ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 4) { 
        base = base2027; // Proposta do Sindsalem
        //ftstep = 1.025;
        vencimento = calcNovoPCCV(base, nivel, correl);
    }

    let reajuste = parseFloat(form.numProposta.value);
    if (isNaN(reajuste)) {
        reajuste = 0;
    } else {
        vencimento = vencimento * (1 + (reajuste / 100));
    }

    let fg = valorFG(parseInt(form.ddFG.value, 10), periodo);

    var percQuinquenio = (form.numQuinquenio.value / 100),
        quinquenio = percQuinquenio * vencimento;
        
    grat = 0;
    if (form.grat.checked) {
        grat = ((vencimento + quinquenio ) * 0.05);
    } else {
        grat = 0;
    }

    let percInsal = (form.ddInsa.value),
        insal = percInsal * vencimento;

    let cursos = parseInt(form.cursos.value, 10),
        aqcursos = 0;
    if ( isNaN(cursos)) {
        cursos = 0;
    }

    let qualificacao = 0,
        aqdiploma = 0,
        graduacao = 350,
        especializacao = 550,
        mestrado = 750,
        doutorado = 950,
        valorCursos = 200;

    if (periodo == 0 || periodo == 1){
        aqdiploma = 0;
        if (form.ddQuali.value == 1) {
            aqdiploma = graduacao;
        } else if (form.ddQuali.value == 2) {
            aqdiploma = especializacao;
        } else if (form.ddQuali.value == 3) {
            aqdiploma = mestrado;
        } else if (form.ddQuali.value == 4) {
            aqdiploma = doutorado;
        }
        aqcursos = cursos * valorCursos;
    } else if (periodo == 2) { // 2025
        aqdiploma = 0;
        if (form.ddQuali.value == 1) {
            aqdiploma = graduacao * aq2025
        } else if (form.ddQuali.value == 2) {
            aqdiploma = especializacao * aq2025;
        } else if (form.ddQuali.value == 3) {
            aqdiploma = mestrado * aq2025; 
        } else if (form.ddQuali.value == 4) {
            aqdiploma = doutorado * aq2025;
        }
        aqcursos = cursos * valorCursos * aq2025;
    } else if (periodo == 3) { // 2026
        aqdiploma = 0;
        if (form.ddQuali.value == 1) {
            aqdiploma = graduacao * aq2026;
        } else if (form.ddQuali.value == 2) {
            aqdiploma = especializacao * aq2026;
        } else if (form.ddQuali.value == 3) {
            aqdiploma = mestrado * aq2026; 
        } else if (form.ddQuali.value == 4) {
            aqdiploma = doutorado * aq2026;
        }
        aqcursos = cursos * valorCursos * aq2026;
    } else if (periodo == 4) { // 2027
        aqdiploma = 0;
        if (form.ddQuali.value == 1) {
            aqdiploma = graduacao * aq2027;
        } else if (form.ddQuali.value == 2) {
            aqdiploma = especializacao * aq2027;
        } else if (form.ddQuali.value == 3) {
            aqdiploma = mestrado * aq2027; 
        } else if (form.ddQuali.value == 4) {
            aqdiploma = doutorado * aq2027;
        }
        aqcursos = cursos * valorCursos * aq2027;
    }

    qualificacao = aqdiploma + aqcursos;


    /* // Calcula o 13° salário
    const decter = 0;
    
    if (form.decter.checked) {
        if(form.decter_par.value == "1") {
            //Primeira parcela, metade do bruto mas sem descontos
            decter = (remuneracao + fungrat) / 2;
        } else {
            //Segunda parcela, bruto mas serao calculados descontos
            decter = remuneracao + fungrat;
        }
    }
    */

    if (periodo == 0 || periodo == 1){
        var base1 = base2023,
            vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100,
            base2 = base2024, // Aumento de 3,7%, em 2024
            vb2 = correl * Math.ceil(base2 * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 2){
        base1 = base2024, // Aumento de 3,7%, em 2024
        vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100;
        base2 = base2025; // Proposta do Sindsalem
        vb2 = correl * Math.ceil(base2 * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 3){
        base1 = base2025,
        vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100;
        base2 = base2026; // Proposta do Sindsalem
        vb2 = correl * Math.ceil(base2 * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 4){
        base1 = base2026,
        vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100;
        base2 = base2027; // Proposta do Sindsalem
        //ftstep = 1.025;
        vb2 = calcNovoPCCV(base, nivel, correl);
    }

    let outrosRendTrib0 = parseFloat(form.numOutrosRendTrib0.value) || 0;
    let outrosRendTrib1 = parseFloat(form.numOutrosRendTrib1.value) || 0;
    let outrosRendTrib2 = parseFloat(form.numOutrosRendTrib2.value) || 0;

    let outrosRendTribIR = 0;
    if (form.outrosIR0.checked) {
        outrosRendTribIR += outrosRendTrib0;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    } if (form.outrosIR1.checked) {
        outrosRendTribIR += outrosRendTrib1;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    } if (form.outrosIR2.checked) {
        outrosRendTribIR += outrosRendTrib2;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    }

    let outrosRendTribFEPA = 0;
    if (form.outrosFEPA0.checked) {
        outrosRendTribFEPA += outrosRendTrib0;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    } if (form.outrosFEPA1.checked) {
        outrosRendTribFEPA += outrosRendTrib1;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    } if (form.outrosFEPA2.checked) {
        outrosRendTribFEPA += outrosRendTrib2;
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    }
    
    let adicionais = qualificacao + grat + insal + quinquenio;
    
    let remuneracao = vencimento + grat + qualificacao + insal + quinquenio + fg; //+ outrosRendTribIR + outrosRendTribFEPA;
    
    let ferias = 0;

    if (form.ferias.checked) {
        ferias = remuneracao / 3;
        outrosRendTribIR += ferias;
    }

    //let outrosRendTribIR = outrosRendTrib0 + outrosRendTrib1 + outrosRendTrib2;

    let outrosRendIsnt = parseFloat(form.numOutrosRendIsnt.value) || 0;

    let outros = outrosRendIsnt + outrosRendTribIR || 0;
    //let outros = outrosRendTribIR + outrosRendIsnt;

    let sindicato = 0;
    if (form.ddSindTipo.value != "nao") {
        if (form.ddSindTipo.value == "sim") {
            if (periodo < 2) {
                sindicato = vencimento * 0.01;
            } else {
                sindicato = vencimento * 0.01;
            }
        }
    }

    //A base do PSS é quase a mesma da 'remuneracao', mas sem insalubridade pois a cobrança é opcional
    let basepss = remuneracao - grat - /* gratretro */ + outrosRendTribFEPA /* + diffFEPA */;

    let valorpss = calcPSS(periodo, basepss);

    let deducaoDepsIRRF = dependentesIR(form.numDepIRRF.value, periodo);

    //Funben
    if (form.funben.checked){
        
        var depsfunben = dependentesFunben(form.numDepFunben.value),
            funbentit = vencimento * 0.03,
            funbendeps = vencimento * depsfunben;
        
        var funben = funbentit + funbendeps;

        updateVisibilidade(form,"depsFunbenLabel", "visible");
    }
    else {
        funbentit = 0;
        funbendeps = 0;
        funben = 0;
        updateVisibilidade(form,"depsFunbenLabel", "hidden");
    }

    let deducoesIrrf = valorpss + funben + deducaoDepsIRRF;
    if ( deducoesIrrf < descontoSimplificado ) {
        deducoesIrrf = descontoSimplificado;
    }

    let baseirrf = remuneracao + outrosRendTribIR - deducoesIrrf;

    let aliqirrf = valorIRRF(baseirrf, periodo);

    let outrosdescontos = parseFloat(form.numOutros.value) || 0;

    let descontos = aliqirrf + funben + valorpss + sindicato + outrosdescontos /* + diffSindi */;

    let bruto = remuneracao + outrosRendTribIR + outrosRendIsnt;

    let salario = bruto - descontos;

    if (form.name == "myform") {
        liq1 = salario;
    } else {
        liq2 = salario;
    }

    //Print results after each calculation
    let diffLiqs = (liq2 - liq1);
        document.getElementById("diffLiqAbs").innerHTML = formatValor(diffLiqs);
        document.getElementById("diffLiqPct").innerHTML = (100 * diffLiqs / liq1).toFixed(2).replace(".", ",") + "%";
        document.getElementById("diffLiqPor").innerHTML = ((100 * liq2) / liq1).toFixed(0) + "%";
        form.txVB.value = formatValor(vencimento);
        form.txAQ.value = formatValor(aqdiploma);
	    form.txFG.value = formatValor(fg);
        form.txCursos.value = formatValor(aqcursos);
        form.txAdicionais.value = formatValor(adicionais);
        form.txOutros.value = formatValor(outros);
        form.txGrat.value = formatValor(grat);
        form.txResult.value = formatValor(salario);
        form.txInss.value = formatValor(valorpss);
        form.txBruto.value = formatValor(bruto);
        form.txIrrf.value = formatValor(aliqirrf);
        form.txbIRRF.value = formatValor(baseirrf);
        form.txbINSS.value = formatValor(basepss);
        form.txdesconto.value = formatValor(descontos);
        form.txSindicato.value = formatValor(sindicato);
        form.txQualif.value = formatValor(qualificacao);
        form.txDepIRRF.value = formatValor(deducaoDepsIRRF);
        form.txTicket.value = formatValor(ticket);
        form.txCticket.value = formatValor(salario + ticket);
        form.txFunbenTit.value = formatValor(funbentit);
        form.txDepsFunben.value = formatValor(funbendeps);
        form.txInsa.value = formatValor(insal);
        form.txFerias.value = formatValor(ferias);
        console.log("FERIAS: ", ferias);
        console.log("FERIAS FORMATADO: ", form.txFerias.value);
        console.log("VENCIMENTO: ", vencimento);
        console.log("VENCIMENTO FORMATADO: ", form.txVB.value);
        console.log()


    //Display info on Detailed Results
    let formid = 1;
    if (form.name == "myform") {
        $("#tabdetails-rend-1").empty();
        $("#tabdetails-desc-1").empty();
        $("#tabdetails-outros-1").empty();
    } else {
        $("#tabdetails-rend-2").empty();
        $("#tabdetails-desc-2").empty();
        $("#tabdetails-outros-2").empty();
        formid = 2;
    }

    addDetailValue("#tabdetails-rend", formid, "VB", vencimento);
    addDetailValue("#tabdetails-rend", formid, "Ticket Alimentacao", ticket);
    if (qualificacao > 0) addDetailValue("#tabdetails-rend", formid, "AQ", qualificacao);
    if (quinquenio > 0) addDetailValue("#tabdetails-rend", formid, "Quinquênio", quinquenio);
    if (fg > 0) addDetailValue("#tabdetails-rend", formid, "FG", fg);
    if (insal > 0) addDetailValue("#tabdetails-rend", formid, "Insal./Pericul.", insal);
    if (outrosRendIsnt > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Isen.", outrosRendIsnt);
    if (outrosRendTribIR > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Trib.", outrosRendTribIR);

    addDetailValue("#tabdetails-desc", formid, "FEPA", valorpss);
    addDetailValue("#tabdetails-desc", formid, "IR", aliqirrf);
    if (sindicato > 0) addDetailValue("#tabdetails-desc", formid, "Sindicato", sindicato);
    if (funben > 0) addDetailValue("#tabdetails-desc", formid, "Funben", funben);
    if (outrosdescontos > 0) addDetailValue("#tabdetails-desc", formid, "Outros", outrosdescontos);

    addDetailValue("#tabdetails-outros", formid, "Bruto", bruto);
    addDetailValue("#tabdetails-outros", formid, "Base IR", baseirrf);
    addDetailValue("#tabdetails-outros", formid, "Descontos", descontos);
    addDetailValue("#tabdetails-outros", formid, "Base FEPA", basepss);
    addDetailValue("#tabdetails-outros", formid, "Líquido", salario);
    addDetailValue("#tabdetails-outros", formid, "Deduções IR", deducoesIrrf);

    saveStorage();
}

function addDetailValue(parent, form, name, value) {
    let newEl = "<div>" + name + ": " + formatValor(value) + "</div>";
    $(parent + "-" + form).append(newEl);
}

function inverterform(tipo) {
    let form1 = document.forms["myform"];
    let form2 = document.forms["myform2"];

    if (tipo == "inverter") {
        var values1 = Array(
            form1.ddCargo.value,
            form1.ddNivel.value,
            form1.ddQuali.value,
            form1.cursos.checked,
            form1.numQuinquenio.value,
            form1.ticket.checked,
            form1.ddInsa.value,
            form1.funben.value,
            form1.numDepFunben.value,
            form1.numDepIRRF.value,
            form1.retro.value,
            form1.ddSindTipo.value,
            form1.numOutros.value,
            form1.numOutrosRendIsnt.value,
            form1.numOutrosRendTrib0.value,
            form1.numProposta.value,
            form1.ddAno.value,
            form1.grat.value,
            form1.grat.checked,
            form1.cursos.value,
            form1.funben.checked,
            form1.ddPadrao.value,
            form1.numOutrosRendTrib1.value,
            form1.numOutrosRendTrib2.value,
            form1.outrosIR0.checked,
            form1.outrosIR1.checked,
            form1.outrosIR2.checked,
            form1.outrosFEPA0.checked,
            form1.outrosFEPA1.checked,
            form1.outrosFEPA2.checked,
            //form1.retrobox.checked,
			//form1.diffReajuste.value,
			form1.numTempo.value,
		    form1.ddFG.value,
            form1.ferias.checked,
            form1.ferias.value,
			//form1.contra.checked,
        );

        var values2 = Array(
            form2.ddCargo.value,
            form2.ddNivel.value,
            form2.ddQuali.value,
            form2.cursos.checked,
            form2.numQuinquenio.value,
            form2.ticket.checked,
            form2.ddInsa.value,
            form2.funben.value,
            form2.numDepFunben.value,
            form2.numDepIRRF.value,
            form2.retro.value,
            form2.ddSindTipo.value,
            form2.numOutros.value,
            form2.numOutrosRendIsnt.value,
            form2.numOutrosRendTrib0.value,
            form2.numProposta.value,
            form2.ddAno.value,
            form2.grat.value,
            form2.grat.checked,
            form2.cursos.value,
            form2.funben.checked,
            form2.ddPadrao.value,
            form2.numOutrosRendTrib1.value,
            form2.numOutrosRendTrib2.value,
            form2.outrosIR0.checked,
            form2.outrosIR1.checked,
            form2.outrosIR2.checked,
            form2.outrosFEPA0.checked,
            form2.outrosFEPA1.checked,
            form2.outrosFEPA2.checked,
            //form2.retrobox.checked,
			//form2.diffReajuste.value,
			form2.numTempo.value,
		    form2.ddFG.value,
            form2.ferias.checked,
            form2.ferias.value,
			//form2.contra.checked,
        );
    } else if (tipo == "cima") {
        values2 = Array(
            form2.ddCargo.value,
            form2.ddNivel.value,
            form2.ddQuali.value,
            form2.cursos.checked,
            form2.numQuinquenio.value,
            form2.ticket.checked,
            form2.ddInsa.value,
            form2.funben.value,
            form2.numDepFunben.value,
            form2.numDepIRRF.value,
            form2.retro.value,
            form2.ddSindTipo.value,
            form2.numOutros.value,
            form2.numOutrosRendIsnt.value,
            form2.numOutrosRendTrib0.value,
            form2.numProposta.value,
            form2.ddAno.value,
            form2.grat.value,
            form2.grat.checked,
            form2.cursos.value,
            form2.funben.checked,
            form2.ddPadrao.value,
            form2.numOutrosRendTrib1.value,
            form2.numOutrosRendTrib2.value,
            form2.outrosIR0.checked,
            form2.outrosIR1.checked,
            form2.outrosIR2.checked,
            form2.outrosFEPA0.checked,
            form2.outrosFEPA1.checked,
            form2.outrosFEPA2.checked,
            //form2.retrobox.checked,
			//form2.diffReajuste.value,
			form2.numTempo.value,
		    form2.ddFG.value,
            form2.ferias.checked,
            form2.ferias.value,
			//form2.contra.checked,
        );

        values1 = values2;

    } else {
        values1 = Array(
            form1.ddCargo.value,
            form1.ddNivel.value,
            form1.ddQuali.value,
            form1.cursos.checked,
            form1.numQuinquenio.value,
            form1.ticket.checked,
            form1.ddInsa.value,
            form1.funben.value,
            form1.numDepFunben.value,
            form1.numDepIRRF.value,
            form1.retro.value,
            form1.ddSindTipo.value,
            form1.numOutros.value,
            form1.numOutrosRendIsnt.value,
            form1.numOutrosRendTrib0.value,
            form1.numProposta.value,
            form1.ddAno.value,
            form1.grat.value,
            form1.grat.checked,
            form1.cursos.value,
            form1.funben.checked,            
            form1.ddPadrao.value,
            form1.numOutrosRendTrib1.value,
            form1.numOutrosRendTrib2.value,
            form1.outrosIR0.checked,
            form1.outrosIR1.checked,
            form1.outrosIR2.checked,
            form1.outrosFEPA0.checked,
            form1.outrosFEPA1.checked,
            form1.outrosFEPA2.checked,
            //form1.retrobox.checked,
			//form1.diffReajuste.value,
			form1.numTempo.value,
		    form1.ddFG.value,
            form1.ferias.checked,
            form1.ferias.value,
			//form1.contra.checked,
        );

        values2 = values1;
    }

    form1.ddCargo.value = values2[0];
    form1.ddNivel.value = values2[1];
    //form1.ddQuali.value = values2[2];
    form1.cursos.checked = values2[3];
    form1.numQuinquenio.value = values2[4];
    form1.ticket.checked = values2[5];
    form1.ddInsa.value = values2[6];
    form1.funben.value = values2[7];
    form1.numDepFunben.value = values2[8];
    form1.numDepIRRF.value = values2[9];
    form1.retro.value = values2[10];
    form1.ddSindTipo.value = values2[11];
    form1.numOutros.value = values2[12];
    form1.numOutrosRendIsnt.value = values2[13];
    form1.numOutrosRendTrib0.value = values2[14];
    form1.numProposta.value = values2[15];
    form1.ddAno.value = values2[16];
    form1.grat.checked = values2[18];
    form1.cursos.value = values2[19];
    form1.funben.checked = values2[20];
    form1.ddPadrao.value = values2[21];
    form1.numOutrosRendTrib1.value = values2[22];
    form1.numOutrosRendTrib2.value = values2[23];
    form1.outrosIR0.checked = values2[24];
    form1.outrosIR1.checked = values2[25];
    form1.outrosIR2.checked = values1[26];
    form1.outrosFEPA0.checked = values2[27];
    form1.outrosFEPA1.checked = values2[28];
    form1.outrosFEPA2.checked = values2[29];
	//form1.diffReajuste.value = values2[31];
	form1.numTempo.value = values2[30];
	form1.ddFG.value = values2[31];
	form1.ferias.checked = values2[32];
	form1.ferias.value = values2[33];    

    ///////////////////////////////////

    form2.ddCargo.value = values1[0];
    form2.ddNivel.value = values1[1];
    //form2.ddQuali.value = values1[2];
    form2.cursos.checked = values1[3];
    form2.numQuinquenio.value = values1[4];
    form2.ticket.checked = values1[5];
    form2.ddInsa.value = values1[6];
    form2.funben.value = values1[7];
    form2.numDepFunben.value = values1[8];
    form2.numDepIRRF.value = values1[9];
    form2.retro.value = values1[10];
    form2.ddSindTipo.value = values1[11];
    form2.numOutros.value = values1[12];
    form2.numOutrosRendIsnt.value = values1[13];
    form2.numOutrosRendTrib0.value = values1[14];
    form2.numProposta.value = values1[15];
    form2.ddAno.value = values1[16];
    form2.grat.value = values1[17];
    form2.grat.checked = values1[18];
    form2.cursos.value = values1[19];
    form2.funben.checked = values1[20];
    form2.ddPadrao.value = values1[21];
    form2.numOutrosRendTrib1.value = values1[22];
    form2.numOutrosRendTrib2.value = values1[23];
    form2.outrosIR0.checked = values1[24];
    form2.outrosIR1.checked = values1[25];
    form2.outrosIR2.checked = values1[26];
    form2.outrosFEPA0.checked = values1[27];
    form2.outrosFEPA1.checked = values1[28];
    form2.outrosFEPA2.checked = values1[29];
	//form2.diffReajuste.value = values1[31];
	form2.numTempo.value = values1[30];
	form2.ddFG.value = values1[31];
	form2.ferias.checked = values1[32];
	form2.ferias.value = values1[33];

    updateQuali(form1, values2[0]);
    updateQuali(form2, values1[0]);

    form1.ddQuali.value = values2[2];
    form2.ddQuali.value = values1[2];

    calcSalario(form1);
    calcSalario(form2);

    
}
