function gen_fiche(passParCables, actSeatByCol) {

    // Liste Rens 'tr#lst_cables_rens'
    let codeCableRens = "";
    for (let i=0; i<nbCable; ++i) {
        codeCableRens += `<div>${"ABCD"[i]} : ___________________________</div>`;
    }

    // Liste cable 'tr#cable_name_lst'
    let codeCableNameLst = ""
    for (let i=0; i<nbCable-1; ++i) {
        codeCableNameLst += `<td>${"ABCD"[i]}</td>`;
    }
    codeCableNameLst += `<td class="bold-border-right">D</td>`;

    // Liste Option
    let codeOpt = "";
    codeOpt +='<tr>'
    codeOpt += `<td>${avionModel['part']['spec']}</td>`
    for (const i in avionModel["paras"]) {
        if (i != nbCable-1)
            codeOpt += `<td>${avionModel["paras"][i]}</td>`;
        else
            codeOpt += `<td class="bold-border-right">${avionModel["paras"][i]}</td>`;
    }
    codeOpt += `<td>${avionModel["paras"].reduce((a,b)=>a+b)}</td></tr>`;

    // Corps `tbody#tot_princ`
    let codeTBody = "";
    const corp = document.querySelector(`tbody#tot_princ`);
    for (let i=0; i<8; ++i) {
        codeTBody += `<tr><td>${i+1}</td>`;
        for (let c=0; c<nbCable-1; ++c) {
            codeTBody += `<td>${passParCables[i][c]}</td>`;
        }
        codeTBody += `<td class="bold-border-right">${passParCables[i][nbCable-1]}</td>`;
        codeTBody += `<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\n`;
    }
    codeTBody += `<tr><td>TOTAL PAR CÂBLE</td>`;
    for (let c=0; c<nbCable-1; ++c) {
        codeTBody += `<td>${actSeatByCol[c]}</td>`;
    }
    codeTBody += `<td class="bold-border-right">${actSeatByCol[nbCable-1]}</td>`;
    codeTBody += `<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\n`;
    let s = 0;
    let tp = [];
    for (let idporte=0; idporte < porte.length; ++idporte) {
        s=0;
        for (const c of porte[idporte])
            s+=actSeatByCol[c-1];
        tp.push(s);
    }
    codeTBody += `<td>TOTAL PAR PORTE</td>
                    <td id="P1T" colspan="${nbCable/2}">${tp[0]}</td>
                    <td id="P2T" colspan="${nbCable/2}" class="bold-border-right">${tp[1]}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>`;
    

    document.querySelector('div.print').innerHTML = `
<div class="header">
    FICHE DE LARGAGE <a id="txt_pt_nom_avion">${shNamePlane}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>
<div class="container">
    <div class="section">
        <h3>Séance du :</h3>
        <h3>Chef de transport : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Emargement :</h3>
    </div>
    <div class="top-right-box">
        <div style="text-align: center; font-size: normal;"><b>Inspection</b></div>
        <div id="lst_cables_rens">
        ${codeCableRens}
        </div>
    </div>
    <div class="section">
        <table>
            <thead>
                <tr>
                    <th id="col_cable_plus" colspan="${1+nbCable}" class="bold-border-right">CHEF LARGUEUR</th>
                    <th colspan="8">COMMANDANT DE BORD</th>
                </tr>
                <tr>
                    <td rowspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td id="col_cable" colspan="${nbCable}" class="bold-border-right">CÂBLES</td>
                    <td rowspan="2">Total</td>
                    <td rowspan="4">Hauteur</td>
                    <td rowspan="4">Vent max autorisé</td>
                    <td rowspan="4">Type sortie / Issues de largage</td>
                    <td rowspan="4">Parachutes</td>
                    <td rowspan="4">Types gaines</td>
                    <td rowspan="4">Colis</td>
                    <td rowspan="4">Masse totale par passage</td>
                </tr>
                <tr id="cable_name_lst">
                ${codeCableNameLst}
                </tr>
                ${codeOpt}
            </thead>
            <tbody id="tot_princ">
                <tr class="bold-border-bottom"></tr>
                ${codeTBody}
            </tbody>
        </table>
    </div>
    <div class="totals">
        <div>
            <table>
                <tbody>
                    <tr>
                        <td colspan="2">
                            <div class="justlr"><span>PARA ÉQUIPÉS (SOGH)</span><span><b>160 kg</b></span></div>
                        </td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="justlr"><span>PARA ÉQUIPÉS (EPC)</span><span><b>165 kg</b></span></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="justlr"><span>PARA ÉQUIPÉS</span><span><b>130 kg</b></span></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="justlr"><span>PARA ÉQUIPÉS MUSETTE</span><span><b>110 kg</b></span></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="justlr"><span>PARA NON ÉQUIPÉS</span><span><b>100 kg</b></span></div>
                        </td>
                        <td></td>
                    </tr>
                    <tr><th colspan="2">TOTAL PARAS</th><th></th></tr>
                    <tr><td colspan="2">TID</td><td></td></tr>
                    <tr><td rowspan="2">COLIS</td><td>NOMBRE</td><td></td></tr>
                    <tr><td>MASSE TOTALE</td><td></td></tr>
                    <tr><td colspan="2">PASSAGERS</td><td></td></tr>
                    <tr><td colspan="2">LARGUEURS</td><td></td></tr>
                    <tr><th colspan="2">TOTAL GÉNÉRAL</th><th></th></tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <tbody>
                    <tr><td>APPAREIL SÉCU</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
                    <tr><td>ZMT</td><td></td></tr>
                    <tr><td>H. DÉCO</td><td></td></tr>
                    <tr><td>H. POSER</td><td></td></tr>
                    <tr><td>DURÉE DE VOL</td><td></td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
`;
}