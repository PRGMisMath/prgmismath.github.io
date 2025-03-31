// Variable HTML
const plane = document.getElementById('plane');
const rowsInput = document.getElementById('rows');
const applyButton = document.getElementById('apply-options');
const cat_sel = document.querySelector('select#plane-cat');
const type_sel = document.querySelector('select#plane-type');
const spec_sel = document.querySelector('select#plane-spec')


const DEF_VAL_SEL = '<option value="" disabled hidden selected style="color:gray;">Sélectionnez une option</option>';

var seats = []; // [rang][col]


// Variable de l'avion
var avionModel;
var nbCable;
var nbParas;
var seatByCol;
var porte;
var speed;
var totPara;
var totParaPorte = [];
var namePlane;
var shNamePlane;
var saut_type;

// Variable de la ZMT
var longZMT;
var largZMT;
var hautLarg;


var catsHandler = {};

/// CHAT-GPT (ie pas ma faute si ca fait nawak)
function distributeVisitors(queues, visitors) {
    // Créer un tableau d'objets avec index original et capacité
    const indexedQueues = queues.map((cap, index) => ({ index, cap }));
    
    // Trier les files par capacité décroissante
    indexedQueues.sort((a, b) => b.cap - a.cap);
    
    // Trouver le nombre minimal de files nécessaires
    let sum = 0;
    let k = 0;
    while (k < indexedQueues.length && sum < visitors) {
        sum += indexedQueues[k].cap;
        k++;
    }
    
    // Sélectionner les k plus grandes files
    const selected = indexedQueues.slice(0, k);
    
    // Allouer les visiteurs selon la méthode équilibrée
    const allocations = new Array(k).fill(0);
    let remaining = visitors;
    
    // Première passe : allocation équilibrée
    for (let i = 0; i < k; i++) {
        const fairShare = Math.ceil(remaining / (k - i));
        const alloc = Math.min(fairShare, selected[i].cap);
        allocations[i] = alloc;
        remaining -= alloc;
    }
    
    // Deuxième passe : répartition du reste
    if (remaining > 0) {
        for (let i = 0; i < k; i++) {
            if (remaining <= 0) break;
            const available = selected[i].cap - allocations[i];
            if (available > 0) {
                const add = Math.min(available, remaining);
                allocations[i] += add;
                remaining -= add;
            }
        }
    }
    
    // Construire le résultat final
    const result = new Array(queues.length).fill(0);
    for (let i = 0; i < k; i++) {
        result[selected[i].index] = allocations[i];
    }
    
    return result;
}


/**
 * @param {String} forme 
 * @returns 
 */
function toListForme(forme) {
    let lst_forme = [];
    let splt = forme.split(',');
    for (var s of splt) {
        let ar_star = s.split('*');
        let rep = 1;
        if (ar_star.length == 2)
            rep = parseInt(ar_star[1]);
        for (let i = 0; i < rep; i++) {
            lst_forme.push(ar_star[0].split(''));
        }
    }
    rowSize = lst_forme[0].length;
    return lst_forme;
}




///
/// Fonctions gerant l'avion
///


// Fonction chargeant le type d'avion
function loadPlane(pts) {
    avionModel = pts;
    namePlane = pts['nom'];
    shNamePlane = pts['pt_nom'];
    nbCable = pts['format']['cables'].length;
    seatByCol = pts['paras'];
    porte = pts['format']['portes'];
    speed = pts['vit'];
    totPara = seatByCol.reduce((a,b) => a+b, 0);
    document.querySelector("#txt_tot_para").textContent = "Nombre de parachutistes (max " + totPara.toString() + ")";
    totParaPorte = Array(porte.length).fill(0);
    for (let i = 0; i<porte.length; ++i) {
        totParaPorte[i] = 0;
        for (const id of porte[i])
            totParaPorte[i] += seatByCol[id-1];
    }
    createPlane(pts['apparence']);
}


/**
 * Cree l'avion a partir de la forme
 * @param {String} forme 
 */
function createPlane(forme) {
    let lst_forme = toListForme(forme);
    seats = [];
    for (let i = 0; i < rowSize; ++i)
        seats.push([]);
    plane.innerHTML = "";
    plane.style.gridTemplateColumns = `repeat(${rowSize}, 1fr)`;
    for (var row_forme of lst_forme) {
        for (var cf of row_forme) {
            if (cf == '0') {
                const aisle = document.createElement('div');
                aisle.className = 'box aisle';
                plane.appendChild(aisle);
            } else if (cf == 'X') {
                const block = document.createElement('div');
                block.className = 'box block';
                plane.appendChild(block);
            } else if (cf == 'R') {
                const resSeat = document.createElement('div');
                resSeat.className = 'box reserved';
                resSeat.textContent = 'Π';
                plane.appendChild(resSeat);
            } else if (cf == '<' || cf == '>') {
                const exit = document.createElement('div');
                exit.className = 'box exit';
                exit.textContent = ((cf == '<') ? '⇐' : '⇒');
                plane.appendChild(exit);
            } else {
                const seat = document.createElement('div');
                seat.className = 'box seat_free';
                seat.textContent = 'Π';
                plane.appendChild(seat);

                seats[parseInt(cf) - 1].push(seat);
            }
        }
    }
    for (let i=0; i<nbCable; ++i) {
        seats[i].reverse();
    }
}



///
/// Fonctions pour le calcul des passages
///

function verSecu() {
    if (nbParas > totPara) {
        alert("L'avion acceuille au maximum " + totPara.toString() + " parachutistes.")
    }
    if (largZMT < hautLarg){
        alert("La PIA TAP-MAT 1/2 stipule que la largeur de la ZMT doit être plus grande que la hauteur de largage (art 7070).");
        return false;
    }
    if (longZMT < 300){
        alert("La PIA TAP-MAT 1/2 stipule que la longueur de la ZMT doit être d'au moins 300m (art 7073).");
        return false;
    }
    return true;
}

function calcNbPassages() {
    if (!verSecu())
        return;

    const descr_larg = document.querySelector("#txt_descr");
    var passParCables = [];
    for (let i=0; i<8; ++i) {
        passParCables.push([]);
        for (let j=0; j<nbCable; ++j)
            passParCables[i].push(0);
    }
    let secSortieParPara = 0;
    if (saut_type == 'pos')
        secSortieParPara = 2;
    else if (saut_type == 'eq')
        secSortieParPara = (avionModel["isA400M"]) ? 1.5 : 2;
    else
        secSortieParPara = 1;

    let actHaut = hautLarg;
    if (document.querySelector("#marge").checked)
        actHaut = 0;

    let actSeatByCol = distributeVisitors(seatByCol, nbParas);
    let actTotParaPorte = Array(porte.length).fill(0);
    for (let i = 0; i<porte.length; ++i) {
        actTotParaPorte[i] = 0;
        for (const id of porte[i])
            actTotParaPorte[i] += actSeatByCol[id-1];
    }

    let persParPassParPorte = Math.floor((longZMT - actHaut) / speed / secSortieParPara) + 1;
    let nbPassages = Math.ceil(Math.max(...actTotParaPorte) / persParPassParPorte);
    if (nbPassages == 1) { // 1 seul passage
        descr_larg.textContent = `1 seul passage !`;
        for (let idporte = 0; idporte<porte.length; ++idporte) {
            for (const id of porte[idporte]){ // id : numero du cable
                for (let i=0; i < actSeatByCol[id-1]; ++i) { // Enleve les sieges non remplis
                    const seat = seats[id-1][i];
                    seat.textContent = '1';
                    seat.className = 'box seat_occ';
                }
            }
        }
        passParCables[0] = actSeatByCol;
    }
    // Ici on part du fait que tous les avions ont 2 portes !!
    else if (nbPassages == 2 && Math.max(...actTotParaPorte) <= persParPassParPorte) { // Passages cable par cable (avion a 4 cables et 2 portes)
        descr_larg.textContent = `2 passages : cable A et D puis B et C !`;
        let n = 0;
        for (let idporte = 0; idporte<porte.length; ++idporte) {
            n=1;
            for (const id of porte[idporte]){ // id : numero du cable
                for (let i=0; i < actSeatByCol[id-1]; ++i) { // Enleve les sieges non remplis
                    const seat = seats[id-1][i];
                    seat.textContent = n.toString();
                    seat.className = 'box seat_occ';
                }
                passParCables[n-1][id-1] = actSeatByCol[id-1];
                ++n;
            }
        }
    }
    else {
        descr_larg.textContent = nbPassages.toString() + " passages !";
        // Pour chaque porte
        for (let idporte=0; idporte<porte.length; ++idporte) {
            // On equilibre les personnes par passages.
            let actpers = Math.min(persParPassParPorte, Math.ceil(actTotParaPorte[idporte] / nbPassages));
            let countPass = 0, iPass = 1;
            let lid;
            for (const id of porte[idporte]) { // id : numero du cable
                lid = id;
                for (let i=0; i < actSeatByCol[id-1]; ++i) { // Enleve les sieges non remplis
                    const seat = seats[id-1][i];
                    seat.textContent = iPass.toString();
                    seat.className = 'box seat_occ';
                    passParCables[iPass-1][id-1] += 1;
                    countPass++;
                    if (countPass >= actpers) {
                        countPass = 0;
                        iPass++;
                    }
                }
            }
            passParCables[iPass-1][porte[idporte][lid]] = countPass;
        }
    }
    console.log(passParCables);
    gen_fiche(passParCables,actSeatByCol);
}



// Fonction pour mettre a jour les rangees
function updateRows() {
    longZMT = parseInt(document.querySelector("input#long_zat").value);
    largZMT = parseInt(document.querySelector("input#larg_zat").value);
    nbParas = parseInt(document.querySelector("input#nb_para").value);
    hautLarg = parseInt(document.querySelector("input#haut_larg").value);
    saut_type=document.querySelector('input[name="saut"]:checked').value;
    loadPlane(
        plane_types[rem_plane_id]
    );
    calcNbPassages();
}


///
/// Fonctions pour gerer les listes imbriquées
///
var rem_cat = null;
var rem_type = null;
var rem_plane_id = -1;
function catChanged(cat_name) {
    type_sel.innerHTML = DEF_VAL_SEL;
    rem_cat = cat_name;
    document.querySelector("div#spec").style = 'display:none;';
    document.querySelector("div#type").style = '';
    for (const type of Object.keys(catsHandler[cat_name])) {
        const type_opt = document.createElement('option');
        type_opt.value = type;
        type_opt.text = type;
        type_sel.appendChild(type_opt);
    }
}

function typeChanged(type_name) {
    spec_sel.innerHTML = DEF_VAL_SEL;
    rem_type = type_name;
    const lspec = catsHandler[rem_cat][type_name];
    if (lspec.length == 1) {
        rem_plane_id = lspec[0][0];
        loadPlane(plane_types[lspec[0][0]]);
        return;
    }
    document.querySelector("div#spec").style = '';
    document.querySelector("div#type").style = '';
    for (let spec of lspec) {
        const type_opt = document.createElement('option');
        type_opt.value = spec[0];
        type_opt.text = spec[1];
        spec_sel.appendChild(type_opt);
    }
}

// Ajoute les options et charges l'avion par défaut
let incr = 0;
for (const pts of plane_types) {
    const part = pts['part'];
    if (!(part['cat'] in catsHandler)) {
        catsHandler[part['cat']] = {};
    }
    let scat = catsHandler[part['cat']];
    if (!(part['type'] in scat)) {
        scat[part['type']] = [];
    }
    scat[part['type']].push([incr,part['spec']]);
    ++incr;
}
for (const cat of Object.keys(catsHandler)) {
    const cat_opt = document.createElement('option');
    cat_opt.value = cat;
    cat_opt.text = cat;
    cat_sel.appendChild(cat_opt);
}


applyButton.addEventListener('click', updateRows);