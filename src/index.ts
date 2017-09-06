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
    trickSteam.subscribe(uiRefresher);


    // 从事件中创建Observable（Pure，no side effect）
    const button = document.querySelector('button');
    Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .mapTo(1)
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
}