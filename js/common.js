$(function () {

	//SVG Fallback
	if (!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function () {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$("#formPopup").submit(function () { //Change
		console.log('re');
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
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

	// magnific
	$('.open-popup-link').magnificPopup({
		type: 'inline',
		midClick: true,
		preloader: true,
		closeBtnInside: true,
		focus: '#formName',
		removalDelay: 300

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