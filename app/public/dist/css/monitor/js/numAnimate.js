;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jquery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    function formatNumber(str) {
        if(str.length <= 3){
            return str;
        } else {
            return formatNumber( str.substr(0,str.length-3)) + ','+str.substr(str.length-3);
        }
    }
    function fnnum(obj,num){
        var newNum = formatNumber(num);
        var numArr = newNum.split("");
        var html = "";
        for (var i = 0; i < numArr.length; i++) {
            if(numArr[i]==','){
                
            }else{
                html+='<i class="num-b" data-num="'+numArr[i]+'">'+0+'</i>'
            }
        };
        $(obj).html(html);
        var ilength = num.length;
        $(obj).find(".num-b").each(function(i,n){
            numAnimate(ilength-i,n);
        })
    }
    function numAnimate(i,obj){
        var num = $(obj).attr("data-num")*1,
            start = 0;
        //每位变化速率不同，个位速度最快，一直到十百千万，以此类推
        var timer = setInterval(function(){
            if(start<=num){
                $(obj).html(start);
                start++;
            }else{
                clearInterval(timer);
            }
        }, 66*i);
    }
    $.fn.numAnimate=function(){
        return this.each(function(i,n){
            var num = $(n).attr("data-num");
            fnnum(n,num);
        })
    }
}));
