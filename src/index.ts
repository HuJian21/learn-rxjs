import * as Rx from 'rxjs';

window.onload = () => {
    // 获取clock
    const elClock = document.getElementById("clock");
    // 获取当前时间
    const getTime =  function(){
        const _ = ['00','01','02','03','04','05','06','07','08','09'],  //补零
            d = new Date(), h = d.getHours(),m = d.getMinutes(),s = d.getSeconds();
    	return [_[h]||h,_[m]||m,_[s]||s].join(":");
    };
    // 创建一个名为trickSteam的Observable
    const trickSteam = Rx.Observable.create(observer => {
        setInterval(() => {
            observer.next(getTime());
        }, 1000);
    })

    // 这是trickSteam的Observer
    const uiRefresher = {
        next: (data: string) => {
            elClock.textContent = data
        },
        error: err => console.log(err),
        completed: () => console.log('Observer got a complete notification')
    }
    // 订阅
    const subscription = trickSteam.subscribe(uiRefresher);

    // 取消订阅
    // subscription.unsubscribe();
    // subscription.next('1');


    // 从事件中创建Observable（Pure，no side effect）
    const button = document.querySelector('button');
    Rx.Observable.fromEvent(button, 'click')
    // .throttleTime(1000)
    .debounceTime(1000)
    .mapTo(1)
    .scan(count => count + 1, 0)   // scan(value, number), number指执行的次数
    .subscribe(count => console.log(`Clicked ${count} times`));

    // // Subject作为被观察者
    // const subject = new Rx.Subject();
    // subject.subscribe({
    //     next: (value) => console.log(`observerA:${value}`)
    // });
    // subject.subscribe({
    //     next: (value) => console.log(`observerB:${value}`)
    // });
    // subject.next(1);
    // subject.next(2);
    // // 打印结果
    // // observerA: 1
    // // observerB: 1
    // // observerA: 2
    // // observerB: 2


    // // subject作为观察者
    // const subject1 = new Rx.Subject();
    // subject1.subscribe({
    //     next: (value) => console.log(`observerA:${value}`)
    // });
    // subject1.subscribe({
    //     next: (value) => console.log(`observerB:${value}`)
    // });
    // const observable$ = Rx.Observable.from([1, 2, 3]);
    // observable$.subscribe(subject);
    // // 打印结果
    // // observerA: 1
    // // observerB: 1
    // // observerA: 2
    // // observerB: 2
    // // observerA: 3
    // // observerB: 3


    // // Operator
    // Rx.Observable.of(2).subscribe(value => console.log(value));
    // // 打印结果翻倍？

    // // 1.改变事件源
    // Rx.Observable.of(2 * 2 ).subscribe(value => console.log(value));

    // // 2.改变响应方式
    // Rx.Observable.of(2).subscribe(value => console.log(value * 2 ));

    // // 使用rx
    // Rx.Observable.of(2)
    // .map(value => value * 2)
    // .subscribe(value => console.log(value));


    //            Operator1   Operator2
    // Observable ----|-----------|-------> Observer

    // var text = document.querySelector('#text');
    // Rx.Observable.fromEvent(text, 'keyup')  // 从事件中创建Observable
    //              .debounceTime(250) // 等待250ms
    //              .pluck('target', 'value')  // 将event，输出为 event.target.value
    //              .switchMap(url => Http.get(url)) // switchMap操作符取消上一个请求
    //              .subscribe(data => render(data))  // 订阅并渲染视图


    // 订阅
    // document.body.addEventListener('click', function listener(e) {
    //     console.log(e);
    // },false);
    
    // // 发布
    // document.body.click();   // 用户点击



}

    // const observable = Rx.Observable.interval(1000);
    // const mysubscription = observable.subscribe(x => console.log(x));
    // // 取消订阅
    // mysubscription.unsubscribe();
    
    // // 未调用unsubscribe()时的打印结果：
    // // 0
    // // 1
    // // 2
    // // ...
