import '../css/main.css'
import Snow from './snow'

new Snow('#snow', {
    image: ['./snow.png'], // 图片应该也可以拓展成传数组
    radius: [10, 80],
    color: ['red', 'orange', 'green', 'limegreen', 'blue', 'purple']
})
