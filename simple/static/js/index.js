//菜单点击
$(function(){
	$(".sidebar-menu a").on("click", function(){
		//导航菜单展开
	    var href = $(this).data("url");
	    if(href && href!="#"){
	    	//$(".treeview-menu li").removeClass("active");
	    	$(".sidebar-menu li").removeClass("active");
	    	$(this).parents("li").addClass("active");
	    	$(".content-wrapper iframe").attr("src", href);
	    	//sessionStorage.setItem("currentUrl", href);
	    	window.location.hash="#"+href;
	    }
	});
});
//iframe自适应
$(window).on('resize', function() {
	var $content = $('.content');
	$content.height($(this).height() - 130);
	$content.find('iframe').each(function() {
		$(this).height($content.height());
	});
}).resize();

$(window).on('hashchange',function(){
	var hashStr = location.hash.replace("#","");
	}
);

document.onkeydown = function (e) {//键盘按键控制
    e = e || window.event;
    if ((e.ctrlKey && e.keyCode == 82) || //ctrl+R
        e.keyCode == 116) {//F5刷新，禁止
    	event.preventDefault(); //阻止默认刷新  
    	$(".content-wrapper iframe").attr("src", location.hash.replace("#",""));  
    }
}
