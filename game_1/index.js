// setup canvas and context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// setup canvas size and color
canvas.width = 1024
canvas.height = 575
// fill by rectangle
c.fillRect(0, 0, canvas.width, canvas.height)

// method for defining sprite object
class Sprite {
  constructor(position, color) {
    this.position = position
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, 50, 150)
  }
}

// create object player
const player = new Sprite({
    x: canvas.width/2,
    y: canvas.height/2,
    color: red
})
// create enemy object
const enemy = new Sprite({
    x: 0,
    y: 0,
    color: blue
})




console.log(player)
