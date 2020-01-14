import '../css/main.css'
import Snow from './snow'

/* eslint-disable no-new */
new Snow('#snow', {
  image: ['./snow.png'],
  radius: [10, 80],
  vFlip: 0.1,
  color: ['red', 'orange', 'green', 'limegreen', 'blue', 'purple']
})

// interface Counter {
//     (start: number): string
//     interval: number
//     reset(): void
// }
//
// function getCounter (): Counter {
//   const counter = <Counter> function (start: number) { }
//   counter.interval = 123
//   counter.reset = function () { }
//   return counter
// }
//
// const c = getCounter()
// c(10)
// c.reset()
// c.interval = 5.0
