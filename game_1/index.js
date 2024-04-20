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

const gravity = 0.2
// method for defining sprite object
class Sprite {
  constructor({ position, velocity, color }) {
    this.position = position
    this.velocity = velocity
    this.height = 150
    this.color = color
  }

  // draw characer function
  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, 50, this.height)
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
            console.log(this.position.y)
            this.velocity.y -= gravity
        // disable jump on and of jump
        } else {
            jump = false
        }
    } else {
        // fall on ground
        if ( this.position.y + this.height + this.velocity.y >= canvas.height ){
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
        x: canvas.width/2,
        y: canvas.height/2
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red'
})
// debug player object
console.log(player)

// create enemy object
const enemy = new Sprite({
    position: {
        x: 30,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
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

window.addEventListener('touchend', (event) => {
    console.log(event.key);
    if (event.key == " "){
        console.log("OH yeeeeeee")
        jump = true
        jump_end_enemy = enemy.position.y - jump_height
        jump_end_player = player.position.y - jump_height
    }
})
