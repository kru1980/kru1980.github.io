
$(document).ready(function() {

   // Плавный скролл по якорям
  $("#nav a").mPageScroll2id({
		scrollSpeed : 140
	});

  $('body').scrollspy({ target: '.navbar-example' })

//  фиксация панели навигации
  $(document).on('scroll', function(){
        if ($('.navbar')[0].offsetTop < $(document).scrollTop()){
            $('.navbar').addClass("default").fadeIn('fast');
        }
        if ($(document).scrollTop() < $(".header")[0].offsetTop){
            $('.navbar').removeClass("default").fadeIn('fast');
        }
    });

//========================================================
//  кнопка прокрутки сайта вверх

  $(function(){

    $(document).on( 'scroll', function(){

    	if ($(window).scrollTop() > 1100) {
			$('.scroll-top-wrapper').addClass('show');
		} else {
			$('.scroll-top-wrapper').removeClass('show');
		}
	});

	$('.scroll-top-wrapper').on('click', scrollToTop);
});

function scrollToTop() {
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}



//=============================================================
// настройки карусели
  $('.carousel').carousel({
    interval: 200000
  });


//  форма обратной связи

  	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#form").trigger("reset");
		});
		return false;
	});

//  hover on iphone

       if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    $('.portfolio-item__link').hover(function () {
      $(this).children('portfolio-item__hover').slideToggle();
    });
  };
  


//  анимирование блоков
  
  new WOW().init();
  

});




