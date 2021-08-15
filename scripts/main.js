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

    $('.select-control').each(function(){
      var $t = $(this);
      $t.selectpicker({
        size: 10,
        width: '100%',
      });
    });

    mainLayout();
    runSlider();
    func();

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
        $margin = ($slider.data('margin') == undefined) ? 24 : $slider.data('margin');

      if ($item.length > 1) {
        $slider.owlCarousel({
          items: 1,
          loop: false,
          dots: true,
          nav: true,
          navText: ["<span><img src='../images/ic-chevron-left.svg'></span>", "<span><img src='../images/ic-chevron-right.svg'></span>"],
          autoplay: $autoplay,
          autoplayTimeout: 6000,
          autoplaySpeed: 800,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
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
          autoWidth:true,
          margin: $margin,
        });
      } else {
        $slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $slider.find('.owl-stage-outer').children().unwrap();
      }
    });

    $('.slider-xs').each(function() {
      var w = $(window).width(),
        slider = $(this),
        nitem = slider.children().length;
      if (w < 169 && nitem > 2 || w < 426) {
        slider.addClass('owl-carousel').removeClass('ns');
        slider.each(function() {
          var t = $(this),
            item = t.attr('data-items') ? t.attr('data-items') : 1,
            autoplay = t.attr('data-autoplay') && t.attr('data-autoplay')=="false" ? false : true,
            loop = t.attr('data-loop') && t.attr('data-loop')=="false" ? false : true,
            dots = t.attr('data-dots') && t.attr('data-dots')=="false" ? false : true,
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

    $('.masthead--home').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $content = $t.find('.masthead__content');

      $slider.on('changed.owl.carousel', function (event) {
        $content.toggleClass('active')
      });
    });

    $('.block-journey').each(function () {
      var $t = $(this),
        $slider = $t.find('.slider'),
        $nav = $t.find('.block-journey__slider-nav'),
        $navItem = $nav.find('li');

      $navItem.each(function () {
        var $el = $(this),
          $data = $(this).data('item');
        $el.click(function () {
          if (!$(this).hasClass('active')) {
            $navItem.not(this).removeClass('active');
            $el.addClass('active');
            $slider.trigger('to.owl.carousel', [$data, 200]);
            $slider.find('.owl-item').addClass('transition');
            setTimeout(function () {
              $slider.find('.owl-item').removeClass('transition');
            }, 200);
          }
        });
      });

      $slider.on('changed.owl.carousel', function (e) {
        var $activeIndex = e.item.index;
        $navItem.removeClass('active');
        $navItem.eq($activeIndex).addClass('active');
        console.log($activeIndex);
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
        pos = 10;
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

      $('.menu-icon').click(function(){
        $('body').toggleClass('menu-open');
      });
    }

    $('.marquee').each(function () {
      var $t = $(this),
        $speed;
      if($(window).width() < 500) {
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

  }// END of func()

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gSU5MSU5FIFNWR1xyXG4gICAgalF1ZXJ5KCdpbWcuc3ZnJykuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICB2YXIgJGltZyA9IGpRdWVyeSh0aGlzKTtcclxuICAgICAgdmFyIGltZ0lEID0gJGltZy5hdHRyKCdpZCcpO1xyXG4gICAgICB2YXIgaW1nQ2xhc3MgPSAkaW1nLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgIHZhciBpbWdVUkwgPSAkaW1nLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgalF1ZXJ5LmdldChpbWdVUkwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTsvLyBFTkQgT0YgSU5MSU5FIFNWR1xyXG5cclxuICAgICQoJy5zZWxlY3QtY29udHJvbCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKTtcclxuICAgICAgJHQuc2VsZWN0cGlja2VyKHtcclxuICAgICAgICBzaXplOiAxMCxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIG1haW5MYXlvdXQoKTtcclxuICAgIHJ1blNsaWRlcigpO1xyXG4gICAgZnVuYygpO1xyXG5cclxuICB9IGluaXQoKTsgLy8gRU5EIE9GIGluaXQoKVxyXG5cclxuICBmdW5jdGlvbiBtYWluTGF5b3V0KCkge1xyXG4gICAgdmFyICRoZWFkZXJIID0gJCgnaGVhZGVyJykub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgJGZvb3RlckggPSAkKCdmb290ZXInKS5oZWlnaHQoKTtcclxuICAgICQoJ21haW4nKS5jc3MoeyAnbWluLWhlaWdodCc6ICdjYWxjKDEwMHZoIC0gJyArICRmb290ZXJIICsgJ3B4KScsICdwYWRkaW5nLXRvcCc6ICskaGVhZGVySCArICdweCcgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBydW5TbGlkZXIoKSB7XHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkc2xpZGVyID0gJCh0aGlzKSxcclxuICAgICAgICAkaXRlbSA9ICRzbGlkZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICRhdXRvcGxheSA9ICgkc2xpZGVyLmRhdGEoJ2F1dG9wbGF5JykgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiAkc2xpZGVyLmRhdGEoJ2F1dG9wbGF5JyksXHJcbiAgICAgICAgJG1hcmdpbiA9ICgkc2xpZGVyLmRhdGEoJ21hcmdpbicpID09IHVuZGVmaW5lZCkgPyAyNCA6ICRzbGlkZXIuZGF0YSgnbWFyZ2luJyk7XHJcblxyXG4gICAgICBpZiAoJGl0ZW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICRzbGlkZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tbGVmdC5zdmcnPjwvc3Bhbj5cIiwgXCI8c3Bhbj48aW1nIHNyYz0nLi4vaW1hZ2VzL2ljLWNoZXZyb24tcmlnaHQuc3ZnJz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6ICRhdXRvcGxheSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgIG1hcmdpbjogJG1hcmdpbixcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnNsaWRlci1uYXYnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICRzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgICRpdGVtID0gJHNsaWRlci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgJG1hcmdpbiA9ICgkc2xpZGVyLmRhdGEoJ21hcmdpbicpID09IHVuZGVmaW5lZCkgPyAyNCA6ICRzbGlkZXIuZGF0YSgnbWFyZ2luJyk7XHJcblxyXG4gICAgICBpZiAoJGl0ZW0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICRzbGlkZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgICAgbmF2OiB0cnVlLFxyXG4gICAgICAgICAgbmF2VGV4dDogW1wiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLWxlZnQuc3ZnJz48L3NwYW4+XCIsIFwiPHNwYW4+PGltZyBzcmM9Jy4uL2ltYWdlcy9pYy1jaGV2cm9uLXJpZ2h0LnN2Zyc+PC9zcGFuPlwiXSxcclxuICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogNjAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMCxcclxuICAgICAgICAgIGF1dG9XaWR0aDp0cnVlLFxyXG4gICAgICAgICAgbWFyZ2luOiAkbWFyZ2luLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzbGlkZXIudHJpZ2dlcignZGVzdHJveS5vd2wuY2Fyb3VzZWwnKS5yZW1vdmVDbGFzcygnb3dsLWNhcm91c2VsIG93bC1sb2FkZWQnKTtcclxuICAgICAgICAkc2xpZGVyLmZpbmQoJy5vd2wtc3RhZ2Utb3V0ZXInKS5jaGlsZHJlbigpLnVud3JhcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc2xpZGVyLXhzJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICBzbGlkZXIgPSAkKHRoaXMpLFxyXG4gICAgICAgIG5pdGVtID0gc2xpZGVyLmNoaWxkcmVuKCkubGVuZ3RoO1xyXG4gICAgICBpZiAodyA8IDE2OSAmJiBuaXRlbSA+IDIgfHwgdyA8IDQyNikge1xyXG4gICAgICAgIHNsaWRlci5hZGRDbGFzcygnb3dsLWNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ25zJyk7XHJcbiAgICAgICAgc2xpZGVyLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGl0ZW0gPSB0LmF0dHIoJ2RhdGEtaXRlbXMnKSA/IHQuYXR0cignZGF0YS1pdGVtcycpIDogMSxcclxuICAgICAgICAgICAgYXV0b3BsYXkgPSB0LmF0dHIoJ2RhdGEtYXV0b3BsYXknKSAmJiB0LmF0dHIoJ2RhdGEtYXV0b3BsYXknKT09XCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlLFxyXG4gICAgICAgICAgICBsb29wID0gdC5hdHRyKCdkYXRhLWxvb3AnKSAmJiB0LmF0dHIoJ2RhdGEtbG9vcCcpPT1cImZhbHNlXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHMgPSB0LmF0dHIoJ2RhdGEtZG90cycpICYmIHQuYXR0cignZGF0YS1kb3RzJyk9PVwiZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXcgPSB0LmF0dHIoJ2RhdGEtd2lkdGgnKSAmJiB0LmF0dHIoJ2RhdGEtd2lkdGgnKSA9PSBcImF1dG9cIiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICAgIGxvb3A6IGxvb3AsXHJcbiAgICAgICAgICAgIGRvdHM6IGRvdHMsXHJcbiAgICAgICAgICAgIG5hdjogdHJ1ZSxcclxuICAgICAgICAgICAgbmF2VGV4dDogWyc8ZGl2IGNsYXNzPVwiYnRuLW5hdiBsZWZ0XCI+PC9kaXY+JywgJzxkaXYgY2xhc3M9XCJidG4tbmF2IHJpZ2h0XCI+PC9kaXY+J10sXHJcbiAgICAgICAgICAgIGF1dG9wbGF5OiBhdXRvcGxheSxcclxuICAgICAgICAgICAgYXV0b1dpZHRoOiBhdyxcclxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b3BsYXlUaW1lb3V0OiA0MDAwLFxyXG4gICAgICAgICAgICBhdXRvcGxheVNwZWVkOiA4MDAsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNsaWRlci50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgIHNsaWRlci5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCcubWFzdGhlYWQtLWhvbWUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyICR0ID0gJCh0aGlzKSxcclxuICAgICAgICAkc2xpZGVyID0gJHQuZmluZCgnLnNsaWRlcicpLFxyXG4gICAgICAgICRjb250ZW50ID0gJHQuZmluZCgnLm1hc3RoZWFkX19jb250ZW50Jyk7XHJcblxyXG4gICAgICAkc2xpZGVyLm9uKCdjaGFuZ2VkLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICRjb250ZW50LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5ibG9jay1qb3VybmV5JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKSxcclxuICAgICAgICAkbmF2ID0gJHQuZmluZCgnLmJsb2NrLWpvdXJuZXlfX3NsaWRlci1uYXYnKSxcclxuICAgICAgICAkbmF2SXRlbSA9ICRuYXYuZmluZCgnbGknKTtcclxuXHJcbiAgICAgICRuYXZJdGVtLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGRhdGEgPSAkKHRoaXMpLmRhdGEoJ2l0ZW0nKTtcclxuICAgICAgICAkZWwuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKCEkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAkbmF2SXRlbS5ub3QodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkc2xpZGVyLnRyaWdnZXIoJ3RvLm93bC5jYXJvdXNlbCcsIFskZGF0YSwgMjAwXSk7XHJcbiAgICAgICAgICAgICRzbGlkZXIuZmluZCgnLm93bC1pdGVtJykuYWRkQ2xhc3MoJ3RyYW5zaXRpb24nKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgJHNsaWRlci5maW5kKCcub3dsLWl0ZW0nKS5yZW1vdmVDbGFzcygndHJhbnNpdGlvbicpO1xyXG4gICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGFjdGl2ZUluZGV4ID0gZS5pdGVtLmluZGV4O1xyXG4gICAgICAgICRuYXZJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkbmF2SXRlbS5lcSgkYWN0aXZlSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygkYWN0aXZlSW5kZXgpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJsb2NrLWFjY29yZCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRhY2NvcmRpb24gPSAkdC5maW5kKCcuYWNjb3JkaW9uJyksXHJcbiAgICAgICAgJHNsaWRlciA9ICR0LmZpbmQoJy5zbGlkZXInKTtcclxuXHJcbiAgICAgICRhY2NvcmRpb24uZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkY2FyZCA9ICRlbC5maW5kKCcuY2FyZCcpO1xyXG5cclxuICAgICAgICAkY2FyZC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHZhciAkZGF0YSA9ICQodGhpcykuZGF0YSgnaXRlbScpO1xyXG4gICAgICAgICAgJCh0aGlzKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzbGlkZXIudHJpZ2dlcigndG8ub3dsLmNhcm91c2VsJywgWyRkYXRhLCAyMDBdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICRzbGlkZXIub24oJ2NoYW5nZWQub3dsLmNhcm91c2VsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgJGFjdGl2ZUluZGV4ID0gZS5pdGVtLmluZGV4O1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICRhY2NvcmRpb24uZmluZCgnLmNhcmQnKS5lcSgkYWN0aXZlSW5kZXgpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgJGFjY29yZGlvbi5maW5kKCcuY2FyZCcpLmVxKCRhY3RpdmVJbmRleCkuZmluZCgnLmNvbGxhcHNlJykuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0vLyBlbmQgb2YgcnVuU2xpZGVyKClcclxuXHJcbiAgZnVuY3Rpb24gZnVuYygpIHtcclxuXHJcbiAgICAvLyBTVElDS1kgSEVBREVSXHJcbiAgICBpZiAoJCgnLmhlYWRlcicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdmFyIGhlYWRlciA9ICQoJy5oZWFkZXInKSxcclxuICAgICAgICBwb3MgPSAxMDtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAoc2Nyb2xsID49IHBvcykge1xyXG4gICAgICAgICAgaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaGVhZGVyLXN0aWNrJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hlYWRlci1zdGljaycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcubWVudS1pY29uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ21lbnUtb3BlbicpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkKCcubWFycXVlZScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRzcGVlZDtcclxuICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA1MDApIHtcclxuICAgICAgICAkc3BlZWQgPSAzMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc3BlZWQgPSAxMDA7XHJcbiAgICAgIH1cclxuICAgICAgJHQubWFycXVlZSh7XHJcbiAgICAgICAgc3BlZWQ6ICRzcGVlZCxcclxuICAgICAgICBnYXA6IDAsXHJcbiAgICAgICAgZGVsYXlCZWZvcmVTdGFydDogMCxcclxuICAgICAgICBkaXJlY3Rpb246ICdsZWZ0JyxcclxuICAgICAgICBzdGFydFZpc2libGU6IHRydWUsXHJcbiAgICAgICAgZHVwbGljYXRlZDogdHJ1ZSxcclxuICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWVcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmFjY29yZGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRjYXJkID0gJHQuZmluZCgnLmNhcmQnKTtcclxuXHJcbiAgICAgICRjYXJkLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGhlYWQgPSAkZWwuZmluZCgnLmNhcmQtaGVhZGVyJyksXHJcbiAgICAgICAgICAkYm9keSA9ICRlbC5maW5kKCcuY2FyZC1ib2R5Jyk7XHJcblxyXG4gICAgICAgICRoZWFkLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICRjYXJkLm5vdCgkZWwpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAkZWwudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgfS8vIEVORCBvZiBmdW5jKClcclxuXHJcbn0pKCk7XHJcbiJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
