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


// constants
// actions
const jump_height = 100
// load images
// player
const image_player_idle = new Image();
image_player_idle.src = "data/Sprites/player/Idle.png"
const image_player_jump = new Image();
image_player_jump.src = "data/Sprites/player/Jump.png"
const image_player_fall = new Image();
image_player_fall.src = "data/Sprites/player/Fall.png"
const image_player_run = new Image();
image_player_run.src = "data/Sprites/player/Run.png"

// enemy
const image_enemy_idle = new Image();
image_enemy_idle.src = "data/Sprites/enemy/Idle.png"
const image_enemy_jump = new Image();
image_enemy_jump.src = "data/Sprites/enemy/Jump.png"
const image_enemy_fall = new Image();
image_enemy_fall.src = "data/Sprites/enemy/Fall.png"
const image_enemy_run = new Image();
image_enemy_run.src = "data/Sprites/enemy/Run.png"

const gravity = 0.05
const move_velocity = 0.05
const max_run_speed = 10
// method for defining sprite object
class Sprite {
  constructor({ position, velocity, color, sprite }) {
    this.position = position
    this.velocity = velocity
    this.color = color
    this.sprite = sprite

    // set defaults
    this.action = 'idle'
    this.jump = false
    this.frame_number = 0
    this.frameCount = 0
    this.move_velocity = 0
    this.move_x = 0
  }

  // change action and reset frame_number
  changeAction(action) {
    if (action != this.action) {
        this.action = action
        this.frame_number = 0
    }
  }

  // draw characer function
  draw() {
    c.fillStyle = this.color
    c.drawImage(this.sprite[this.action].image, this.sprite[this.action].width*this.frame_number, 0, this.sprite[this.action].width, this.sprite[this.action].height, this.position.x, this.position.y, this.sprite[this.action].width, this.sprite[this.action].height)

    this.frameCount += 1
    // change frame on every 15 counter
    if (this.frameCount % 15 === 0) {
        // reset frame if we are on end
        if (this.frame_number >= this.sprite[this.action].frames_count) {
            this.frame_number = 0
        // move to another frame
        } else {
            this.frame_number += 1
        }
    }
  }

  // update positions
  update() {
    // draw rectangle
    this.draw()

    // move rectangle
    this.position.y += this.velocity.y

    if ( this.jump == true ) {
        // go up if still in jump
        if ( this.position.y - this.velocity.y >= jump_end_player ) {
            this.velocity.y -= gravity
            this.changeAction('jump')
        // disable jump on end of jump
        } else {
            this.jump = false
            this.velocity.y = 0
        }
    } else {
        // fall on ground
        if ( this.position.y + this.sprite.idle.height + this.velocity.y >= canvas.height ){
            // change to idle if we are on ground - otherwise reset animation everytime
            if ( this.velocity.y != 0) {
                this.changeAction('idle')
            }
            this.velocity.y = 0
        // stop on ground
        } else {
            this.changeAction('fall')
            this.velocity.y += gravity
        }
    }
    if ( (Math.round(parseFloat(this.move_x)*100)/100) != 0 ) {
        console.log(this.move_x)
        this.position.x += this.move_x
        //this.move_x += (this.move_x*-1)
    } else {
        this.changeAction('idle')
    }
  }
}

// create object player
const player = new Sprite({
    position: {
        x: -50,
        y: 0
    },
    velocity: {
        x: 0.05,
        y: 0.05
    },
    sprite: {
        'idle': {
            image: image_player_idle,
            width: 200,
            height: 200,
            frames_count: 3
        },
        'jump': {
            image: image_player_jump,
            width: 200,
            height: 200,
            frames_count: 1
        },
        'fall': {
            image: image_player_fall,
            width: 200,
            height: 200,
            frames_count: 1
        },
        'run': {
            image: image_player_run,
            width: 200,
            height: 200,
            frames_count: 7
        }
    },
    revert: false
})

// create enemy object
const enemy = new Sprite({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0.05,
        y: 0.05
    },
    sprite: {
        'idle': {
            image: image_enemy_idle,
            width: 126,
            height: 155,
            frames_count: 9
        },
        'jump': {
            image: image_enemy_jump,
            width: 126,
            height: 155,
            frames_count: 2
        },
        'fall': {
            image: image_enemy_fall,
            width: 126,
            height: 155,
            frames_count: 2
        },
        'run': {
            image: image_enemy_run,
            width: 126,
            height: 155,
            frames_count: 7
        }
    },
    revert: true
})

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
    if (event.key == " " || event.key == "ArrowUp"){
        enemy.jump = true
        player.jump = true    
        jump_end_enemy = enemy.position.y - jump_height
        jump_end_player = player.position.y - jump_height
    }
    if (event.key == "ArrowLeft"){
        player.move_x += (player.velocity.x*-1)
        enemy.move_x += (enemy.velocity.x*-1)
        player.changeAction('run')
        enemy.changeAction('run')
    }
    if (event.key == "ArrowRight"){
        player.move_x += player.velocity.x
        enemy.move_x += enemy.velocity.x
        player.changeAction('run')
        enemy.changeAction('run')
    }
})