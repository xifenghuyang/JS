

class Animation{
    constructor (){
        this.timerId = 0;

        this.callback = null;
        this.durationTime = 0;
        // 现在和最近时间
        this.nowTime = 0;
        this.thenTime = 0;
    }
}

class AnimationManager{
    constructor(){
        // 时钟
        this.timer = null;
        //   延时数组
        this.animationTimeout = [];
         //  定时数组
        this.animationInterval = [];

        this.init();
    }
    // 对象管理实例化
    static getInstance(){
        if(!this.instance){
            this.instance = new AnimationManager;
        }
        return this.instance;
    }
    // 创建并启动定时
    init(){
        let that = this;
        cancelAnimationFrame(that.timer);
        that.timer = requestAnimationFrame(function clock() {
            that.update();
            that.timer = requestAnimationFrame(clock);
        });
    }

    update(){

        console.log('小灰灰');

        if(this.animationInterval && this.animationInterval.length !== 0){
            this.animationInterval.forEach( (item) => {
                item.nowTime = Date.now();
                let delatTime = item.nowTime - item.thenTime;
                if(delatTime > item.durationTime){
                    console.log(delatTime);
                    item.callback();
                    item.thenTime = item.nowTime - delatTime % item.durationTime;
                }
            });
        }

    }

    setInterval(callback, time){
        let animation = new Animation();
        animation.timerId = 'UUID';
        animation.durationTime = time;
        animation.callback = callback;
        // 推入当前数据
        this.animationInterval.push(animation);
        return animation.timerId;
    }

    clearInterval(timerId){

    }



    // 手动关闭定时器
    stopTimer(){
        if(this.timer){
            cancelAnimationFrame(this.timer);
        }
    }
}

var animationManager = AnimationManager.getInstance();

// 测试-定时
animationManager.setInterval( function(){
    console.log('setTimeout 5s');
},5000);

window.onload = ()=>{
    var aInput = document.querySelectorAll('input');

    aInput[1].onclick = function () {
        if(animationManager){
            animationManager.stopTimer();
        }
    }
};