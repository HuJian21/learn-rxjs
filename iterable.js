const iterable = [1, 2];
const iterator = iterable[Symbol.iterator]();

iterator.next(); // => { value: "1", done: false}
iterator.next(); // => { value: "2", done: false}
iterator.next(); // => { value: undefined, done: true}

// console.log(iterator.next());


// 获取下一个值
// 调用 next 可以将元素一个个地返回，这样就支持了返回多次值。

// 无更多值(已完成)
// 当无更多值时，next 返回元素中 done 为 true。

// 错误处理
// 当 next 方法执行时报错，则会抛出 error 事件，使用 try catch 处理错误。