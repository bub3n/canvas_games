// setup canvas and context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// setup canvas size and color
canvas.width = 1024
canvas.height = 575
// fill by rectangle
c.fillRect(0, 0, canvas.width, canvas.height)

var jump = false
var jump_enemy = false
var jump_player = false
var jump_start_enemy = 0
var jump_start_player = 0
const jump_height = 100
const image_player = new Image();
const image_enemy = new Image();
image_player.src = "data/Sprites/player/Idle.png"
image_enemy.src = "data/Sprites/enemy/Idle.png"


const frameRate = 5;

const gravity = 0.2
// method for defining sprite object
class Sprite {
  constructor({ position, velocity, color, sprite }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.sprite = sprite

    this.frame_number = 0
    this.frameCount = 0
  }

  // draw characer function
  draw() {
    c.fillStyle = this.color
    //if this.sprite.idle.revert {
    //    c.scale(-1, 1);
    //} else {
    //    c.scale(1, 1);
    //}
    //c.scale(-1,1);
    //c.scale(-1, 1);
    c.drawImage(this.sprite.idle.image, this.sprite.idle.width*this.frame_number, 0, this.sprite.idle.width, this.sprite.idle.height, this.position.x, this.position.y, this.sprite.idle.width, this.sprite.idle.height)

    this.frameCount += 1
    if (this.frameCount % 15 === 0) {
        if (this.frame_number == this.sprite.idle.frames_count) {
            this.frame_number = 0
        } else {
            this.frame_number +=1
        }
    }
  }

  // update positions
  update() {
    // draw rectangle
    this.draw()
    // move rectangle
    this.position.y += this.velocity.y


    if ( jump == true ) {
        // go up if still in jump
        if ( this.position.y - this.velocity.y >= jump_end_player ) {
            console.log(this.velocity.y)
            this.velocity.y -= gravity
        // disable jump on and of jump
        } else {
            jump = false
            this.velocity.y = 0
        }
    } else {
        // fall on ground
        if ( this.position.y + this.sprite.idle.height + this.velocity.y >= canvas.height ){
            this.velocity.y = 0
        // stop on ground
        } else {
            this.velocity.y += gravity
        }
    }
  }
}

// create object player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    sprite: {
        idle: {
            image: image_player,
            width: 200,
            height: 200,
            frames_count: 3,
            actual_frame: 0
        }
    },
    revert: false
})
// debug player object
console.log(player)

// create enemy object
const enemy = new Sprite({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    image: image_enemy,
    sprite: {
        idle: {
            image: image_enemy,
            width: 126,
            height: 126,
            frames_count: 9,
            actual_frame: 0
        }
    },
    revert: true
})
// debug enemy object
console.log(enemy)



// function that is called on every request on animation
function animate() {
    // do llop of itself
    window.requestAnimationFrame(animate)
    // fill back with black
    c.fillStyle = 'black'
    // clean background on every call
    c.fillRect(0, 0, canvas.width, canvas.height)
    // reanimate characters
    player.update()
    enemy.update()
}

// something like main for animation
animate()


// add handler for listening on key press
window.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key == " "){
        console.log("OH yeeeeeee")
        jump = true
        jump_end_enemy = enemy.position.y - jump_height
        jump_end_player = player.position.y - jump_height
    }
})