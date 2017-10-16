$(function () {

	$('.first-popup-link, .second-popup-link, .third-popup-link').magnificPopup({

	});



	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("#formPopup").submit(function () { //Change
		console.log('re')
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				magnificPopup.close() // Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if ($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch (err) {

	};

	$("img, a").on("dragstart", function (event) {
		event.preventDefault();
	});

});

$(window).load(function () {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});