/**
 * Created by kalin on 2017/10/30.
 */
//4个按钮，4种弹出框类型
var fixCenter = document.getElementById("fixCenter"),
    forbideScroll = document.getElementById("forbideScroll"),
    changeSize = document.getElementById("changeSize"),
    draggable = document.getElementById("draggable");

//弹出框
var drumpOut = document.getElementById("drumpOut");
var scrollFrame = document.getElementById("scrollFrame");

//确认键、取消键
var confirm = document.getElementById("confirm");
var cancel = document.getElementById("cancel");

//伸缩弹出框的8个边框
var borders = document.getElementsByTagName("i");

//弹出框居中
function center(obj){
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
    var elW = obj.offsetWidth; //弹出框宽度
    var elH = obj.offsetHeight; //弹出框高度
    obj.style.top = (bodyH-elH)/2+'px';
    obj.style.left = (bodyW-elW)/2+'px';
}

//按取消键后弹出框消失
function returnBack(){
    drumpOut.className = "hidden";
    drumpOut.position = "absolute";
    scrollFrame.style.backgroundColor = "#ffffff";
    scrollFrame.style.position = "static";
}

//弹出框显示
function show() {
    drumpOut.className = "show";
    scrollFrame.style.backgroundColor = "rgba(96,96,96,0.6)";
}

//弹出框移动
function drag(obj){
    var moveX = 0, //鼠标与弹出框的X坐标差距
        moveY=0; //鼠标与弹出框的Y坐标差距
    var isDraging = false; //弹出框不可拖动

    //鼠标按下
    obj.onmousedown = function(e) {
        var e = e || window.event;
        var mouseX = e.pageX, //鼠标X坐标
            mouseY = e.pageY; //鼠标Y坐标
        var dialogX = obj.offsetLeft, //弹出框X坐标
            dialogY = obj.offsetTop; //弹出框Y坐标
        moveX = mouseX-dialogX;
        moveY = mouseY-dialogY;
        isDraging = true;
    }
    //鼠标移动
    document.onmousemove = function(e){
        var e = e||window.event;
        move(obj,e,isDraging,moveX,moveY);
    }
    //鼠标离开
    document.onmouseup = function(){
        isDraging = false;
    }
}

function range(obj){
    var pageW = document.documentElement.clientWidth, //视口宽度
        pageH = document.documentElement.clientHeight; //视口高度
    var dialogW = obj.offsetWidth, //弹出框宽度
        dialogH = obj.offsetHeight; //弹出框高度
    var maxX = pageW - dialogW,  //X轴最大位移
        maxY = pageH - dialogH; //Y轴最大位移
    return{maxX:maxX,maxY:maxY};
}

function move(obj,e,judge,moveX,moveY){
    var mouseX = e.pageX, //当前鼠标X坐标
        mouseY = e.pageY; //当前鼠标Y坐标
    if(judge === true){
        var maxX = range(obj).maxX,
            maxY = range(obj).maxY;
        var objX = mouseX - moveX,
            objY = mouseY -moveY;
        obj.style.left = Math.min(Math.max(0,objX),maxX)+'px';
        obj.style.top = Math.min(Math.max(0,objY),maxY)+'px';
    }
}

function resize(obj,ele,mouseX,mouseY,isMove){

    var objW = obj.offsetWidth, //弹出框长度
        objH = obj.offsetHeight; //弹出框高度
    var objTop = obj.offsetTop, //弹出框距离窗口Top
        objLeft = obj.offsetLeft;//弹出框距离窗口Left
    var newWidth,newHeight;
    var newTop,newLeft;

    document.body.onmousemove = function(e){
        var e = e||window.event;
        if(isMove===true){
            switch(ele.id){
                case "pop_t":
                    {
                        var dis = mouseY -e.clientY;
                        newHeight = objH + dis;
                        newTop = objTop-dis;
                    }
                    break;
                case "pop_b":
                    {
                        var dis = e.clientY-mouseY;
                        newHeight = objH + dis;
                    }
                    break;
                case "pop_l":
                    {
                        var dis = mouseX-e.clientX;
                        newWidth = objW+dis;
                        newLeft = objLeft-dis;
                    }
                    break;
                case "pop_r":
                    {
                        var dis = e.clientX-mouseX;
                        newWidth = objW+dis;

                    }
                    break;
                case "pop_t_l":
                    {
                        var disY = mouseY -e.clientY;
                        newHeight = objH + disY;
                        newTop = objTop-disY;
                        var disX = mouseX-e.clientX;
                        newWidth = objW+disX;
                        newLeft = objLeft-disX;
                    }
                    break;
                case "pop_t_r":
                    {
                        var disY = mouseY -e.clientY;
                        newHeight = objH + disY;
                        newTop = objTop-disY;
                        var disX = e.clientX-mouseX;
                        newWidth = objW+disX;
                    }
                    break;
                case "pop_b_l":
                    {
                        var disY = e.clientY-mouseY;
                        newHeight = objH + disY;
                        var disX = mouseX-e.clientX;
                        newWidth = objW+disX;
                        newLeft = objLeft-disX;
                    }
                    break;
                case "pop_b_r":
                {
                    newHeight = objH + e.clientY-mouseY;
                    newWidth = objW+mouseX-e.clientX;
                }
                    break;
            }
        }
        obj.style.width = newWidth+'px';
        obj.style.height = newHeight+'px';
        obj.style.top = newTop+'px';
        obj.style.left = newLeft+'px';
    }
    document.body.onmouseup = function(e){
        isMove = false;
    }

}

confirm.onclick = function(){
    alert("OK");
    returnBack();
}
cancel.onclick = function () {
   returnBack();
}

fixCenter.onclick = function(){
    drumpOut.style.position = "fixed";
    center(drumpOut);
    show();
    outsideClose("fixCenter");
}

forbideScroll.onclick=function(){
    center(drumpOut);
    show();
    scrollFrame.style.position = "fixed";
    outsideClose("forbideScroll");
}
changeSize.onclick=function(){
    drumpOut.style.position = "fixed";
    center(drumpOut);
    show();
    for(let i=0;i<borders.length;i++){
        borders[i].onmousedown = function(e){
            var e = e||window.event;
            e.stopPropagation();
            resize(drumpOut,this,e.clientX,e.clientY,true);
            return false;
        }
    }
    outsideClose("changeSize");
}

draggable.onclick=function(){
    drumpOut.style.position = "fixed";
    center(drumpOut);
    show();
    drag(drumpOut);
    outsideClose("draggable");
}
