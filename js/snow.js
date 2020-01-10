const random = function (min, max) {
    if (max < min) {
        throw new Error(`min is ${min}, max is ${max}, max should bigger than min!`)
    } else {
        return min + Math.random() * (max - min)
    }
}
class Snowflake {
    constructor(config) {
        this.config = config
        this.load()
    }
    center () {
        let x = this.x + this.radius / 2
        let y = this.y + this.radius / 2
        return {x, y}
    }
    load () {
        this.x = random(0, window.innerWidth)
        this.y = random(-window.innerHeight, 0)
        this.angle = 0

        this.va = Math.PI / random(...this.config.va) // 角速度
        this.va = Math.random() >= 0.5 ?  this.va : -this.va // 旋转方向
        this.vx = random(...this.config.vx)
        this.vy = random(...this.config.vy)
        this.alpha = random(...this.config.alpha) // 透明度
        this.radius = random(...this.config.radius) // 大小
    }
    update(range) {
        this.x += this.vx
        this.y += this.vy
        this.angle += this.va

        if (this.y > range ) {
            this.load()
        }
    }
}
// 负责创建雪花，重绘画面
class Snow {
    constructor(container, config = {}) {
        config = {
			color: config.color || 'white',
            image: config.image,
            num: config.num || window.innerWidth / 2,
            snowflakes: Object.assign({
                vx: [-3, 3],
                vy: [2, 5],
                va: [45, 360],
                radius: [5, 15],
                alpha: [0.1, 0.9]
            }, config.snowflakes)
        }
        this.init(container, config)
    }
    init (container, config) {
        // 初始化基本配置
        this.container = document.querySelector(container)
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.container.offsetWidth
        this.canvas.height = this.container.offsetHeight
        this.ctx = this.canvas.getContext('2d')
        this.container.appendChild(this.canvas)
        this.snowflakes = new Set()

        for (let i = 0; i < config.num; i++) {
            this.snowflakes.add(new Snowflake(config.snowflakes))
        }
        // 画图或画圆
        if (config.image) {
            this.img = new Image()
            this.img.src = config.image
            this.img.onload = () => {
                requestAnimationFrame(this.drawPicture())
            }
        } else {
            requestAnimationFrame(this.drawCircle(config.color))
        }
    }
    // 返回一个帧动画函数
    drawCircle (color) {
        // 利用箭头函数绑定this
        let frame = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (let flake of this.snowflakes) {
                flake.update(this.canvas.height)
                this.ctx.save()
                this.ctx.globalAlpha = flake.alpha
                this.ctx.fillStyle = color
                this.ctx.beginPath()
                this.ctx.arc(flake.x, flake.y, flake.radius,0,2*Math.PI)
                this.ctx.closePath()
                this.ctx.fill()
                this.ctx.restore()
            }
            requestAnimationFrame(frame)
        }
        return frame
    }
    drawPicture() {
        let frame = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (let flake of this.snowflakes) {
                flake.update(this.canvas.height)
                let {x, y} = flake.center()
                this.ctx.save()
                this.ctx.translate(x, y)
                this.ctx.rotate(flake.angle)
                this.ctx.translate(-x, -y)
                this.ctx.globalAlpha = flake.alpha
                this.ctx.drawImage(this.img, flake.x, flake.y, flake.radius, flake.radius)
                this.ctx.restore()
            }
            requestAnimationFrame(frame)
        }
        return frame
    }
}