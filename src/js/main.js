import '../css/main.css'
import Snow from './snow'

new Snow('#snow', {
    // image: './snow.png', // 图片应该也可以拓展成传数组
    snowflakes: {
        // radius: [10, 80],
        vFlip: 0.1,
        // color: ['red', 'orange', 'green', 'limegreen', 'blue', 'purple']
    }
})
