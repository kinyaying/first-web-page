'use strict'
function getStyle(obj,sName){
    return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
function move(obj,json,options){
    // console.log(obj);
    options = options||{};
    options.duration = options.duration||300;
    options.easing = options.easing||'linear';
    var start = {};
    var dis = {};
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }
    var count = Math.floor(options.duration/16);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear':
                    var a = n/count;
                    var iCur = start[name] + dis[name]*a;

                    break;
                case 'ease-in':
                    var a = Math.pow(n/count,3);
                    var iCur = start[name] + dis[name]*a;
                    break;
                case 'ease-out':
                    var a = 1 - Math.pow(1-n/count,3);
                    var iCur = start[name] + dis[name]*a;
                    break;
            }
            
            if(name == 'opacity'){
                obj.style.opacity = iCur ;
                obj.style.filter = 'alpha(opacity:'+iCur*100+')';
            }else{
                obj.style[name] = Math.floor(iCur) + 'px';
            }
        }
        if(n == count){
            // console.log(options.complete());
            options.complete&&options.complete();
            clearInterval(obj.timer); 
        }
    },16);
}