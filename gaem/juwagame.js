let KEY_SPACE = false; // 32
let KEY_UP = false; // 38
let KEY_DOWN = false; // 40
let cnv;
let ctx;
let backgroundImage = new Image()
let fps = 144;
let gameloop = new GameLoop();
let timer = 0;
let score = 0;

let juwa = {
    x: 1,
    y: 200,
    widht: 125,
    height: 200,
    src: 'img/juwamogus.png'
}
let quasos = [];
let quasoshoots = [];

function ScoreDraw() {}


function prepareCanvas() {
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");
    document.body.style.padding = 0;
    document.body.style.margin = 0;
    cnv.widht = window.innerWidth;
    cnv.height = window.innerHeight;
}

function fillCanvas() {
    ctx.fillStyle = "#1bafdb"
    ctx.fillRect(0,0, cnv.widht, cnv.height);
}

window.onload = function() {
    console.log('gameloop');
    prepareCanvas()
    loop = setInterval(() => {
        update();
        render();
    }, 1000/fps);
}

window.onload = function() {
    
    
}

window.onresize = function() {
    gameloop.onresize();
}

gameloop.init = function() {
    timer = 0;
    console.log();
}

gameloop.update = function() {
    timer++;
    console.log();
    if (timer > 999999) {
        gameloop.stop();
    }
}

gameloop.render = function() {
    console.log();
}

gameloop.resize = function() {
    console.log();
}



function update() {
    console.log('updating');
}

function render() {
    console.log('rendering');
    fillCanvas();
}



document.onkeydown = function (e) { //leertaste gedrückt
    if (e.keyCode == 32) {
        KEY_SPACE = true;}

    if (e.keyCode == 38) { // UP gedrückt
        KEY_UP = true;}

    if (e.keyCode == 40) {
        KEY_DOWN = true; }  // DOWN gedrückt
}

document.onkeyup = function (e) { //leertaste nicht gedrückt
    if (e.keyCode == 32) {
        KEY_SPACE = false;}

    if (e.keyCode == 38) { // UP nicht gedrückt
        KEY_UP = false;}


    if (e.keyCode == 40) {
        KEY_DOWN = false;}   // DOWN nicht gedrückt
}


function HitOrMiss() {
    quasos.forEach(function (quaso) {
        if (juwa.x + juwa.widht > quaso.x
            && juwa.y + juwa.height > quaso.y
            && juwa.x < quaso.x
            && juwa.y < quaso.y) {
                juwa.img.src = 'img/shububb.png';
                console.log('Collion!!!');
                quasos = quasos.filter(u => u != quaso);
                clearInterval(jubba)
}

    quasoshoots.forEach(function (quasoshoot) {
        if (quasoshoot.x + quasoshoot.widht > quaso.x 
            &&quasoshoot.y + quasoshoot.height > quaso.y 
            &&quasoshoot.x < quaso.x 
            &&quasoshoot.y < quaso.y + quaso.height) {
                quaso.hit = true;
                quaso.img.src = 'img/kablam.png';
                console.log('Collion!!!');

                setTimeout(() => {
                quasos = quasos.filter(u => u != quaso);
                }, 2000);
            }
        });
    });
}
 
function createquasos() {
    let quaso = {
        x: 1920,
        y: Math.random() * 969,
        widht: 150,
        height: 75,
        src: 'img/quaso.png',
        img: new Image()
    };
        quaso.img.src = quaso.src
        quasos.push(quaso)
}

function checkForShoot() {
    if (KEY_SPACE) {
        let quasoshoot = {
            x: juwa.x + 110,
            y: juwa.y + 22,
            widht: 200,
            height: 40,
            src: 'img/quasoshoot.png',
            img: new Image()
        };
        quasoshoot.img.src = quasoshoot.src;

        quasoshoots.push(quasoshoot)
        let quasosound = document.getElementById("quasosound");
        quasosound.play();
    }
}

function aktualisiert() {                              //standort (XY) von quaso u. Juwa werden hier aktualisiert
    if (KEY_UP) {
        juwa.y -= 5;}

    if (KEY_DOWN) {
        juwa.y += 5;}

     quasos.forEach(function (quaso) {
        if (!quaso.hit) {
            quaso.x -= 5;
        }
    });

    quasoshoots.forEach(function (quasoshoot) {
        quasoshoot.x += 10;
    });
}
function loadImages() {                                   // bilder von quaso etc werden hier gemalt
    backgroundImage.src = 'img/backgroundImage.jpg';  
    juwa.img = new Image();
    juwa.img.src = juwa.src;
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(juwa.img, juwa.x, juwa.y, juwa.widht, juwa.height);

    quasos.forEach(function (quaso) {
        ctx.drawImage(quaso.img, quaso.x, quaso.y, quaso.widht, quaso.height);
    });

    quasoshoots.forEach(function (quasoshoot) {
        ctx.drawImage(quasoshoot.img, quasoshoot.x, quasoshoot.y, quasoshoot.widht, quasoshoot.height);
    });

    requestAnimationFrame(draw);
}

window.addEventListener('click', () => {                  //  background musik 
    document.getElementById("bgm").play();
    document.getElementById("bgm").volume = 0.2
    
});


function startGame() {
            
    cnv = document.getElementById('cnv');
    ctx = cnv.getContext('2d');
    loadImages();
    draw();
    intervalId = jubba = setInterval(aktualisiert, 1000 / 144);
    setInterval(createquasos, 1000);
    setInterval(HitOrMiss, 1000 / 25)
    setInterval(checkForShoot, 1000 / 10);
    gameloop.start();
}