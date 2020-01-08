# Snowflakes
自制雪花飞舞玻璃窗效果，效果较为逼真

主要使用```canvas```绘图，通过```window.requestAnimationFrame```实现刷新
（类似于```setTimeout```和```setInterval```）

[点击预览](http://projects.biubiubius.com/Snowflakes/index.html)

# 代码组织
使用ES6-class组织代码。

Snowflake类负责描述并更新雪花图案的属性。属性包括，位置坐标，水平速度和垂直速度，半径大小，透明度，旋转角度，角速度。

Snow类负责创建和调配雪花，将其绘制在画布上。创建动画帧，同时调用```window.requestAnimationFrame```刷新画布，绘制新的帧

做动画还是需要很多物理知识呀，共勉。

# GIF
![GIF示例](./Snowflakes.gif)
