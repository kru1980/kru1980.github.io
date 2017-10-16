if(typeof MyMeedget === "undefined") {
	var loadCSS = function(href) {
		var ss = window.document.createElement("link");
		var ref = window.document.getElementsByTagName("script")[0];
		var sheets = window.document.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		ss.media = "only x";
		ref.parentNode.insertBefore(ss, ref);

		function toggleMedia() {
			var defined;
			for(var i = 0; i < sheets.length; i++)
				if(sheets[i].href && sheets[i].href.indexOf(href) > -1) defined = true;
			if(defined) ss.media = "all";
			else setTimeout(toggleMedia)
		}
		toggleMedia();
		return ss
	};
	var linkify = function(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
		replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
		return replacedText
	};
	var loadJS = function(src, cb) {
		if(src == MyMeedget.url + "/js/jquery.fancybox.pack.js");
		"use strict";
		var ref = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		if(cb && typeof cb === "function") script.onload = cb;
		return script
	};
	var isInt = function(n) {
		return n % 1 === 0
	};
	var getParameterByName = function(name, str) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(str != "" ? str : window.location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
	};
	var detectmobile = function() {
		if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) return true;
		else return false
	};
	var Meedgetinit = function() {
		var requestURL = document.getElementById("meedget_script").getAttribute("src");
		MyMeedget.init({
			id: getParameterByName("meedget_id", requestURL)
		})
	};
	var MyMeedget = {
		id: null,
		user_id: null,
		url: "https://meedget.ru",
		meedgets: {
			bonus: null,
			calc: null,
			calc1: null,
			calc2: null,
			calc3: null,
			calc4: null,
			online: null,
			online1: null,
			gallery: null,
			reviews: null,
			sert: null,
			link: null,
			link1: null,
			color: null,
			position: null,
			names: null,
			tarif: null,
			scroll_on: null,
			analytics_on: null,
			link_ref: null,
			link1_ref: null
		},
		mdgClick: {
			bonus: function(step) {
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this.bonusTPL.TPL);
				var _phone = jMeedQuery("<div/>", {
						step: "phone",
						style: "display:none;"
					}),
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					}),
					_spans = "",
					_ul = "";
				_phone.append(jMeedQuery(_this.bonusTPL.bonus));
				_spans = _phone.find("#meedget_bonus_text").find("span");
				_ul = _phone.find("ul#meedget_bonus_list");
				_spans.eq(0).text(_this.meedgets.bonus.value);
				_spans.eq(1).text(_this.meedgets.bonus.type);
				if(_this.meedgets.bonus.needed && _this.meedgets.bonus.needed.length > 0) jMeedQuery.each(_this.meedgets.bonus.needed, function(_i, obj) {
					_ul.append("<li>" + obj + "</li>")
				});
				_finish.append(jMeedQuery(_this.bonusTPL.finish));
				if(MyMeedget.meedgets.bonus.res_datatype == 1) {
					_phone.find("#meedget_phone_input").attr("placeholder", "E-mail");
					_phone.find(".meedget_bonus_submit").addClass("email")
				}
				_tpl.closest("#meedget_bonus_inner").append(_phone).append(_finish);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_bonus_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_bonus_inner").children("div:" + step + "").show();
				else _tpl.closest("#meedget_bonus_inner").children("div:first").show();
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(MyMeedget.meedgets.bonus.res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content .meedget_bonus_submit").off("click").on("click", _this.mdgClickFunctions.bonus.submit);
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			},
			calc1: function(step) {
				MyMeedget.mdgClick.calc(step, 1)
			},
			calc2: function(step) {
				MyMeedget.mdgClick.calc(step, 2)
			},
			calc3: function(step) {
				MyMeedget.mdgClick.calc(step, 3)
			},
			calc4: function(step) {
				MyMeedget.mdgClick.calc(step, 4)
			},
			calc: function(step, calcid) {
				calcid = parseInt(calcid) > 0 ? parseInt(calcid) : "";
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this["calcTPL" + calcid].TPL),
					_steps = _this.meedgets["calc" + calcid].length + 1,
					_res_datatype = 0;
				jMeedQuery.each(_this.meedgets["calc" + calcid], function(step, obj) {
					var _ans = null,
						_ans_img = null,
						_div = jMeedQuery("<div/>", {
							step: obj.step,
							style: "display:none;"
						}),
						_stepTPL = jMeedQuery(_this["calcTPL" + calcid].step);
					_stepTPL.closest(".meedget_step").children("span:eq(0)").text(step + 1);
					_stepTPL.closest(".meedget_step").children("span:eq(1)").text(_steps);
					var _txt = linkify(obj.question);
					if(_txt == obj.question) _stepTPL.find("#meedget_question").text(linkify(obj.question));
					else _stepTPL.find("#meedget_question").html(linkify(obj.question));
					if(step > 0) _stepTPL.find(".meedget_calc_back").show();
					_res_datatype = obj.res_datatype;
					if(obj.multiple_ans == 0) _ans = _this["calcTPL" + calcid].radio;
					else if(obj.multiple_ans == 1) _ans = _this["calcTPL" + calcid].check;
					else _ans = _this["calcTPL" + calcid].input;
					if(obj.answers.length > 0) {
						var _n3 = jMeedQuery("<div>");
						jMeedQuery.each(obj.answers, function(_i, _a) {
							var _n = jMeedQuery(_ans),
								_n2 = jMeedQuery('<div class="meedget_block" />');
							if(typeof obj.img_ans_tmb[_i] !== "undefined" && obj.img_ans_tmb[_i] != "") _n2.append(jMeedQuery("<img />", {
								src: _this.url + obj.path + obj.img_ans_tmb[_i]
							}));
							_n.closest("input").attr("id", "ans" + step + "-" + _i + 1).attr("name", "ans" + step).not('[type="text"]').attr("value", _i);
							_n.closest("label").attr("for", "ans" + step + "-" + _i + 1).find("p").text(_a);
							_n.closest("p").text(_a);
							_n2.append(_n);
							_n3.append(_n2);
							if((_i + 1) % 3 == 0 || _i + 1 == obj.answers.length) {
								_stepTPL.find(".meedget_label_radio").append(_n3);
								_n3 = jMeedQuery("<div>")
							}
						})
					} else return false;
					_div.append(_stepTPL);
					_tpl.closest("#meedget_calc_inner").append(_div)
				});
				var _calc = jMeedQuery("<div/>", {
						step: "calc",
						style: "display:none;"
					}),
					_phone = jMeedQuery("<div/>", {
						step: "phone",
						style: "display:none;"
					}),
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					});
				_calc.append(jMeedQuery(_this["calcTPL" + calcid].calcing));
				_phone.append(jMeedQuery(_this["calcTPL" + calcid].phone));
				_phone.find(".meedget_step").children("span:eq(0)").text(_steps);
				_phone.find(".meedget_step").children("span:eq(1)").text(_steps);
				if(_res_datatype == 1) {
					_phone.find("#meedget_phone_input").attr("placeholder", "E-mail");
					_phone.find(".meedget_calc_submit").addClass("email")
				}
				_finish.append(jMeedQuery(_this["calcTPL" + calcid].finish));
				_tpl.closest("#meedget_calc_inner").append(_calc).append(_phone).append(_finish);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_calc_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_calc_inner").children("div:" + step + "").show();
				else _tpl.closest("#meedget_calc_inner").children("div:first").show();
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(_res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content .meedget_block > img").off("click").on("click", function(a) {
					var _this = jMeedQuery(a.currentTarget);
					_this.parent().find("input").click().focus()
				});
				jMeedQuery("#meedget_popup_content .meedget_calc_next").off("click").on("click", _this.mdgClickFunctions.calc.next);
				jMeedQuery("#meedget_popup_content .meedget_calc_submit").off("click").on("click", function() {
					_this.mdgClickFunctions.calc.submit(calcid)
				});
				jMeedQuery("#meedget_popup_content .meedget_calc_back").off("click").on("click", _this.mdgClickFunctions.calc.back);
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			},
			online1: function(step) {
				MyMeedget.mdgClick.online(step, 1)
			},
			online: function(step, onlineid) {
				onlineid = parseInt(onlineid) > 0 ? parseInt(onlineid) : "";
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this["onlineTPL" + onlineid].TPL);
				var _phone = jMeedQuery("<div/>", {
						step: "phone",
						style: "display:none;"
					}),
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					});
				_phone.append(jMeedQuery(_this["onlineTPL" + onlineid].online));
				_phone.find("#meedget_online_text").text(_this.meedgets["online" + onlineid].question);
				_finish.append(jMeedQuery(_this["onlineTPL" + onlineid].finish));
				if(MyMeedget.meedgets["online" + onlineid].res_datatype == 1) _phone.find("#meedget_phone_input").attr("placeholder", "E-mail");
				_tpl.closest("#meedget_online_inner").append(_phone).append(_finish);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_online_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_online_inner").children("div:" + step + "").show();
				else _tpl.closest("#meedget_online_inner").children("div:first").show();
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(MyMeedget.meedgets["online" + onlineid].res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content .meedget_online_submit").off("click").on("click", function() {
					_this.mdgClickFunctions.online.submit(onlineid)
				});
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			},
			gallery: function(step) {
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this.galleryTPL.TPL),
					_img = _this.galleryTPL.img,
					_gal = jMeedQuery(_this.galleryTPL.gallery),
					_gallery = jMeedQuery("<div/>", {
						step: "gallery"
					}),
					_res_datatype = 0,
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					});
				var _imgs = _gal.find("#meedget_carousel-items");
				jMeedQuery.each(_this.meedgets.gallery, function(_i, obj) {
					var img = jMeedQuery(_img);
					_res_datatype = obj.res_datatype;
					img.closest("a").attr("rel", "meedgetgallery").attr("href", MyMeedget.url + obj.path + "/" + obj.name).attr("title", obj.caption);
					img.find("img").attr("src", MyMeedget.url + obj.path + "/" + obj.name_tmb);
					_imgs.append(img)
				});
				_gallery.append(_gal).hide();
				_finish.append(jMeedQuery(_this.bonusTPL.finish));
				if(_res_datatype == 1) _gallery.find("#meedget_phone_input").attr("placeholder", "E-mail");
				_tpl.closest("#meedget_gallery_inner").append(_gallery).append(_finish);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_gallery_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_gallery_inner").children("div:" + step + "").show();
				else {
					_tpl.closest("#meedget_gallery_inner").children("div:first").show();
					jMeedQuery("#meedget_popup #meedget_popup_content .meedgetfancybox").meedgetfancybox({})
				}
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(_res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content #meedget_gallery_imgs .meedget_prev").off("click").on("click", _this.mdgClickFunctions.gallery.imgprev);
				jMeedQuery("#meedget_popup_content #meedget_gallery_imgs .meedget_next").off("click").on("click", _this.mdgClickFunctions.gallery.imgnext);
				jMeedQuery("#meedget_popup_content .meedget_gallery_submit").off("click").on("click", _this.mdgClickFunctions.gallery.submit);
				jMeedQuery("#meedget_popup_content .meedget_gallery_next").off("click").on("click", _this.mdgClickFunctions.gallery.next);
				jMeedQuery("#meedget_popup_content .meedget_gallery_back").off("click").on("click", _this.mdgClickFunctions.gallery.back);
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			},
			sert: function(step) {
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this.sertTPL.TPL),
					_img = _this.sertTPL.img,
					_gal = jMeedQuery(_this.sertTPL.gallery),
					_gallery = jMeedQuery("<div/>", {
						step: "gallery"
					}),
					_res_datatype = 0,
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					});
				var _imgs = _gal.find("#meedget_carousel-items");
				jMeedQuery.each(_this.meedgets.sert, function(_i, obj) {
					var img = jMeedQuery(_img);
					_res_datatype = obj.res_datatype;
					img.closest("a").attr("rel", "meedgetsert").attr("href", MyMeedget.url + obj.path + "/" + obj.name).attr("title", obj.caption);
					img.find("img").attr("src", MyMeedget.url + obj.path + "/" + obj.name_tmb);
					_imgs.append(img)
				});
				_gallery.append(_gal).hide();
				if(_res_datatype == 1) _gallery.find("#meedget_phone_input").attr("placeholder", "E-mail");
				_finish.append(jMeedQuery(_this.bonusTPL.finish));
				_tpl.closest("#meedget_sert_inner").append(_gallery).append(_finish);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_sert_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_sert_inner").children("div:" + step + "").show();
				else {
					_tpl.closest("#meedget_sert_inner").children("div:first").show();
					jMeedQuery("#meedget_popup #meedget_popup_content .meedgetfancybox").meedgetfancybox({})
				}
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(_res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content #meedget_sert_imgs .meedget_prev").off("click").on("click", _this.mdgClickFunctions.sert.imgprev);
				jMeedQuery("#meedget_popup_content #meedget_sert_imgs .meedget_next").off("click").on("click", _this.mdgClickFunctions.sert.imgnext);
				jMeedQuery("#meedget_popup_content .meedget_sert_submit").off("click").on("click", _this.mdgClickFunctions.sert.submit);
				jMeedQuery("#meedget_popup_content .meedget_sert_next").off("click").on("click", _this.mdgClickFunctions.sert.next);
				jMeedQuery("#meedget_popup_content .meedget_sert_back").off("click").on("click", _this.mdgClickFunctions.sert.back);
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			},
			reviews: function(step) {
				var _this = MyMeedget,
					_tpl = jMeedQuery(_this.reviewsTPL.TPL),
					_img = _this.reviewsTPL.img,
					_gal = jMeedQuery(_this.reviewsTPL.gallery),
					_gallery = jMeedQuery("<div/>", {
						step: "gallery"
					}),
					_res_datatype = 0,
					_finish = jMeedQuery("<div/>", {
						step: "finish",
						style: "display:none;"
					});
				var _imgs = _gal.find("#meedget_carousel-items");
				jMeedQuery.each(_this.meedgets.reviews, function(_i, obj) {
					var img = jMeedQuery(_img);
					_res_datatype = obj.res_datatype;
					img.closest("a").attr("rel", "meedgetreviews").attr("href", MyMeedget.url + obj.path + "/" + obj.name).attr("title", obj.caption);
					img.find("img").attr("src", MyMeedget.url + obj.path + "/" + obj.name_tmb);
					_imgs.append(img)
				});
				_gallery.append(_gal).hide();
				if(_res_datatype == 1) _gallery.find("#meedget_phone_input").attr("placeholder", "E-mail");
				_finish.append(jMeedQuery(_this.bonusTPL.finish));
				_tpl.closest("#meedget_reviews_inner").append(_gallery).append(_finish);
				jMeedQuery("#meedget_popup #meedget_popup_content").html("").append(_tpl);
				if(typeof step !== "undefined" && step != "" && step != null && (isInt(step) || typeof step === "string"))
					if(isInt(step)) _tpl.closest("#meedget_reviews_inner").children("div:eq(" + (step - 1) + ")").show();
					else _tpl.closest("#meedget_reviews_inner").children("div:" + step + "").show();
				else {
					_tpl.closest("#meedget_reviews_inner").children("div:first").show();
					jMeedQuery("#meedget_popup #meedget_popup_content .meedgetfancybox").meedgetfancybox({})
				}
				if(_res_datatype != 1) jMeedQuery("#meedget_phone_input").keypress(function(e) {
					if(!/[^A-Za-z\u0410-\u042f\u0430-\u044f]/.test(e.key)) e.preventDefault()
				});
				jMeedQuery("#meedget_popup").show();
				jMeedQuery("#meedget_popup_content #meedget_reviews_imgs .meedget_prev").off("click").on("click", _this.mdgClickFunctions.reviews.imgprev);
				jMeedQuery("#meedget_popup_content #meedget_reviews_imgs .meedget_next").off("click").on("click", _this.mdgClickFunctions.reviews.imgnext);
				jMeedQuery("#meedget_popup_content .meedget_reviews_submit").off("click").on("click", _this.mdgClickFunctions.reviews.submit);
				jMeedQuery("#meedget_popup_content .meedget_reviews_next").off("click").on("click", _this.mdgClickFunctions.reviews.next);
				jMeedQuery("#meedget_popup_content .meedget_reviews_back").off("click").on("click", _this.mdgClickFunctions.reviews.back);
				jMeedQuery(".meedget_close_link").off("click").on("click", _this.meedgetClose);
				jMeedQuery("html, body").animate({
					scrollTop: 0
				}, 300)
			}
		},
		mdgClickFunctions: {
			calc: {
				next: function(calcid) {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_calc_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						_steps = _this.children("div").length,
						_input = _div.find("input"),
						next = false;
					if(_input.length > 0 && (_input.attr("type") == "checkbox" || _input.attr("type") == "radio")) {
						if(_input.closest(":checked").length > 0) next = true
					} else next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "calc") {
							_this.children("div").eq(_ind + 1).show(0).delay("3000").hide(0);
							_this.children("div").eq(_ind + 2).delay("3000").show(0)
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=calc" + calcid
							}, 2E3)
					} else alert(decodeURIComponent("%D0%BD%D0%B5%20%D0%B2%D1%8B%D0%B1%D1%80%D0%B0%D0%BD%20%D0%BD%D0%B8%20%D0%BE%D0%B4%D0%B8%D0%BD%20%D0%BF%D1%83%D0%BD%D0%BA%D1%82!"));
					jMeedQuery("html, body").animate({
						scrollTop: 50
					}, 300)
				},
				back: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_calc_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						_steps = _this.children("div").length;
					if(_ind > 0) {
						_div.hide();
						_this.children("div").eq(_ind - 1).show()
					}
				},
				submit: function(calcid) {
					calcid = parseInt(calcid) > 0 ? parseInt(calcid) : "";
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_calc_inner"),
						post_data = {
							"type": "calc" + calcid,
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets["calc" + calcid][0].res_datatype
						},
						_stepdata = {},
						tmp = null;
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(parseInt(step) > 0) {
							tmp = jMeedQuery(obj).find("input[id^=ans]:checked,input[id^=ans][type=text]").map(function() {
								if(jMeedQuery(this).length > 0 && jMeedQuery(this).val() != "") return encodeURIComponent(jMeedQuery(this).val())
							}).get().join(",");
							if(tmp != null && tmp != "") _stepdata[step] = tmp;
							else if(_stepdata[step] == null) _stepdata[step] = "0"
						} else if(step == "phone") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					post_data["step"] = _stepdata;
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.calc.next, calcid);
					_this.find(".meedget_calc_submit").attr("disabled", "disabled");
					return
				}
			},
			online: {
				next: function(onlineid) {
					onlineid = parseInt(onlineid) > 0 ? parseInt(onlineid) : "";
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_online_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						next = false;
					if(_this.find("input#meedget_phone_input").val() != "") next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "online") {
							_this.children("div").eq(_ind + 1).hide();
							_this.children("div").eq(_ind + 2).show()
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=callback" + onlineid
							}, 2E3)
					} else alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"))
				},
				submit: function(onlineid) {
					onlineid = parseInt(onlineid) > 0 ? parseInt(onlineid) : "";
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_online_inner"),
						post_data = {
							"type": "online" + onlineid,
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets.online.res_datatype
						};
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(step == "phone") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.online.next, onlineid);
					_this.find(".meedget_online_submit").attr("disabled", "disabled");
					return
				}
			},
			bonus: {
				next: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_bonus_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						next = false;
					if(_this.find("input#meedget_phone_input").val() != "") next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "bonus") {
							_this.children("div").eq(_ind + 1).hide();
							_this.children("div").eq(_ind + 2).show()
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=bonus"
							}, 2E3)
					} else alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"))
				},
				submit: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_bonus_inner"),
						post_data = {
							"type": "bonus",
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets.bonus.res_datatype
						};
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(step == "phone") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.bonus.next);
					_this.find(".meedget_bonus_submit").attr("disabled", "disabled");
					return
				}
			},
			gallery: {
				imgprev: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_gallery_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 160;
					_imgs.find(".meedgetfancybox").eq(-1).clone().prependTo(_imgs);
					_imgs.css({
						"left": "-" + block_width + "px"
					});
					_imgs.find(".meedgetfancybox").eq(-1).remove();
					_imgs.animate({
						left: "0px"
					}, 300);
					return false
				},
				imgnext: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_gallery_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 160;
					_imgs.animate({
						left: "-" + block_width + "px"
					}, 300, function() {
						_imgs.find(".meedgetfancybox").eq(0).clone().appendTo(_imgs);
						_imgs.find(".meedgetfancybox").eq(0).remove();
						_imgs.css({
							"left": "0px"
						})
					});
					return false
				},
				next: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_gallery_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "gallery") {
							_this.children("div").eq(_ind + 1).hide();
							_this.children("div").eq(_ind + 2).show()
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=gallery"
							}, 2E3)
					} else alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"))
				},
				back: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_gallery_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						_steps = _this.children("div").length;
					if(_ind > 0) {
						_div.hide();
						_this.children("div").eq(_ind - 1).show()
					}
				},
				submit: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_gallery_inner"),
						post_data = {
							"type": "gallery",
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets.gallery.res_datatype
						};
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(step == "gallery") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.gallery.next);
					_this.find(".meedget_submit_submit").attr("disabled", "disabled");
					return
				}
			},
			sert: {
				imgprev: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_sert_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 175;
					_imgs.find(".meedgetfancybox").eq(-1).clone().prependTo(_imgs);
					_imgs.css({
						"left": "-" + block_width + "px"
					});
					_imgs.find(".meedgetfancybox").eq(-1).remove();
					_imgs.animate({
						left: "0px"
					}, 300);
					return false
				},
				imgnext: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_sert_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 175;
					_imgs.animate({
						left: "-" + block_width + "px"
					}, 300, function() {
						_imgs.find(".meedgetfancybox").eq(0).clone().appendTo(_imgs);
						_imgs.find(".meedgetfancybox").eq(0).remove();
						_imgs.css({
							"left": "0px"
						})
					});
					return false
				},
				next: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_sert_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "gallery") {
							_this.children("div").eq(_ind + 1).hide();
							_this.children("div").eq(_ind + 2).show()
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=sert"
							}, 2E3)
					} else alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"))
				},
				back: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_sert_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						_steps = _this.children("div").length;
					if(_ind > 0) {
						_div.hide();
						_this.children("div").eq(_ind - 1).show()
					}
				},
				submit: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_sert_inner"),
						post_data = {
							"type": "sert",
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets.sert.res_datatype
						};
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(step == "gallery") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.sert.next);
					_this.find(".meedget_sert_submit").attr("disabled", "disabled");
					return
				}
			},
			reviews: {
				imgprev: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_reviews_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 175;
					_imgs.find(".meedgetfancybox").eq(-1).clone().prependTo(_imgs);
					_imgs.css({
						"left": "-" + block_width + "px"
					});
					_imgs.find(".meedgetfancybox").eq(-1).remove();
					_imgs.animate({
						left: "0px"
					}, 300);
					return false
				},
				imgnext: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_reviews_inner"),
						_imgs = _this.find("#meedget_carousel-items"),
						block_width = 175;
					_imgs.animate({
						left: "-" + block_width + "px"
					}, 300, function() {
						_imgs.find(".meedgetfancybox").eq(0).clone().appendTo(_imgs);
						_imgs.find(".meedgetfancybox").eq(0).remove();
						_imgs.css({
							"left": "0px"
						})
					});
					return false
				},
				next: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_reviews_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						next = true;
					if(next) {
						_div.hide();
						var _t = _this.children("div").eq(_ind + 1);
						_t.show();
						if(_t.attr("step") == "gallery") {
							_this.children("div").eq(_ind + 1).hide();
							_this.children("div").eq(_ind + 2).show()
						}
						if(_t.attr("step") == "finish")
							if(MyMeedget.meedgets.analytics_on) setTimeout(function() {
								window.location.search = "?meedget=review"
							}, 2E3)
					} else alert(decodeURIComponent(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!")))
				},
				back: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_reviews_inner"),
						_div = _this.children("div:visible"),
						_ind = _div.index(),
						_steps = _this.children("div").length;
					if(_ind > 0) {
						_div.hide();
						_this.children("div").eq(_ind - 1).show()
					}
				},
				submit: function() {
					var _this = jMeedQuery("#meedget_popup #meedget_popup_content #meedget_reviews_inner"),
						post_data = {
							"type": "reviews",
							"meedgetid": MyMeedget.id,
							"res_datatype": MyMeedget.meedgets.reviews.res_datatype
						};
					if(_this.find("input#meedget_phone_input").val() == "") {
						alert(decodeURIComponent("%D0%9D%D0%B5%20%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D1%8B%20%D0%B2%D1%81%D0%B5%20%D0%BF%D0%BE%D0%BB%D1%8F!"));
						return false
					} else if(_this.find("input#meedget_phone_input").val().length < 7) {
						alert(decodeURIComponent("%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%20%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0"));
						return false
					}
					_this.children("div").each(function(i, obj) {
						var step = jMeedQuery(obj).attr("step");
						if(step == "gallery") post_data["phone"] = jMeedQuery(obj).find("input#meedget_phone_input").val()
					});
					if(typeof ga !== "undefined") ga("send", "event", "Meedget", "Lead");
					MyMeedget.sendData(post_data, MyMeedget.mdgClickFunctions.reviews.next);
					_this.find(".meedget_reviews_submit").attr("disabled", "disabled");
					return
				}
			}
		},
		meedgetClose: function() {
			jMeedQuery("#meedget_popup").hide();
			return false
		},
		mdgLi: {
			bonus: '<li><a class="meedget_bonus"   href="javascript:void(0);"><span>#</span></a></li>',
			calc: '<li><a class="meedget_calc"    href="javascript:void(0);"><span>#</span></a></li>',
			calc1: '<li><a class="meedget_calc1"    href="javascript:void(0);"><span>#</span></a></li>',
			calc2: '<li><a class="meedget_calc2"    href="javascript:void(0);"><span>#</span></a></li>',
			calc3: '<li><a class="meedget_calc3"    href="javascript:void(0);"><span>#</span></a></li>',
			calc4: '<li><a class="meedget_calc4"    href="javascript:void(0);"><span>#</span></a></li>',
			online: '<li><a class="meedget_online"  href="javascript:void(0);"><span>#</span></a></li>',
			online1: '<li><a class="meedget_online1"  href="javascript:void(0);"><span>#</span></a></li>',
			gallery: '<li><a class="meedget_gallery" href="javascript:void(0);"><span>#</span></a></li>',
			reviews: '<li><a class="meedget_reviews" href="javascript:void(0);"><span>#</span></a></li>',
			sert: '<li><a class="meedget_sert"    href="javascript:void(0);"><span>#</span></a></li>',
			link: '<li><a class="meedget_link"    href="##" target="###"><span>####</span></a></li>',
			link1: '<li><a class="meedget_link1"   href="##" target="###"><span>####</span></a></li>'
		},
		meedgetOBJ: null,
		closeTPL: '<a class="close_meedget" href="javascript:void(0);" style="display: block;">' + decodeURIComponent("%D1%81%D0%B2%D0%B5%D1%80%D0%BD%D1%83%D1%82%D1%8C") + '</a><a class="open_meedget" href="javascript:void(0);" style="display: none;"></a>',
		meedgetTPL: '<div id="widget_meedget"> <ul></ul> <a class="close_meedget" href="javascript:void(0);" style="display: block;">' + decodeURIComponent("%D1%81%D0%B2%D0%B5%D1%80%D0%BD%D1%83%D1%82%D1%8C") + '</a> <a class="open_meedget" href="javascript:void(0);" style="display: none;"></a> </div> <div id="meedget_popup" style="display:none;"> <div id="meedget_block"> <a href="javascript:void(0);" class="meedget_close_link"></a> <div id="meedget_popup_content"></div> <div class="meedget_copy"> <p>' + decodeURIComponent("%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B0%20%D1%81%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E") + ' <a href="https://meedget.ru/">meedget.ru</a> </p> </div> </div> </div>' + "<style>.meed_modal{line-height: 14px !important;z-index: 2147483647; display: none; font-family: NeoSansProRegular, sans-serif !important; font-size: 14px !important; position: fixed !important; left: 30% !important; right: 30% !important; top: 5% !important; background-color: white !important; padding: 5px !important; border-radius: 5px !important; box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px !important;}.meed_modal_title{background-color: #0000 !important;background-color: rgba(0, 0, 0, 0) !important;margin: auto !important;text-align: center !important;font-weight: bold !important;}.meed_modal_body{color: #333!important;}.meed_modal_body>p{ display: block;-webkit-margin-before: 1em;-webkit-margin-after: 1em;-webkit-margin-start: 0px;-webkit-margin-end: 0px;}.meed_modal_but{float: right !important;background: grey !important;border: solid 1px !important;border-radius: 5px !important;color: white !important;\t    width: 100% !important;\theight: 30px!important;}</style>" + '<div class="meed_modal">' + '<p class="meed_modal_title">\u0421\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445' + "<span onclick=\"document.getElementsByClassName('meed_modal')[0].style.display='none'\" style=\"float: right !important;font-size: 18px !important;cursor: default !important;position: absolute !important;top: 5px !important;right: 5px !important;color: black !important;\">X</span></p>" + '<div class="meed_modal_body">' + "<p>\u0414\u0430\u043d\u043d\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435 \u043e\u0431 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u043e \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441" + "\t\u0424\u0435\u0434\u0435\u0440\u0430\u043b\u044c\u043d\u044b\u043c \u0437\u0430\u043a\u043e\u043d\u043e\u043c \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u043e\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438 \u043e\u0442 27.07.2006 \u0433. \u2116 152-\u0424\u0417 \u00ab\u041e \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445\u00bb" + "\t\u0412\u0441\u0435 \u043b\u0438\u0446\u0430 \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0432\u0448\u0438\u0435 \u0441\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0435 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043d\u0430 \u0434\u0430\u043d\u043d\u043e\u043c \u0441\u0430\u0439\u0442\u0435, \u0430 \u0442\u0430\u043a\u0436\u0435 \u0440\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0432\u0448\u0438\u0435 \u0438\u043d\u0443\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u043c\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f\u043c\u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044e\u0442 \u0441\u0432\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u0438\u0435 \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u0438\u0445 \u043f\u0435\u0440\u0435\u0434\u0430\u0447\u0443 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0443 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445.</p>" + "<p>\u041f\u043e\u0434 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 \u0413\u0440\u0430\u0436\u0434\u0430\u043d\u0438\u043d\u0430 \u043f\u043e\u043d\u0438\u043c\u0430\u0435\u0442\u0441\u044f \u043d\u0438\u0436\u0435\u0443\u043a\u0430\u0437\u0430\u043d\u043d\u0430\u044f \u043e\u0431\u0449\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f:  \u0418\u043c\u044f, \u0422\u0435\u043b\u0435\u0444\u043e\u043d, E-mail.</p>" + "<p>\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438, \u043f\u0440\u0438\u043d\u0438\u043c\u0430\u044f \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0435\u0435 \u0421\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435, \u0432\u044b\u0440\u0430\u0436\u0430\u044e\u0442 \u0441\u0432\u043e\u044e \u0437\u0430\u0438\u043d\u0442\u0435\u0440\u0435\u0441\u043e\u0432\u0430\u043d\u043d\u043e\u0441\u0442\u044c \u0438 \u043f\u043e\u043b\u043d\u043e\u0435 \u0441\u043e\u0433\u043b\u0430\u0441\u0438\u0435, \u0447\u0442\u043e \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0438\u0445 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u043c\u043e\u0436\u0435\u0442 \u0432\u043a\u043b\u044e\u0447\u0430\u0442\u044c \u0432 \u0441\u0435\u0431\u044f \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044f: \u0441\u0431\u043e\u0440, \u0441\u0438\u0441\u0442\u0435\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044e, \u043d\u0430\u043a\u043e\u043f\u043b\u0435\u043d\u0438\u0435, \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0435, \u0443\u0442\u043e\u0447\u043d\u0435\u043d\u0438\u0435 (\u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435, \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435), \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435, \u0443\u043d\u0438\u0447\u0442\u043e\u0436\u0435\u043d\u0438\u0435.</p>" + "<p>\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0440\u0443\u0435\u0442: \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f, \u0438\u043c \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043d\u0430\u044f, \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u043d\u043e\u0439, \u0442\u043e\u0447\u043d\u043e\u0439 \u0438 \u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u043d\u043e\u0439; \u043f\u0440\u0438 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0438 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u043d\u0435 \u043d\u0430\u0440\u0443\u0448\u0430\u0435\u0442\u0441\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0435\u0435 \u0437\u0430\u043a\u043e\u043d\u043e\u0434\u0430\u0442\u0435\u043b\u044c\u0441\u0442\u0432\u043e \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u043e\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438, \u0437\u0430\u043a\u043e\u043d\u043d\u044b\u0435 \u043f\u0440\u0430\u0432\u0430 \u0438 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u044b \u0442\u0440\u0435\u0442\u044c\u0438\u0445 \u043b\u0438\u0446; \u0432\u0441\u044f \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0430 \u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c \u0432 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0438 \u0441\u0435\u0431\u044f \u043b\u0438\u0447\u043d\u043e.</p>" + "</div><button class=\"meed_modal_but\" onclick=\"document.getElementsByClassName('meed_modal')[0].style.display='none'\"" + ">\u0417\u0410\u041a\u0420\u042b\u0422\u042c</button></div>",
		bonusTPL: {
			TPL: '<h2>##</h2><div id="meedget_bonus_inner"></div>',
			bonus: '<h3 id="meedget_bonus_text">' + decodeURIComponent("%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%81%D0%BA%D0%B8%D0%B4%D0%BA%D0%B8%20%D0%B2") + ' <span></span><span></span></h3> <ul id="meedget_bonus_list"></ul>  <p style="text-align:left;">##</p> <div class="meedget_center meedget_tel"> <input type="text" id="meedget_phone_input" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"   />   <button class="meedget_bonus_submit" autocomplete=off type="submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%81%D0%BA%D0%B8%D0%B4%D0%BA%D1%83") + "</button>  </div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u043a\u0438\u0434\u043a\u0443\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		calcTPL: {
			TPL: '<h2>##</h2><div id="meedget_calc_inner"></div>',
			step: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div> <div class="meedget_inner"><h3 id="meedget_question"></h3><p style="font-size:15px"></p><div class="meedget_center meedget_label_radio"></div></div><div class="meedget_center"><a class="meedget_back meedget_back_link meedget_calc_back" href="javascript:void(0);" style="display:none;">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + '</a> <button class="meedget_calc_next meedget_step_button" type="submit">' + decodeURIComponent("C%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%88%D0%B0%D0%B3") + "</button></div>",
			radio: '<input type="radio" id="1"><label for="1"><p></p></label>',
			check: '<input type="checkbox" id="1"><label for="1"><p></p></label>',
			input: '<p></p> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82") + '" style="width:130px">',
			calcing: "<div><h3>" + decodeURIComponent("%D0%A0%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC") + '</h3> <div class="meedget_spinner">  <div class="meedget_rect1"></div><div class="meedget_rect2"></div><div class="meedget_rect3"></div><div class="meedget_rect4"></div><div class="meedget_rect5"></div></div></div>',
			phone: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div>  <div><h3>##</h3> <p class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""  placeholder="' + decodeURIComponent("%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  /> <button type="submit" autocomplete=off class="meedget_calc_submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82") + "</button> </p></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		calcTPL1: {
			TPL: '<h2>##</h2><div id="meedget_calc_inner"></div>',
			step: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div> <div class="meedget_inner"><h3 id="meedget_question"></h3><p style="font-size:15px"></p><div class="meedget_center meedget_label_radio"></div></div><div class="meedget_center"><a class="meedget_back meedget_back_link meedget_calc_back" href="javascript:void(0);" style="display:none;">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + '</a> <button class="meedget_calc_next meedget_step_button" type="submit">' + decodeURIComponent("C%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%88%D0%B0%D0%B3") + "</button></div>",
			radio: '<input type="radio" id="1"><label for="1"><p></p></label>',
			check: '<input type="checkbox" id="1"><label for="1"><p></p></label>',
			input: '<p></p> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82") + '" style="width:130px">',
			calcing: "<div><h3>" + decodeURIComponent("%D0%A0%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC") + '</h3> <div class="meedget_spinner">  <div class="meedget_rect1"></div><div class="meedget_rect2"></div><div class="meedget_rect3"></div><div class="meedget_rect4"></div><div class="meedget_rect5"></div></div></div>',
			phone: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div>  <div><h3>##</h3> <p class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""  placeholder="' + decodeURIComponent("%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  /> <button type="submit" autocomplete=off class="meedget_calc_submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82") + "</button> </p></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		calcTPL2: {
			TPL: '<h2>##</h2><div id="meedget_calc_inner"></div>',
			step: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div> <div class="meedget_inner"><h3 id="meedget_question"></h3><p style="font-size:15px"></p><div class="meedget_center meedget_label_radio"></div></div><div class="meedget_center"><a class="meedget_back meedget_back_link meedget_calc_back" href="javascript:void(0);" style="display:none;">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + '</a> <button class="meedget_calc_next meedget_step_button" type="submit">' + decodeURIComponent("C%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%88%D0%B0%D0%B3") + "</button></div>",
			radio: '<input type="radio" id="1"><label for="1"><p></p></label>',
			check: '<input type="checkbox" id="1"><label for="1"><p></p></label>',
			input: '<p></p> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82") + '" style="width:130px">',
			calcing: "<div><h3>" + decodeURIComponent("%D0%A0%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC") + '</h3> <div class="meedget_spinner">  <div class="meedget_rect1"></div><div class="meedget_rect2"></div><div class="meedget_rect3"></div><div class="meedget_rect4"></div><div class="meedget_rect5"></div></div></div>',
			phone: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div>  <div><h3>##</h3> <p class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""  placeholder="' + decodeURIComponent("%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  /> <button type="submit" autocomplete=off class="meedget_calc_submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82") + "</button> </p></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		calcTPL3: {
			TPL: '<h2>##</h2><div id="meedget_calc_inner"></div>',
			step: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div> <div class="meedget_inner"><h3 id="meedget_question"></h3><p style="font-size:15px"></p><div class="meedget_center meedget_label_radio"></div></div><div class="meedget_center"><a class="meedget_back meedget_back_link meedget_calc_back" href="javascript:void(0);" style="display:none;">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + '</a> <button class="meedget_calc_next meedget_step_button" type="submit">' + decodeURIComponent("C%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%88%D0%B0%D0%B3") + "</button></div>",
			radio: '<input type="radio" id="1"><label for="1"><p></p></label>',
			check: '<input type="checkbox" id="1"><label for="1"><p></p></label>',
			input: '<p></p> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82") + '" style="width:130px">',
			calcing: "<div><h3>" + decodeURIComponent("%D0%A0%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC") + '</h3> <div class="meedget_spinner">  <div class="meedget_rect1"></div><div class="meedget_rect2"></div><div class="meedget_rect3"></div><div class="meedget_rect4"></div><div class="meedget_rect5"></div></div></div>',
			phone: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div>  <div><h3>##</h3> <p class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""  placeholder="' + decodeURIComponent("%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  /> <button type="submit" autocomplete=off class="meedget_calc_submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82") + "</button> </p></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		calcTPL4: {
			TPL: '<h2>##</h2><div id="meedget_calc_inner"></div>',
			step: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div> <div class="meedget_inner"><h3 id="meedget_question"></h3><p style="font-size:15px"></p><div class="meedget_center meedget_label_radio"></div></div><div class="meedget_center"><a class="meedget_back meedget_back_link meedget_calc_back" href="javascript:void(0);" style="display:none;">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + '</a> <button class="meedget_calc_next meedget_step_button" type="submit">' + decodeURIComponent("C%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B9%20%D1%88%D0%B0%D0%B3") + "</button></div>",
			radio: '<input type="radio" id="1"><label for="1"><p></p></label>',
			check: '<input type="checkbox" id="1"><label for="1"><p></p></label>',
			input: '<p></p> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82") + '" style="width:130px">',
			calcing: "<div><h3>" + decodeURIComponent("%D0%A0%D0%B0%D1%81%D1%81%D1%87%D0%B8%D1%82%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC") + '</h3> <div class="meedget_spinner">  <div class="meedget_rect1"></div><div class="meedget_rect2"></div><div class="meedget_rect3"></div><div class="meedget_rect4"></div><div class="meedget_rect5"></div></div></div>',
			phone: '<div class="meedget_step">' + decodeURIComponent("%D0%A8%D0%B0%D0%B3") + ": <span>1</span> " + decodeURIComponent("%D0%B8%D0%B7") + ' <span>2</span><div class="step_arrow"></div></div>  <div><h3>##</h3> <p class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""  placeholder="' + decodeURIComponent("%D0%9D%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  /> <button type="submit" autocomplete=off class="meedget_calc_submit">' + decodeURIComponent("%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%87%D0%B5%D1%82") + "</button> </p></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0441\u0447\u0435\u0442\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		onlineTPL: {
			TPL: '<h2>##</h2><div id="meedget_online_inner"></div>',
			online: '<h3 id="meedget_online_text"></h3> <div class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""   placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" /> <button type="submit" autocomplete=off class="meedget_online_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + "</button> </div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		onlineTPL1: {
			TPL: '<h2>##</h2><div id="meedget_online_inner"></div>',
			online: '<h3 id="meedget_online_text"></h3> <div class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input" value=""   placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" /> <button type="submit" autocomplete=off class="meedget_online_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + "</button> </div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		galleryTPL: {
			TPL: '<h2>##</h2><div id="meedget_gallery_inner"></div>',
			gallery: '<h3></h3><div class="meedget_images" id="meedget_gallery_imgs"><a href="#" class="meedget_prev"></a> <a href="#" class="meedget_next"></a> <div id="meedget_carousel-wrapper"><div id="meedget_carousel-items"></div></div> </div> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" id="meedget_phone_input" ><button type="submit" class="meedget_call_link meedget_gallery_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + "</button>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			img: '<a rel="" title="" class="meedgetfancybox" href=""><img alt="" class="meedget_images" src=""></a>',
			phone: '<p id="meedget_gallery_text">##</p> <div class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input"  placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '"  value=""   /> <button type="submit" autocomplete=off class="meedget_gallery_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + '</button> </div><hr><div class="meedget_center"> <a href="javascript:void(0);"  class="meedget_back_link meedget_gallery_back">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + "</a></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		reviewsTPL: {
			TPL: '<h2>##</h2><div id="meedget_reviews_inner"></div>',
			gallery: '<h3></h3><div class="meedget_images" id="meedget_reviews_imgs"><a href="#" class="meedget_prev"></a> <a href="#" class="meedget_next"></a> <div id="meedget_carousel-wrapper"><div id="meedget_carousel-items"></div></div> </div> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" id="meedget_phone_input" ><button type="submit" class="meedget_call_link meedget_reviews_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + "</button>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			img: '<a rel="" title="" class="meedgetfancybox" href=""><img alt="" class="meedget_images" src=""></a>',
			phone: '<p id="meedget_reviews_text">##</p> <div class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input"  placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" value=""   /> <button type="submit" autocomplete=off class="meedget_reviews_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + '</button> </div><hr><div class="meedget_center"> <a href="javascript:void(0);"  class="meedget_back_link meedget_reviews_back">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + "</a></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		sertTPL: {
			TPL: '<h2>##</h2><div id="meedget_sert_inner"></div>',
			gallery: '<h3></h3><div class="meedget_images" id="meedget_sert_imgs"><a href="#" class="meedget_prev"></a> <a href="#" class="meedget_next"></a> <div id="meedget_carousel-wrapper"><div id="meedget_carousel-items"></div></div> </div> <input type="text" value="" placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" id="meedget_phone_input" ><button type="submit" class="meedget_call_link meedget_sert_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + "</button>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			img: '<a rel="" title="" class="meedgetfancybox" href=""><img alt="" class="meedget_images" src=""></a>',
			phone: '<p id="meedget_sert_text">##</p> <div class="meedget_center meedget_tel"><input type="text" id="meedget_phone_input"  placeholder="' + decodeURIComponent("%D0%92%D0%B2%D0%B5%D0%B4%D0%B8%D1%82%D0%B5%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0") + '" value=""   /> <button type="submit" autocomplete=off class="meedget_sert_submit">' + decodeURIComponent("%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA") + '</button> </div><hr><div class="meedget_center"> <a href="javascript:void(0);"  class="meedget_back_link meedget_sert_back">' + decodeURIComponent("%D0%9A%20%D0%BF%D1%80%D0%B5%D0%B4%D1%8B%D0%B4%D1%83%D1%89%D0%B5%D0%BC%D1%83%20%D1%88%D0%B0%D0%B3%D1%83") + "</a></div>" + '<div style="background-color: #dedede!important;position: absolute;color:grey;bottom: 0;left: 0;font-size: 12px !important;line-height: 11px !important;"><p style="padding-top: 1% !important;margin: 0 !important;padding-left: 3% !important;padding-right: 3% !important;font-size: 12px !important;line-height: 11px !important;">\u0424\u043e\u0440\u043c\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e <a href="https://meedget.ru/">meedget.ru</a> </p><p style="margin: 0 !important;padding-bottom: 1% !important;padding-left: 3% !important;padding-right: 3% !important;text-align: left !important;font-size: 12px !important;line-height: 11px !important;">\u041d\u0430\u0436\u0438\u043c\u0430\u044f \u00ab\u0417\u0430\u043a\u0430\u0437\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a\u00bb \u044f \u0441\u043e\u0433\u043b\u0430\u0448\u0430\u044e\u0441\u044c \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445 \u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0432 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 <a onclick=\'document.getElementsByClassName("meed_modal")[0].style.display="block"\' style="color: grey !important;text-decoration: underline !important;cursor: pointer !important;">\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u043c \u0441\u043e\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435\u043c</a></p></div>',
			finish: "<div><h3>" + decodeURIComponent("%D0%A1%D0%BF%D0%B0%D1%81%D0%B8%D0%B1%D0%BE%2C%20%D0%BC%D1%8B%20%D1%81%D0%BA%D0%BE%D1%80%D0%BE%20%D1%81%20%D0%B2%D0%B0%D0%BC%D0%B8%20%D1%81%D0%B2%D1%8F%D0%B6%D0%B5%D0%BC%D1%81%D1%8F!") + "</h3></div>"
		},
		cssTPL: "@import url(https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext);#widget_meedget ul>li,p.h2{text-transform:uppercase!important}#meedget_block,#meedget_carousel-wrapper,#widget_meedget,.meedget_center,.meedget_copy,.meedget_images{overflow:hidden!important}#widget_meedget.meedgetleft{left:0!important;right:auto!important;border-radius:0!important}#widget_meedget.meedgetleft ul{border-left:1px solid #e8e9ea!important;padding:0!important}#widget_meedget.meedgettop{top:5%!important}#widget_meedget.meedgetbottom{top:auto!important;bottom:5%!important}#widget_meedget{font-family:arial!important;font-size:14px!important;position:fixed!important;right:0!important;top:30%!important;z-index:10000!important}#meedget_block a{color:#444!important;text-decoration:none!important}#meedget_block a:hover{text-decoration:underline!important}#meedget_block img{border:none!important}#meedget_block input:focus{outline:0!important}#meedget_block input::-ms-clear{display:none!important}#widget_meedget.meedgetwhite a,#widget_meedget.meedgetwhite ul>li span{color:#FFF!important}#widget_meedget ul>li{margin:0!important;width:100%!important;background:#fffffe!important;color:#444!important;font-weight:700!important;list-style:none!important;text-decoration:none!important;border-top:1px solid #e8e9ea!important;border-left:1px solid #e8e9ea!important;padding:17px!important;box-sizing:border-box!important}#meedget_block,#meedget_block div,#widget_meedget,a.close_meedget{box-sizing:content-box!important}#widget_meedget ul>li span{color:#444!important}#widget_meedget.meedgetwhite a.close_meedget,#widget_meedget.meedgetwhite a.open_meedget,#widget_meedget.meedgetwhite.meedgetleft a.close_meedget,#widget_meedget.meedgetwhite.meedgetleft a.open_meedget{background-image:url(https://meedget.ru/images/menu_icon2.png)!important;color:#FFF!important}#widget_meedget ul{margin:0!important;padding:0!important}#widget_meedget ul>li:hover{background-color:#e8e9ec!important}#widget_meedget ul>li:last-child{border-bottom:1px solid #e8e9ea!important}a.meedget_calc{background-position:0 0!important}#widget_meedget.meedgetwhite a.close_meedget{background-position:7px -344px}#widget_meedget.meedgetwhite a.open_meedget{background-position:7px -317px}#widget_meedget.meedgetwhite.meedgetleft a.close_meedget{background-position:17px -317px;padding-left:36px!important}#widget_meedget.meedgetwhite.meedgetleft a.open_meedget{background-position:7px -344px}#meedget_block h3,#meedget_block ul{color:#666!important;line-height:22px!important}#meedget_popup{position:absolute!important;width:100%!important;min-height:100%!important;z-index:9998!important}#meedget_block{position:relative!important;width:472px!important;background:#fff!important;border:3px solid #003fcd!important;padding:23px 85px 0!important;margin:3% auto!important}#meedget_block h2{color:#444!important;font-size:32px!important;font-family:'Open Sans Light','Open Sans',Arial!important;font-weight:100!important;line-height:normal!important;margin:33px 0 0!important;padding:0!important}#meedget_block h3{font-size:18px!important;font-family:'Open Sans Semibold','Open Sans'!important;font-weight:600!important;margin:19px 0 9px!important}#meedget_block button,#meedget_block ul{font-family:'Open Sans Light','Open Sans',Arial!important}#meedget_block button,#meedget_phone_input{float:left!important;font-weight:100!important}#meedget_block div{float:left!important;width:100%}#meedget_block ul{font-size:15px!important;font-style:italic!important;margin:6px 0!important}#meedget_block li{list-style:none!important;background:url(https://meedget.ru/images/li_icon.png) left no-repeat!important;padding:0 0 0 12px!important;margin:0 0 0 17px!important}.meedget_inner{width:100%;clear:both;float:left!important}#meedget_block button{height:44px;position:inherit!important;background-image:url(https://meedget.ru/images/button_icon.png);background-position:left!important;background-repeat:no-repeat!important;background-color:#003fcd!important;color:#fff!important;font-size:18px!important;border:none!important;cursor:pointer!important;padding:0 17px 0 46px!important;margin:25px 0 0!important}#meedget_block button.email{background-image:none!important}#meedget_phone_input{border:2px solid #b4b4b4!important;border-radius:3px!important;color:#b4b4b4!important;font-family:'Open Sans Light','Open Sans'!important;font-size:16px!important;height:40px!important;margin:50px 17px 0 0;padding:0 7px!important;width:210px!important}p.h2,p.h3{color:#444!important;text-align:center!important;font-weight:700!important}#meedget_bonus_inner #meedget_phone_input,#meedget_bonus_inner .meedget_bonus_submit{margin-top:10px!important}p.h2{margin:0!important}.meedget_center{display:table!important;margin:0 auto!important}#meedget_block select{float:left;width:162px;height:38px;font-size:18px;color:#999;font-weight:700;text-align:center;border-radius:3px;border:1px solid #e8e9eb;padding:0 10px;margin-bottom:20px;clear:both}#meedget_block label,a.meedget_back_link,a.meedget_prev{float:left!important}#meedget_block input:last-child{margin-bottom:0}#meedget_block label{font-size:15px!important;color:#444!important}#meedget_block sup{font-size:14px!important}#meedget_block input[id=phone_input]{width:162px!important;text-align:left!important;margin-bottom:0!important}#meedget_block input[type=checkbox],#meedget_block input[type=radio]{display:none!important}.meedget_label_radio label{font-size:16px!important;color:#444!important;cursor:pointer!important;padding:1px 0 2px 22px!important;margin-top:-2px!important;margin-bottom:12px!important;margin-right:25px!important}a.meedget_back_link{font-size:14px!important;background:url(https://meedget.ru/images/back_link_icon.png) left no-repeat!important;text-decoration:none!important;padding-left:17px!important;margin-top:12px!important}a.meedget_next,a.meedget_prev{top:20%!important;z-index:9999!important;padding-left:14px!important;padding-top:20px!important;text-decoration:none!important}a.meedget_next{float:right!important}.meedget_images img{float:left!important;width:150px!important;border:1px solid #e8e9eb!important;border-radius:3px!important;margin:0 0 2px 10px!important}a.meedget_call_link{float:left!important;font-size:14px!important;background:url(https://meedget.ru/images/call_link_icon.png) left no-repeat!important;text-decoration:none!important;padding-left:17px!important}#widget_meedget.meedgetleft a.close_meedget,#widget_meedget.meedgetleft a.open_meedget{background-image:url(https://meedget.ru/images/menu_icon.png)!important;border-left:none!important;border-right:1px solid #e8e9ea!important;float:left!important}a.meedget_close_link{margin-right:20px!important;z-index:999!important}.meedget_spinner{margin:20px auto!important;width:50px!important;height:30px!important;text-align:center!important;font-size:10px!important}.meedget_spinner div{background-color:#444!important;height:100%!important;width:6px!important;display:inline-block!important;-webkit-animation:stretchdelay 1.2s infinite ease-in-out!important;animation:stretchdelay 1.2s infinite ease-in-out!important}.meedget_spinner .meedget_rect2{-webkit-animation-delay:-1.1s!important;animation-delay:-1.1s!important}.meedget_spinner .meedget_rect3{-webkit-animation-delay:-1s!important;animation-delay:-1s!important}.meedget_spinner .meedget_rect4{-webkit-animation-delay:-.9s!important;animation-delay:-.9s!important}.meedget_spinner .meedget_rect5{-webkit-animation-delay:-.8s!important;animation-delay:-.8s!important}@-webkit-keyframes stretchdelay{0%,100%,40%{-webkit-transform:scaleY(.4)}20%{-webkit-transform:scaleY(1)}}@keyframes stretchdelay{0%,100%,40%{transform:scaleY(.4);-webkit-transform:scaleY(.4)}20%{transform:scaleY(1);-webkit-transform:scaleY(1)}}.meedget_copy{float:left!important;border-top:1px solid #e8e9eb!important}#meedget_carousel-wrapper{width:480px!important;position:relative;height:150px}#meedget_carousel-items{width:1000000px;position:relative;left:0}#meedget_block label,.meedget_label_radio label{clear:none!important}#widget_meedget{opacity:.9}#meedget_block a,#meedget_block label,#meedget_block ol,#meedget_block sup,#meedget_block ul,.meedget_copy a,.meedget_copy p,.meedget_label_radio label{font-weight:400!important}#meedget_block p,p.meedget_h2,p.meedget_h3{padding:0!important}#widget_meedget.roundcorner ul>li:first-child{border-top-left-radius:13px}#widget_meedget.roundcorner ul>li:last-child{border-bottom-left-radius:13px}#meedget_block.roundcorner{border-radius:13px}#widget_meedget.roundcorner a.close_meedget{border-bottom-left-radius:10px}#widget_meedget.roundcorner a.open_meedget{border-bottom-left-radius:10px;border-top-left-radius:10px}#widget_meedget.meedgetleft.roundcorner ul>li:first-child{border-top-right-radius:13px!important;border-top-left-radius:0!important}#widget_meedget.meedgetleft.roundcorner ul>li:last-child{border-bottom-right-radius:13px!important;border-bottom-left-radius:0!important}#widget_meedget.meedgetleft.roundcorner a.close_meedget{border-bottom-right-radius:10px!important;border-bottom-left-radius:0!important}#widget_meedget.meedgetleft.roundcorner a.open_meedget{border-radius:0 10px 10px 0!important}#widget_meedget ul>li{text-align:left!important}.meedget_block p,.meedget_copy p{text-align:center!important}#widget_meedget ul>li,#widget_meedget ul>li>a,a.close_meedget,a.meedget_back_link,a.meedget_call_link,a.meedget_next,a.meedget_prev,a.open_meedget{border-bottom-style:none!important}#widget_meedget span{line-height:0!important;padding:0!important;margin:0!important;vertical-align:middle!important}#widget_meedget.meedgetleft a.close_meedget{background-position:17px -317px;padding-left:36px!important}#widget_meedget.meedgetleft a.open_meedget{background-position:7px -344px}a.close_meedget,a.open_meedget{float:right!important;background-color:#fffffe!important;border-left:1px solid #e8e9ea!important;border-bottom:1px solid #e8e9ea!important;background-image:url(https://meedget.ru/images/menu_icon.png);text-decoration:none!important;background-repeat:no-repeat}a.close_meedget{background-position:7px -344px;color:#444;height:23px;font-size:15px;font-weight:400;padding:4px 10px 0 27px!important;margin:-1px 0 0!important}a.open_meedget{line-height:normal!important;background-position:7px -317px;border-top:1px solid #e8e9ea!important;padding:27px 0 0 27px!important;margin:0!important}#widget_meedget ul>li>a{background-image:url(https://meedget.ru/images/menu_icon.png);background-repeat:no-repeat;width:100%!important;color:#444!important;text-decoration:none!important;padding:17px 0 17px 37px!important}#widget_meedget.meedgetwhite ul>li>a{background-image:url(https://meedget.ru/images/menu_icon2.png)!important;background-repeat:no-repeat;color:#FFF!important;padding:17px 0 17px 17px}a.meedget_calc{border-bottom:0!important}a.meedget_online,a.meedget_online1{background-position:0 -54px!important}a.meedget_bonus{background-position:0 -108px!important}a.meedget_gallery{background-position:0 -162px!important}a.meedget_reviews{background-position:0 -216px!important}a.meedget_link,a.meedget_link1{background-position:0 -371px!important}a.meedget_sert{background-position:0 -270px!important}#meedget_block{font-family:Arial;box-shadow:0 0 12px rgba(0,0,0,.2)}#meedget_block input,.meedget_copy p,.meedget_step{font-family:'Open Sans Light','Open Sans',Arial!important}p.h2{font-size:14px!important;line-height:18px!important;padding:0 20px}p.h3{font-size:18px!important;margin:0 0 10px!important}#meedget_block label{line-height:24px;margin-left:10px}#widget_meedget ul>li,a.close_meedget{line-height:normal!important}a.meedget_back_link{margin:12px 0}.meedget_copy{font-size:12px!important;padding:6px 0 0!important}.meedget_copy p{font-size:13px!important;color:#B2B2B2!important;margin-right:40px!important;font-weight:100!important;margin-top:6px!important}a.meedget_close_link{position:absolute!important;right:0!important;background:url(https://meedget.ru/images/close_icon.png) no-repeat!important;padding:25px 25px 0 0!important;margin:0 29px 0 0!important}a.meedget_prev,a.meedget_prev_active{position:absolute!important;left:0!important;padding:47px 16px 0 0!important;margin:80px 0 0 29px!important}a.meedget_prev{background:url(https://meedget.ru/images/meedget_prev.png) no-repeat!important}a.meedget_prev_active{background:url(https://meedget.ru/images/meedget_prev_active.png) no-repeat!important}a.meedget_next,a.meedget_next_active{position:absolute!important;right:0!important;padding:47px 16px 0 0!important;margin:80px 29px 0 0!important}a.meedget_next{background:url(https://meedget.ru/images/meedget_next.png) no-repeat!important}a.meedget_next_active{background:url(https://meedget.ru/images/meedget_next_active.png) no-repeat!important}.meedget_step{height:31px!important;color:#fff!important;font-size:18px!important;font-weight:100!important;background:url(https://meedget.ru/images/meedget_step.png) right no-repeat #003fcd!important;padding:6px 19px 0 85px!important;margin:19px 0 0 -85px!important;width:25%!important;position:relative}.step_arrow{position:absolute!important;right:0;top:0;width:0!important;background:#fff;height:0;border:19px solid transparent;border-left-color:#003fcd;border-right:0}.meedget_block{width:148px!important;margin:15px 14px 0 0!important}#meedget_block input{float:left!important;height:40px!important;color:#b4b4b4!important;font-size:16px!important;font-weight:100!important;border:2px solid #b4b4b4!important;border-radius:3px!important;padding:0 7px!important;margin:25px 17px 0 0}a.meedget_back,button.meedget_step_button{font-size:18px!important;font-weight:100!important}.meedget_block img{float:left!important;max-width:110px!important;max-height:110px!important;margin:0 15px!important;border:1px dotted #003fcd!important;padding:10px;cursor:pointer}.meedget_block input{margin:10px 17px 0 0!important}.meedget_block:last-child,.meedget_block:nth-child(3n){margin:15px 0 0!important}.meedget_copy{width:682px!important;height:32px!important;background:#dedede!important;margin:50px 0 0 -85px!important}#meedget_block input[type=checkbox]+label,#meedget_block input[type=radio]+label{text-align:center!important;padding:50px 0 0!important;width:100%;float:left!important;font-family:'Open Sans Light','Open Sans',Arial!important;cursor:pointer!important}.meedget_copy a{color:#858585!important;text-decoration:underline!important}#meedget_block input[type=checkbox],#meedget_block input[type=radio]{margin-left:59px!important}#meedget_block input[type=checkbox]+label{background:url(https://meedget.ru/images/checkbox_icon.png) no-repeat!important;color:#666!important}#meedget_block input[type=checkbox]:checked+label{color:#003fcd!important;font-family:'Open Sans Light','Open Sans',Arial!important;background:url(https://meedget.ru/images/checkbox_active_icon.png) no-repeat!important}#meedget_block input[type=radio]+label{background:url(https://meedget.ru/images/radio_icon.png) no-repeat!important;color:#666!important}#meedget_block input[type=radio]:checked+label{color:#003fcd!important;font-family:'Open Sans Light','Open Sans',Arial!important;background:url(https://meedget.ru/images/radio_active_icon.png) no-repeat!important}a.meedget_back{float:left!important;color:#444!important;font-family:'Open Sans Light','Open Sans',Arial!important;background:url(https://meedget.ru/images/back_icon.png) left no-repeat!important;padding:0 0 0 17px!important;text-decoration:none!important;margin:35px 17px 0 0!important}button.meedget_calc_next{background-image:none!important}button.meedget_step_button{float:left!important;height:44px!important;background:#003fcd!important;color:#fff!important;font-family:'Open Sans Light','Open Sans',Arial!important;border:none!important;cursor:pointer!important;padding:0 17px!important;margin:50px 0 0!important}@media screen and (max-width:800px){#meedget_block{width:540px!important;padding:23px 25px 0!important;margin:25px auto!important}a.meedget_prev,a.meedget_prev_active{float:left!important;position:absolute!important;padding:47px 16px 0 0!important}a.meedget_prev{background:url(https://meedget.ru/images/meedget_prev.png) no-repeat!important;margin:80px 14px 0 29px!important}a.meedget_prev_active{background:url(https://meedget.ru/images/meedget_prev_active.png) no-repeat;margin:80px 14px 0 0!important}}@media screen and (max-width:580px){#meedget_block{width:380px!important;padding:23px 25px 0!important;margin:25px auto!important}a.meedget_prev,a.meedget_prev_active{float:left!important;position:absolute!important;padding:47px 16px 0 0!important}a.meedget_prev{background:url(https://meedget.ru/images/meedget_prev.png) no-repeat!important;margin:80px 14px 0 29px!important}a.meedget_prev_active{background:url(https://meedget.ru/images/meedget_prev_active.png) no-repeat!important;margin:80px 14px 0 0!important}.meedget_images_block:nth-child(5){display:none!important}}#meedget_popup * {position: initial;}.meedget_step{position: relative !important;}",
		getInitData: function() {
			var _this = this;
			if(this.id > 0) {
				var url = this.url + "/api/MeedgetInit",
					post_data = {
						"meedgetid": this.id
					};
				jMeedQuery.ajax({
					url: url,
					type: "POST",
					data: post_data,
					dataType: "json",
					crossDomain: true,
					xhrFields: {},
					headers: {},
					complete: function(data) {
						data = jMeedQuery.parseJSON(data.responseText);
						if(data.error != null) alert(data.error);
						else if(data.meedget != null) {
							_this.meedgets.bonus = data.meedget.bonus;
							_this.meedgets.calc = data.meedget.calc;
							_this.meedgets.calc1 = data.meedget.calc1;
							_this.meedgets.calc2 = data.meedget.calc2;
							_this.meedgets.calc3 = data.meedget.calc3;
							_this.meedgets.calc4 = data.meedget.calc4;
							_this.meedgets.gallery = data.meedget.gallery;
							_this.meedgets.online = data.meedget.online;
							_this.meedgets.online1 = data.meedget.online1;
							_this.meedgets.reviews = data.meedget.reviews;
							_this.meedgets.sert = data.meedget.sert;
							_this.meedgets.link = data.meedget.link;
							_this.meedgets.link1 = data.meedget.link1;
							_this.meedgets.color = data.meedget.colors.length == 4 ? data.meedget.colors : null;
							_this.meedgets.position = data.meedget.position.length == 2 ? data.meedget.position : null;
							_this.meedgets.names = data.meedget.names;
							_this.meedgets.tariff = data.meedget.tariff;
							_this.meedgets.scroll_on = data.meedget.scroll_on == 1 ? true : false;
							_this.meedgets.analytics_on = data.meedget.analytics_on == 1 ? true : false;
							_this.meedgets.defminify_on = data.meedget.defminify_on == 1 ? true : false;
							_this.meedgets.roundcorners_on = data.meedget.roundcorners_on == 1 ? true : false;
							_this.meedgets.minifymobile_on = data.meedget.minifymobile_on == 1 ? true : false;
							_this.meedgets.link_ref = data.meedget.link_ref != "" ? data.meedget.link_ref : null;
							_this.meedgets.link1_ref = data.meedget.link1_ref != "" ? data.meedget.link1_ref : null;
							_this.mdgLi.calc = _this.mdgLi.calc.replace(/\#/, _this.meedgets.names.calc);
							_this.mdgLi.calc1 = _this.mdgLi.calc1.replace(/\#/, _this.meedgets.names.calc1);
							_this.mdgLi.calc2 = _this.mdgLi.calc2.replace(/\#/, _this.meedgets.names.calc2);
							_this.mdgLi.calc3 = _this.mdgLi.calc3.replace(/\#/, _this.meedgets.names.calc3);
							_this.mdgLi.calc4 = _this.mdgLi.calc4.replace(/\#/, _this.meedgets.names.calc4);
							_this.mdgLi.bonus = _this.mdgLi.bonus.replace(/\#/, _this.meedgets.names.bonus);
							_this.mdgLi.online = _this.mdgLi.online.replace(/\#/, _this.meedgets.names.online);
							_this.mdgLi.online1 = _this.mdgLi.online1.replace(/\#/, _this.meedgets.names.online1);
							_this.mdgLi.reviews = _this.mdgLi.reviews.replace(/\#/, _this.meedgets.names.reviews);
							_this.mdgLi.gallery = _this.mdgLi.gallery.replace(/\#/, _this.meedgets.names.gallery);
							_this.mdgLi.sert = _this.mdgLi.sert.replace(/\#/, _this.meedgets.names.sert);
							if(_this.meedgets.link != null) _this.mdgLi.link = _this.mdgLi.link.replace(/\#\#\#\#/, _this.meedgets.names.link).replace(/\#\#\#/, _this.meedgets.link.target == 1 ? "_blank" : "_self").replace(/\#\#/, _this.meedgets.link.www);
							if(_this.meedgets.link1 != null) _this.mdgLi.link1 = _this.mdgLi.link1.replace(/\#\#\#\#/, _this.meedgets.names.link1).replace(/\#\#\#/, _this.meedgets.link1.target == 1 ? "_blank" : "_self").replace(/\#\#/, _this.meedgets.link1.www);
							_this.calcTPL.TPL = _this.calcTPL.TPL.replace(/\#\#/, _this.meedgets.names.calc);
							_this.calcTPL.phone = _this.calcTPL.phone.replace(/\#\#/, data.meedget.names.calc_result);
							_this.calcTPL1.TPL = _this.calcTPL1.TPL.replace(/\#\#/, _this.meedgets.names.calc1);
							_this.calcTPL1.phone = _this.calcTPL1.phone.replace(/\#\#/, data.meedget.names.calc1_result);
							_this.calcTPL2.TPL = _this.calcTPL2.TPL.replace(/\#\#/, _this.meedgets.names.calc2);
							_this.calcTPL2.phone = _this.calcTPL2.phone.replace(/\#\#/, data.meedget.names.calc2_result);
							_this.calcTPL3.TPL = _this.calcTPL3.TPL.replace(/\#\#/, _this.meedgets.names.calc3);
							_this.calcTPL3.phone = _this.calcTPL3.phone.replace(/\#\#/, data.meedget.names.calc3_result);
							_this.calcTPL4.TPL = _this.calcTPL4.TPL.replace(/\#\#/, _this.meedgets.names.calc4);
							_this.calcTPL4.phone = _this.calcTPL4.phone.replace(/\#\#/, data.meedget.names.calc4_result);
							_this.bonusTPL.TPL = _this.bonusTPL.TPL.replace(/\#\#/, _this.meedgets.names.bonus);
							_this.bonusTPL.bonus = _this.bonusTPL.bonus.replace(/\#\#/, data.meedget.names.bonus_result);
							_this.onlineTPL.TPL = _this.onlineTPL.TPL.replace(/\#\#/, _this.meedgets.names.online);
							_this.onlineTPL1.TPL = _this.onlineTPL1.TPL.replace(/\#\#/, _this.meedgets.names.online1);
							_this.reviewsTPL.TPL = _this.reviewsTPL.TPL.replace(/\#\#/, _this.meedgets.names.reviews);
							_this.reviewsTPL.phone = _this.reviewsTPL.phone.replace(/\#\#/, data.meedget.names.reviews_result);
							_this.galleryTPL.TPL = _this.galleryTPL.TPL.replace(/\#\#/, _this.meedgets.names.gallery);
							_this.galleryTPL.phone = _this.galleryTPL.phone.replace(/\#\#/, data.meedget.names.gallery_result);
							_this.sertTPL.TPL = _this.sertTPL.TPL.replace(/\#\#/, _this.meedgets.names.sert);
							_this.sertTPL.phone = _this.sertTPL.phone.replace(/\#\#/, data.meedget.names.sert_result);
							_this.createHTML();
							_this.insertHTML();
							if(!_this.meedgets.scroll_on) jMeedQuery(".close_meedget").hide();
							if(_this.meedgets.gallery != null || _this.meedgets.reviews != null || _this.meedgets.sert != null) {
								loadJS(MyMeedget.url + "/js/jquery.fancybox.pack.js");
								loadCSS(MyMeedget.url + "/css/jquery.fancybox.css")
							}
							jMeedQuery("a[href=#meedget_calc]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.calc();
								return false
							});
							jMeedQuery("a[href=#meedget_calc2]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.calc1();
								return false
							});
							jMeedQuery("a[href=#meedget_calc3]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.calc2();
								return false
							});
							jMeedQuery("a[href=#meedget_calc4]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.calc3();
								return false
							});
							jMeedQuery("a[href=#meedget_calc5]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.calc4();
								return false
							});
							jMeedQuery("a[href=#meedget_zakaz]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.online();
								return false
							});
							jMeedQuery("a[href=#meedget_zakaz1]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.online1();
								return false
							});
							jMeedQuery("a[href=#meedget_sale]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.bonus();
								return false
							});
							jMeedQuery("a[href=#meedget_works]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.gallery();
								return false
							});
							jMeedQuery("a[href=#meedget_opinions]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.reviews();
								return false
							});
							jMeedQuery("a[href=#meedget_warranty]").off("click").on("click", function(a) {
								a.preventDefault();
								_this.mdgClick.sert();
								return false
							});
							var code = getParameterByName("meedget", window.location.search);
							if(code != "") switch(code) {
								case "calc":
									MyMeedget.mdgClick.calc("last");
									break;
								case "calc1":
									MyMeedget.mdgClick.calc1("last");
									break;
								case "calc2":
									MyMeedget.mdgClick.calc2("last");
									break;
								case "calc3":
									MyMeedget.mdgClick.calc3("last");
									break;
								case "calc4":
									MyMeedget.mdgClick.calc4("last");
									break;
								case "callback":
									MyMeedget.mdgClick.online("last");
									break;
								case "callback1":
									MyMeedget.mdgClick.online1("last");
									break;
								case "sale":
									MyMeedget.mdgClick.bonus("last");
									break;
								case "portfolio":
									MyMeedget.mdgClick.gallery("last");
									break;
								case "sert":
									MyMeedget.mdgClick.sert("last");
									break;
								case "review":
									MyMeedget.mdgClick.reviews("last");
									break
							}
						}
					},
					fail: function() {}
				});
				return
			}
		},
		insertHTML: function() {
			var _this = this,
				_id = _this.id;
			if(_this.meedgetOBJ != null) {
				if(_this.id == 3290) {
					console.log(jMeedQuery(_this.meedgetOBJ)[0].outerHTML);
					jMeedQuery(_this.meedgetOBJ).insertBefore("div#wrapper")
				} else jMeedQuery("body").prepend(_this.meedgetOBJ);
				if(_this.id == 3290) console.log(jMeedQuery("body").html());
				if(_this.meedgets.color != null) {
					var main = "rgb(" + _this.meedgets.color[0] + ")",
						hover = "rgb(" + _this.meedgets.color[1] + ")",
						border = "rgb(" + _this.meedgets.color[2] + ")",
						iswhite = _this.meedgets.color[3],
						_css = MyMeedget.cssTPL,
						str = "rtant;font-weight:700!important;background:#fff!important;border-top:1px solid #e8e9eb!important;b";
					_css = _css.replace(/#777777|#fffffe|#777776/g, main).replace(/#e8e9ec/g, hover).replace(/#e8e9ea/g, border);
					if(iswhite == 1) {
						jMeedQuery("#widget_meedget").addClass("meedgetwhite");
						_css = _css.replace(/#003fcd/g, main)
					} else {
						jMeedQuery("#widget_meedget").removeClass("meedgetwhite");
						_css = _css.replace(/#003fcd/g, "#444")
					}
					jMeedQuery("#meedget-style-element").text(_css)
				}
				if(_this.meedgets.position != null && window.location.href.indexOf("meedget.ru/admpanel") == -1) {
					if(_this.meedgets.position[0] == 0) jMeedQuery("#widget_meedget").removeClass("meedgetleft");
					else jMeedQuery("#widget_meedget").addClass("meedgetleft");
					if(_this.meedgets.position[1] == 1) {
						jMeedQuery("#widget_meedget").addClass("meedgettop");
						jMeedQuery("#widget_meedget").removeClass("meedgetbottom")
					} else if(_this.meedgets.position[1] == 0) {
						jMeedQuery("#widget_meedget").removeClass("meedgettop");
						jMeedQuery("#widget_meedget").removeClass("meedgetbottom")
					} else {
						jMeedQuery("#widget_meedget").removeClass("meedgettop");
						jMeedQuery("#widget_meedget").addClass("meedgetbottom")
					}
				}
				jMeedQuery("#widget_meedget a.close_meedget").on("click", function() {
					jMeedQuery("#widget_meedget ul").hide();
					jMeedQuery("#widget_meedget a.close_meedget").hide();
					jMeedQuery("#widget_meedget a.open_meedget").show();
					if(typeof Cookies != "undefined") Cookies.set("meedstate" + _id, "off")
				});
				jMeedQuery("#widget_meedget a.open_meedget").on("click", function() {
					jMeedQuery("#widget_meedget ul").show();
					jMeedQuery("#widget_meedget a.open_meedget").hide();
					jMeedQuery("#widget_meedget a.close_meedget").show();
					if(typeof Cookies != "undefined") {
						Cookies.remove("meedstate" + _id);
						Cookies.set("meedstate" + _id, "on")
					}
				});
				if(_this.meedgets.roundcorners_on == 1) {
					jMeedQuery("#widget_meedget").addClass("roundcorner");
					jMeedQuery("#meedget_block").addClass("roundcorner")
				}
				if(_this.meedgets.defminify_on == 1 || _this.meedgets.minifymobile_on == 1 && detectmobile()) {
					jMeedQuery("#widget_meedget ul").hide();
					jMeedQuery("#widget_meedget a.close_meedget").hide();
					jMeedQuery("#widget_meedget a.open_meedget").show()
				}
				if(typeof Cookies != "undefined" && Cookies.get("meedstate" + _id) == "off") {
					jMeedQuery("#widget_meedget ul").hide();
					jMeedQuery("#widget_meedget a.close_meedget").hide();
					jMeedQuery("#widget_meedget a.open_meedget").show()
				}
				if(window.location.href.indexOf("meedget.ru/admpanel") != -1) jMeedQuery("#widget_meedget").prepend(jMeedQuery("<div/>", {
					"class": "pre"
				}))
			}
		},
		createHTML: function() {
			var _this = this;
			_this.meedgetOBJ = jMeedQuery(jMeedQuery.parseHTML(_this.meedgetTPL));
			if(_this.meedgets.calc != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.calc);
				_this.meedgetOBJ.find(".meedget_calc").on("click", _this.mdgClick.calc)
			}
			if(_this.meedgets.calc1 != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.calc1);
				_this.meedgetOBJ.find(".meedget_calc1").on("click", _this.mdgClick.calc1)
			}
			if(_this.meedgets.calc2 != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.calc2);
				_this.meedgetOBJ.find(".meedget_calc2").on("click", _this.mdgClick.calc2)
			}
			if(_this.meedgets.calc3 != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.calc3);
				_this.meedgetOBJ.find(".meedget_calc3").on("click", _this.mdgClick.calc3)
			}
			if(_this.meedgets.calc4 != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.calc4);
				_this.meedgetOBJ.find(".meedget_calc4").on("click", _this.mdgClick.calc4)
			}
			if(_this.meedgets.online != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.online);
				_this.meedgetOBJ.find(".meedget_online").on("click", _this.mdgClick.online)
			}
			if(_this.meedgets.online1 != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.online1);
				_this.meedgetOBJ.find(".meedget_online1").on("click", _this.mdgClick.online1)
			}
			if(_this.meedgets.bonus != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.bonus);
				_this.meedgetOBJ.find(".meedget_bonus").on("click", _this.mdgClick.bonus)
			}
			if(_this.meedgets.gallery != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.gallery);
				_this.meedgetOBJ.find(".meedget_gallery").on("click", _this.mdgClick.gallery)
			}
			if(_this.meedgets.reviews != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.reviews);
				_this.meedgetOBJ.find(".meedget_reviews").on("click", _this.mdgClick.reviews)
			}
			if(_this.meedgets.sert != null) {
				_this.meedgetOBJ.find("ul").append(_this.mdgLi.sert);
				_this.meedgetOBJ.find(".meedget_sert").on("click", _this.mdgClick.sert)
			}
			if(_this.meedgets.link != null) _this.meedgetOBJ.find("ul").append(_this.mdgLi.link);
			if(_this.meedgets.link1 != null) _this.meedgetOBJ.find("ul").append(_this.mdgLi.link1);
			if(_this.meedgets.link_ref != null) _this.meedgetOBJ.find(".meedget_copy a").attr("href", "https://meedget.ru/?p=" + _this.meedgets.link_ref);
			if(_this.meedgets.link1_ref != null) _this.meedgetOBJ.find(".meedget_copy a").attr("href", "https://meedget.ru/?p=" + _this.meedgets.link1_ref)
		},
		sendData: function(post_data, callback, param) {
			jMeedQuery.ajax({
				url: MyMeedget.url + "/api/sendData",
				type: "POST",
				data: post_data,
				dataType: "json",
				complete: function(data) {
					data = data.responseJSON;
					if(data.error != null) alert(data.error);
					else callback(param)
				},
				fail: function() {
					alert("\u041e\u0448\u0438\u0431\u043a\u0430")
				}
			})
		},
		init: function(params) {
			this.id = params.id;
			this.user_id = params.user_id;
			loadJS(MyMeedget.url + "/js/jquery.fancybox.pack.js");
			loadCSS(MyMeedget.url + "/css/jquery.fancybox.css");
			this.getInitData()
		}
	};
	document.addEventListener("DOMContentLoaded", function(event) {
		loadJS(MyMeedget.url + "/js/jquery2.js", Meedgetinit);
		var s = document.createElement("style");
		s.id = "meedget-style-element";
		s.innerHTML = MyMeedget.cssTPL;
		document.getElementsByTagName("head")[0].appendChild(s)
	})
};