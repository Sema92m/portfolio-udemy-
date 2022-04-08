$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: false,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
          { 
              breakpoint: 991,
              settings: {
                  dots: false,
                  arrows: false,
              }
          },
        ]
  });
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
      });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');


//modal

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn(200);
});
$('.modal__close').on('click', function(){
    $('.overlay, #consultation,#order,#thanks').fadeOut(200);
});

//этот скрит берет название пульсометра у карточки и подставляет его в всплывающее окно
$('.button_mini').each(function(i) {
    $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn(200);
    })
});

    function validateForms(form) {
        $(form).validate({
            rules: {
                name:  {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "Введите имя",
                    minlength: jQuery.validator.format("Введите {0} символa")
                },
                phone: "Введите номер телефона",
                email: {
                    required: "Адрес почты для отратной связи",
                    email: "Неправильный формат",
                }
            }
            
    });
    

};

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax ({
            type:"POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");



            $('form').trigger('reset');
        });
        return false;
    });




});