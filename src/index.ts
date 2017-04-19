import * as Rx from 'rxjs';

window.onload = () => {
    const elClock = document.getElementById("clock");
    const getTime =  function(){
        const _ = ['00','01','02','03','04','05','06','07','08','09'],  //补零
            d = new Date(), h = d.getHours(),m = d.getMinutes(),s = d.getSeconds();
    	return [_[h]||h,_[m]||m,_[s]||s].join(":");
    };
    let trickSteam = Rx.Observable.create(observer => {
        setInterval(() => {
            observer.next(getTime());
        }, 1000);
    })

    let uiRefresher = {
        next: (data: string) => {
            elClock.textContent = data
        },
        error: err => console.log(err),
        completed: () => console.log('Observer got a complete notification')
    }
    trickSteam.subscribe(uiRefresher);
}
