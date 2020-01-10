# Snowflakes
自制雪花飞舞玻璃窗效果，效果逼真

主要使用```canvas```绘图，通过```window.requestAnimationFrame```实现刷新
（类似于```setTimeout```和```setInterval```）

[点击预览](http://projects.biubiubius.com/Snowflakes/index.html)

# 代码组织
使用ES6-class组织代码。

Snowflake类负责描述并更新雪花图案的属性。属性包括，位置坐标，水平速度和垂直速度，半径大小，透明度，旋转角度，角速度。

Snow类负责创建和调配雪花，将其绘制在画布上。创建动画帧，同时调用```window.requestAnimationFrame```刷新画布，绘制新的帧

做动画还是需要很多物理知识呀，共勉。

# 引入使用
JS----snow.js可以引入到项目中，通过一点简单的配置即可快速实现雪花飞舞的效果，具体如下：

### 快速使用
``` bash
// 传入id，默认效果下，雪花为大小、透明度不一的白色圆点
new Snow('#snow')
```
### 更多配置
``` bash
// 默认配置，
new Snow('#snow', {
	image: '',                    // 可选的雪花图片，将绘制图片内容
    color: 'white',               // 雪花颜色，传入图片时会忽略该项
    num: window.innerWidth / 2,   // 雪花数量，一般无需改动
    // 每片雪花的属性
    snowflakes: {
        vx: [-3, 3],              // 水平速度
        vy: [2, 5],               // 垂直速度
        va: [45, 180],            // 角速度范围
        radius: [5, 15],          // 半径范围，传入图片需调整此项
        alpha: [0.1, 0.9]         // 透明度范围
    }
})
```

# GIF
![GIF示例](./Snowflakes.gif)
