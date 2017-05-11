// 常用函数
function G(id){return document.getElementById(id);}
function S(id){G(id).style.visibility = 'visible';}
function H(id){G(id).style.visibility = 'hidden';}
function Show(id){G(id).style.display = 'block';}
function Hide(id){G(id).style.display = 'none';}
function isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]' || (o instanceof Array);
}
function isObject(o){
    return Object.prototype.toString.call(o) === '[object Object]'
}
function ajax(url,callback,topname,start){
    $.ajax({
        url:url,
        type:'get',
        dataType:'json',
        beforeSend:function(){
            showLoading()
		},
		complete:function(){
            removeLoading()
		},
        success:function(data){
            if(typeof callback == 'function'){
                callback(data,topname,start)
            }
        },
        error:function(){
            //mui.alert('请求失败')
        }
    })
}


var phone_content = false;
//获取url信息
function url(name) {   //获取url 地址传的数据
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
function call(fn, args){
    if(typeof fn == "string"){
        eval("("+fn+")")();
    }else if(typeof fn == "function"){
        if(isArray(args)){
            return fn.apply(window, args);
        }
    }
}
function keyLeft() {
    if(!buttons)return
    if(buttons[btnId].L=='tab'){
        call(buttons[btnId].f,this)
        btnId=buttons[btnId].Llist;
        call(buttons[btnId].s,this)
        return
    }
    if(!G(buttons[btnId].L)){
        return
    }

    call(buttons[btnId].f,this)
    btnId=buttons[btnId].L;
    call(buttons[btnId].s,this)
}

function keyRight() {
    if(!buttons)return
    if(buttons[btnId].R=='tab'){
        call(buttons[btnId].f,this)
        btnId=buttons[btnId].Rlist;
        call(buttons[btnId].s,this)
        return
    }
    if(!G(buttons[btnId].R)){
        return
    }
    call(buttons[btnId].f,this)
    btnId=buttons[btnId].R;
    call(buttons[btnId].s,this)
    
}

function keyUp() {
    if(!buttons)return
    if(buttons[btnId].T=='tab'){
        call(buttons[btnId].f,this)
        btnId=buttons[btnId].Tlist;
        call(buttons[btnId].s,this)
        return
    }
    if(!G(buttons[btnId].T)){
        return
    }
    call(buttons[btnId].f,this);
    btnId=buttons[btnId].T;
    call(buttons[btnId].s,this)
}

function keyDown() {
    if(!buttons)return
    if(buttons[btnId].D=='tab'){
        call(buttons[btnId].f,this)
        btnId=buttons[btnId].Dlist;
        call(buttons[btnId].s,this)
        return
    }
    if(!G(buttons[btnId].D)){
        return
    }
    call(buttons[btnId].f,this)
    btnId=buttons[btnId].D;
    call(buttons[btnId].s,this)
}
function keyEnter(){
	call(buttons[btnId].e,this)
}
var isEnter=false;//控制连续触发
var timer;
document.addEventListener('keydown', function(e) {
    if(isEnter) return ;
    window.clearTimeout(timer);
    timer=setTimeout(function () {
        isEnter = false;
    },300);
    isEnter = true;

    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		keyLeft();
    		break;
    	case 38: //UP arrow
    		keyUp();
    		break;
    	case 39: //RIGHT arrow
    		keyRight();
    		break;
    	case 40: //DOWN arrow
    		keyDown();
    		break;
    	case 13: //OK button
    		keyEnter();
    		break;
    	case 10009: //RETURN button 10009  87
    		KeyBack();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
//结束时间
function myTime(endTime,startTime,systemTime){
	var systemTime=systemTime.replace(/-/g,'/');
	var HomeTime = new Date(systemTime).getTime();
	var endTime=endTime.replace(/-/g,'/');
	var startTime=startTime.replace(/-/g,'/');
	var actEndTime = (new Date(endTime)).getTime(); //得到毫秒数
	var actStartTime=(new Date(startTime)).getTime(); //得到毫秒数
    var kaishi = actStartTime-HomeTime;
    var jieshu=actEndTime-HomeTime;
    var myjson={};
	if(kaishi > 0){
		myjson["time"]=formatTime(kaishi);
		myjson["start"]="start";
		return myjson;
	}else if(jieshu>0){
		myjson["time"]=formatTime(jieshu);
		myjson["end"]="end";
		return myjson;
	}else{
        myjson["time"]=formatTime(jieshu);
        myjson["yiend"]="yiend";
		return myjson;
	}
}
function formatTime(time){
	var daysRound = Math.floor(time / 1000 / 60 / 60 / 24);
	var hoursRound = Math.floor(time/ 1000 / 60 / 60 - (24 * daysRound));
	var minutesRound = Math.floor(time / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound));
	var seconds = time/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
	if(daysRound == 0 && hoursRound != 0){
		var endTime = hoursRound+"时"+minutesRound+"分";
	}else if(daysRound == 0 && hoursRound == 0){
		var endTime = minutesRound+"分";
	}else{
//			var endTime = daysRound+"天"+hoursRound+"时"+minutesRound+"分";
		var endTime = daysRound+"天";
	}
	return endTime;
}
function timeformat(time){
    var nowAddTwo = new Date(time).getTime();
    var date = new Date(nowAddTwo);
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var shi=date.getHours();
    var fen=date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if(shi>=0&&shi<=9){
        shi='0'+shi;
    }
    if(fen>=0&&fen<=9){
        fen='0'+fen;
    }
    return month+'月'+strDate+'日'+' '+shi+':'+fen

}

var fade=(function(f){
    function fadeI(elem, speed,opacityIn,opacityOut){
        elem.style.display = 'block';
        var val = opacityIn;
        (function(){
            elem.style.opacity=val/100;
            val += 5;
            if (val <= opacityOut) {
                setTimeout(arguments.callee, speed);
            }
        })();
    }
    function fadeO(elem, speed,opacityIn,opacityOut){
        elem.style.display = 'block';
        var val = opacityIn;
        (function(){
            elem.style.opacity=val/100;
            val -= 5;
            if (val >= opacityOut) {
                setTimeout(arguments.callee, speed);
            }
        })();
    }
    function sleep(second,callback) {
        if(typeof callback == 'function'){
            setTimeout(callback,second*1000);
        }
    }
    f.fadeI=function(elem, speed, opacityIn,opacityOut){
        fadeI(elem, speed, opacityIn,opacityOut);
    };
    f.fadeO=function(elem, speed,opacityIn,opacityOut){
        fadeO(elem, speed, opacityIn,opacityOut);
    };
    f.sleep=function(second,callback){
        sleep(second,callback);
    };
    return f;
}(fade||{}));
function toast(text){
    G('message').innerHTML=text;
    G('message').style.display="block";
    fade.fadeI(G('message'),20,0,80);
    fade.sleep(2,function(){
        fade.fadeO(G('message'),20,80,0);
    });
}
function error(text){
    G('message').innerHTML=text;
    G('message').style.display="block";
    fade.fadeI(G('message'),20,0,80);
}
function sessionSet(key,value){
    value=JSON.stringify(value);
    window.sessionStorage.setItem(key, value);
}
function sessionGet(key){
    var strStoreDate = window.sessionStorage.getItem(key)
    return JSON.parse(strStoreDate)
}
function sessionRemove(key){
    window.sessionStorage.removeItem(key);
}
function sessionClear(){
    window.sessionStorage.clear();
}

function showLoading(){
    var odiv=document.createElement("div");
    odiv.setAttribute('class','loading');
    odiv.setAttribute('id','loading');
    odiv.innerHTML+='<div class="spinner">';
    odiv.innerHTML+='<div class="circle1 circle"></div>';
    odiv.innerHTML+='<div class="circle2 circle"></div>';
    odiv.innerHTML+='<div class="circle3 circle"></div>';
    odiv.innerHTML+='<div class="circle4 circle"></div>';
    odiv.innerHTML+='<div class="circle5 circle"></div>';
    odiv.innerHTML+='<div class="circle6 circle"></div>';
    odiv.innerHTML+='<div class="circle7 circle"></div>';
    odiv.innerHTML+='<div class="circle8 circle"></div>';
    odiv.innerHTML+='<div class="circle9 circle"></div>';
    odiv.innerHTML+='<div class="circle10 circle"></div>';
    odiv.innerHTML+='<div class="circle11 circle"></div>';
    odiv.innerHTML+='<div class="circle12 circle"></div>';
    odiv.innerHTML+='</div>';
    document.body.appendChild(odiv)
}
function removeLoading(){
    var o=document.getElementById('loading');
    document.body.removeChild(o)
}