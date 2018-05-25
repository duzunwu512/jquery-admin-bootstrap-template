/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
$(function () {
  'use strict'
  
  loadPage("/bsky1.html?"+Math.random(), ".content-wrapper");
    $("a[data-url]").click(function(evt){
        loadPage($(this).data("url")+"?"+Math.random(), ".content-wrapper");
        $("ul.treeview-menu li").removeClass("active");
        $(this).parent().addClass("active");
    });
  
  $(".footer-tools").on("click", function(e){
		jQuery('html, body').animate({
                    scrollTop: 0
                }, 'slow');
		e.preventDefault();
  });
  
})

$.ajaxSetup ({ 
      cache: false //关闭AJAX相应的缓存 
  });
var basePath="";
function loadPage(url, container) {
    if (!container)
        container = "#mainDiv";
    if (!url.startWith(basePath))
        url = basePath + url;
	blockUI(container, false);
    jQuery(container).load(url, function (response, status, xhr) {
		unblockUI(container);
		console.log(response);
        if (status == "success") {
            if (response) {
                try {
                    var result = jQuery.parseJSON(response);
                    if (result.code == 100) {
                        jQuery(container).html("");
                    }
                } catch (e) {
                    return response;
                }
            }
        }
    });
}

/**
 * Load a url into a page
 * 增加beforeSend以便拦截器在将该请求识别为非ajax请求
 */
var _old_load = jQuery.fn.load;
jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== "string" && _old_load) {
        return _old_load.apply(this, arguments);
    }

    var selector, type, response,
        self = this,
        off = url.indexOf(" ");
    if (off > -1) {
        selector = jQuery.trim(url.slice(off));
        url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
        callback = params;
        params = undefined;
    } else if (params && typeof params === "object") {
        type = "POST";
    }
    if (self.length > 0) {
        jQuery.ajaxSetup({cache:true});
        jQuery.ajax({
            url: url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Requested-With', {
                    toString: function () {
                        return '';
                    }
                });
            },
            type: type || "GET",
            dataType: "html",
            data: params
        }).done(function (responseText) {
            //console.log(responseText);
            response = arguments;
            //页面超时跳转到首页
            if (responseText.startWith("<!--login_page_identity-->")) {
                window.location.href = basePath + "/";
            } else {
                self.html(selector ?
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                    responseText);
            }
        }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
    }

    return this;
};

String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}

function blockUI (el, centerY) {
    var el = jQuery(el); 
    el.block({
		message: '<img src="dist/js/ajax-loading.gif" align="">',
		centerY: centerY != undefined ? centerY : true,
		css: {
			top: '20%',
			border: 'none',
			padding: '2px',
			backgroundColor: 'none'
		},
        overlayCSS: {
            backgroundColor: '#4f4f4f',
            opacity: 0.2,
            cursor: 'wait'
        },
        fadeIn:3000
    });
}

        // wrapper function to  un-block element(finish loading)
function unblockUI(el) {
    jQuery(el).unblock({
            onUnblock: function () {
                jQuery(el).removeAttr("style");
            }
        });
}
		
		