const canvas = document.getElementById('gameScreen');
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const screenCenter = {x: canvas.width/2, y: canvas.height/2};
const gameObjects = [];
const projectiles = [];
const enemies = [];

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
        const angle = Math.atan2(y-this.position.y, x-this.position.x);
        let ySpeed = Math.sin(angle);
        let xSpeed = Math.cos(angle);
        // if (xSpeed > 0) {xSpeed +=1;}
        // if (xSpeed < 0) {xSpeed -=1;}
        // if (ySpeed > 0) {ySpeed +=1;}
        // if (ySpeed < 0) {ySpeed -=1;}
        
        projectiles.push(
            new Projectile(
                this.position.x, 
                this.position.y, 
                xSpeed, 
                ySpeed,
                this.ctx
                )
             );
    }

}

class Projectile{
    constructor(playerX, playerY, xSpeed, ySpeed, ctx){
        this.ctx = ctx;
        this.position = {x: playerX, y: playerY};
        this.speed = {x: xSpeed, y: ySpeed};
        this.color = '#6eff2b';
        this.radius = 10;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0 ,2 * Math.PI);
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath();
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.draw()
    }

    isOnScreen() {
        if (this.position.x > 0 && this.position.x < canvas.width){
            if (this.position.y > 0 && this.position.y < canvas.height){
                return true;
            }
        }

        return false;
    }
}

class Enemy{
    constructor(spawnX, spawnY, xSpeed, ySpeed, ctx, radius){
        this.radius = radius + 10;
        this.ctx = ctx;
        this.position = {x: spawnX, y: spawnY};
        this.speed = {x: xSpeed, y: ySpeed};
        this.color = '#2f477a';
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0 ,2 * Math.PI);
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath();
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.draw()
    }
}

class InputHandler{
    constructor(player){
        this.player = player;
        addEventListener('click', ev => {
            this.player.shootTowards(ev.clientX, ev.clientY);
        });
    }
}

const player = new Player(screenCenter.x, screenCenter.y, '#FF0000', 20, ctx);
const inputHandler = new InputHandler(player);
gameObjects.push(player);

function spawnEnemies() {
    setInterval(() =>{
        let x;
        let y;
        const radius = Math.random() * 30;
        if (Math.random() < 0.5) {
            x=Math.random() < 0.5? Math.random() * canvas.width: 0;
            y=Math.random() * canvas.height;
        }else{
            x=Math.random() * canvas.width;
            y=Math.random() <0.5? Math.random() * canvas.height: 0;
        }
        const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x);
        let ySpeed = Math.sin(angle);
        let xSpeed = Math.cos(angle);
        enemies.push(new Enemy(x,y, xSpeed, ySpeed, ctx, radius));
        console.log(enemies);
    }, 1000);
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    gameObjects.forEach(obj => obj.update());
    projectiles.forEach((projectile, index) =>{
        if (projectile.isOnScreen()){
            console.log('is on screen');
            projectile.update()
        }else{
            projectiles.splice(index, 1);
            console.log('is not on screen')
        }
    })

    enemies.forEach(enemy => enemy.update());
}

animate();
spawnEnemies();