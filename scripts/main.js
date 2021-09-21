(function () {
  'use strict';

  function init() {
    // INLINE SVG
    jQuery('img.svg').each(function (i) {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function (data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });// END OF INLINE SVG

    $('.select-control').each(function () {
      var $t = $(this);
      $t.selectpicker({
        size: 10,
        width: '100%',
      });
    });

    mainLayout();
    runSlider();
    func();

    $(window).on('load', function () {
      setTimeout(function () {
        $('.page-transition').fadeOut('5000');
      }, 300);
    });

  } init(); // END OF init()

  function mainLayout() {
    var $headerH = $('header').outerHeight(),
      $footerH = $('footer').height();
    $('main').css({ 'min-height': 'calc(100vh - ' + $footerH + 'px)', 'padding-top': +$headerH + 'px' });
  }

  function runSlider() {
    $('.slider').each(function () {
      var $slider = $(this),
        $item = $slider.find('.slider__item'),
        $autoplay = ($slider.data('autoplay') == undefined) ? true : $slider.data('autoplay'),
        $loops = ($slider.data('loop') == undefined) ? true : $slider.data('loop'),
        $margin = ($slider.data('margin') == undefined) ? 24 : $slider.data('margin');

      if ($item.length > 1) {
        $slider.owlCarousel({
          items: 1,
          loop: $loops,
          dots: true,
          nav: true,
          navText: ["<span><img src='images/ic-chevron-left.svg'></span>", "<span><img src='images/ic-chevron-right.svg'></span>"],
          autoplay: $autoplay,
          autoplayTimeout: 4000,
          autoplaySpeed: 1000,
          smartSpeed: 1000,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
      $slider.on('change.owl.carousel', function (event) {
        if($autoplay == true) {
          $slider.trigger('stop.owl.autoplay');
          $slider.trigger('play.owl.autoplay');
        }
        var $n = event.item.index;
        // console.log(event.item.index);
        if ($n == 0) {
          setTimeout(function () {
            $item.addClass('animate-left');
          }, 600);
          setTimeout(function () {
            $item.removeClass('animate-left');
          }, 1000);
        } else {
          setTimeout(function () {
            $item.addClass('animate-right');
          }, 600);
          setTimeout(function () {
            $item.removeClass('animate-right');
          }, 1000);
        }
      });
    });

    $('.masthead--home').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $slider_item = $slider.find('.slider__item'),
        $content = $t.find('.masthead__content'),
        $item = $content.find('.item'),
        $item_title = $content.find('.item-title');

      $slider.on('changed.owl.carousel', function (event) {
        var $n = event.item.index,
          $data = $slider_item.eq($n).data('item'),
          $set_active = $content.find('.item[data-item=' + $data + ']'),
          $set_active_title = $content.find('.item-title[data-item=' + $data + ']');

        $item.removeClass('active');
        $set_active.addClass('active');
        $item_title.slideUp();
        $set_active_title.slideDown();
      });
    });

    $('.slider-nav').each(function () {
      var $slider = $(this),
        $item = $slider.find('.slider__item'),
        $margin = ($slider.data('margin') == undefined) ? 24 : $slider.data('margin');

      if ($item.length > 3) {
        $slider.owlCarousel({
          items: 1,
          loop: false,
          dots: false,
          nav: true,
          navText: ["<span><img src='../images/ic-chevron-left.svg'></span>", "<span><img src='../images/ic-chevron-right.svg'></span>"],
          autoplay: false,
          autoplayTimeout: 6000,
          autoplaySpeed: 800,
          autoWidth: true,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    });

    $('.slider-xs').each(function () {
      var w = $(window).width(),
        slider = $(this),
        nitem = slider.children().length;
      if (w < 169 && nitem > 2 || w < 426) {
        slider.addClass('owl-carousel').removeClass('ns');
        slider.each(function () {
          var t = $(this),
            item = t.attr('data-items') ? t.attr('data-items') : 1,
            autoplay = t.attr('data-autoplay') && t.attr('data-autoplay') == "false" ? false : true,
            loop = t.attr('data-loop') && t.attr('data-loop') == "false" ? false : true,
            dots = t.attr('data-dots') && t.attr('data-dots') == "false" ? false : true,
            aw = t.attr('data-width') && t.attr('data-width') == "auto" ? true : false;

          t.owlCarousel({
            items: 1,
            loop: loop,
            dots: dots,
            nav: true,
            navText: ['<div class="btn-nav left"></div>', '<div class="btn-nav right"></div>'],
            autoplay: autoplay,
            autoWidth: aw,
            autoHeight: true,
            autoplayTimeout: 4000,
            autoplaySpeed: 800,
          })
        })

      } else {
        slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        slider.find('.owl-stage-outer').children().unwrap();
      }
    })

    $('.block-journey').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $nav = $t.find('.block-journey__slider-nav'),
        $navItem = $nav.find('li');

      $navItem.each(function () {
        var $el = $(this),
          $data = $(this).data('item');
        
        $el.click(function () {
          var $active = $nav.find('li.active'),
            $gap = $el.index() - $active.index(),
            $timer = 400 * Math.abs($gap);
          console.log($timer)
          if (!$(this).hasClass('active')) {
            $navItem.not(this).removeClass('active');
            $el.addClass('active');
            $slider.trigger('to.owl.carousel', [$data, 800]);
            $slider.find('.owl-item').addClass('transition');
            setTimeout(function () {
              $slider.find('.owl-item').removeClass('transition');
            }, $timer);
          }
        });
      });

      $slider.on('changed.owl.carousel', function (e) {
        var $activeIndex = e.item.index;
        $navItem.removeClass('active');
        $navItem.eq($activeIndex).addClass('active');
      })
    });

    $('.block-accord').each(function () {
      var $t = $(this),
        $accordion = $t.find('.accordion'),
        $slider = $t.find('.slider');

      $accordion.each(function () {
        var $el = $(this),
          $card = $el.find('.card');

        $card.each(function () {
          var $data = $(this).data('item');
          $(this).click(function () {
            $slider.trigger('to.owl.carousel', [$data, 200]);
          });
        });
      });

      $slider.on('changed.owl.carousel', function (e) {
        var $activeIndex = e.item.index;
        $accordion.find('.card').removeClass('open');
        $accordion.find('.card').eq($activeIndex).addClass('open');
        $accordion.find('.card').eq($activeIndex).find('.collapse').collapse('toggle');
      });
    });
  }// end of runSlider()

  function func() {

    // STICKY HEADER
    if ($('.header').length > 0) {
      var header = $('.header'),
          pos = 10,
          w = $( window ).width();
      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll >= pos) {
          header.addClass('sticky');
          $('body').addClass('header-stick');
        } else {
          header.removeClass('sticky');
          $('body').removeClass('header-stick');
        }
      });

      $('.menu-icon').click(function () {
        $('body').toggleClass('menu-open');
      });

      if(w < 1000){
        $('.main-menu__item.has-sub').each(function(){
          var t = $(this);
          t.click(function(){
            t.toggleClass('sm-show');
          });
          if(!t.hasClass('sm-show')){
            t.blur();
            $('.sub-menu').blur();
            $(this).unbind('mouseenter mouseleave');
          }
        });
      };
    }

    $('.marquee').each(function () {
      var $t = $(this),
        $speed;
      if ($(window).width() < 500) {
        $speed = 30;
      } else {
        $speed = 100;
      }
      $t.marquee({
        speed: $speed,
        gap: 0,
        delayBeforeStart: 0,
        direction: 'left',
        startVisible: true,
        duplicated: true,
        pauseOnHover: true
      })
    })

    $('.accordion').each(function () {
      var $t = $(this),
        $card = $t.find('.card');

      $card.each(function () {
        var $el = $(this),
          $head = $el.find('.card-header'),
          $body = $el.find('.card-body');

        $head.click(function () {
          $card.not($el).removeClass('open');
          $el.toggleClass('open');
        });
      });
    });

    $('.form-group.pswd').each(function(){
      var t = $(this),
          i = t.find('.form-control'),
          b = t.find('.ic-showpswrd');
      b.click(function(){
        t.toggleClass('pswd-show');
        if(t.hasClass('pswd-show')){
          i.attr('type','text');
        }else{
          i.attr('type','password');
        }
      })
    })

  }// END of func()

})();

$(window).on('load', function () {

  var $blockStacks = $('#blockStacks');
  if ($blockStacks) {
    var $top = $blockStacks.offset().top,
      $wht = $(window).height(),
      $iht = $blockStacks.find('.wrap').height() + 40,
      $offset = ($(window).height() * 0.05);
    
    console.log($offset)
    
    $blockStacks.css('height', ($iht * 2));
    $blockStacks.find('.wrap_2').css('bottom', $offset);

    $(window).scroll(function (e) {
      var $scroll = $(window).scrollTop();
      if ($scroll >= ($top - ($wht - ($iht + $offset)))) {
        $blockStacks.addClass('fixed')
      } else {
        $blockStacks.removeClass('fixed')
      }
      if ($scroll >= ($top - ($wht - ($iht * 2 + $offset)))) {
        $blockStacks.addClass('stop-fixed')
      } else {
        $blockStacks.removeClass('stop-fixed')
      }
    });
  };

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuICAgICQoJy5zZWxlY3QtY29udHJvbCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpO1xyXG4gICAgICAkdC5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHNpemU6IDEwLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWFpbkxheW91dCgpO1xyXG4gICAgcnVuU2xpZGVyKCk7XHJcbiAgICBmdW5jKCk7XHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucGFnZS10cmFuc2l0aW9uJykuZmFkZU91dCgnNTAwMCcpO1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfSk7XHJcblxyXG4gIH0gaW5pdCgpOyAvLyBFTkQgT0YgaW5pdCgpXHJcblxyXG4gIGZ1bmN0aW9uIG1haW5MYXlvdXQoKSB7XHJcbiAgICB2YXIgJGhlYWRlckggPSAkKCdoZWFkZXInKS5vdXRlckhlaWdodCgpLFxyXG4gICAgICAkZm9vdGVySCA9ICQoJ2Zvb3RlcicpLmhlaWdodCgpO1xyXG4gICAgJCgnbWFpbicpLmNzcyh7ICdtaW4taGVpZ2h0JzogJ2NhbGMoMTAwdmggLSAnICsgJGZvb3RlckggKyAncHgpJywgJ3BhZGRpbmctdG9wJzogKyRoZWFkZXJIICsgJ3B4JyB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJ1blNsaWRlcigpIHtcclxuICAgICQoJy5zbGlkZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICRzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICRpdGVtID0gJHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgJGF1dG9wbGF5ID0gKCRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSA9PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICRzbGlkZXIuZGF0YSgnYXV0b3BsYXknKSxcclxuICAgICAgICAkbG9vcHMgPSAoJHNsaWRlci5kYXRhKCdsb29wJykgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiAkc2xpZGVyLmRhdGEoJ2xvb3AnKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6ICRsb29wcyxcclxuICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3Bhbj48aW1nIHNyYz0naW1hZ2VzL2ljLWNoZXZyb24tbGVmdC5zdmcnPjwvc3Bhbj5cIiwgXCI8c3Bhbj48aW1nIHNyYz0naW1hZ2VzL2ljLWNoZXZyb24tcmlnaHQuc3ZnJz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6ICRhdXRvcGxheSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNDAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDEwMDAsXHJcbiAgICAgICAgICBzbWFydFNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgbWFyZ2luOiAkbWFyZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZS5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZigkYXV0b3BsYXkgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdzdG9wLm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdwbGF5Lm93bC5hdXRvcGxheScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgJG4gPSBldmVudC5pdGVtLmluZGV4O1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50Lml0ZW0uaW5kZXgpO1xyXG4gICAgICAgIGlmICgkbiA9PSAwKSB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoJ2FuaW1hdGUtbGVmdCcpO1xyXG4gICAgICAgICAgfSwgNjAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcygnYW5pbWF0ZS1sZWZ0Jyk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKCdhbmltYXRlLXJpZ2h0Jyk7XHJcbiAgICAgICAgICB9LCA2MDApO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKCdhbmltYXRlLXJpZ2h0Jyk7XHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1hc3RoZWFkLS1ob21lJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkc2xpZGVyX2l0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkY29udGVudCA9ICR0LmZpbmQoJy5tYXN0aGVhZF9fY29udGVudCcpLFxyXG4gICAgICAgICRpdGVtID0gJGNvbnRlbnQuZmluZCgnLml0ZW0nKSxcclxuICAgICAgICAkaXRlbV90aXRsZSA9ICRjb250ZW50LmZpbmQoJy5pdGVtLXRpdGxlJyk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciAkbiA9IGV2ZW50Lml0ZW0uaW5kZXgsXHJcbiAgICAgICAgICAkZGF0YSA9ICRzbGlkZXJfaXRlbS5lcSgkbikuZGF0YSgnaXRlbScpLFxyXG4gICAgICAgICAgJHNldF9hY3RpdmUgPSAkY29udGVudC5maW5kKCcuaXRlbVtkYXRhLWl0ZW09JyArICRkYXRhICsgJ10nKSxcclxuICAgICAgICAgICRzZXRfYWN0aXZlX3RpdGxlID0gJGNvbnRlbnQuZmluZCgnLml0ZW0tdGl0bGVbZGF0YS1pdGVtPScgKyAkZGF0YSArICddJyk7XHJcblxyXG4gICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkc2V0X2FjdGl2ZS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJGl0ZW1fdGl0bGUuc2xpZGVVcCgpO1xyXG4gICAgICAgICRzZXRfYWN0aXZlX3RpdGxlLnNsaWRlRG93bigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXItbmF2JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAkaXRlbSA9ICRzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICRtYXJnaW4gPSAoJHNsaWRlci5kYXRhKCdtYXJnaW4nKSA9PSB1bmRlZmluZWQpID8gMjQgOiAkc2xpZGVyLmRhdGEoJ21hcmdpbicpO1xyXG5cclxuICAgICAgaWYgKCRpdGVtLmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAkc2xpZGVyLm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcclxuICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgIG5hdlRleHQ6IFtcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1sZWZ0LnN2Zyc+PC9zcGFuPlwiLCBcIjxzcGFuPjxpbWcgc3JjPScuLi9pbWFnZXMvaWMtY2hldnJvbi1yaWdodC5zdmcnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDYwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICBhdXRvV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICBtYXJnaW46ICRtYXJnaW4sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5zbGlkZXIteHMnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgIG5pdGVtID0gc2xpZGVyLmNoaWxkcmVuKCkubGVuZ3RoO1xyXG4gICAgICBpZiAodyA8IDE2OSAmJiBuaXRlbSA+IDIgfHwgdyA8IDQyNikge1xyXG4gICAgICAgIHNsaWRlci5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ25zJyk7XHJcbiAgICAgICAgc2xpZGVyLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBpdGVtID0gdC5hdHRyKCdkYXRhLWl0ZW1zJykgPyB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA6IDEsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5ID0gdC5hdHRyKCdkYXRhLWF1dG9wbGF5JykgJiYgdC5hdHRyKCdkYXRhLWF1dG9wbGF5JykgPT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICBsb29wID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpID09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgZG90cyA9IHQuYXR0cignZGF0YS1kb3RzJykgJiYgdC5hdHRyKCdkYXRhLWRvdHMnKSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGF3ID0gdC5hdHRyKCdkYXRhLXdpZHRoJykgJiYgdC5hdHRyKCdkYXRhLXdpZHRoJykgPT0gXCJhdXRvXCIgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgICBsb29wOiBsb29wLFxyXG4gICAgICAgICAgICBkb3RzOiBkb3RzLFxyXG4gICAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICAgIG5hdlRleHQ6IFsnPGRpdiBjbGFzcz1cImJ0bi1uYXYgbGVmdFwiPjwvZGl2PicsICc8ZGl2IGNsYXNzPVwiYnRuLW5hdiByaWdodFwiPjwvZGl2PiddLFxyXG4gICAgICAgICAgICBhdXRvcGxheTogYXV0b3BsYXksXHJcbiAgICAgICAgICAgIGF1dG9XaWR0aDogYXcsXHJcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNDAwMCxcclxuICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICBzbGlkZXIuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmJsb2NrLWpvdXJuZXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkc2xpZGVyID0gJHQuZmluZCgnLnNsaWRlcicpLFxyXG4gICAgICAgICRuYXYgPSAkdC5maW5kKCcuYmxvY2stam91cm5leV9fc2xpZGVyLW5hdicpLFxyXG4gICAgICAgICRuYXZJdGVtID0gJG5hdi5maW5kKCdsaScpO1xyXG5cclxuICAgICAgJG5hdkl0ZW0uZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkZGF0YSA9ICQodGhpcykuZGF0YSgnaXRlbScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRlbC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJGFjdGl2ZSA9ICRuYXYuZmluZCgnbGkuYWN0aXZlJyksXHJcbiAgICAgICAgICAgICRnYXAgPSAkZWwuaW5kZXgoKSAtICRhY3RpdmUuaW5kZXgoKSxcclxuICAgICAgICAgICAgJHRpbWVyID0gNDAwICogTWF0aC5hYnMoJGdhcCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygkdGltZXIpXHJcbiAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICRuYXZJdGVtLm5vdCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRlbC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICRzbGlkZXIudHJpZ2dlcigndG8ub3dsLmNhcm91c2VsJywgWyRkYXRhLCA4MDBdKTtcclxuICAgICAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLWl0ZW0nKS5hZGRDbGFzcygndHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtaXRlbScpLnJlbW92ZUNsYXNzKCd0cmFuc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIH0sICR0aW1lcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciAkYWN0aXZlSW5kZXggPSBlLml0ZW0uaW5kZXg7XHJcbiAgICAgICAgJG5hdkl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICRuYXZJdGVtLmVxKCRhY3RpdmVJbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJsb2NrLWFjY29yZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRhY2NvcmRpb24gPSAkdC5maW5kKCcuYWNjb3JkaW9uJyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKTtcclxuXHJcbiAgICAgICRhY2NvcmRpb24uZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkY2FyZCA9ICRlbC5maW5kKCcuY2FyZCcpO1xyXG5cclxuICAgICAgICAkY2FyZC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciAkZGF0YSA9ICQodGhpcykuZGF0YSgnaXRlbScpO1xyXG4gICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzbGlkZXIudHJpZ2dlcigndG8ub3dsLmNhcm91c2VsJywgWyRkYXRhLCAyMDBdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGFjdGl2ZUluZGV4ID0gZS5pdGVtLmluZGV4O1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgJGFjY29yZGlvbi5maW5kKCcuY2FyZCcpLmVxKCRhY3RpdmVJbmRleCkuZmluZCgnLmNvbGxhcHNlJykuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0vLyBlbmQgb2YgcnVuU2xpZGVyKClcclxuXHJcbiAgZnVuY3Rpb24gZnVuYygpIHtcclxuXHJcbiAgICAvLyBTVElDS1kgSEVBREVSXHJcbiAgICBpZiAoJCgnLmhlYWRlcicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdmFyIGhlYWRlciA9ICQoJy5oZWFkZXInKSxcclxuICAgICAgICAgIHBvcyA9IDEwLFxyXG4gICAgICAgICAgdyA9ICQoIHdpbmRvdyApLndpZHRoKCk7XHJcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgaWYgKHNjcm9sbCA+PSBwb3MpIHtcclxuICAgICAgICAgIGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLm1lbnUtaWNvbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKHcgPCAxMDAwKXtcclxuICAgICAgICAkKCcubWFpbi1tZW51X19pdGVtLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgdCA9ICQodGhpcyk7XHJcbiAgICAgICAgICB0LmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHQudG9nZ2xlQ2xhc3MoJ3NtLXNob3cnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYoIXQuaGFzQ2xhc3MoJ3NtLXNob3cnKSl7XHJcbiAgICAgICAgICAgIHQuYmx1cigpO1xyXG4gICAgICAgICAgICAkKCcuc3ViLW1lbnUnKS5ibHVyKCk7XHJcbiAgICAgICAgICAgICQodGhpcykudW5iaW5kKCdtb3VzZWVudGVyIG1vdXNlbGVhdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcubWFycXVlZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzcGVlZDtcclxuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNTAwKSB7XHJcbiAgICAgICAgJHNwZWVkID0gMzA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHNwZWVkID0gMTAwO1xyXG4gICAgICB9XHJcbiAgICAgICR0Lm1hcnF1ZWUoe1xyXG4gICAgICAgIHNwZWVkOiAkc3BlZWQsXHJcbiAgICAgICAgZ2FwOiAwLFxyXG4gICAgICAgIGRlbGF5QmVmb3JlU3RhcnQ6IDAsXHJcbiAgICAgICAgZGlyZWN0aW9uOiAnbGVmdCcsXHJcbiAgICAgICAgc3RhcnRWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgIGR1cGxpY2F0ZWQ6IHRydWUsXHJcbiAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5hY2NvcmRpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkY2FyZCA9ICR0LmZpbmQoJy5jYXJkJyk7XHJcblxyXG4gICAgICAkY2FyZC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICRoZWFkID0gJGVsLmZpbmQoJy5jYXJkLWhlYWRlcicpLFxyXG4gICAgICAgICAgJGJvZHkgPSAkZWwuZmluZCgnLmNhcmQtYm9keScpO1xyXG5cclxuICAgICAgICAkaGVhZC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkY2FyZC5ub3QoJGVsKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgJGVsLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmZvcm0tZ3JvdXAucHN3ZCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaSA9IHQuZmluZCgnLmZvcm0tY29udHJvbCcpLFxyXG4gICAgICAgICAgYiA9IHQuZmluZCgnLmljLXNob3dwc3dyZCcpO1xyXG4gICAgICBiLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdC50b2dnbGVDbGFzcygncHN3ZC1zaG93Jyk7XHJcbiAgICAgICAgaWYodC5oYXNDbGFzcygncHN3ZC1zaG93Jykpe1xyXG4gICAgICAgICAgaS5hdHRyKCd0eXBlJywndGV4dCcpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgaS5hdHRyKCd0eXBlJywncGFzc3dvcmQnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICB9Ly8gRU5EIG9mIGZ1bmMoKVxyXG5cclxufSkoKTtcclxuXHJcbiQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyICRibG9ja1N0YWNrcyA9ICQoJyNibG9ja1N0YWNrcycpO1xyXG4gIGlmICgkYmxvY2tTdGFja3MpIHtcclxuICAgIHZhciAkdG9wID0gJGJsb2NrU3RhY2tzLm9mZnNldCgpLnRvcCxcclxuICAgICAgJHdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgJGlodCA9ICRibG9ja1N0YWNrcy5maW5kKCcud3JhcCcpLmhlaWdodCgpICsgNDAsXHJcbiAgICAgICRvZmZzZXQgPSAoJCh3aW5kb3cpLmhlaWdodCgpICogMC4wNSk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCRvZmZzZXQpXHJcbiAgICBcclxuICAgICRibG9ja1N0YWNrcy5jc3MoJ2hlaWdodCcsICgkaWh0ICogMikpO1xyXG4gICAgJGJsb2NrU3RhY2tzLmZpbmQoJy53cmFwXzInKS5jc3MoJ2JvdHRvbScsICRvZmZzZXQpO1xyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyICRzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGlmICgkc2Nyb2xsID49ICgkdG9wIC0gKCR3aHQgLSAoJGlodCArICRvZmZzZXQpKSkpIHtcclxuICAgICAgICAkYmxvY2tTdGFja3MuYWRkQ2xhc3MoJ2ZpeGVkJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkYmxvY2tTdGFja3MucmVtb3ZlQ2xhc3MoJ2ZpeGVkJylcclxuICAgICAgfVxyXG4gICAgICBpZiAoJHNjcm9sbCA+PSAoJHRvcCAtICgkd2h0IC0gKCRpaHQgKiAyICsgJG9mZnNldCkpKSkge1xyXG4gICAgICAgICRibG9ja1N0YWNrcy5hZGRDbGFzcygnc3RvcC1maXhlZCcpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGJsb2NrU3RhY2tzLnJlbW92ZUNsYXNzKCdzdG9wLWZpeGVkJylcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
