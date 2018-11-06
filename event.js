// Node.js中的EventEmitter
const events = require('events'); 
const emitter = new events.EventEmitter(); 
emitter.on('event', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2);
}); 
emitter.on('event', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2);
}); 
emitter.emit('event', 'arguments1', 'arguments2'); 

// 打印结果
// listener1 arguments1 arguments2
// listener2 arguments1 arguments2