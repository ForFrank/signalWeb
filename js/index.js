
autoheight();
function autoheight(){
    var winHeight=0;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight;
    document.getElementById("nav-menu").style.height= winHeight +"px";
    document.getElementById("main-content").style.height= winHeight +"px";
}
window.onresize=autoheight; //浏览器窗口发生变化时同时变化DIV高度
$(function() {
    $(".nav").on("click", "li", function() {
        var sId = $(this).data("id"); //获取data-id的值
        window.location.hash = sId; //设置锚点
        loadInner(sId);
    });

    function loadInner(sId) {
        var sId = window.location.hash;
        var pathn, i;
        switch(sId) {
            case "#state":
                pathn = "state.html";
                i = 0;
                break;
            case "#phase":
                pathn = "phase.html";
                i = 1;
                break;
            case "#follow":
                pathn = "follow.html";
                i = 2;
                break;
            case "#passageway":
                pathn = "passageway.html";
                i = 3;
                break;
            case "#conflict":
                pathn = "conflict.html";
                i = 4;
                break;
            case "#detector":
                pathn = "detector.html";
                i = 5;
                break;
            case "#yearplan":
                pathn = "yearplan.html";
                i = 6;
                break;
            case "#dayplan":
                pathn = "dayplan.html";
                i = 7;
                break;
            case "#timing":
                pathn = "timing.html";
                i = 8;
                break;
            case "#split":
                pathn = "split.html";
                i = 9;
                break;
            case "#operation_log":
                pathn = "operation_log.html";
                i = 10;
                break;
            case "#center":
                pathn = "center.html";
                i = 11;
                break;
            case "#parameter":
                pathn = "parameter.html";
                i = 12;
                break;
            case "#lamp":
                pathn = "lamp.html";
                i = 13;
                break;
            case "#phaselamp":
                pathn = "phaselamp.html";
                i = 14;
                break;
            case "#transition":
                pathn = "transition.html";
                i = 15;
                break;
            case "#phaseparameter":
                pathn = "phaseparameter.html";
                i = 16;
                break;
            case "#requirement":
                pathn = "requirement.html";
                i = 17;
                break;
            case "#statephase":
                pathn = "statephase.html";
                i = 18;
                break;
            case "#latestart":
                pathn = "latestart.html";
                i = 19;
                break;
            case "#earlyend":
                pathn = "earlyend.html";
                i = 20;
                break;
            case "#greeninterval":
                pathn = "greeninterval.html";
                i = 21;
                break;
            case "#urgent":
                pathn = "urgent.html";
                i = 22;
                break;
            case "#first":
                pathn = "first.html";
                i = 23;
                break;
            case "#programme":
                pathn = "programme.html";
                i = 24;
                break;
            case "#constraint":
                pathn = "constraint.html";
                i = 25;
                break;
            default:
                pathn = "state.html";
                i = 0;
                break;
        }
        $("#iframe").load(pathn); //加载相对应的内容
        $(".nav li").eq(i).addClass("current").siblings().removeClass("current"); //当前列表高亮
    }
    var sId = window.location.hash;
    loadInner(sId);
});
// MainLogic();
