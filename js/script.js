'use strict'
/*缓冲页面*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',fnProgress,false);
        window.addEventListener('resize',fnProgress,false);
        function fnProgress(){
            var oPro = document.getElementById('load-progress');
            var oDetail = document.getElementById('detail');
            oPro.style.height = document.documentElement.clientHeight + 'px';
            oPro.style.width = document.documentElement.clientWidth + 'px';
            var aImg = document.getElementsByTagName('img');
            var count = 0;
            // setTimeout(function(){
            //     oPro.style.height = 0;
            //     oPro.style.display = 'none';
            //     oDetail.style.display = 'block';
            // },2000);
            // console.log(aImg.length);
            // for(var i=0;i<aImg.length;i++){
            //     if(aImg[i].complete) {
            //         count++;
            //         if(count>100){
            //             oPro.style.display = 'none';
            //             oDetail.style.display = 'block';
            //         }
            //         console.log(aImg.length);
            //     }
            //     else{
            //         aImg[i].onload = function(){
            //             count++;
            //             if(count>100){
            //                 oPro.style.display = 'none';
            //                 oDetail.style.display = 'block';

            //             }
            //         };
            //     }
                
            // }
            // setInterval(function(){console.log(count+':::'+aImg.length);},1000);
            // console.log(aImg[100].complete);
        }
    })();

    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oImg = document.getElementById('head-img');
            oImg.style.height = document.documentElement.clientHeight - 70 + 'px';
            oImg.style.width = document.documentElement.clientWidth + 'px';
            oImg.children[0].style.backgroundSize = oImg.children[0].offsetWidth + 'px '+ oImg.children[0].offsetHeight +'px';
            var oFootBox = document.getElementById('footer');
            var aFootSpan = oFootBox.getElementsByTagName('span');
            window.addEventListener('resize',function(){
                oImg.style.height = document.documentElement.clientHeight - 70 + 'px';
                oImg.style.width = document.documentElement.clientWidth + 'px';
                oImg.children[0].style.backgroundSize = oImg.children[0].offsetWidth + 'px '+ oImg.children[0].offsetHeight +'px';
                if(document.documentElement.clientWidth<700){
                    for(var i=0;i<aFootSpan.length;i++){
                        aFootSpan[i].className = 'footer-change text-color';
                    }
                }
                else{
                    aFootSpan[0].className = 'footer-l text-color';
                    aFootSpan[1].className = 'footer-r text-color';
                }
            },false);
        },false);
    })();

    /*轮播图*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oBox = document.getElementById('head-img');
            var oUl = oBox.children[0];
            var aLi = oUl.children;
            var oOl = oBox.children[1];
            var aBtn = oOl.children;
            var oPre = oBox.children[2];
            var oNext = oBox.children[3];
            var oBar = oBox.children[4];
            var iNow = 0;
            var iTime = 0;
            var timer = null;
            oUl.innerHTML += oUl.innerHTML;
            oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';
            oUl.addEventListener('mousedown',function(ev){
                var oEvent = ev||event;
                var disX = oEvent.clientX - oUl.offsetLeft;
                var x = 0;
                var oldX = oEvent.clientX;
                var newX = 0;
                document.addEventListener('mousemove',fnMove,false);
                document.addEventListener('mouseup',fnUp,false);
                function fnMove(ev){
                    var oEvent = ev||event;
                    x = oEvent.clientX - disX;
                    newX = oEvent.clientX;
                    oUl.style.left = x + 'px';
                }
                function fnUp(){
                    if((newX - oldX) > 0){
                        iNow++;
                    }
                    if((newX - oldX) < 0){
                        iNow--;
                    }
                    tag();
                    iTime = 0;
                    oBar.style.width = 0;
                    document.removeEventListener('mousemove',fnMove,false);
                    document.removeEventListener('mouseup',fnUp,false);
                    oUl.releaseCapture && oUl.releaseCapture();
                }
                oUl.setCapture && oUl.setCapture();
                oEvent.preventDefault();
            },false);

            oPre.addEventListener('click',function(){
                iNow++;
                tag();
            },false);
            oNext.addEventListener('click',function(){
                iNow--;
                tag();
            },false);

            progressBar();
            function progressBar(){
                clearInterval(timer);
                timer = setInterval(function(){
                    iTime+=5;
                    oBar.style.width = iTime/10+'%';
                    if(iTime/10 == 100){
                        clearInterval(timer);
                        iNow--;
                        tag(function(){progressBar();});
                        iTime = 0;
                        oBar.style.width = 0;
                    }
                },50);
            }
            

            oBox.addEventListener('mouseover',function(){
                clearInterval(timer);
            },false);
            oBox.addEventListener('mouseout',progressBar,false);
            function tag(fn){
                for(var i=0;i<aBtn.length;i++){
                    aBtn[i].className = '';
                }
                var iNum = -(iNow%aBtn.length-aBtn.length)%aBtn.length;
                aBtn[iNum].className = 'on';
                Move(oUl,aLi[0].offsetWidth*iNow,fn,iNum);
            }

            var left = 0;
            var W = oUl.offsetWidth/2;
            function Move(obj,target,fn,iNum){
                var start = left;
                var dis = target - start;
                var n = 0;
                var count = Math.floor(300/16);
                clearInterval(obj.timer);
                obj.timer = setInterval(function(){
                    n++;
                    var a = 1-n/count;
                    left = start + dis*(1-Math.pow(a,3));
                    obj.style.left = (left%W - W)%W + 'px';
                    if(n==count){
                        clearInterval(obj.timer);
                        fn&&fn();
                        switch(iNum){
                            case 0:
                                fnClear3();
                                fnClear1();
                                fnClear0();
                                setTimeout(fn0,500);
                                break;
                            case 1:
                                fnClear0();
                                fnClear1();
                                fnClear2();
                                setTimeout(fn1,500);
                                break;
                            case 2:
                                fnClear1();
                                fnClear3();
                                fn2();
                                break;
                            case 3:
                                fnClear0();
                                fnClear2();
                                fnClear3();
                                fn3();
                                break;
                        }
                    }
                },30);
            }
            aLi[4].children[1].style.display = 'none';
            fnClear0();
            setTimeout(fn0,700);
            function fnClear0(){
                aLi[0].children[1].style.display = 'none';
                var oIpad = document.getElementById('ipad');
                var oIconBox = aLi[0].children[1].children[1];
                oIconBox.style.display = 'none';
                var aIcon = oIconBox.children;
                oIpad.style.top = '500px';
                for(var i=0;i<aIcon.length;i++){
                    aIcon[i].style.left = 0;
                    aIcon[i].style.top = 0;
                }
            }
            function fn0(){
                aLi[0].children[1].style.display = 'block';
                var oIpad = document.getElementById('ipad');
                var oIconBox = aLi[0].children[1].children[1];
                var aIcon = oIconBox.children;
                var iW = aLi[0].offsetWidth;
                var iH = aLi[0].offsetHeight;
                var arr = [{'left':580,'top':-90},{'left':500,'top':190},{'left':-500,'top':-207},{'left':-410,'top':30},{'left':-570,'top':90},{'left':-620,'top':-100},{'left':-393,'top':-122},{'left':434,'top':-110},{'left':420,'top':-213},{'left':315,'top':-113},{'left':-295,'top':73},{'left':-415,'top':200},{'left':460,'top':0},{'left':363,'top':214},{'left':350,'top':100},{'left':-260,'top':-80}];
                move(oIpad,{'top':(iH-oIpad.children[0].offsetHeight)/2},{duration:500});
                setTimeout(function(){
                    oIconBox.style.display = 'block';
                },550);
                for(var i=0;i<aIcon.length;i++){
                    (function(index){
                        setTimeout(function(){
                            move(aIcon[index],{left:arr[index].left*iW/1400,top:arr[index].top*iH/620});
                        },800+80*i);
                    })(i);
                }
                
            } 
            aLi[0].addEventListener('mousemove',function(ev){
                var oEvent = ev||event;
                var oIconBox = aLi[0].children[1].children[1];
                var aIcon = oIconBox.children;
                var x = oEvent.clientX; 
                var y = oEvent.clientY;    
                var w = aLi[0].offsetWidth/2;
                var h = aLi[0].offsetHeight/2;
                var dx = -(x - w)/40;
                var dy = -(y - h)/20; 
                for (var i = 0 ; i < aIcon.length ; i++) { 
                    aIcon[i].style['transform'] = aIcon[i].style['-webkit-transform'] = aIcon[i].style['-moz-transform'] = aIcon[i].style['-ms-transform'] = 'translate('+parseInt(aIcon[i].style.zIndex)*dx+'px,'+parseInt(aIcon[i].style.zIndex)*dy+'px)';

                }
            },false);
            function fnClear1(){
                aLi[1].children[1].style.display = 'none';
                var oLeft = aLi[1].children[1].children[0];
                var oRight = aLi[1].children[1].children[1];
                var aImg = oLeft.children;
                var aTxt = oRight.children;
                oLeft.style.transform = 'translateY(0px)';
                for(var i=0;i<aImg.length;i++){
                    aImg[i].style.transform = 'translateY(0px)';
                }
                for(var i=0;i<aTxt.length;i++){
                    aTxt[i].style.transform = 'translateY(0px) rotateZ(45deg)';
                }
            }
            function fn1(){
                aLi[1].children[1].style.display = 'block';
                var oLeft = aLi[1].children[1].children[0];
                var oRight = aLi[1].children[1].children[1];
                var aImg = oLeft.children;
                var aTxt = oRight.children;
                oLeft.style.display = 'block';
                oLeft.style.top = 50/620*aLi[0].offsetHeight + 'px';
                oRight.style.top = oRight.offsetTop/620*aLi[1].offsetHeight + 'px';
                for(var i=0;i<aTxt.length;i++){
                    aTxt[i].style.top = aLi[1].offsetHeight + 'px';
                }
                setTimeout(function(){
                    oLeft.style.transform = 'translateY(-'+50/620*aLi[0].offsetHeight+'px)';
                },10);
                setTimeout(function(){
                    aImg[1].style.transform = 'translateY(-'+35/620*aLi[0].offsetHeight+'px)';
                    aImg[2].style.transform = 'translateY(-'+35/620*aLi[0].offsetHeight+'px)';
                },2800);
                setTimeout(function(){
                    aImg[2].style.transform = 'translateY(-'+80/620*aLi[0].offsetHeight+'px)';
                },3900);
                for(var i=0;i<aTxt.length;i++){
                    (function(index){
                        setTimeout(function(){
                            aTxt[index].style.display = 'block';
                            aTxt[index].style.transform = 'translateY(-'+(index*100+aLi[1].offsetHeight)+'px) rotateZ(0deg)';
                        },i*500+2000)
                    })(i);
                }
            }
            function fnClear2(){
                aLi[2].children[1].style.display = 'none';
                var oImg = aLi[2].children[1].children[0].children[0];
                var aP = aLi[2].children[1].children[1].children;
                oImg.style.transform = 'rotateZ(360deg) scale(0.5,0.5)';
                aP[0].style.transform = 'translate(500px)';
                aP[1].style.transform = 'translate(500px)';
            }
            function fn2(){
                aLi[2].children[1].style.display = 'block';
                var oImg = aLi[2].children[1].children[0].children[0];
                var aP = aLi[2].children[1].children[1].children;
                oImg.style.top = (aLi[2].offsetHeight-oImg.offsetHeight)/2+'px';
                
                aLi[2].children[1].children[1].style.top = (aLi[2].offsetHeight-aLi[2].children[1].children[1].offsetHeight)/2+'px';
                setTimeout(function(){
                    oImg.style.transform = 'rotateZ(0deg) scale(1,1)';
                },10);
                for(var i=0;i<aP.length;i++){
                    (function(index){
                        setTimeout(function(){
                            aP[index].style.transform = 'translate(0px)';
                        },i*500+500);
                    })(i);
                }
                
            } 
            function fnClear3(){
                aLi[3].children[1].style.display = 'none';
                var aTxt = aLi[3].children[1].children[0].children;
                aTxt[0].style.transform = 'translateX(-800px)';
                aTxt[1].style.transform = 'translateX(800px)';
                aTxt[2].style.transform = 'translateX(-900px)';
            }
            function fn3(){
                aLi[3].children[1].style.display = 'block';
                var aTxt = aLi[3].children[1].children[0].children;
                for(var i=0;i<aTxt.length;i++){
                    (function(index){
                        setTimeout(function(){
                            aTxt[index].style.transform = 'translateX(0px)';
                        },300+500*i);
                    })(i);
                }
            } 
        },false);
    })();

    /*吸顶条*/
    ;(function(){
        window.addEventListener('scroll',function(){
            var oBar1 = document.getElementById('head-bar1');
            var oBar = document.getElementById('head-bar2');
            var aBtn1 = oBar1.children[1].children;
            var aBtn = oBar.children[1].children;
            var oShadow = document.getElementById('head-shadow');
            var iSt = document.documentElement.scrollTop||document.body.scrollTop;
            var iCh = document.documentElement.clientHeight;
            var oDisplay= document.getElementById('parallax_display');
            var aBarSpan = document.querySelectorAll('#parallax_display .progress-bar span');

            if(iSt>iCh){
                oBar.style.display = 'block';
                oBar.style.zIndex = '999';
                oBar.style.position = 'fixed';
                oBar.style.top = (0) + 'px';
                oShadow.style.display = 'block';
            }
            else{
                oBar.style.display = 'none';
                oShadow.style.display = 'none';
            }
            if(iSt<window.aTop[1]){
                fnClear();
                window.iNow = 0;
                fnSet();
            }
            else if(iSt>(window.aTop[1]-1)&&iSt<window.aTop[2]){
                fnClear();
                window.iNow = 1;
                fnSet();
            }
            else if(iSt>(window.aTop[2]-1)&&iSt<window.aTop[3]){
                fnClear();
                window.iNow = 2;
                fnSet();
            }
            else if(iSt>window.aTop[3]-1){
                fnClear();
                window.iNow = 3;
                fnSet();
            }

            var oSkillBox = document.getElementById('skill-box');
            var aSkillLi = oSkillBox.children;
            if(iSt+iCh>oSkillBox.offsetTop+50){
                for(var i=0;i<aSkillLi.length;i++){
                    (function(index){
                        setTimeout(function(){
                            aSkillLi[index].children[0].style.transform = 'translateX(0)';
                        },i*180);
                    })(i);
                }
            }
            var oDisplayLogo = document.getElementById('display-logo');
            var aDisplayLi = oDisplayLogo.children[0].children[0].children;
            if(iSt+iCh>oDisplayLogo.offsetTop+50){
                for(var i=0;i<aDisplayLi.length;i++){
                    (function(index){
                        setTimeout(function(){
                            aDisplayLi[index].style.opacity = 1;
                            aDisplayLi[index].style.transform = 'translateY(0)';
                        },i*180+100);
                    })(i);
                }
            }
            var oCountBox = document.getElementById('count-box');
            var aCountLi = oCountBox.children[0].children;
            // var bOk = true;
            if(iSt+iCh>oCountBox.offsetTop+20){
                
                for(var i=0;i<aCountLi.length;i++){
                    (function(index){
                        if(window.bOk){
                        setTimeout(function(){
                            window.bOk = false;
                            number(aCountLi[index].children[1]);
                            aCountLi[index].style.opacity = 1;
                            aCountLi[index].style.transform = 'translateY(10px)';
                        },i*200+100);
                        }
                    })(i);
                }
            
            }

            if(iSt+iCh>oDisplay.offsetTop+20){
                oDisplay.children[0].children[0].style.opacity = 1;
                oDisplay.children[0].children[0].style.transform = 'translateY(0)';
                oDisplay.children[0].children[1].style.opacity = 1;
                oDisplay.children[0].children[1].style.transform = 'translateY(0)';
                setTimeout(function(){
                    for(var i=0;i<aBarSpan.length;i++){
                        aBarSpan[i].style.transform = 'translateX(0)';
                    }
                },300);
                
            }
            function number(obj){
                var end = parseInt(obj.innerHTML);
                var start = 0;
                var count = end - start;
                var timer = setInterval(function(){
                    start+=5;
                    obj.innerHTML = start;
                    if(start == end){
                        clearInterval(timer);
                    }
                },100);
            }
            function fnSet(){
                aBtn1[window.iNow].className = 'head-active';
                aBtn[window.iNow].className = 'head-active';
            }
            function fnClear(){
                for(var i=0;i<aBtn.length;i++){
                    aBtn[i].className = '';
                    aBtn1[i].className = '';
                }
            }
            
        },false);
        document.addEventListener('DOMContentLoaded',function(){
            var oBar1 = document.getElementById('head-bar1');
            var oBar = document.getElementById('head-bar2');
            var aBtn1 = oBar1.children[1].children;
            var aBtn = oBar.children[1].children;
            var oBody = document.documentElement || document.body;
            var oSkill= document.querySelector('.body .skill');
            var oWork= document.getElementById('work-box');
            var oContact= document.getElementById('book-typing');
            window.aTop = [0,(oSkill.offsetTop+1),(oWork.offsetTop-60),oContact.offsetTop];
            window.iNow = 0;
            window.bOk = true;
            for(var i=0;i<aBtn.length;i++){
                (function(index){
                    aBtn[i].addEventListener('click',function(){
                        window.iNow = index;
                        clear();
                        aBtn[window.iNow].className = 'head-active';
                        aBtn1[window.iNow].className = 'head-active';
                        var start = document.documentElement.scrollTop||document.body.scrollTop;
                        back(start,window.aTop[index]);
                    },false);
                })(i);
            }
            for(var i=0;i<aBtn.length;i++){
                (function(index){
                    aBtn1[i].addEventListener('click',function(){
                        window.iNow = index;
                        clear();
                        aBtn1[window.iNow].className = 'head-active';
                        aBtn[window.iNow].className = 'head-active';
                        var start = document.documentElement.scrollTop||document.body.scrollTop;
                        back(start,window.aTop[index]);
                    },false);
                })(i);
            }

            function clear(){
                for(var i=0;i<aBtn.length;i++){
                    aBtn[i].className = '';
                    aBtn1[i].className = '';
                }
            }
            function back(start,end){
                var dis = end-start;
                var count = Math.abs(Math.floor(dis/2/30));
                var n = 0;
                clearInterval(oBar.timer);
                oBar.timer = setInterval(function(){
                    n++;
                    var a = 1-n/count;
                    var cur = start+dis*(1-Math.pow(a,3));
                    document.documentElement.scrollTop=document.body.scrollTop=cur;
                    if(n==count){
                        clearInterval(oBar.timer);
                    }
                },30);
            }

        },false);
    })();

    /*display-logo轮播*/
    ;(function(){
        var oBox = document.getElementById('display-logo');
        var oUl = oBox.children[0].children[0];
        var aLi = oUl.children;
        var oPrev = document.getElementById('display-box-pre');
        var oNext = document.getElementById('display-box-next');
        oPrev.addEventListener('click',fnPrev,false);
        oNext.addEventListener('click',fnNext,false);
        oUl.addEventListener('mousedown',function(ev){
            var oEvent = ev||event;
            var disX = oEvent.clientX - oUl.offsetLeft;
            var x = 0;
            var oldX = oEvent.clientX;
            var newX = 0;
            document.addEventListener('mousemove',fnMove,false);
            document.addEventListener('mouseup',fnUp,false);
            function fnMove(ev){
                var oEvent = ev||event;
                newX = oEvent.clientX;
                x = oEvent.clientX - disX;
                oUl.style.left = x + 'px';
            }
            function fnUp(){
                if(x>0)x=0;
                if(x < -1600)x = -1600;
                if(newX - oldX>0){
                    fnPrev();
                }
                else{
                    fnNext();
                }
                document.removeEventListener('mousemove',fnMove,false);
                document.removeEventListener('mouseup',fnUp,false);
                oUl.releaseCapture && oUl.releaseCapture();
            }
            oUl.setCapture && oUl.setCapture();
            oEvent.preventDefault();
        },false);
        function fnNext(){
            var iLeft = oUl.offsetLeft;
            if(iLeft < -1400)iLeft = 0;
            move(oUl,{left:(iLeft-200)},{duration:400});
        }
        function fnPrev(){
            var iLeft = oUl.offsetLeft;
            if(iLeft > -200)iLeft = -1800;
            move(oUl,{left:(iLeft+200)},{duration:400});
        }
    })();
    /*my work 标题doMove代码*/
    (function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oUl = document.getElementById('work-title');
            var aLi = oUl.children;
            var oBox = aLi[aLi.length-1];
            var iNow = 0;
            for(var i=0;i<aLi.length;i++){
                (function(index){
                    aLi[i].addEventListener('click',function(){
                        iNow = index;
                    },false);
                    aLi[i].onmouseover=function(){
                        startMove(oBox,this.offsetLeft);
                    };
                    aLi[i].onmouseout=function(){
                        startMove(oBox,iNow*aLi[0].offsetWidth);
                    };
                })(i);
            }
        },false);
    })();
    (function(){
        var left = 0;
        var iSpeed = 20;
        var timer = null;
        window.startMove = function (obj,iTarget){
            clearInterval(timer);
            timer = setInterval(function(){
                iSpeed+=(iTarget-left)/5;
                iSpeed*=0.7;
                left+=iSpeed;
                obj.style.left = left+'px';
                if(Math.round(iSpeed)==0&&Math.round(left)==iTarget){
                    clearInterval(timer);
                }
            },30);
        }
    })();

    /*my work 随机运动代码*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oWorkBox = document.getElementById('work-box');
            var aOldBtn = document.querySelectorAll('.work-box .work-title li');
            var aBtn = [];
            for(var i=0;i<aOldBtn.length-1;i++){
                aBtn.push(aOldBtn[i]);
            }
            var oCon = document.querySelector('.work-content');
            var oUl = oCon.children[0];
            var aLi = oCon.querySelectorAll('li');
            var aoldPos = [];
            var aPos = [];
            for(var i=0; i<aLi.length; i++){
                aoldPos[i]={left:aLi[i].offsetLeft, top:aLi[i].offsetTop};
            }
            for(var i=0;i<aBtn.length;i++){
                (function(index){
                    aBtn[i].addEventListener('click',function(){
                        for(var i=0;i<aBtn.length;i++){
                            aBtn[i].className = '';
                        }
                        aBtn[index].className = 'active';
                        switch(index){
                            case 0:
                                changePos(0,32);
                                oUl.className = 'cross-wall';
                                break;
                            case 1:
                                changePos(0,14);
                                oUl.className = 'roll-over';
                                break;
                            case 2:
                                changePos(0,14);
                                oUl.className = 'up';
                                break;
                            case 3:
                                changePos(15,16);
                                oUl.className = 'mask';
                                break;
                            case 4:
                                changePos(17,19);
                                oUl.className = 'roll-over';
                                break;
                            case 5:
                                changePos(20,31);
                                oUl.className = 'up';
                                break;
                            case 6:
                                changePos(32,32);
                                oUl.className = 'mask';
                                break;
                        }
                    },false);
                })(i);
            }

            function changePos(start,end){
                for(var i=0;i<aLi.length;i++){
                    aLi[i].style.display = 'none';
                    aLi[i].style.left = '0';
                    aLi[i].style.top = '0';
                }
                aPos = [];
                for(var i=0;i<(end-start+1);i++){
                    aPos[i] =({left:aoldPos[i].left,top:aoldPos[i].top});
                }
                aPos.sort(function(){
                    return Math.random() - 0.5;
                });
                setTimeout(function(){
                for(var i=start;i<end+1;i++){
                    aLi[i].style.display = 'block';
                    // aLi[i].style.transform = 'translate('+ (aPos[i-start].left - aLi[i].offsetLeft) +'px,'+ (aPos[i-start].top - aLi[i].offsetTop) +'px)'; 
                    move(aLi[i],{top:(aPos[i-start].top - aLi[i].offsetTop),left:(aPos[i-start].left - aLi[i].offsetLeft)},{easing:'ease-in',duration:200});                   
                }
                },20);
            }
        },false);
    })();

    /*穿墙部分代码*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oCrossWall = document.getElementById('cross-wall');
            if(oCrossWall.className != 'cross-wall')return;
            var aLi = oCrossWall.children;
            var aDiv = [];
            var aSp = [];
            for(var i=0;i<aLi.length;i++){
                aDiv.push(aLi[i].children[0]);
                aSp.push(aLi[i].children[1]);
            }
            for(var i=0;i<aSp.length;i++){
                crossWall(aLi[i],aSp[i]);
            }
        },false);
    })();
    /*footer 的自适应*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oWhite = document.querySelector('.footer .footer-box');
            var aWhiteLi = oWhite.children;
            for(var i=0;i<aWhiteLi.length;i++){
                aWhiteLi[i].children[0].children[0].style.background = 'url(circle/icon.png) -'+i*30.3+'px -30px';
            }
            for(var i=0;i<aWhiteLi.length;i++){
                (function(index){
                    aWhiteLi[i].onmouseover = function(){
                        aWhiteLi[index].children[0].children[0].style.background = 'url(circle/icon.png) -'+index*30.3+'px 60px';
                    };
                })(i);
                (function(index){
                    aWhiteLi[i].onmouseout = function(){
                        aWhiteLi[index].children[0].children[0].style.background = 'url(circle/icon.png) -'+index*30.3+'px -30px';
                    };
                })(i);
            }
        },false);
    })();

    /*书本旋转效果*/
    // ;(function(){
    //     document.addEventListener('DOMContentLoaded',function(){
    //         var oBook = document.getElementById('book-wrap');
    //         var aDiv = oBook.children[0].children;
    //         var arr = [];
    //         for(var i=0;i<aDiv.length;i++){
    //             arr.push({'left':rnd(280,320),'top':rnd(40,60),'angle':rnd(-90,90)});
    //             if(i%6<3){
    //                 aDiv[i].style.transform = 'translate3d(-'+arr[i].left+'px,-'+arr[i].top+'px,0) rotate3d(0,0,1,'+arr[i].angle+'deg)';
    //             }
    //             else{
    //                 aDiv[i].style.transform = 'translate3d('+arr[i].left+'px,-'+arr[i].top+'px,0) rotate3d(0,0,1,'+arr[i].angle+'deg)';
    //             }
    //         }
    //         window.addEventListener('scroll',function(){
    //             var iST = document.documentElement.scrollTop||document.body.scrollTop;
    //             var iTop = oBook.offsetTop;
    //             var scale = parseInt((1-(iST-iTop)/400)*10)/10;
    //             for(var i=0;i<aDiv.length;i++){
    //                 if(i%6<3){
    //                     aDiv[i].style.transform = 'translate3d(-'+scale*arr[i].left+'px,-'+scale*arr[i].top+'px,0) rotate3d(0,0,1,'+scale*arr[i].angle+'deg)';
    //                 }
    //                 else{
    //                     aDiv[i].style.transform = 'translate3d('+scale*arr[i].left+'px,-'+scale*arr[i].top+'px,0) rotate3d(0,0,1,'+scale*arr[i].angle+'deg)';
    //                 }
    //             }
    //         },false);
    //     },false);
    // })();
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oBook = document.getElementById('book-wrap');
            var aDiv = oBook.children[0].children;
            var arr = [];
            for(var i=0;i<aDiv.length;i++){
                arr.push({'left':rnd(280,320),'top':rnd(40,60),'angle':rnd(-90,90)});
                if(i%6<3){
                    aDiv[i].style.transform = 'translate3d(-'+arr[i].left+'px,-'+arr[i].top+'px,0) rotate3d(0,0,1,'+arr[i].angle+'deg)';
                }
                else{
                    aDiv[i].style.transform = 'translate3d('+arr[i].left+'px,-'+arr[i].top+'px,0) rotate3d(0,0,1,'+arr[i].angle+'deg)';
                }
            }
            window.addEventListener('scroll',function(){
                var oDoor = document.getElementById('door');
                var oFaceUp = document.getElementById('face-up').parentNode;
                var iST = document.documentElement.scrollTop||document.body.scrollTop;
                var oBook = document.getElementById('book-wrap').parentNode;
                var iTop = oFaceUp.parentNode.offsetTop;
                var scale = parseInt((1-(iST-iTop)/400)*10)/10;
                for(var i=0;i<aDiv.length;i++){
                    if(i%6<3){
                        // console.log(scale);
                        aDiv[i].style.transform = 'translate3d(-'+scale*arr[i].left+'px,-'+scale*arr[i].top+'px,0) rotate3d(0,0,1,'+scale*arr[i].angle+'deg)';
                    }
                    else{
                        aDiv[i].style.transform = 'translate3d('+scale*arr[i].left+'px,-'+scale*arr[i].top+'px,0) rotate3d(0,0,1,'+scale*arr[i].angle+'deg)';
                    }
                }
                

                oDoor.onmouseover = function(){
                    oFaceUp.style.opacity = 1;
                    oBook.style.opacity = 0;
                };
                oDoor.onmouseout = function(){
                    oDoor.style.opacity = 1;
                }
                oBook.onmouseover = function(){   
                    oFaceUp.style.opacity = 0;
                    oBook.style.opacity = 1;
                };
            },false);
        },false);
    })();



    /*打字*/
    ;(function(){
        document.addEventListener('DOMContentLoaded',function(){
            var oPrinter = document.getElementById('printer');
            var aSp = oPrinter.children[1].children;
            var str = 'How to contact me?';
            var i = 0;
            var bok = true;
            var blen = false;
            var count = 0;
            setInterval(function(){
                var newStr = str.substring(0,i);
                aSp[0].innerHTML = newStr;
                if(bok){
                    if(i<str.length){
                        i++;
                    }
                    else{
                        bok = false;
                    }
                }
                else{
                    if(blen){
                        if(i>0){
                            i--;
                        }
                        else{
                            bok = true;
                            blen = false;
                        }
                    }
                    else{
                        if(count < 30){
                            count++;
                            aSp[1].style.opacity = parseInt(count/4)%2;
                        }
                        else{
                            aSp[1].style.opacity = 1;
                            count = 0;
                            blen = true;
                        }
                    }
                }
            },100);
        },false);
    })();
    function rnd(m,n){
        return m + Math.random()*(n-m);
    }
    function getPos(obj){
        var left = 0;
        var top = 0;
        while(obj){
            left += obj.offsetLeft;
            top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return {'left':left,'top':top};
    }
    function crossWall(obj1,obj2){
        var oLi = obj1;
        var oSp = obj2;
        oLi.onmouseover = function(ev){
            var oEvent = ev||event;
            var oFrom = oEvent.fromElement||oEvent.relatedTarget;
            if(oLi.contains(oFrom))return;
            switch(getDir(oLi,oEvent)){
                case 0:
                    oSp.style.top = 0;
                    oSp.style.left = oSp.offsetWidth + 'px';  
                break;
                case 1:
                    oSp.style.top = oSp.offsetHeight + 'px';
                    oSp.style.left = 0;
                break;
                case 2:
                    oSp.style.top = 0;
                    oSp.style.left = -oSp.offsetWidth + 'px';
                break;
                case 3:
                    oSp.style.top = -oSp.offsetHeight + 'px';
                    oSp.style.left = 0;
                break;
            }
            move(oSp,{left:0,top:0},{easing:'ease-out',duration:250});
        }
        oLi.onmouseout = function(ev){
            var oEvent = ev||event;
            var oTo = oEvent.toElement||oEvent.relatedTarget;
            if(oLi.contains(oTo))return;
            switch(getDir(oLi,oEvent)){
                case 0:
                    move(oSp,{left:oSp.offsetWidth},{easing:'ease-in',duration:200});
                break;
                case 1:
                    move(oSp,{top:oSp.offsetHeight},{easing:'ease-in',duration:200});
                break;
                case 2:
                    move(oSp,{left:-oSp.offsetWidth},{easing:'ease-in',duration:200});
                break;
                case 3:
                    move(oSp,{top:-oSp.offsetHeight},{easing:'ease-in',duration:200});
                break;
            }
        };
    }

    function getDir(obj,oEvent){
        var iST = document.documentElement.scrollTop||document.body.scrollTop;
        var iCH = document.documentElement.clientHeight;
        var disX = oEvent.clientX - getPos(obj).left;
        var disY = oEvent.clientY+iST - getPos(obj).top;
        var x = obj.offsetWidth/2 - disX;
        var y = obj.offsetHeight/2 - disY;
        var ang = r2a(Math.atan2(y,x));
        var dir = 0;
        if(Math.abs(ang)>0&&Math.abs(ang)<37){
            dir = 2;
        }
        if(ang>37&&ang<142){
            dir = 3;
        }
        if(Math.abs(ang)>142&&Math.abs(ang)<180){
            dir = 0;
        }
        if(ang<-37&&ang>-142){
            dir = 1;
        }
        return dir;
    }
    function r2a(n){
        return n*180/Math.PI;
    }