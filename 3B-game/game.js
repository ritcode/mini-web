let cntx = document.querySelector('canvas').getContext("2d")

cntx.canvas.width= 1080
cntx.canvas.height= 400

let gravity = 0.09
let jspeed=7.2
let obVel = 1
let maxGap = 1000
let minGap = 200
let score = 0
let level =0


let player = {
    x:50,
    y:300,
    yVel:jspeed,
    jumping: false,
    jump: function () {
        if (player.y <= 300 && this.jumping == true) {
            player.y -=player.yVel
            player.yVel-=gravity
        }
        else if (player.yVel==jspeed) {} //Do nothing
        else {
            player.y=300
            player.yVel=jspeed
            player.jumping =false
        }
    },
    draw: function () {
        cntx.beginPath()
        cntx.rect(player.x, player.y, 50,50)
        cntx.fillStyle = "green"
        cntx.fill()
        cntx.closePath()
        
    },
    now: function () {
        player.jumping = true
    }
}
class obstacle {
     x=1100
     y=350
     base=50
     height=80
     static xpre=1100  //abscissa of previous obstacle 
     constructor() {
        this.x = Math.floor(Math.random()*(maxGap-minGap))+obstacle.xpre+minGap
        this.base = Math.floor(Math.random()*31)+20
        this.height = Math.floor(Math.random()*31)+50
        obstacle.xpre=this.x
     }
    draw() {
        cntx.beginPath()
        cntx.moveTo(this.x,this.y)
        cntx.lineTo(this.x + this.base, this.y)
        cntx.lineTo(this.x+this.base/2, this.y-this.height)
        cntx.fillStyle="red"
        cntx.fill()
        cntx.closePath()
     }
     move() {
         this.x-=obVel
     }
}

function setup() {
    cntx.beginPath()
    cntx.rect(0,350, 1080,50)
    cntx.fillStyle = "black"
    cntx.fill()
    cntx.closePath()
    
    cntx.font="30px arial"
    cntx.fillText("Score : "+Math.floor(score/10), 850,50)

    cntx.font="30px arial"
    cntx.fillText("Level : "+level, 500,50)
}
let controller = {
    up: false,
    keyListener: function (event) {
      let key_state = (event.type == "keydown") ? true : false;
      switch (event.keyCode) {
        case 38: // up arrow
          controller.up = key_state;
          player.now() 
          break;
      }
    }
  }
  function changeLevel() {
      if((score)%5000===0) {
          obVel+=level/50
          jspeed+=level/7
          gravity+=level/100
          minGap+=200
          maxGap+=300
          level++

      }
  }

  function stopGame() {
      clearInterval(g)
      document.getElementById("area").style.opacity = "0.2";
      /*cntx.beginPath()
      cntx.fillRect(0,0,cntx.canvas.width, ntx.canvas.height)
      cntx.fillStyle = rgba(50,50,50,0.5)
      cntx.fill()*/
  }

  let obs= [0,0,0,0,0,0,0,0,0,0]
  for (let i = 0; i < obs.length; i++) {
      obs[i]=new obstacle();
  }

function draw () {      //loop draw
    changeLevel()
    score+=level

    cntx.clearRect(0, 0, cntx.canvas.width, cntx.canvas.height)
    setup()
    player.draw()

    player.jump()

    for (let i = 0; i < obs.length; i++) {
        obs[i].draw()
        obs[i].move()
        if(obs[i].x+obs[i].base<0) {
            delete obs[i]
            obs[i] = new obstacle()
        }
        if(collision(i)) {
            stopGame()
        }
    }

}
function collision(i) {     //Detects collision
    if(player.x+50<=(obs[i].x+obs[i].base) && player.x+50>=obs[i].x && player.y+50<=obs[i].y && player.y+50>=obs[i].y-obs[i].height/3)
        return true
    else if (player.x<=(obs[i].x+obs[i].base) && player.x>=obs[i].x && player.y+50<=obs[i].y && player.y+50>=obs[i].y-obs[i].height/3)
        return true
    else return false
}

let g= setInterval(draw,10)
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);



