jQuery(document).ready(function($) {
    //make navbar fixed when the top of screen hits
    var offset = $('.navbar .nav').offset().top;
    $(window).bind('scroll', function() {
        if($(window).width() >= 768) {   //not mobile
            if ($(window).scrollTop() >= offset) {
                $('.navbar').addClass('navbar-fixed-top solid-nav');
            } else {
                $('.navbar').removeClass('navbar-fixed-top solid-nav');
            }
        } else if($(window).width() < 768) {   //mobile
            $('.navbar').addClass('navbar-fixed-top');
            $('.navbar').removeClass('solid-nav');
        }

        //when you hit the bottom of the page
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.navbar').removeClass('solid-nav');
        }
    }); //end of scroll function

    //navbar when resizing window
    $( window ).resize(function() {
        if($(window).width() >= 768) {   //not mobile
            $('.menu__list').removeClass('mobile-nav');
        } else {    //mobile
            $('.navbar').removeClass('solid-nav');
        }
    });

    //mobile nav stuff
    $(".navbar-nav li a").click(function(event) {   //close when you click on link
        $(".navbar-collapse").collapse('hide');
    });

    $(".navbar-brand").click(function(event) {   //close when you click on home link
        $(".navbar-collapse").collapse('hide');
    });

    //close navbar when link is pressed
    $(document).click(function(e) {
        if (!$(e.target).is('a') && !$(e.target).hasClass('navbar-toggle')) {
            $('.collapse').collapse('hide');
        }

        if($('.navbar-collapse').attr('aria-expanded') == 'true') {
            $('.menu__list').addClass('mobile-nav');
        } else {
            $('.menu__list').removeClass('mobile-nav');
        }
    });

    $('.navbar-toggle').on('click', function () {
        $('.menu__list').addClass('mobile-nav');
    });

    //scroll "easing" when clicked
    $(function() {
        $('a.menu-link').bind('click', function(e) {
            var $target = $(this);
            var offset;
            //this extra clause accounts for the scroll indicator that gets in the way of about navbar
            offset = $($target.attr('href')).offset().top;
            $('html, body').stop().animate({
                scrollTop: offset
            }, 1500, 'easeInOutExpo');
            e.preventDefault();
        });
        $('#scrolldown').bind('click', function(e) {
            $('html, body').stop().animate({
                scrollTop: $('#about').offset().top
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

    $(window).on('scroll', function () {
        var sections = $('section'),
            nav = $('nav'),
            position = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - nav.outerHeight(),
                bottom = top + $(this).outerHeight();

            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                console.log("bottom!");
                nav.find('a').removeClass('active');
                nav.find('a[href="#contact"]').addClass("active");
            } else if (position >= top && position <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });

    //check if mobile
    if($(window).width() > 580) {
        //typewriter effect configurations
        var str,
            i = 0,
            isTag,
            text;

        str = "<h3><p class ='line1'> &lt;!DOCTYPE = HTML&gt;<br>";
        str += "&lt;html&gt;</p>";
        str += "<p class='line3'>&lt;head&gt;</p>";
        str += "<p class='line4'>&lt;title&gt; <span style='color:#E7E7E7;'>Welcome to my page! </span>&lt;/title&gt;";

        document.getElementById('typewriter').innerHTML = "";

        (function type() {
            text = str.slice(0, ++i);
            if (text == str) {
                document.getElementById('typewriter').innerHTML = text + '<span class = "dash" style = "margin-left: 2px"></span></h3>';
                return;
            }
            var char = text.slice(-1);
            if( char === '&') {
                i+=3;
                text = str.slice(0, i);
                document.getElementById('typewriter').innerHTML = text + '<span class = "dash"></span></h3>';
            } else if( char == '<' ) {
                isTag = true;
            } else if( char == '>' ) {
                isTag = false;
            }

            document.getElementById('typewriter').innerHTML = text + '<span class = "dash"></span></h3>';

            if (isTag) return type();
            setTimeout(type, 80);
        }());
    }

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
