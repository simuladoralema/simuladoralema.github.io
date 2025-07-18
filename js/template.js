function renderForm(n) {
    return `
    <div class="main-content">
        <h2>Simulação ${n}</h2>
        <form name="myform${n}" action="" class="calcform" method="GET">
          <div class="divdata">
              <ul class="tabs-menu tabs-menu${n}">
                  <li class="current"><a href="#tab-carreira${n}">Carreira</a></li>
                  <li><a href="#tab-outros${n}">Outros</a></li>
              </ul>
              <div class="tab">
                  <div id="tab-carreira${n}" class="tab-content tab-content${n}">
                    <div>
                        <label>
                            Período:
                            <select name="ddAno" id="ddAno${n}" onchange="updateQuali(this.form);">
                                <option value="1">Anterior (até abril/2025)</option>
                                <option value="2" selected>Vigente (a partir de maio/2025)</option>
                                <option value="3">2026 (2025 + 6,1% + 4%)</option>
                                <option value="4">2027 (2026 + 5% + 4%)</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Reajuste:
                            <input type="number" name="numProposta" id="numProposta${n}" min="0" max="200"
                                step="0.5" value="0" style="width: 45px;" onClick="calcSalario(this.form);"
                                onKeyUp="calcSalario(this.form);" />
                            %
                        </label>
                    </div>
                    <div>
                        <label>
                            Função:
                            <select name="ddFG" id="ddFG${n}" onchange="calcSalario(this.form);" style="width: 80px;">
                                <option value="0" selected>Não</option>
                                <option value="1">FG-1</option>
                                <option value="2">FG-2</option>
                            </select>
                        </label>  
                        <input type="text" name="txFG" value="R$ 0,00" readonly />                              
                    </div>
                    <div id="gratdiv${n}">
                        <label>
                            Grat. Leg.
                            <input type="checkbox" name="grat" id="grat${n}" value="0"
                                onClick="calcSalario(this.form);" />
                            <input style="width: 85px;" type="text" name="txGrat" id="txGrat${n}"
                                value="R$ 0,00" readonly />
                        </label>
                    </div>
                    <div>
                        <label>
                            Cargo:
                            <select name="ddCargo" id="ddCargo${n}"
                                 onchange="updateQuali(this.form);">
                                <option value="-1">Auxiliar Legislativo Operacional</option>
                                <option value="0">Assistente Legislativo Administrativa</option>
                                <option value="1" selected>Técnico de Gestão Administrativa</option>
                                <option value="2">Consultor Legislativo Especial</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Tempo de serviço (em anos):
                            <input type="number" name="numTempo" id="numTempo${n}" min="0" max="100" step="0.5"
                            value="0" style="width: 35px;" onClick="calcTempo(this.form);"
                            onKeyPress="calcTempo(this.form);" onKeyUp="calcTempo(this.form);" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Classe/Nível:
                            <select name="ddNivel" id="ddNivel${n}" onchange="calcSalario(this.form);">
                                <option value="1" selected>A1</option>
                                <option value="2">A2</option>
                                <option value="3">A3</option>
                                <option value="4">B1</option>
                                <option value="5">B2</option>
                                <option value="6">B3</option>
                                <option value="7">C1</option>
                                <option value="8">C2</option>
                                <option value="9">C3</option>
                                <option value="10">C4</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>                                    
                            Classe/Nível:
                            <select name="ddPadrao" id="ddPadrao${n}" onchange="calcSalario(this.form);">
                                <option value="1" selected>A1</option>
                                <option value="2">A2</option>
                                <option value="3">A3</option>
                                <option value="4">B1</option>
                                <option value="5">B2</option>
                                <option value="6">B3</option>
                                <option value="7">C1</option>
                                <option value="8">C2</option>
                                <option value="9">C3</option>
                                <option value="10">D1</option>
                                <option value="11">D2</option>
                                <option value="12">D3</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Quinquênio:
                            <input type="number" name="numQuinquenio" id="numQuinquenio${n}" min="0" max="35" step="5"
                            value="0" style="width: 35px;" onClick="calcSalario(this.form);"
                            onKeyPress="calcSalario(this.form);" onKeyUp="calcSalario(this.form);" />
                            %
                        </label>
                    </div>
                    <div>
                        <label>
                            Qualificação (AQ-I a AQ-IV):
                            <select name="ddQuali" id="ddQuali${n}" onchange="calcSalario(this.form);"
                                style="width: 150px;">
                                <option value="0" selected>Exigência Mínima</option>
                                <option value="1">Graduação</option>
                                <option value="2">Especialização</option>
                                <option value="3">Mestrado</option>
                                <option value="4">Doutorado</option>
                            </select>
                        </label>  
                        <input type="text" name="txAQ" value="R$ 0,00" readonly />                              
                    </div>
                    <div>
                        <label>
                            Cursos de capacitação (AQ-V):
                            <input type="number" name="cursos" id="cursos${n}" min="0" max="3"
                                step="1" value="0" style="width: 30px;" onClick="calcSalario(this.form);"
                                onKeyUp="calcSalario(this.form);" />
                        </label>
                        <input type="text" name="txCursos" value="R$ 0,00" readonly /> 
                    </div>
                    <div>
                        <label>Adic. de risco:
                            <select name="ddInsa" id="ddInsa${n}" onchange="calcSalario(this.form);"
                                style="width: 150px;">
                                <option value="0" selected>Nenhum</option>
                                <option value="0.2">Insalubridade (20%)</option>
                                <option value="0.3">Insalubridade (30%)</option>
                                <option value="0.4">Insalubridade (40%)</option>
                                <option value="0.3">Periculosidade (30%)</option>
                            </select>
                        </label>
                        <input type="text" name="txInsa" style="width: 82px" value="R$ 0,00" readonly />
                    </div>
                    <div>
                        <label>
                            Nº de dep. IR:
                            <input type="number" name="numDepIRRF" id="numDepIRRF${n}" min="0" max="20" step="1"
                                value="0" style="width: 35px;" onClick="calcSalario(this.form);"
                                onKeyPress="calcSalario(this.form);" onKeyUp="calcSalario(this.form);" />
                            <input type="text" name="txDepIRRF" value="R$ 0,00" readonly />
                        </label>
                    </div>
                    <div>
                        <label>
                            Ticket alimentação
                            <input type="checkbox" name="ticket" id="ticket${n}" value="0"
                                onClick="calcSalario(this.form);" />
                            <input type="text" name="txTicket" value="R$ 0,00" readonly />
                        </label>
                        <label>
                            Sindicato:
                            <select name="ddSindTipo" id="ddSindTipo${n}" onchange="calcSalario(this.form);"
                                style="width: 110px;">
                                <option value="nao" selected>Não filiado</option>
                                <option value="sim">Filiado</option>
                            </select>
                            <input type="text" name="txSindicato" value="R$ 0,00" readonly />
                        </label>
                    </div>
                    <div id="tab-outros${n}" class="tab-content tab-content${n}">
                      <h4 style="margin: 0.5em 0 0 0;">Rendimentos</h4>
                      <div class="tab-content_col" >
                          <label for="numOutrosRendTrib${n}" style="display: inline-block;width: 85px;">Tributáveis:</label>
                          R$ <input type="number" name="numOutrosRendTrib" id="numOutrosRendTrib${n}" min="0"
                              max="20000" step="0.01" value="0" style="width: 70px;"
                              onKeyPress="calcSalario(this.form);" onKeyDown="calcSalario(this.form);"
                              onKeyUp="calcSalario(this.form);" onClick="calcSalario(this.form);" />
                          IR <input type="checkbox" name="outrosIR" id="outrosIR${n}" value="0"
                                  onClick="calcSalario(this.form);" />
                          FEPA <input type="checkbox" name="outrosFEPA" id="outrosFEPA${n}" value="0"
                                  onClick="calcSalario(this.form);" />
                      </div>
                      <div style="display: block;">
                          <label for="numOutrosRendIsnt${n}" style="display: inline-block;width: 85px;">Isentos:</label>
                          R$ <input type="number" name="numOutrosRendIsnt" id="numOutrosRendIsnt${n}" min="0"
                              max="20000" step="0.01" value="0" style="width: 70px;"
                              onKeyPress="calcSalario(this.form);" onKeyDown="calcSalario(this.form);"
                              onKeyUp="calcSalario(this.form);" onClick="calcSalario(this.form);" />
                      </div>
                      <h4 style="margin: 0.5em 0 0 0;">Descontos</h4>
                      <div style="display: block;">
                          <label for="numOutros${n}" style="display: inline-block;width: 85px;">Descontos:</label>
                          R$ <input type="number" name="numOutros" id="numOutros${n}" min="0" max="10000" step="0.01"
                              value="0" style="width: 80px;" onKeyPress="calcSalario(this.form);"
                              onKeyDown="calcSalario(this.form);" onKeyUp="calcSalario(this.form);"
                              onClick="calcSalario(this.form);" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divresults">
                    <ul class="tabs-menu tabs-menu${n+1}">
                        <li class="current"><a href="#tab-resumo${n}">Resumo</a></li>
                        <li><a href="#tab-detail${n}">Detalhamento</a></li>
                    </ul>
                    <div class="tabresults">
                        <div class="tab-content${n+2} tab-resumo" id="tab-resumo${n}">
                            <div class="divresults_col" style="float: left;">
                                <label>Vencimento:<input type="text" name="txVB" value="0" readonly /></label>                                
                                <label>Adicionais:<input type="text" name="txAdicionais" value="0" readonly /></label>
                                <label>Outros:<input type="text" name="txOutros" value="0" readonly /></label>
                                <label>Bruto:<input type="text" name="txBruto" value="0" readonly /></label>
                                <label>AQ:<input type="text" name="txQualif" value="R$ 0,00" readonly /></label>
                                <label>Líquido:<input type="text" name="txResult" value="0" readonly /></label>
                            </div>
                            <div class="divresults_col">

                                <label style="display: none;">Base FEPA:<input type="text" name="txbINSS" value="0" readonly /></label>
                                <label>Base IRRF:<input type="text" name="txbIRRF" value="0" readonly /></label>
                                <label>IRRF:<input type="text" name="txIrrf" value="0" readonly /></label>
                                <label>FEPA:<input type="text" name="txInss" value="0" readonly /></label>                                
                                <label>Descontos:<input type="text" name="txdesconto" value="0" readonly /></label>
                            </div>
                        </div>
                        <div id="ticketdiv${n}" style="font-style: italic;">
                            <label>
                                C/ ticket alimentação:
                                <input type="text" name="txCticket" value="0" readonly />
                            </label>
                        </div>
                        <div class="tab-content${n+2} tab-details" id="tab-detail${n}">
                            <h4>Rendimentos</h4>
                            <div class="tabdetails-info" id="tabdetails-rend-${n}"></div>
                            <h4>Descontos</h4>
                            <div class="tabdetails-info" id="tabdetails-desc-${n}"></div>
                            <h4>Informações Adicionais</h4>
                            <div class="tabdetails-info" id="tabdetails-outros-${n}"></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <br />`;
}

function renderAllForms() {
    const container = document.getElementById("form-container");
    container.innerHTML = renderForm(1) + renderForm(2);
    /* ativarTabs(); */
}

/* function ativarTabs() {
    // Ativa o comportamento de tabs para todas as simulações
    [1, 2].forEach(function(n) {
        const menuSelector = `.tabs-menu a`;
        document.querySelectorAll(menuSelector).forEach(function(link) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const parent = link.closest("ul");
                const sim = n;
                parent.querySelectorAll("li").forEach(li => li.classList.remove("current"));
                link.parentElement.classList.add("current");
                document.querySelectorAll(`.tab-content`).forEach(tab => tab.style.display = "none");
                const tabId = link.getAttribute("href");
                document.querySelector(tabId).style.display = "block";
            });
        });
    });
}
 */
window.addEventListener("DOMContentLoaded", renderAllForms);
