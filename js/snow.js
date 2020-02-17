const random = function (min, max, floor = false) {
  if (max < min) {
    throw new Error(`min is ${min}, max is ${max}, max should bigger than min!`)
  } else if (floor) {
    return Math.floor(min + Math.random() * (max - min))
  } else {
    return min + Math.random() * (max - min)
  }
}
const randomIn = arr => arr[random(0, arr.length, true)]

class Snowflake {
  constructor (config, image = null) {
    this.image = image
    this.config = config
    this.load()
  }
  center () {
    const x = this.x + this.radius / 2
    const y = this.y + this.radius / 2
    return { x, y }
  }
  load () {
    // 绘图属性
    this.x = random(0, window.innerWidth)
    this.y = random(-window.innerHeight, 0)
    this.alpha = random(...this.config.alpha) // 透明度
    this.radius = random(...this.config.radius) // 大小
    this.color = randomIn(this.config.color)
    this.angle = 0
    this.flip = 0
    // 变换属性
    this.va = Math.PI / random(...this.config.va) // 角速度
    this.va = Math.random() >= 0.5 ? this.va : -this.va // 旋转方向
    this.vx = random(...this.config.vx)
    this.vy = random(...this.config.vy)
    !!this.config.vf && (this.vf = random(0, this.config.vf)) // 翻转速度
  }
  update (range) {
    this.x += this.vx
    this.y += this.vy
    this.angle += this.va
    this.flip += this.vf
    // 防止无限放大
    if (this.flip > 1 || this.flip < 0) {
      this.vf = -this.vf
    }
    if (this.y >= range + this.radius) {
      this.load()
    }
  }
}
// 负责创建雪花，重绘画面
class Snow {
  constructor (container, config = {}) {
    const { num } = config
    this.num = num || window.innerWidth / 3
    delete config.num
    this.config = Object.assign({
      color: ['white'],
      vx: [-3, 3],
      vy: [2, 5],
      va: [45, 180],
      vf: 0,
      radius: [5, 15],
      alpha: [0.1, 0.9],
      image: []
    }, config)
    this.init(container)
  }
  init (container) {
    // 初始化基本配置
    this.container = document.querySelector(container)
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.container.offsetWidth
    this.canvas.height = this.container.offsetHeight
    this.ctx = this.canvas.getContext('2d')
    this.container.appendChild(this.canvas)
    this.snowflakes = new Set()

    // 画图或画圆
    if (this.config.image.length) {
      this.loadImage(this.config.image).then((images) => {
        this.createSnowflakes(images)
        requestAnimationFrame(this.drawPicture())
      }).catch(e => console.error(e))
    } else {
      this.createSnowflakes()
      requestAnimationFrame(this.drawCircle())
    }
  }
  loadImage (images) {
    const load = src => new Promise((resolve) => {
      const image = new Image()
      image.src = src
      image.onload = () => resolve(image)
      image.onerror = e => console.error('图片加载失败：' + e.path[0].src)
    })
    return Promise.all(images.map(src => load(src)))
  }
  createSnowflakes (image) {
    if (image) {
      for (let i = 0; i < this.num; i++) {
        const img = randomIn(image)
        const flake = new Snowflake(this.config, img)
        this.snowflakes.add(flake)
      }
    } else {
      for (let i = 0; i < this.num; i++) {
        const flake = new Snowflake(this.config)
        this.snowflakes.add(flake)
      }
    }
  }
  transform (flake) {
    flake.update(this.canvas.height)
    const { x, y } = flake.center()
    this.ctx.translate(x, y)
    this.ctx.rotate(flake.angle)
    !!flake.vf && this.ctx.scale(1, flake.flip)
    this.ctx.translate(-x, -y)
  }
  // 返回一个帧动画函数
  drawCircle () {
    // 利用箭头函数绑定this
    const frame = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for (const flake of this.snowflakes) {
        this.ctx.save()
        this.transform(flake)
        this.ctx.beginPath()
        this.ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI)
        this.ctx.closePath()
        this.ctx.globalAlpha = flake.alpha
        this.ctx.fillStyle = flake.color
        this.ctx.fill()
        this.ctx.restore()
      }
      requestAnimationFrame(frame)
    }
    return frame
  }
  drawPicture () {
    const frame = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for (const flake of this.snowflakes) {
        this.ctx.save()
        this.transform(flake)
        this.ctx.globalAlpha = flake.alpha
        this.ctx.drawImage(flake.image, flake.x, flake.y, flake.radius, flake.radius)
        this.ctx.restore()
      }
      requestAnimationFrame(frame)
    }
    return frame
  }
}
