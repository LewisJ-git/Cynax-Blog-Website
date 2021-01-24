window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("canvas-basic").style.width = scrolled + "%";
};

function resizeToMinimum(){
    var minimum    = [420, 270];
    var current    = [window.outerWidth, window.outerHeight];
    var restricted = [];
    var i          = 2;
    while(i-- > 0){
        restricted[i] = minimum[i] > current[i] ? minimum[i] : current[i];
    }
    window.resizeTo(current[0], current[1]);
};

window.addEventListener('resize', resizeToMinimum, false);

window.addEventListener('scroll', function(e) {
    const target = document.querySelectorAll('.para-deco');
    var index = 0, length = target.length;
    for (index; index < length; index++) {
        var pos = window.pageYOffset * target[index].dataset.rate;
        target[index].style.transform = 'translate3d(0px, '+pos+'px, 0px)';
    }
});

$(document).ready(function() {
    var counter = 0;
    var c = 0;
    var i = setInterval(function () {
    $(".loading-page .counter h1").html(c + "%");
    $(".loading-page .counter hr").css("width", c + "%");
    counter++;
    c++;
        if (counter == 101) {
            clearInterval(i);
            setTimeout(function () {
                $('.loading-page').fadeOut('200', function () {
                    $(this).remove();
                });
            }, 300);
        }
    }, 10);

    setInterval(function() {
        var rand = (Math.random() * 100) + 50;
        var val = Math.random();
           if (Math.random() < 0.5 && val > 0.4) {
               $(".flicker").css("opacity", val);
           }     
    }, 500);

    setInterval(function() {
        var val = Math.random();
        if (val > 0.6) {
            $(".flicker02").css("opacity", val);
        }
    }, 100);
});

