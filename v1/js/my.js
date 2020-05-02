jQuery(document).ready(function($) {

    /*function isInView(elem) {
        var top = $(window).scrollTop();
        var bottom = top + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return((elemBottom <= bottom) && (elemTop >= top));
    }

    $(window).bind('scroll', function() {
        if(isInView(document.querySelector('#type'))) {
            visible = true;
        } else {
            visible = false;
        }
    }); */ //end of scroll function



    //scroll "easing" when clicked
    $(function() {
        $('#scrolldown').bind('click', function(e) {
            $('html, body').stop().animate({
                scrollTop: $('#main').offset().top
            }, 1500, 'easeInOutExpo');
            e.preventDefault();
        });
        $('#scrollup, .navbar-brand').bind('click', function(e) {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 1500, 'easeInOutExpo');
            e.preventDefault();
        });
    });

    //check if mobile
    if($(window).width() > 580) {
        var pause = 20;
        var speed = 8;
        var lines = [
        'cout <<meta/><<meta/> <span style="color:#E7D76D;">"Hello, world!"</span>;', 
        ' <span style="color:#72CFEC;"><i>System</i></span><span style="color:#be4678;">.</span>out<span style="color:#be4678;">.</span>println(<span style="color:#FFEB62;">"Hello, world!"</span>);', 
        'print <span style="color:#E7D76D;">"Hello, world!"</span>',
        'console<span style="color:#72CFEC;">.log</span>(<span style="color:#E7D76D;">"Hello, world!"</span>);',
        ' <span style="color:#72CFEC;">echo</span><span style="color:#E7D76D;"> \'Hello, world!\'</span>;'
        ];

        var line = lines[0];
        var cur = 0,
        dir = 1,
        lang = 0;
        var s = 0;
        setInterval(function loop() {
        cur += dir;
        //parser: if erasing
        if(dir < 0) {
            if (line[cur] == '>') {
                while(line[cur] != '<')
                    cur--;
            }
            cur += dir;
            if (line[cur] == '>') {
                while(line[cur] != '<')
                    cur--;
            }
            cur += dir;
            if (line[cur] == '>') {
                while(line[cur] != '<')
                    cur--;
            }
        } 
        //parser: if typing
        else {    
            if (line[cur] == '<') {
                while(line[cur] != '>')
                    cur++; 
            }
        }
        //erasing 
        if (cur < 0) {
          cur = 0;
          dir = -dir;
          lang = (++lang) % lines.length;
          line = lines[lang];
        }
        //line has been typed out
        if (cur > line.length) {
          cur = line.length;
          //loop until pause time is up
          if (s++ > pause) {
            s = 0
            dir = -dir;
          }
        } 

        document.querySelector('#type').innerHTML = line.substring(0, cur);
        }, 500 / speed)

    } 


    /*var pause = 40;
    var speed = 2;
    var lines = [
    'travel', 'ramen', 'painting', 'bojack horseman', 'golden gate bridge',
    'book stores'
    ];

    var line = lines[0];
    var cur = 0,
    dir = 1,
    lang = 0;
    var s = 0;
    setInterval(function loop() {
    cur += dir;
    //erasing 
    if (cur < 0) {
      cur = 0;
      dir = -dir;
      lang = (++lang) % lines.length;
      line = lines[lang];
    }
    //line has been typed out
    if (cur > line.length) {
      cur = line.length;
      //loop until pause time is up
      if (s++ > pause) {
        s = 0
        dir = -dir;
      }
    } 

    document.querySelector('#likes').innerHTML = line.substring(0, cur);
    }, 500 / speed)*/


   /* $('#navbar a').click(function() { 
        $(this).siblings('.active').removeClass('active');
        var link = $(this).text().toLowerCase();

        $('#main .page').each(function() {
            if (!$(this).hasClass(link)) {
                $(this).hide()
            } else {
                $(this).show(1000);
            }
        });
    });*/

    $('.nav').click(function() { 
        $(this).siblings('.active').removeClass('active');
        var link = $(this).attr('id');
        link = link.substring(0, link.length-7); //trim "-button" off ID value

        $('#main .page').each(function() {
            if (!$(this).hasClass(link)) {
                $(this).fadeOut(500);
            } else {
                $(this).fadeIn(1000);
                //$(this).addClass("slideInLeft").show();

            }
        });
    });
    /*
    $('#portfolio-button').click(function() { 
        $(this).siblings('.active').removeClass('active');
        var link = $(this).text().toLowerCase();
        $('#about').hide();
        $('#portfolio').fadeIn(1000);
    });

    $('#portfolio-button').click(function() { 
        $(this).siblings('.active').removeClass('active');
        var link = $(this).text().toLowerCase();
        $('#about').hide();
        $('#portfolio').fadeIn(1000);
    });*/


        //portfolio configurations
    $('#portfolio .buttons li').click(function() {
        $(this).css('outline', 'none');
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        var filter = $(this).text().toLowerCase().replace(' ',
            '-');
        if (filter == 'all') {
            $('#portfolio .tile li.hidden').removeClass(
                'hidden').css('display', 'inline-block');
        } else {
            $('#portfolio .tile li').each(function() {
                if (!$(this).hasClass(filter)) {
                    $(this).addClass(
                        'hidden');
                } else {
                    $(this).hide(); //hide elements to add fade effect if they were prexisting on page
                    $(this).removeClass(
                        'hidden').css('display',
                        'inline-block');
                }
            });
        }
        return false;
    });

}); //end of document ready function


//initialize animated icons with WOW.js
new WOW().init();
