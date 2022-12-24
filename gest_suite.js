var Graph = {
    taille: {X: window.innerWidth/4*3,Y: window.innerHeight-87},
    coordsX: {min: 0,max: 20,step: 1},
    coordsY: {min: -10,max: 10,step: 1},
    nMax: 20
};
var listOfSuite = [];

function GraphGen() {
    var panel = document.querySelector("div#grid svg#panel");

    var gridLayout='<!--X-->';
    var coords = Graph.coordsX;
    for (let x=Math.round(coords.min / coords.step) * coords.step; x<=coords.max; x+=coords.step)
        gridLayout+=`<path d='M ${(x-coords.min) / (coords.max-coords.min) * Graph.taille.X} 0 v ${Graph.taille.Y}' class='${(x==0) ? "axis" : "grid"}'></path>`;

    gridLayout+='<!--Y-->';
    coords = Graph.coordsY;
    for (let y=Math.round(coords.min / coords.step) * coords.step; y<=coords.max; y+=coords.step)
        gridLayout+=`<path d='M 0 ${(1 - (y-coords.min) / (coords.max-coords.min)) * Graph.taille.Y} h ${Graph.taille.X}' class='${(y==0) ? "axis" : "grid"}'></path>`;
    panel.innerHTML += gridLayout;
}

function Draw() {
    var panel = document.querySelector("div#grid svg#panel");
    panel.innerHTML='';

    GraphGen();

    var coordsX = Graph.coordsX;
    var coordsY = Graph.coordsY;
    var drawing = "<!--Drawing-->";
    for (const suite of listOfSuite) {
        let n=0;
        drawing+=`<path d='M`;
        for (n=0; n<=Graph.nMax; ++n) {
            drawing+=` ${(n-coordsX.min) / (coordsX.max-coordsX.min) * Graph.taille.X},${(1 - (eval(suite.def)-coordsY.min) / (coordsY.max-coordsY.min)) * Graph.taille.Y}`;
        }
        drawing+=`' class='suite' id='${suite.name}'></path>`
    }
    panel.innerHTML+=drawing;
}

function add_suite(){
    document.querySelector("div.dialog").style="";
}

function check_entry() {
    var name = document.querySelector("input#suite_nom").value;
    var def = document.querySelector("input#suite_def").value;
    def = def.replace("sqrt","Math.sqrt").replace("log","Math.log").replace("log10","Math.log10").replace("exp","Math.exp").replace("sin","Math.sin").replace("cos","Math.cos").replace("tan","Math.tan").replace('^',"**");
    if (name == '')
        return false;
    for (const suite of listOfSuite) {
        if (name == suite.name)
            return false;
    }
    try {
        let n=0;
        eval(def);
    } catch (error) {
        return false;
    }
    return true;
}

function updateSubBtt(e) {
    var btt = document.querySelector("button#submit");
    if (check_entry(e))
        btt.style = "background-color:green;";
    else
        btt.style = "background-color:red;"
}

function create_suite(e){
    var name = document.querySelector("input#suite_nom").value;
    var def = document.querySelector("input#suite_def").value;

    if (!check_entry(e))
        return;
    var color = `rgb(${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)})`;
    document.querySelector("style#suite_color").innerHTML+=`
        path.suite#${name} {
            stroke: ${color}
        }
        div.suite_box#${name} p.circle {
            color: ${color}
        }
    `;
    document.querySelector("div#contSuite").innerHTML += `<div class="suite_box" id="${name}"><p class="circle">&ofcir;</p><p>${name}(n)=${def}</p></div>`;
    def = def.replace("sqrt","Math.sqrt").replace("log","Math.log").replace("log10","Math.log10").replace("exp","Math.exp").replace("sin","Math.sin").replace("cos","Math.cos").replace("tan","Math.tan").replace('^',"**");
    listOfSuite.push({name: name, def: def});
    Draw();
    document.querySelector("div.dialog").style="display:none";
}

function name_input(obj){
    obj.value=obj.value.charAt(obj.value.length-1);
    document.querySelector('label#name').innerHTML=obj.value+((obj.value!='')?'(n)&equals;':'');
}

window.onresize = resize;

function resize(e){
    Graph.taille={X: window.innerWidth/4*3,Y: window.innerHeight-87};
    document.querySelector('div#ItemSuite').style=`height:${window.innerHeight-83}px;`;
    document.querySelector('svg#panel').style=`height:${Graph.taille.Y}px;width:100%;`;
    document.querySelector('svg#panel').viewBox=``;
    Draw();
}