(function () {
  'use strict';

  function init() {
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
          console.log('joe');
        });// END OF INLINE SVG
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
  if ($blockStacks.length > 0) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAkKCcuc2VsZWN0LWNvbnRyb2wnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKTtcclxuICAgICAgJHQuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICBzaXplOiAxMCxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1haW5MYXlvdXQoKTtcclxuICAgIHJ1blNsaWRlcigpO1xyXG4gICAgZnVuYygpO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnBhZ2UtdHJhbnNpdGlvbicpLmZhZGVPdXQoJzUwMDAnKTtcclxuICAgICAgICAvLyBJTkxJTkUgU1ZHXHJcbiAgICAgICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgICB2YXIgaW1nSUQgPSAkaW1nLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICBqUXVlcnkuZ2V0KGltZ1VSTCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nSUQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignaWQnLCBpbWdJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWdDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAkc3ZnID0gJHN2Zy5hdHRyKCdjbGFzcycsIGltZ0NsYXNzICsgJyByZXBsYWNlZC1zdmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc3ZnID0gJHN2Zy5yZW1vdmVBdHRyKCd4bWxuczphJyk7XHJcbiAgICAgICAgICAgICRpbWcucmVwbGFjZVdpdGgoJHN2Zyk7XHJcbiAgICAgICAgICB9LCAneG1sJyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnam9lJyk7XHJcbiAgICAgICAgfSk7Ly8gRU5EIE9GIElOTElORSBTVkdcclxuICAgICAgfSwgMzAwKTtcclxuICAgIH0pO1xyXG5cclxuICB9IGluaXQoKTsgLy8gRU5EIE9GIGluaXQoKVxyXG5cclxuICBmdW5jdGlvbiBtYWluTGF5b3V0KCkge1xyXG4gICAgdmFyICRoZWFkZXJIID0gJCgnaGVhZGVyJykub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgJGZvb3RlckggPSAkKCdmb290ZXInKS5oZWlnaHQoKTtcclxuICAgICQoJ21haW4nKS5jc3MoeyAnbWluLWhlaWdodCc6ICdjYWxjKDEwMHZoIC0gJyArICRmb290ZXJIICsgJ3B4KScsICdwYWRkaW5nLXRvcCc6ICskaGVhZGVySCArICdweCcgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBydW5TbGlkZXIoKSB7XHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAkaXRlbSA9ICRzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICRhdXRvcGxheSA9ICgkc2xpZGVyLmRhdGEoJ2F1dG9wbGF5JykgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiAkc2xpZGVyLmRhdGEoJ2F1dG9wbGF5JyksXHJcbiAgICAgICAgJGxvb3BzID0gKCRzbGlkZXIuZGF0YSgnbG9vcCcpID09IHVuZGVmaW5lZCkgPyB0cnVlIDogJHNsaWRlci5kYXRhKCdsb29wJyksXHJcbiAgICAgICAgJG1hcmdpbiA9ICgkc2xpZGVyLmRhdGEoJ21hcmdpbicpID09IHVuZGVmaW5lZCkgPyAyNCA6ICRzbGlkZXIuZGF0YSgnbWFyZ2luJyk7XHJcblxyXG4gICAgICBpZiAoJGl0ZW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICRzbGlkZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiAkbG9vcHMsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgbmF2VGV4dDogW1wiPHNwYW4+PGltZyBzcmM9J2ltYWdlcy9pYy1jaGV2cm9uLWxlZnQuc3ZnJz48L3NwYW4+XCIsIFwiPHNwYW4+PGltZyBzcmM9J2ltYWdlcy9pYy1jaGV2cm9uLXJpZ2h0LnN2Zyc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgIGF1dG9wbGF5OiAkYXV0b3BsYXksXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDQwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiAxMDAwLFxyXG4gICAgICAgICAgc21hcnRTcGVlZDogMTAwMCxcclxuICAgICAgICAgIG1hcmdpbjogJG1hcmdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2Uub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoJGF1dG9wbGF5ID09IHRydWUpIHtcclxuICAgICAgICAgICRzbGlkZXIudHJpZ2dlcignc3RvcC5vd2wuYXV0b3BsYXknKTtcclxuICAgICAgICAgICRzbGlkZXIudHJpZ2dlcigncGxheS5vd2wuYXV0b3BsYXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyICRuID0gZXZlbnQuaXRlbS5pbmRleDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC5pdGVtLmluZGV4KTtcclxuICAgICAgICBpZiAoJG4gPT0gMCkge1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKCdhbmltYXRlLWxlZnQnKTtcclxuICAgICAgICAgIH0sIDYwMCk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoJ2FuaW1hdGUtbGVmdCcpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkaXRlbS5hZGRDbGFzcygnYW5pbWF0ZS1yaWdodCcpO1xyXG4gICAgICAgICAgfSwgNjAwKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcygnYW5pbWF0ZS1yaWdodCcpO1xyXG4gICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tYXN0aGVhZC0taG9tZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyksXHJcbiAgICAgICAgJHNsaWRlcl9pdGVtID0gJHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgJGNvbnRlbnQgPSAkdC5maW5kKCcubWFzdGhlYWRfX2NvbnRlbnQnKSxcclxuICAgICAgICAkaXRlbSA9ICRjb250ZW50LmZpbmQoJy5pdGVtJyksXHJcbiAgICAgICAgJGl0ZW1fdGl0bGUgPSAkY29udGVudC5maW5kKCcuaXRlbS10aXRsZScpO1xyXG5cclxuICAgICAgJHNsaWRlci5vbignY2hhbmdlZC5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgJG4gPSBldmVudC5pdGVtLmluZGV4LFxyXG4gICAgICAgICAgJGRhdGEgPSAkc2xpZGVyX2l0ZW0uZXEoJG4pLmRhdGEoJ2l0ZW0nKSxcclxuICAgICAgICAgICRzZXRfYWN0aXZlID0gJGNvbnRlbnQuZmluZCgnLml0ZW1bZGF0YS1pdGVtPScgKyAkZGF0YSArICddJyksXHJcbiAgICAgICAgICAkc2V0X2FjdGl2ZV90aXRsZSA9ICRjb250ZW50LmZpbmQoJy5pdGVtLXRpdGxlW2RhdGEtaXRlbT0nICsgJGRhdGEgKyAnXScpO1xyXG5cclxuICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJHNldF9hY3RpdmUuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICRpdGVtX3RpdGxlLnNsaWRlVXAoKTtcclxuICAgICAgICAkc2V0X2FjdGl2ZV90aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc2xpZGVyLW5hdicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHNsaWRlciA9ICQodGhpcyksXHJcbiAgICAgICAgJGl0ZW0gPSAkc2xpZGVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAkbWFyZ2luID0gKCRzbGlkZXIuZGF0YSgnbWFyZ2luJykgPT0gdW5kZWZpbmVkKSA/IDI0IDogJHNsaWRlci5kYXRhKCdtYXJnaW4nKTtcclxuXHJcbiAgICAgIGlmICgkaXRlbS5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgJHNsaWRlci5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tbGVmdC5zdmcnPjwvc3Bhbj5cIiwgXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tcmlnaHQuc3ZnJz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA2MDAwLFxyXG4gICAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwLFxyXG4gICAgICAgICAgYXV0b1dpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgbWFyZ2luOiAkbWFyZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc2xpZGVyLXhzJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciB3ID0gJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICAgc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICBuaXRlbSA9IHNsaWRlci5jaGlsZHJlbigpLmxlbmd0aDtcclxuICAgICAgaWYgKHcgPCAxNjkgJiYgbml0ZW0gPiAyIHx8IHcgPCA0MjYpIHtcclxuICAgICAgICBzbGlkZXIuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCducycpO1xyXG4gICAgICAgIHNsaWRlci5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgaXRlbSA9IHQuYXR0cignZGF0YS1pdGVtcycpID8gdC5hdHRyKCdkYXRhLWl0ZW1zJykgOiAxLFxyXG4gICAgICAgICAgICBhdXRvcGxheSA9IHQuYXR0cignZGF0YS1hdXRvcGxheScpICYmIHQuYXR0cignZGF0YS1hdXRvcGxheScpID09IFwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgbG9vcCA9IHQuYXR0cignZGF0YS1sb29wJykgJiYgdC5hdHRyKCdkYXRhLWxvb3AnKSA9PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHMgPSB0LmF0dHIoJ2RhdGEtZG90cycpICYmIHQuYXR0cignZGF0YS1kb3RzJykgPT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICBhdyA9IHQuYXR0cignZGF0YS13aWR0aCcpICYmIHQuYXR0cignZGF0YS13aWR0aCcpID09IFwiYXV0b1wiID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgIHQub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgbG9vcDogbG9vcCxcclxuICAgICAgICAgICAgZG90czogZG90cyxcclxuICAgICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZUZXh0OiBbJzxkaXYgY2xhc3M9XCJidG4tbmF2IGxlZnRcIj48L2Rpdj4nLCAnPGRpdiBjbGFzcz1cImJ0bi1uYXYgcmlnaHRcIj48L2Rpdj4nXSxcclxuICAgICAgICAgICAgYXV0b3BsYXk6IGF1dG9wbGF5LFxyXG4gICAgICAgICAgICBhdXRvV2lkdGg6IGF3LFxyXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDQwMDAsXHJcbiAgICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5ibG9jay1qb3VybmV5JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkbmF2ID0gJHQuZmluZCgnLmJsb2NrLWpvdXJuZXlfX3NsaWRlci1uYXYnKSxcclxuICAgICAgICAkbmF2SXRlbSA9ICRuYXYuZmluZCgnbGknKTtcclxuXHJcbiAgICAgICRuYXZJdGVtLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICBcclxuICAgICAgICAkZWwuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgdmFyICRhY3RpdmUgPSAkbmF2LmZpbmQoJ2xpLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICAkZ2FwID0gJGVsLmluZGV4KCkgLSAkYWN0aXZlLmluZGV4KCksXHJcbiAgICAgICAgICAgICR0aW1lciA9IDQwMCAqIE1hdGguYWJzKCRnYXApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJHRpbWVyKVxyXG4gICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkbmF2SXRlbS5ub3QodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgODAwXSk7XHJcbiAgICAgICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLWl0ZW0nKS5yZW1vdmVDbGFzcygndHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICB9LCAkdGltZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGFjdGl2ZUluZGV4ID0gZS5pdGVtLmluZGV4O1xyXG4gICAgICAgICRuYXZJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkbmF2SXRlbS5lcSgkYWN0aXZlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5ibG9jay1hY2NvcmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkYWNjb3JkaW9uID0gJHQuZmluZCgnLmFjY29yZGlvbicpLFxyXG4gICAgICAgICRzbGlkZXIgPSAkdC5maW5kKCcuc2xpZGVyJyk7XHJcblxyXG4gICAgICAkYWNjb3JkaW9uLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGNhcmQgPSAkZWwuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgMjAwXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyICRhY3RpdmVJbmRleCA9IGUuaXRlbS5pbmRleDtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAkYWNjb3JkaW9uLmZpbmQoJy5jYXJkJykuZXEoJGFjdGl2ZUluZGV4KS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmZpbmQoJy5jb2xsYXBzZScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9Ly8gZW5kIG9mIHJ1blNsaWRlcigpXHJcblxyXG4gIGZ1bmN0aW9uIGZ1bmMoKSB7XHJcblxyXG4gICAgLy8gU1RJQ0tZIEhFQURFUlxyXG4gICAgaWYgKCQoJy5oZWFkZXInKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHZhciBoZWFkZXIgPSAkKCcuaGVhZGVyJyksXHJcbiAgICAgICAgICBwb3MgPSAxMCxcclxuICAgICAgICAgIHcgPSAkKCB3aW5kb3cgKS53aWR0aCgpO1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIGlmIChzY3JvbGwgPj0gcG9zKSB7XHJcbiAgICAgICAgICBoZWFkZXIuYWRkQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoZWFkZXItc3RpY2snKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy5tZW51LWljb24nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZih3IDwgMTAwMCl7XHJcbiAgICAgICAgJCgnLm1haW4tbWVudV9faXRlbS5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgdC5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0LnRvZ2dsZUNsYXNzKCdzbS1zaG93Jyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmKCF0Lmhhc0NsYXNzKCdzbS1zaG93Jykpe1xyXG4gICAgICAgICAgICB0LmJsdXIoKTtcclxuICAgICAgICAgICAgJCgnLnN1Yi1tZW51JykuYmx1cigpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnVuYmluZCgnbW91c2VlbnRlciBtb3VzZWxlYXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgJCgnLm1hcnF1ZWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkc3BlZWQ7XHJcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDUwMCkge1xyXG4gICAgICAgICRzcGVlZCA9IDMwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzcGVlZCA9IDEwMDtcclxuICAgICAgfVxyXG4gICAgICAkdC5tYXJxdWVlKHtcclxuICAgICAgICBzcGVlZDogJHNwZWVkLFxyXG4gICAgICAgIGdhcDogMCxcclxuICAgICAgICBkZWxheUJlZm9yZVN0YXJ0OiAwLFxyXG4gICAgICAgIGRpcmVjdGlvbjogJ2xlZnQnLFxyXG4gICAgICAgIHN0YXJ0VmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICBkdXBsaWNhdGVkOiB0cnVlLFxyXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuYWNjb3JkaW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJGNhcmQgPSAkdC5maW5kKCcuY2FyZCcpO1xyXG5cclxuICAgICAgJGNhcmQuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkaGVhZCA9ICRlbC5maW5kKCcuY2FyZC1oZWFkZXInKSxcclxuICAgICAgICAgICRib2R5ID0gJGVsLmZpbmQoJy5jYXJkLWJvZHknKTtcclxuXHJcbiAgICAgICAgJGhlYWQuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJGNhcmQubm90KCRlbCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICRlbC50b2dnbGVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5mb3JtLWdyb3VwLnBzd2QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGkgPSB0LmZpbmQoJy5mb3JtLWNvbnRyb2wnKSxcclxuICAgICAgICAgIGIgPSB0LmZpbmQoJy5pYy1zaG93cHN3cmQnKTtcclxuICAgICAgYi5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIHQudG9nZ2xlQ2xhc3MoJ3Bzd2Qtc2hvdycpO1xyXG4gICAgICAgIGlmKHQuaGFzQ2xhc3MoJ3Bzd2Qtc2hvdycpKXtcclxuICAgICAgICAgIGkuYXR0cigndHlwZScsJ3RleHQnKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGkuYXR0cigndHlwZScsJ3Bhc3N3b3JkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgfS8vIEVORCBvZiBmdW5jKClcclxuXHJcbn0pKCk7XHJcblxyXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHZhciAkYmxvY2tTdGFja3MgPSAkKCcjYmxvY2tTdGFja3MnKTtcclxuICBpZiAoJGJsb2NrU3RhY2tzLmxlbmd0aCA+IDApIHtcclxuICAgIHZhciAkdG9wID0gJGJsb2NrU3RhY2tzLm9mZnNldCgpLnRvcCxcclxuICAgICAgJHdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgJGlodCA9ICRibG9ja1N0YWNrcy5maW5kKCcud3JhcCcpLmhlaWdodCgpICsgNDAsXHJcbiAgICAgICRvZmZzZXQgPSAoJCh3aW5kb3cpLmhlaWdodCgpICogMC4wNSk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCRvZmZzZXQpXHJcbiAgICBcclxuICAgICRibG9ja1N0YWNrcy5jc3MoJ2hlaWdodCcsICgkaWh0ICogMikpO1xyXG4gICAgJGJsb2NrU3RhY2tzLmZpbmQoJy53cmFwXzInKS5jc3MoJ2JvdHRvbScsICRvZmZzZXQpO1xyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyICRzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgIGlmICgkc2Nyb2xsID49ICgkdG9wIC0gKCR3aHQgLSAoJGlodCArICRvZmZzZXQpKSkpIHtcclxuICAgICAgICAkYmxvY2tTdGFja3MuYWRkQ2xhc3MoJ2ZpeGVkJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkYmxvY2tTdGFja3MucmVtb3ZlQ2xhc3MoJ2ZpeGVkJylcclxuICAgICAgfVxyXG4gICAgICBpZiAoJHNjcm9sbCA+PSAoJHRvcCAtICgkd2h0IC0gKCRpaHQgKiAyICsgJG9mZnNldCkpKSkge1xyXG4gICAgICAgICRibG9ja1N0YWNrcy5hZGRDbGFzcygnc3RvcC1maXhlZCcpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGJsb2NrU3RhY2tzLnJlbW92ZUNsYXNzKCdzdG9wLWZpeGVkJylcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
