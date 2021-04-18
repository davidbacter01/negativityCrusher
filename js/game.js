const canvas = document.getElementById('gameScreen');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

const screenCenter = {x: canvas.width/2, y: canvas.height/2};
const gameObjects = [];

class Player {
    constructor(x, y, color, radius, ctx){
        this.position = {x: x, y: y};
        this.color = color;
        this.radius = radius;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0 ,2 * Math.PI);
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath();
    }

    update(){
        this.draw();
    }

    shootTowards(x, y){
        // create a projectile
        // start moving it towards xy coordinates
    }

}

const player = new Player(screenCenter.x, screenCenter.y, '#FF0000', 20, ctx);
gameObjects.push(player);

function animate(){
    requestAnimationFrame(animate);
    gameObjects.forEach(obj => obj.update());
}

animate();