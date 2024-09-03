let liq1 = 0;
let liq2 = 0;
let base = 0;
let ftstep = 0;

function updateQuali(form) {
    let periodo = parseInt(form.ddAno.value, 10);
    let alloptions = Array("Exigência minima", "Graduação", "Especialização", "Mestrado", "Doutorado");
    let allvalues = Array(0, 1, 2, 3, 4);
    let newoptions = Array();
    let newvalues = Array();
    let curValue = form.ddQuali.value;
    let classe = parseInt(form.ddClasse.value, 10);
    if (periodo == 1) {
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

function firstload() {
    updateQuali(myform, 1);
    updateQuali(myform2, 1);
}

function formatValor(valor) {
    //let intRegex = /^\d+$/;
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        valor,
      );
    //return "R$ " + valor.toFixed(2).replace(".", ",");
    //return valor;
}

function valorIRRF(base, periodo) {
    let aliquota = 0;
    if (periodo >= 1) { 
        // Ano 2024
        if (base < 2259.20) {
            aliquota = 0;
        } else if (base < 2826.65) {
            aliquota = base * 0.075 - 169.44;
        } else if (base < 3751.05) {
            aliquota = base * 0.15 - 381.44;
        } else if (base < 4664.68) {
            aliquota = base * 0.225 - 662.77;
        } else {
            aliquota = base * 0.275 - 896.00;
        }
    }
    else {
        // Outros períodos futuros
    }
    return Math.floor(aliquota * 100) / 100;
}

function calcPSS(periodo, base) {
    let valor = 0;
    if (periodo == 0) {
        valor = base * 0.11;
    } 
    else if (periodo >= 1) {
       if (base <= 1412.0) {
            //salario minimo
            valor = 0.075 * base;
        } else if (base <= 2666.68) {
            valor = (base - 1412.0) * 0.09 + 112;
        } else if (base <= 4000.03) {
            valor = (base - 2666.68) * 0.12 + 218.82;
        } else if (base <= 7786.02) {
            //teto
            valor = (base - 4000.03) * 0.14 + 378.82;
        } else if (base <= 13333.48) {
           valor = (base - 7786.02) * 0.145 + 908.86;
        } else if (base <= 26666.94) {
            valor = (base - 13333.48) * 0.165 + 1713.24;
        } else if (base <= 52000.54) {
            valor = (base - 26666.94) * 0.19 + 3913.26;
        } else {
            valor = base * 0.22;
        }
       // valor = base * 0.145;
    }
    return Math.floor(valor * 100) / 100;
}

function dependentesIR(deps, periodo) {
    let aliq = 0;
    //let deps = 0;
    if (periodo >= 1) {
        // Ano 2024
        aliq = deps * 189.59;
    } else {
        // aliq = deps * 189.59;
    }
    return Math.floor(aliq * 100) / 100;
}

function dependentesFunben(deps) {
    let aliq = deps * 0.01;
    return Math.floor(aliq * 100) / 100;
}

function atualizaPadrao(form) {
    let nivel = parseInt(form.ddNivel.value);
    if (nivel < 9) {
        form.ddPadrao.value = parseInt((nivel - 1) * 2.5 + 1, 10);
    } else {
        form.ddPadrao.value = 20;
    }
    //form.ddPadrao.value = parseInt((pold - 1) * 2.5, 10);
    calcSalario(form);
}

function atualizaNivel(form) {
    let padrao = parseInt(form.ddPadrao.value);
    form.ddNivel.value = parseInt((padrao / 2.5) + 1, 10);
    calcSalario(form);
}

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

function calcSalario(form) {
    if (form.name == "myform") {
        //$('#numProposta1').parent().css('visibility','hidden');
        //$('#ddCargaH1').parent().css('visibility','hidden');
        //$('#ddFG1').parent().css('visibility','hidden');
        //document.getElementById("numProposta1").disabled = true;
    } else if (form.name == "myform2") {
        //document.getElementById("numProposta2").disabled = true;
        //$('#numProposta2').parent().css('visibility','hidden');
    }
    // Ocultando elementos com CSS
    //$('#maindiv3').css('visibility','hidden');
    //$('#aqtext').css('visibility','hidden');
    //if (!form.ticket.checked){}

   //$('#menu-bar').css('visibility','hidden');
   let ticket = 0;

    if (form.ticket.checked){
        ticket = 1400.0;
        $('#ticketdiv').css('visibility','visible');  
    } 
    else {
        ticket = 0;
        $('#ticketdiv').css('visibility','hidden');
    }

    let periodo = parseInt(form.ddAno.value, 10);

    //ftstep = 1.025;
    let reajuste = parseFloat(form.numProposta.value); 

    if (reajuste > 0) {
        base = base * (1 + (reajuste / 100));
    }

    let nivelMerito = 1,
        correlacoes = [0.2341958, 0.511298, 1];
        //0,5112985014
        //0,234195651

    if (periodo == 1) {
        //form.ddClasse.value = "Técnico Legislativo"
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().show();
            $('#ddPadrao1').parent().parent().hide();
        } else {
            $('#ddNivel2').parent().parent().show();
            $('#ddPadrao2').parent().parent().hide();
        }
        nivelMerito = parseInt(form.ddNivel.value);
        //nivelCap = parseInt(form.ddProg.value);
        //correlacoes = [0.60, 0.60, 1];        
    } else if (periodo == 2) {
        if (form.name == "myform") {
            $('#ddNivel1').parent().parent().hide();
            $('#ddPadrao1').parent().parent().show();
        } else {
            $('#ddNivel2').parent().parent().hide();
            $('#ddPadrao2').parent().parent().show();
        }
        //nivelMerito = parseInt(form.ddPadrao.value);
        nivelMerito = form.ddPadrao.value;
        //nivelMerito = 0;
        //correlacoes = [0.60, 0.60, 1];
    } 
    
    let correl = correlacoes[parseInt(form.ddClasse.value)];
    let ftvb = nivelMerito - 1;
    //let ftvb = 0;
    //let ftcarga = form.ddCargaH.value;
    //let ftcarga = 1;

    let vencimento;
    
    if (periodo == 1) {
        //base = 17154.92055;
        base = 17789.6526, // Aumento de 3,7%, em 2024
        ftstep = 1.025;
        vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;
    } else if (periodo == 2) {
        base = 23159.15055; // Proposta do Sindsalem
        //ftstep = 1.025;
        vencimento = calcNovoPCCV(base,nivelMerito, correl);
    }
    //nivelMerito=;
    //let vencimento = correl * Math.ceil(base * Math.pow(ftstep, ftvb) * 100) / 100;

    let grat = 0;
    if (form.grat.checked) {
        grat = (vencimento * 0.05);
        //let aliqirrfferias = valorIRRF(ferias, periodo);
    } else {
        grat = 0;
        //let aliqirrfferias = 0;
    }

    // if (periodo >= 100) {        
    //     //Propostas Fasubra
    //     let frac = 1;
    //     ftvb = nivelMerito + nivelCap - 2;
    //     //if (classeOffset == 1 || classeOffset == 6) frac = 0.4; //niveis AB
    //     if (classeOffset == 11 || classeOffset == 17) frac = 0.6 / 0.4; //niveis CD
    //     if (classeOffset == 31) frac = 1 / 0.4
    //     vencimento = Math.ceil(base * Math.pow(ftstep, ftvb) * ftcarga * 100 * frac) / 100;
    // }
   
    let quinquenio = (form.numQuinquenio.value / 100) * vencimento;

    let insal = (form.ddInsa.value) * vencimento;

    let cursos = parseInt(form.cursos.value, 10),
        aqcursos = 0;
    if ( isNaN(cursos)) {
        cursos = 0;
    }

    let qualificacao;

    if (periodo == 1){
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
        retro = parseInt(form.retro.value) / 30;
        vbretro = vencimento * retro, // 30 * retro,
        gratretro = grat * retro, // 30 * retro,
        aqretro = qualificacao * retro, // 30 * retro,
        insalretro = insal * retro, // 30 * retro,
        retroativo = vbretro + gratretro + aqretro + insalretro;
    }

    let outrosRendTrib = parseFloat(form.numOutrosRendTrib.value) || 0;
    let outrosRendIsnt = parseFloat(form.numOutrosRendIsnt.value) || 0;

    let adicionais = qualificacao + grat + insal + quinquenio;
    
    let remuneracao = vencimento + grat + qualificacao + insal + retroativo + quinquenio + outrosRendTrib;

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
    let basepss = remuneracao - grat - gratretro;

    //let valorpss = calcPSS(periodo, basepss, tetopss);
    let valorpss = calcPSS(periodo, basepss);

    let reducaoDepsIRRF = dependentesIR(form.numDepIRRF.value, periodo);

    //Funben
    if (form.funben.checked){
        
        let depsfunben = dependentesFunben(form.numDepFunben.value),
            funbentit = (vencimento + vbretro) * 0.03,
            funbendeps = (vencimento + vbretro) * depsfunben;
        
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
    let rendTributavel = remuneracao;

    //let deducoesIrrf = valorpss + aliqfunp + aliqFunpFacul + reducaoDepsIRRF;
    let deducoesIrrf = valorpss + funben + reducaoDepsIRRF;

    let baseirrf = rendTributavel - deducoesIrrf;

    /*if (periodo == 16 && deducoesIrrf < 528) {
        baseirrf = rendTributavel - 528;
    } else if (periodo > 16 && deducoesIrrf < 564.80) {
        baseirrf = rendTributavel - 564.80;
    }*/

    let aliqirrf = valorIRRF(baseirrf, periodo);

    let outrosdescontos = parseFloat(form.numOutros.value) || 0;

    let descontos = aliqirrf + funben + valorpss + sindicato + outrosdescontos;

    let bruto = remuneracao + outrosRendIsnt;

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
    form.txRetro.value = formatValor(retroativo);
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
            form1.numOutrosRendTrib.value,
            form1.numProposta.value,
            form1.ddAno.value,
            form1.grat.value,
            form1.grat.checked,
            form1.cursos.value,
            form1.funben.checked,
            form1.ddPadrao.value,
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
            form2.numOutrosRendTrib.value,
            form2.numProposta.value,
            form2.ddAno.value,
            form2.grat.value,
            form2.grat.checked,
            form2.cursos.value,
            form2.funben.checked,
            form2.ddPadrao.value,
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
            form2.numOutrosRendTrib.value,
            form2.numProposta.value,
            form2.ddAno.value,
            form2.grat.value,
            form2.grat.checked,
            form2.cursos.value,
            form2.funben.checked,
            form2.ddPadrao.value,
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
            form1.numOutrosRendTrib.value,
            form1.numProposta.value,
            form1.ddAno.value,
            form1.grat.value,
            form1.grat.checked,
            form1.cursos.value,
            form1.funben.checked,            
            form1.ddPadrao.value,
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
    form1.numOutrosRendTrib.value = values2[14];
    form1.numProposta.value = values2[15];
    form1.ddAno.value = values2[16];
    form1.grat.checked = values2[18];
    form1.cursos.value = values2[19];
    form1.funben.checked = values2[20];
    form1.ddPadrao.value = values2[21];

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
    form2.numOutrosRendTrib.value = values1[14];
    form2.numProposta.value = values1[15];
    form2.ddAno.value = values1[16];
    form2.grat.value = values1[17];
    form2.grat.checked = values1[18];
    form2.cursos.value = values1[19];
    form2.funben.checked = values1[20];
    form2.ddPadrao.value = values1[21];

    updateQuali(form1, values2[0]);
    updateQuali(form2, values1[0]);

    form1.ddQuali.value = values2[2];
    form2.ddQuali.value = values1[2];

    calcSalario(form1);
    calcSalario(form2);
}
