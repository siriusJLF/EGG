/*背景流星方法*/
var WINDOW_WIDTH = document.body.offsetWidth;
var WINDOW_HEIGHT = document.body.offsetHeight;
var canvas, context;
var num = 300;
var stars = [];
var mouseX = WINDOW_WIDTH / 2;
var mouseY = WINDOW_HEIGHT / 2;
var rnd;
console.log(WINDOW_WIDTH,WINDOW_HEIGHT);
window.onload = function() {
    canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    context = canvas.getContext('2d');

    addStar();
    setInterval(render, 33);
    liuxing();

    // render();
    document.body.addEventListener('mousemove', mouseMove);
}

function liuxing() {
    var time = Math.round(Math.random() * 3000 + 33);
    setTimeout(function() {
        rnd = Math.ceil(Math.random() * stars.length)
        liuxing();
    }, time)
}

function mouseMove(e) {
    //因为是整屏背景，这里不做坐标转换
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function render() {
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
    for (var i = 0; i < num; i++) {
        var star = stars[i];
        if (i == rnd) {
            star.vx = -20;
            star.vy = 20;
            context.beginPath();
            context.strokeStyle = 'rgba(255,255,255,' + star.alpha + ')';
            context.lineWidth = star.r;
            context.moveTo(star.x, star.y);
            context.lineTo(star.x + star.vx, star.y + star.vy);
            context.stroke();
            context.closePath();
        }
        star.alpha += star.ra;
        if (star.alpha <= 0) {
            star.alpha = 0;
            star.ra = -star.ra;
            star.vx = Math.random() * 0.2 - 0.1;
            star.vy = Math.random() * 0.2 - 0.1;
        } else if (star.alpha > 1) {
            star.alpha = 1;
            star.ra = -star.ra
        }
        star.x += star.vx;
        if (star.x >= WINDOW_WIDTH) {
            star.x = 0;
        } else if (star.x < 0) {
            star.x = WINDOW_WIDTH;
            star.vx = Math.random() * 0.2 - 0.1;
            star.vy = Math.random() * 0.2 - 0.1;
        }
        star.y += star.vy;
        if (star.y >= WINDOW_HEIGHT) {
            star.y = 0;
            star.vy = Math.random() * 0.2 - 0.1;
            star.vx = Math.random() * 0.2 - 0.1;
        } else if (star.y < 0) {
            star.y = WINDOW_HEIGHT;
        }
        context.beginPath();
        var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
        bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')')
        bg.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = bg;
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
    }
}

function addStar() {
    for (var i = 0; i < num; i++) {
        var aStar = {
            x: Math.round(Math.random() * WINDOW_WIDTH),
            y: Math.round(Math.random() * WINDOW_HEIGHT),
            r: Math.random() * 3,
            ra: Math.random() * 0.15,
            alpha: Math.random(),
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1
        }
        stars.push(aStar);
    }
}
/*高效数字滚动-兼容到IE9*/
$(function() {
    $.fn.numberAnimate = function(setting) {
        var defaults = {
                speed: 1000, //动画速度
                num: "", //初始化值
                iniAnimate: true, //是否要初始化动画效果
                symbol: '', //默认的分割符号，千，万，千万
                dot: 0 //保留几位小数点
            }
            //如果setting为空，就取default的值
        var setting = $.extend(defaults, setting);

        //如果对象有多个，提示出错
        if ($(this).length > 1) {
            alert("just only one obj!");
            return;
        }

        //如果未设置初始化值。提示出错
        if (setting.num == "") {
            alert("must set a num!");
            return;
        }
        var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
                        <span class="mt-number-animate-span">0</span>\
                        <span class="mt-number-animate-span">1</span>\
                        <span class="mt-number-animate-span">2</span>\
                        <span class="mt-number-animate-span">3</span>\
                        <span class="mt-number-animate-span">4</span>\
                        <span class="mt-number-animate-span">5</span>\
                        <span class="mt-number-animate-span">6</span>\
                        <span class="mt-number-animate-span">7</span>\
                        <span class="mt-number-animate-span">8</span>\
                        <span class="mt-number-animate-span">9</span>\
                        <span class="mt-number-animate-span">.</span>\
                    </div>';

        //数字处理
        var numToArr = function(num) {
            num = parseFloat(num).toFixed(setting.dot);
            if (typeof(num) == 'number') {
                var arrStr = num.toString().split("");
            } else {
                var arrStr = num.split("");
            }
            //console.log(arrStr);
            return arrStr;
        }

        //设置DOM symbol:分割符号
        var setNumDom = function(arrStr) {
            var shtml = '<div class="mt-number-animate">';
            for (var i = 0, len = arrStr.length; i < len; i++) {
                if (i != 0 && (len - i) % 3 == 0 && setting.symbol != "" && arrStr[i] != ".") {
                    shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
                } else {
                    shtml += nHtml.replace("{{num}}", arrStr[i]);
                }
            }
            shtml += '</div>';
            return shtml;
        }

        //执行动画
        var runAnimate = function($parent) {
            $parent.find(".mt-number-animate-dom").each(function() {
                var num = $(this).attr("data-num");
                num = (num == "." ? 10 : num);
                var spanHei = $(this).height() / 11; //11为元素个数
                var thisTop = -num * spanHei + "px";
                var transform = $(this).css("transform");
                if (transform == 'none' || -num * spanHei != parseInt(transform.split(",")[5], 10)) {
                    if (setting.iniAnimate) {
                        //HTML5不支持
                        if (!window.applicationCache) {
                            $(this).animate({
                                top: thisTop
                            }, setting.speed);
                        } else {
                            $(this).css({
                                'transform': 'translateY(' + thisTop + ')',
                                '-ms-transform': 'translateY(' + thisTop + ')',
                                /* IE 9 */
                                '-moz-transform': 'translateY(' + thisTop + ')',
                                /* Firefox */
                                '-webkit-transform': 'translateY(' + thisTop + ')',
                                /* Safari 和 Chrome */
                                '-o-transform': 'translateY(' + thisTop + ')',
                                '-ms-transition': setting.speed / 1000 + 's',
                                '-moz-transition': setting.speed / 1000 + 's',
                                '-webkit-transition': setting.speed / 1000 + 's',
                                '-o-transition': setting.speed / 1000 + 's',
                                'transition': setting.speed / 1000 + 's'
                            });
                        }
                    } else {
                        setting.iniAnimate = true;
                        $(this).css({
                            top: thisTop
                        });
                    }
                }
            });
        }

        //初始化
        var init = function($parent) {
            //初始化
            $parent.html(setNumDom(numToArr(setting.num)));
            runAnimate($parent);
        };

        //重置参数
        this.resetData = function(num) {
                var newArr = numToArr(num);
                var $dom = $(this).find(".mt-number-animate-dom");
                if ($dom.length < newArr.length) {
                    $(this).html(setNumDom(numToArr(num)));
                } else {
                    $dom.each(function(index, el) {
                        $(this).attr("data-num", newArr[index]);
                    });
                }
                runAnimate($(this));
            }
            //init
        init($(this));
        return this;
    }
});
(jQuery);

$(function() {

    //初始化
    var numRun = $(".numberRun").numberAnimate({
        num: '2032087',
        speed: 2000,
        symbol: ","
    });
    var nums = 2032087;
    setInterval(function() {
        nums += 10;
        numRun.resetData(nums);
    }, 2000);


    var numRun2 = $(".numberRun2").numberAnimate({
        num: '64526696',
        speed: 3000,
        symbol: ","
    });
    var nums2 = 64526696;
    setInterval(function() {
        nums2 += 1433;
        numRun2.resetData(nums2);
    }, 3000);


    var numRun3 = $(".numberRun3").numberAnimate({
        num: '1119107186',
        speed: 2000,
        symbol: ","
    });
    var nums3 = 1119107186;
    setInterval(function() {
        nums3 += 10;
        numRun3.resetData(nums3);
    }, 2000);

    var numRun4 = $(".numberRun4").numberAnimate({
        num: '50609736891',
        speed: 2000,
        symbol: ","
    });
    var nums4 = 50609736891;
    setInterval(function() {
        nums4 += 10;
        numRun4.resetData(nums4);
    }, 2000);

    var numRun5 = $(".numberRun5").numberAnimate({
        num: '16358520155',
        speed: 2000,
        symbol: ","
    });
    var nums5 = 16358520155;
    setInterval(function() {
        nums5 += 10;
        numRun5.resetData(nums5);
    }, 2000);

});
/*CSS3兼容*/

timer_length = 200; // Milliseconds
border_opacity = false; // Use opacity on borders of rounded-corner elements? Note: This causes antialiasing issues


// supportsVml() borrowed from http://stackoverflow.com/questions/654112/how-do-you-detect-support-for-vml-or-svg-in-a-browser
function supportsVml() {
    if (typeof supportsVml.supported == "undefined") {
        var a = document.body.appendChild(document.createElement('div'));
        a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
        var b = a.firstChild;
        b.style.behavior = "url(#default#VML)";
        supportsVml.supported = b ? typeof b.adj == "object": true;
        a.parentNode.removeChild(a);
    }
    return supportsVml.supported
}


// findPos() borrowed from http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
    var curleft = curtop = 0;

    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }

    return({
        'x': curleft,
        'y': curtop
    });
}

function createBoxShadow(element, vml_parent) {
    var style = element.currentStyle['iecss3-box-shadow'] || element.currentStyle['-moz-box-shadow'] || element.currentStyle['-webkit-box-shadow'] || element.currentStyle['box-shadow'] || '';
    var match = style.match(/^(\d+)px (\d+)px (\d+)px/);
    if (!match) { return(false); }


    var shadow = document.createElement('v:roundrect');
    shadow.userAttrs = {
        'x': parseInt(RegExp.$1 || 0),
        'y': parseInt(RegExp.$2 || 0),
        'radius': parseInt(RegExp.$3 || 0) / 2
    };
    shadow.position_offset = {
        'y': (0 - vml_parent.pos_ieCSS3.y - shadow.userAttrs.radius + shadow.userAttrs.y),
        'x': (0 - vml_parent.pos_ieCSS3.x - shadow.userAttrs.radius + shadow.userAttrs.x)
    };
    shadow.size_offset = {
        'width': 0,
        'height': 0
    };
    shadow.arcsize = element.arcSize +'px';
    shadow.style.display = 'block';
    shadow.style.position = 'absolute';
    shadow.style.top = (element.pos_ieCSS3.y + shadow.position_offset.y) +'px';
    shadow.style.left = (element.pos_ieCSS3.x + shadow.position_offset.x) +'px';
    shadow.style.width = element.offsetWidth +'px';
    shadow.style.height = element.offsetHeight +'px';
    shadow.style.antialias = true;
    shadow.className = 'vml_box_shadow';
    shadow.style.zIndex = element.zIndex - 1;
    shadow.style.filter = 'progid:DXImageTransform.Microsoft.Blur(pixelRadius='+ shadow.userAttrs.radius +',makeShadow=true,shadowOpacity='+ element.opacity +')';

    element.parentNode.appendChild(shadow);
    //element.parentNode.insertBefore(shadow, element.element);

    // For window resizing
    element.vml.push(shadow);

    return(true);
}

function createBorderRect(element, vml_parent) {
    if (isNaN(element.borderRadius)) { return(false); }

    element.style.background = 'transparent';
    element.style.borderColor = 'transparent';

    var rect = document.createElement('v:roundrect');
    rect.position_offset = {
        'y': (0.5 * element.strokeWeight) - vml_parent.pos_ieCSS3.y,
        'x': (0.5 * element.strokeWeight) - vml_parent.pos_ieCSS3.x
    };
    rect.size_offset = {
        'width': 0 - element.strokeWeight,
        'height': 0 - element.strokeWeight
    };
    rect.arcsize = element.arcSize +'px';
    rect.strokeColor = element.strokeColor;
    rect.strokeWeight = element.strokeWeight +'px';
    rect.stroked = element.stroked;
    rect.className = 'vml_border_radius';
    rect.style.display = 'block';
    rect.style.position = 'absolute';
    rect.style.top = (element.pos_ieCSS3.y + rect.position_offset.y) +'px';
    rect.style.left = (element.pos_ieCSS3.x + rect.position_offset.x) +'px';
    rect.style.width = (element.offsetWidth + rect.size_offset.width) +'px';
    rect.style.height = (element.offsetHeight + rect.size_offset.height) +'px';
    rect.style.antialias = true;
    rect.style.zIndex = element.zIndex - 1;

    if (border_opacity && (element.opacity < 1)) {
        rect.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ parseFloat(element.opacity * 100) +')';
    }

    var fill = document.createElement('v:fill');
    fill.color = element.fillColor;
    fill.src = element.fillSrc;
    fill.className = 'vml_border_radius_fill';
    fill.type = 'tile';
    fill.opacity = element.opacity;

    // Hack: IE6 doesn't support transparent borders, use padding to offset original element
    isIE6 = /msie|MSIE 6/.test(navigator.userAgent);
    if (isIE6 && (element.strokeWeight > 0)) {
        element.style.borderStyle = 'none';
        element.style.paddingTop = parseInt(element.currentStyle.paddingTop || 0) + element.strokeWeight;
        element.style.paddingBottom = parseInt(element.currentStyle.paddingBottom || 0) + element.strokeWeight;
    }

    rect.appendChild(fill);
    element.parentNode.appendChild(rect);
    //element.parentNode.insertBefore(rect, element.element);

    // For window resizing
    element.vml.push(rect);

    return(true);
}

function createTextShadow(element, vml_parent) {
    if (!element.textShadow) { return(false); }

    var match = element.textShadow.match(/^(\d+)px (\d+)px (\d+)px (#?\w+)/);
    if (!match) { return(false); }


    //var shadow = document.createElement('span');
    var shadow = element.cloneNode(true);
    var radius = parseInt(RegExp.$3 || 0);
    shadow.userAttrs = {
        'x': parseInt(RegExp.$1 || 0) - (radius),
        'y': parseInt(RegExp.$2 || 0) - (radius),
        'radius': radius / 2,
        'color': (RegExp.$4 || '#000')
    };
    shadow.position_offset = {
        'y': (0 - vml_parent.pos_ieCSS3.y + shadow.userAttrs.y),
        'x': (0 - vml_parent.pos_ieCSS3.x + shadow.userAttrs.x)
    };
    shadow.size_offset = {
        'width': 0,
        'height': 0
    };
    shadow.style.color = shadow.userAttrs.color;
    shadow.style.position = 'absolute';
    shadow.style.top = (element.pos_ieCSS3.y + shadow.position_offset.y) +'px';
    shadow.style.left = (element.pos_ieCSS3.x + shadow.position_offset.x) +'px';
    shadow.style.antialias = true;
    shadow.style.behavior = null;
    shadow.className = 'ieCSS3_text_shadow';
    shadow.innerHTML = element.innerHTML;
    // For some reason it only looks right with opacity at 75%
    shadow.style.filter = '\
        progid:DXImageTransform.Microsoft.Alpha(Opacity=75)\
        progid:DXImageTransform.Microsoft.Blur(pixelRadius='+ shadow.userAttrs.radius +',makeShadow=false,shadowOpacity=100)\
    ';

    var clone = element.cloneNode(true);
    clone.position_offset = {
        'y': (0 - vml_parent.pos_ieCSS3.y),
        'x': (0 - vml_parent.pos_ieCSS3.x)
    };
    clone.size_offset = {
        'width': 0,
        'height': 0
    };
    clone.style.behavior = null;
    clone.style.position = 'absolute';
    clone.style.top = (element.pos_ieCSS3.y + clone.position_offset.y) +'px';
    clone.style.left = (element.pos_ieCSS3.x + clone.position_offset.x) +'px';
    clone.className = 'ieCSS3_text_shadow';


    element.parentNode.appendChild(shadow);
    element.parentNode.appendChild(clone);

    element.style.visibility = 'hidden';

    // For window resizing
    element.vml.push(clone);
    element.vml.push(shadow);

    return(true);
}

function ondocumentready(classID) {
    if (!supportsVml()) { return(false); }

  if (this.className.match(classID)) { return(false); }
    this.className = this.className.concat(' ', classID);

    // Add a namespace for VML (IE8 requires it)
    if (!document.namespaces.v) { document.namespaces.add("v", "urn:schemas-microsoft-com:vml"); }

    // Check to see if we've run once before on this page
    if (typeof(window.ieCSS3) == 'undefined') {
        // Create global ieCSS3 object
        window.ieCSS3 = {
            'vmlified_elements': new Array(),
            'update_timer': setInterval(updatePositionAndSize, timer_length)
        };

        if (typeof(window.onresize) == 'function') { window.ieCSS3.previous_onresize = window.onresize; }

        // Attach window resize event
        window.onresize = updatePositionAndSize;
    }


    // These attrs are for the script and have no meaning to the browser:
    this.borderRadius = parseInt(this.currentStyle['iecss3-border-radius'] ||
                                 this.currentStyle['-moz-border-radius'] ||
                                 this.currentStyle['-webkit-border-radius'] ||
                                 this.currentStyle['border-radius'] ||
                                 this.currentStyle['-khtml-border-radius']);
    this.arcSize = Math.min(this.borderRadius / Math.min(this.offsetWidth, this.offsetHeight), 1);
    this.fillColor = this.currentStyle.backgroundColor;
    this.fillSrc = this.currentStyle.backgroundImage.replace(/^url\("(.+)"\)$/, '$1');
    this.strokeColor = this.currentStyle.borderColor;
    this.strokeWeight = parseInt(this.currentStyle.borderWidth);
    this.stroked = 'true';
    if (isNaN(this.strokeWeight) || (this.strokeWeight == 0)) {
        this.strokeWeight = 0;
        this.strokeColor = fillColor;
        this.stroked = 'false';
    }
    this.opacity = parseFloat(this.currentStyle.opacity || 1);
    this.textShadow = this.currentStyle['text-shadow'];

    this.element.vml = new Array();
    this.zIndex = parseInt(this.currentStyle.zIndex);
    if (isNaN(this.zIndex)) { this.zIndex = 0; }

    // Find which element provides position:relative for the target element (default to BODY)
    vml_parent = this;
    var limit = 100, i = 0;
    do {
        vml_parent = vml_parent.parentElement;
        i++;
        if (i >= limit) { return(false); }
    } while ((typeof(vml_parent) != 'undefined') && (vml_parent.currentStyle.position != 'relative') && (vml_parent.tagName != 'BODY'));

    vml_parent.pos_ieCSS3 = findPos(vml_parent);
    this.pos_ieCSS3 = findPos(this);

    var rv1 = createBoxShadow(this, vml_parent);
    var rv2 = createBorderRect(this, vml_parent);
    var rv3 = createTextShadow(this, vml_parent);
    if (rv1 || rv2 || rv3) { window.ieCSS3.vmlified_elements.push(this.element); }

    if (typeof(vml_parent.document.ieCSS3_stylesheet) == 'undefined') {
        vml_parent.document.ieCSS3_stylesheet = vml_parent.document.createStyleSheet();
        vml_parent.document.ieCSS3_stylesheet.addRule("v\\:roundrect", "behavior: url(#default#VML)");
        vml_parent.document.ieCSS3_stylesheet.addRule("v\\:fill", "behavior: url(#default#VML)");
        // Compatibility with IE7.js
        vml_parent.document.ieCSS3_stylesheet.ie7 = true;
    }
}

function updatePositionAndSize() {
    if (typeof(window.ieCSS3.vmlified_elements) != 'object') { return(false); }

    for (var i in window.ieCSS3.vmlified_elements) {
        var el = window.ieCSS3.vmlified_elements[i];

        if (typeof(el.vml) != 'object') { continue; }

        for (var z in el.vml) {
            //var parent_pos = findPos(el.vml[z].parentNode);
            var new_pos = findPos(el);
            new_pos.x = (new_pos.x + el.vml[z].position_offset.x) + 'px';
            new_pos.y = (new_pos.y + el.vml[z].position_offset.y) + 'px';
            if (el.vml[z].style.left != new_pos.x) { el.vml[z].style.left = new_pos.x; }
            if (el.vml[z].style.top != new_pos.y) { el.vml[z].style.top = new_pos.y; }

            var new_size = {
                'width': parseInt(el.offsetWidth + el.vml[z].size_offset.width),
                'height': parseInt(el.offsetHeight + el.vml[z].size_offset.height)
            }
            if (el.vml[z].offsetWidth != new_size.width) { el.vml[z].style.width = new_size.width +'px'; }
            if (el.vml[z].offsetHeight != new_size.height) { el.vml[z].style.height = new_size.height +'px'; }
        }
    }

    if (event && (event.type == 'resize') && typeof(window.ieCSS3.previous_onresize) == 'function') { window.ieCSS3.previous_onresize(); }
}
