class GameLoop {


    constructor() {
        this.fps = 60;
        this.ctx = null;
        this.cnv = null;
        this.loop = null;
    }

    prepareCanvas() {
        this.cnv = document.getElementById("cnv");
        this.ctx = this.cnv.getContext("2d");
        document.body.style.margin = 0;
        document.body.style.padding = 0;
        this.onresize();
    }

    onresize() {
      if (this.cnv) {
        console.log("resizing canvas");
        this.cnv.widht = window.innerWidth;
        this.cnv.height = window.innerHeight;
        this.resize();
    }}

    toggleScreen(id, toggle) {
        let element = document.getElementById(id);
        let display = ( toggle ) ? "block" : "none";
        element.style.display = display;
    }
    
    init() {
        console.log("gameloop initialising...");

    }

    resize() {
        console.log("gameloop resizing");
    }

    update() {

    }
    render() {
        console.log("gameloop rendering...");
    }

    start() {
        this.toggleScreen("start-screen", false);
        this.toggleScreen("cnv", true);
        this.toggleScreen("start-screen", false);
        this.prepareCanvas();
        this.init();
        this.loop = setInterval(() => {
            this.update();
            this.render();
        }, 1000/this.fps);

    }
        stop() {
        this.toggleScreen("start-screen", false);
        this.toggleScreen("cnv", false);
        this.toggleScreen("gameover-screen", true);
        clearInterval(jubba);

        }
        
    
}

console.log("oasosao");


