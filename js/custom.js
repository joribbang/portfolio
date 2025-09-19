// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

$(document).ready(function () {
    "use strict";

// === Scroll menu (center-line based, single active) ===
$(function(){
  var $sections = $('.section[id]');
  var $nav = $('.navbar-fixed-top');
  var navH = $nav.outerHeight() || 0;

  function setActive(id){
    $nav.find('a').removeClass('active');
    if(id) $nav.find('a[href="#'+ id +'"]').addClass('active');
  }

  function onScroll(){
    var scroll = $(window).scrollTop();
    var winH   = $(window).height();
    var docH   = $(document).height();

    // 헤더 아래 35% 지점(기준선)
    var probeY = scroll + navH + winH * 0.35;

    var currentId = null;

    $sections.each(function(){
      var $sec = $(this);
      var top  = $sec.offset().top;
      var bot  = top + $sec.outerHeight();

      if (probeY >= top && probeY < bot) {
        currentId = $sec.attr('id');
        return false; // 찾으면 루프 탈출
      }
    });

    // 바닥 근접 보정(짧은 #skills 잡기)
    var nearBottom = (scroll + winH >= docH - 2);
    if (!currentId && nearBottom) {
      currentId = $sections.last().attr('id');
    }

    // 맨 위 보정(아주 위에서는 첫 섹션)
    if (!currentId) {
      currentId = $sections.first().attr('id');
    }

    setActive(currentId);
  }

  // 부드러운 스크롤
  $nav.on('click','a[href^="#"]', function(e){
    var id = $(this).attr('href');
    if(id.length > 1 && $(id).length){
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: $(id).offset().top - navH + 1
      }, 600);
    }
  });

  $(window).on('scroll resize', onScroll);
  onScroll();
});


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });

    });
});

/* 버튼 hover 시 왼쪽 이미지 확대 */
document.querySelectorAll('.project_btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    const img = this.closest('.col-md-12').querySelector('.portfolio_item img');
    if (img) img.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', function() {
    const img = this.closest('.col-md-12').querySelector('.portfolio_item img');
    if (img) img.style.transform = 'scale(1)';
  });
});
