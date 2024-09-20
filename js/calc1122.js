let liq1 = 0;
let liq2 = 0;
let base = 0;
    base2023 = 17154.93, // 17154.92055,
    base2024 = 17789.66, // 17789.6526,
    base2025 = 23159.15; // 23159.15055;
let ftstep = 0;

// Zera tudo ao carregar a página e ao pressionar o botão
function zeraForm(form){
    // Zera os campos do formulário 1 ("Simulação 1")
        // Aba "Carreira"
        form.ddAno.value = 1;
        form.numProposta.value = 0;
        form.grat.checked = false;
        form.txGrat.value = "R$ 0,00";
        form.ddClasse.value = 0;
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
        if (form.name == "myform"){
            $("#depsFunbenLabel1").css('visibility','hidden');
        } else if (form.name == "myform2"){
            $("#depsFunbenLabel2").css('visibility','hidden');
        }
        form.numDepFunben.value = 0;
        form.txDepsFunben.value = "R$ 0,00"
        form.retrobox.checked = false;
        if (form.name == "myform"){
            $("#quantosDias1").css('visibility','hidden');
        } else if (form.name == "myform2"){
            $("#quantosDias2").css('visibility','hidden');
        }
        form.retro.value = 0;
        form.txVBretro.value = "R$ 0,00";
        form.txInsalRetro.value = "R$ 0,00";
        form.txAQretro.value = "R$ 0,00";
        form.txGratRetro.value = "R$ 0,00";
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
        form.diffReajuste.value = 0;
        form.txDifVB.value = "R$ 0,00";
        form.txDifGT.value = "R$ 0,00";
        form.txDifRisco.value = "R$ 0,00";
        form.numOutrosRendIsnt.value = 0;
        form.numOutros.value = 0;
        enSind("disable");
        calcSalario(form);
}

// Checkbox que habilita/desabilita proposta do sindicato
function enSind (comando){
    let checkSind = document.getElementById("enSind1");
    if (comando == "disable"){
        checkSind.checked = false;
        $("#ddAno1 option[value='2']").remove();
        $("#ddAno2 option[value='2']").remove();
    }
    if (checkSind.checked) {
        $("#ddAno1")
            .append($('<option>', { value : 2 })
            .text("Proposta Sindsalem")); 
        $("#ddAno2")
            .append($('<option>', { value : 2 })
            .text("Proposta Sindsalem")); 
    } else {
        $("#ddAno1 option[value='2']").remove();
        $("#ddAno2 option[value='2']").remove();
    }
}

// Função para atualizar lista de Adicional de Qualificação
function updateQuali(form) {
    let periodo = parseInt(form.ddAno.value, 10);
    let alloptions = Array("Exigência minima", "Graduação", "Especialização", "Mestrado", "Doutorado");
    let allvalues = Array(0, 1, 2, 3, 4);
    let newoptions = Array();
    let newvalues = Array();
    let curValue = form.ddQuali.value;
    let classe = parseInt(form.ddClasse.value, 10);
    if (periodo == 0 || periodo == 1) {
        if (classe == 0) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(2, alloptions.length);
            newvalues.splice(2, allvalues.length);
        } else if (classe == 1 || classe == 2) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.splice(1, 1);
            newvalues.splice(1, 1);
        }
    } 
    else if (periodo == 2){
        if (classe == 0) {
            newoptions = alloptions.slice(0, alloptions.length);
            newvalues = allvalues.slice(0, alloptions.length);
            newoptions.slice(0, alloptions.length);
            newvalues.slice(0, allvalues.length);
        } else if (classe == 1 || classe == 2) {
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
    calcSalario(form);
}

// Função para rodar a primeira vez
function firstload() {
    updateQuali(myform, 1);
    updateQuali(myform2, 1);
    enSind();
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
    if (periodo >= 0) { 
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
    else {
        // Outros períodos futuros
    }
    return Math.floor(aliquota * 100) / 100;
}

// Calcula Previdência (FEPA)
function calcPSS(periodo, base) {
    let valor = 0;
    if (periodo == 0) {
        valor = base * 0.11;
    } 
    else if (periodo >= 1) {
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

// Atualiza lista de niveis do PCCV atual para o novo
function atualizaPadrao(form) {
    let nivel = parseInt(form.ddNivel.value);
    if (( nivel >= 1 && nivel <= 3 )) {
        form.ddPadrao.value = nivel;
    } else if (( nivel >= 4 && nivel <= 6 )) {
        form.ddPadrao.value = nivel + 2;
    } else if (( nivel >= 7 && nivel <= 10 )) {
        form.ddPadrao.value = nivel + 4;
    }
    calcSalario(form);
}

// Atualiza lista de niveis do PCCV novo para o atual
function atualizaNivel(form) {
    let padrao = parseInt(form.ddPadrao.value);
    form.ddNivel.value = parseInt((padrao / 2.5) + 1, 10);
    calcSalario(form);
}

// Calcula salario com o novo PCCV
function calcNovoPCCV(salarioBase, nivelDesejado, correl) {
    const correlacao = correl;
    const niveis = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    let salarioAtual = salarioBase * correlacao;
    
    for (let i = 1; i < nivelDesejado; i++) {
        let aumento = 0.025;
        
        if ((niveis[i] === 5 && niveis[i + 1] === 6) ||
            (niveis[i] === 10 && niveis[i + 1] === 11) ||
            (niveis[i] === 15 && niveis[i + 1] === 16)) {
            aumento = 0.04;
        }
        
        salarioAtual += salarioAtual * aumento;
    }
    
    return salarioAtual;
}

// Calcula diferença entre períodos
function calcDiff(vencimento1,vencimento2,dias){

}

// Função principal: calcula o salário sempre que chamada pela aplicação
function calcSalario(form) {        
    // Adiciona o tiquete alimentação no cálculo
    let ticket = 0;

    if (form.ticket.checked){
        ticket = 1400.0;
        if (form.name == "myform") {
            $('#ticketdiv1').css('visibility','visible');  
        } else {
            $('#ticketdiv2').css('visibility','visible');  
        }
    } 
    else {
        ticket = 0;
        if (form.name == "myform") {
            $('#ticketdiv1').css('visibility','hidden');  
        } else {
            $('#ticketdiv2').css('visibility','hidden');  
        }
    }

    // Seleciona o período para cálculo
    let periodo = parseInt(form.ddAno.value, 10);

    // Fator de step
    ftstep = 1.025;

    let nivel = 1,
        correlacoes = [0.2341963333, 0.51129858, 1];
        //correlacoes = [0.2341958, 0.511298, 1];
        //0,5112985014
        //0,234195651

    if (periodo == 0 || periodo == 1) {
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().show();
            $('#ddPadrao1').parent().parent().hide();
        } else {
            $('#ddNivel2').parent().parent().show();
            $('#ddPadrao2').parent().parent().hide();
        }
        nivel = parseInt(form.ddNivel.value);
    } else if (periodo == 2) {
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().hide();
            $('#ddPadrao1').parent().parent().show();
        } else {
            $('#ddNivel2').parent().parent().hide();
            $('#ddPadrao2').parent().parent().show();
        }
        nivel = form.ddPadrao.value;
    } 
    
    let correl = correlacoes[parseInt(form.ddClasse.value)];
    let ftvb = nivel - 1;

    let vencimento;
    
    if (periodo == 0) {
        base = base2023;
        ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 1) {
        //base = 17154.92055;
        base = base2024; // Aumento de 3,7%, em 2024
        ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 2) {
        base = base2025; // Proposta do Sindsalem
        //ftstep = 1.025;
        vencimento = calcNovoPCCV(base, nivel, correl);
    }

    let reajuste = parseFloat(form.numProposta.value);
    if (isNaN(reajuste)) {
        reajuste = 0;
    } else {
        vencimento = vencimento * (1 + (reajuste / 100));
    }
    console.log('Reajuste: ', reajuste);
    console.log('Base: ', base);

    var percQuinquenio = (form.numQuinquenio.value / 100),
        quinquenio = percQuinquenio * vencimento;

    let grat = 0;
    if (form.grat.checked) {
        grat = (vencimento + quinquenio) * 0.05;
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

    let qualificacao;

    if (periodo == 0 || periodo == 1){
        qualificacao = 0;
        if (form.ddQuali.value == 1) {
            qualificacao = 350;
        } else if (form.ddQuali.value == 2) {
            qualificacao = 550;
        } else if (form.ddQuali.value == 3) {
            qualificacao = 750;
        } else if (form.ddQuali.value == 4) {
            qualificacao = 950;
        }
        aqcursos = cursos * 200;
    } else if (periodo == 2) {
        qualificacao = 0;
        if (form.ddQuali.value == 1) {
            qualificacao = base * 0.05;
        } else if (form.ddQuali.value == 2) {
            qualificacao = base * 0.1;
        } else if (form.ddQuali.value == 3) {
            qualificacao = base * 0.125;
        } else if (form.ddQuali.value == 4) {
            qualificacao = base * 0.15;
        }
        aqcursos = cursos * base * 0.02;
    }

    qualificacao += aqcursos;
    
    let retro = 0,
        vbretro =  0,
        gratretro = 0,
        aqretro = 0,
        insalretro = 0,
        retroativo;

    if(isNaN(parseInt(form.retro.value, 10))){
        retroativo = 0;
    } else {
        //var diferenca = calcDiff();
        //console.log('diferenca: ', diferenca);
        retro = parseInt(form.retro.value) / 30;
        vbretro = vencimento * retro; // + calcDiff(); // 30 * retro,
        gratretro = grat * retro, // 30 * retro,
        aqretro = qualificacao * retro, // 30 * retro,
        insalretro = insal * retro, // 30 * retro,
        retroativo = vbretro + gratretro + aqretro + insalretro;
    }

    if (form.retrobox.checked){
        if (form.name == "myform") {
            $('#retro1').parent().css('visibility','visible');
        } else if (form.name == "myform2") {
            $('#retro2').parent().css('visibility','visible');
        }
    } else {
        vbretro = 0;
        gratretro = 0;
        aqretro = 0;
        insalretro = 0;
        retroativo = 0;
        if (form.name == "myform") {
            $('#retro1').parent().css('visibility','hidden');
        } else if (form.name == "myform2") {
            $('#retro2').parent().css('visibility','hidden');
        }
    }

    if (periodo == 0 || periodo == 1){
        var base1 = base2023,
            vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100,
            base2 = base2024, // Aumento de 3,7%, em 2024
            vb2 = correl * Math.ceil(base2 * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 2){
        base1 = base2024, // Aumento de 3,7%, em 2024
        vb1 = correl * Math.ceil(base1 * Math.pow(ftstep, ftvb) * 100) / 100;
        base2 = base2025; // Proposta do Sindsalem
        //ftstep = 1.025;
        vb2 = calcNovoPCCV(base, nivel, correl);
    }
    
    // Calcula diferença de valores entre dois períodos para efeito de recebimento retroativo de aumento
    let difReajusteDias = parseInt(form.diffReajuste.value, 10);
    if(isNaN(difReajusteDias)){
        var diffReajuste = 0,
            diffVB = 0,
            diffGT = 0,
            diffFunben = 0,
            //diffQuali = 0,
            diffSindi = 0,
            diffQuinq = 0,
            diffRisco = 0,
            diffDias = 0,
            diffIR = 0,
            diffFEPA = 0;
    } else {
        diffDias = difReajusteDias;
        diffReajuste = (vb2 - vb1) / 30 * diffDias;
        diffVB = diffReajuste;
	diffQuinq = diffReajuste * percQuinquenio;
        diffGT = (diffReajuste + diffQuinq) * 0.05;
        //diffQuali = diffReajuste;
        diffFunben = diffReajuste * 0.03;
        diffSindi = diffReajuste * 0.01;
        diffRisco = diffReajuste * percInsal;
        diffDias = diffReajuste;
        diffTotal = diffVB + diffGT + diffQuinq + diffRisco;
        diffFEPA = diffTotal - diffGT;
    }
    
    console.log('retroativo: ', retroativo);
    console.log('Diferença VB: ', diffVB);
    console.log('Diferença GT: ', diffGT);
    console.log('Diferença Risco: ', diffRisco);
    console.log('Diferença Quinquenio: ', diffQuinq);
    console.log('Diferença Sindicato: ', diffSindi);

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

    let outrosRendTrib = outrosRendTrib0 + outrosRendTrib1 + outrosRendTrib2 + diffTotal;

    let outrosRendIsnt = parseFloat(form.numOutrosRendIsnt.value) || 0;

    let outros = retroativo + outrosRendTrib + outrosRendIsnt;

    let adicionais = qualificacao + grat + insal + quinquenio;
    
    let remuneracao = vencimento + grat + qualificacao + insal + retroativo + quinquenio; //+ outrosRendTribIR + outrosRendTribFEPA;

    let sindicato = 0;
    if (form.ddSindTipo.value != "nao") {
        if (form.ddSindTipo.value == "vb") {
            sindicato = vencimento * 0.01;
        } else if (form.ddSindTipo.value == "rem") {
            sindicato = remuneracao * 0.01;
        } else {
            //form.ddSindTipo.value == "cat" 
            sindicato = Math.round(0.01 * correl * Math.ceil(base * Math.pow(ftstep, ftvb)) * ftcarga * 100) / 100;
        }
    }

    //A base do PSS é quase a mesma da 'remuneracao', mas sem insalubridade pois a cobrança é opcional
    let basepss = remuneracao - grat - gratretro + outrosRendTribFEPA + diffFEPA;

    //let valorpss = calcPSS(periodo, basepss, tetopss);
    let valorpss = calcPSS(periodo, basepss);

    console.log('FEPA: ', valorpss);

    let reducaoDepsIRRF = dependentesIR(form.numDepIRRF.value, periodo);

    //Funben
    if (form.funben.checked){
        
        var depsfunben = dependentesFunben(form.numDepFunben.value),
            funbentit = (vencimento + vbretro + diffVB) * 0.03,
            funbendeps = (vencimento + vbretro + diffVB) * depsfunben;
        
        var funben = funbentit + funbendeps;

        if (form.name == "myform") {
            $('#numDepFunben1').parent().css('visibility','visible');
            //document.getElementById("numProposta1").disabled = true;
        } else if (form.name == "myform2") {
            //document.getElementById("numProposta2").disabled = true;
            $('#numDepFunben2').parent().css('visibility','visible');
        }
    } else {
        funbentit = 0;
        funbendeps = 0;
        funben = 0;
        if (form.name == "myform") {
            $('#numDepFunben1').parent().css('visibility','hidden');
            //document.getElementById("numProposta1").disabled = true;
        } else if (form.name == "myform2") {
            //document.getElementById("numProposta2").disabled = true;
            $('#numDepFunben2').parent().css('visibility','hidden');
        //$('#depsFunbendiv').css('visibility','hidden');
        //$('#numDepFunben').css('visibility','hidden');
        }
    }

    //let rendTributavel = vencimento + qualificacao + quinquenio + ftinsa * vencimento + outrosRendTrib;
    //let rendTributavel = remuneracao + outrosRendTribFEPA + outrosRendTribIR;

    //let deducoesIrrf = valorpss + aliqfunp + aliqFunpFacul + reducaoDepsIRRF;
    let deducoesIrrf = valorpss + funben + reducaoDepsIRRF;

    let baseirrf = remuneracao + outrosRendTribIR + diffTotal - deducoesIrrf;

    /*if (periodo == 16 && deducoesIrrf < 528) {
        baseirrf = rendTributavel - 528;
    } else if (periodo > 16 && deducoesIrrf < 564.80) {
        baseirrf = rendTributavel - 564.80;
    }*/

    let aliqirrf = valorIRRF(baseirrf, periodo);

    let outrosdescontos = parseFloat(form.numOutros.value) || 0;

    let descontos = aliqirrf + funben + valorpss + sindicato + outrosdescontos + diffSindi;

    let bruto = remuneracao + outrosRendTrib + outrosRendIsnt;

    let salario = bruto - descontos;

    if (form.name == "myform") {
        liq1 = salario;
    } else {
        liq2 = salario;
    }
    //Toggle URP input visibility

    //Print results after each calculation
    let diffLiqs = (liq2 - liq1);
        document.getElementById("diffLiqAbs").innerHTML = formatValor(diffLiqs);
        document.getElementById("diffLiqPct").innerHTML = (100 * diffLiqs / liq1).toFixed(2).replace(".", ",") + "%";
        document.getElementById("diffLiqPor").innerHTML = ((100 * liq2) / liq1).toFixed(0) + "%";
        form.txVB.value = formatValor(vencimento);
        form.txAdicionais.value = formatValor(adicionais);
        form.txOutros.value = formatValor(outros);
        form.txVBretro.value = formatValor(vbretro);
        form.txGrat.value = formatValor(grat);
        form.txGratRetro.value = formatValor(gratretro);
        form.txResult.value = formatValor(salario);
        form.txInss.value = formatValor(valorpss);
        form.txBruto.value = formatValor(bruto);
        form.txIrrf.value = formatValor(aliqirrf);
        form.txbIRRF.value = formatValor(baseirrf);
        form.txbINSS.value = formatValor(basepss);
        form.txdesconto.value = formatValor(descontos);
        form.txSindicato.value = formatValor(sindicato);
        form.txQualif.value = formatValor(qualificacao);
        form.txAQretro.value = formatValor(aqretro);
        form.txDepIRRF.value = formatValor(reducaoDepsIRRF);
        form.txTicket.value = formatValor(ticket);
        form.txCticket.value = formatValor(salario + ticket);
        form.txFunbenTit.value = formatValor(funbentit);
        form.txDepsFunben.value = formatValor(funbendeps);
        form.txInsa.value = formatValor(insal);
        form.txInsalRetro.value = formatValor(insalretro);
        form.txDifVB.value = formatValor(diffVB);
        form.txDifGT.value = formatValor(diffGT);
        form.txDifRisco.value = formatValor(diffRisco);

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
    //if (transporte > 0) addDetailValue("#tabdetails-rend", formid, "VT", transporte);
    if (qualificacao > 0) addDetailValue("#tabdetails-rend", formid, "AQ", qualificacao);
    if (quinquenio > 0) addDetailValue("#tabdetails-rend", formid, "Quinquênio", quinquenio);
    if (insal > 0) addDetailValue("#tabdetails-rend", formid, "Insal./Pericul.", insal);
    if (retroativo > 0) addDetailValue("#tabdetails-rend", formid, "Retroativo", retroativo);
    if (outrosRendIsnt > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Isen.", outrosRendIsnt);
    if (outrosRendTrib > 0) addDetailValue("#tabdetails-rend", formid, "Outros Rend. Trib.", outrosRendTrib);

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
            form1.ddClasse.value,
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
            form1.retrobox.checked,
        );

        var values2 = Array(
            form2.ddClasse.value,
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
            form2.retrobox.checked,
        );
    } else if (tipo == "cima") {
        values2 = Array(
            form2.ddClasse.value,
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
            form2.retrobox.checked,
        );

        values1 = values2;

    } else {
        values1 = Array(
            form1.ddClasse.value,
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
            form1.retrobox.checked,
        );

        values2 = values1;
    }

    form1.ddClasse.value = values2[0];
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
	form1.retrobox.checked = values2[30];    

    ///////////////////////////////////

    form2.ddClasse.value = values1[0];
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
	form2.retrobox.checked = values1[30];

    updateQuali(form1, values2[0]);
    updateQuali(form2, values1[0]);

    form1.ddQuali.value = values2[2];
    form2.ddQuali.value = values1[2];

    calcSalario(form1);
    calcSalario(form2);

    
}
