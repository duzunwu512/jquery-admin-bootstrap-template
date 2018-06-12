var ctx="";
$(function(){
    var table = $('#dataTables-share').DataTable({
    	"fnInitComplete": function(oSettings, json) {//fnInitComplete：datatables初始化完毕后会调用这个方法
    	      $("table tbody tr:first").addClass('selected');//添加一个选中的class
      	},
    	"lengthChange": false, //改变每页显示数据数量
    	"filter": false, //过滤功能
    	"paginate": true, //翻页功能
     	"responsive": false,
     	"serverSide": true,//这个用来指明是通过服务端来取数据
     	"processing": true,
     	"displayLength" : 10,// 每页显示行数
     	"ordering": false,
     	"language": {
     	    "sProcessing":   "处理中...",
     	    "sLengthMenu":   "显示 _MENU_ 项结果",
     	    "sZeroRecords":  "没有匹配结果",
     	    "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
     	    "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
     	    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
     	    "sInfoPostFix":  "",
     	    "sSearch":       "搜索:",
     	    "sUrl":          "",
     	    "sEmptyTable":     "表中数据为空",
     	    "sLoadingRecords": "载入中...",
     	    "sInfoThousands":  ",",
     	    "oPaginate": {
     	        "sFirst":    "首页",
     	        "sPrevious": "上页",
     	        "sNext":     "下页",
     	        "sLast":     "末页"
     	    },
     	    "oAria": {
     	        "sSortAscending":  ": 以升序排列此列",
     	        "sSortDescending": ": 以降序排列此列"
     	    }
     	},
     	"ajax": { url : "/share/shareList"
     		, "order":[[0, 'desc']]
     		, data: function(d) {
     			d.name = $("#share-name").val();
     			d.startDate = $("#start-date").val();
     			d.endDate = $("#end-date").val();
     			d.push = $("#search-btn-push").val();
     			d.published = $("#search-btn-published").val();
     			d.label = $("#search-btn-label").val();
     			d.seq = $("#search-btn-seq").val();
     			d.type = 1;
     		   }
     		 , type: 'POST'},
     	"columns": [
		     { "data": "name",
		    	 "sClass": "left",
		    	 "orderable": false
			 },
			 { "data": "published",
				"sClass": "td-center",
				"orderable": false,
				"render": function(data, type, full, meta) {
					var html="";
					 if(data){
						 html += "<a href='javascript:void(0);' class='unpublishBtn' data-toggle='confirmation-singleton' data-placement='left' data-flag='"+full.id+"' title='点击更改为未发布'><i class='fa fa-check-circle fa-fw text-success' style='font-size:20px;'></i></a>"; 
					 }else{
						html += "<i class='fa fa-question-circle fa-fw text-info' style='font-size:20px;'></i>"; 
					 }
					 
					 if(full.push){
						 html += "<i class='fa fa-download fa-fw text-success' title='已推送' style='font-size:20px;'></i>";
					 }
					 return html;
				 }
			 },
			 { "data": "label",
				 "sClass": "td-center",
				 "orderable": false,
				 "render": function(data, type, full, meta) {
					 if(data==1){
						return "<span class='btn btn-primary btn-xs disabled'>荐</span>"; 
					 }else if(data==2){
						return "<span class='btn btn-danger btn-xs disabled'>热</span>"; 
					 }else if(data==3){
						return "<span class='btn btn-success btn-xs disabled'>广告</span>"; 
					 }else if(data==4){
						return "<span class='btn btn-warning btn-xs disabled'>推广</span>"; 
					 }
					 return "";
				 }
			 },
			 { "data": "seq",
				 "sClass": "td-center",
				 "orderable": false
			 },
			 { "data": "createDate",
				 "sClass": "td-center",
				 "orderable": false
			 },
			 { "data": "publishDate",
				 "sClass": "td-center",
				 "orderable": false
			 },
			 { "data": "publisher",
				 "sClass": "td-center",
				 "orderable": false
			 },
			 { "data":null,
				  "sClass": "left",
	 			 "orderable": false,
	 			 "render": function(data, type, full, meta) {
	 				 var html="";
	 				 if(!full.push && full.published){
	 					html += "<a href='javascript:void(0);' class='btn btn-xs btn-primary pushBtn' data-toggle='confirmation-singleton' data-placement='left' data-flag='"+full.id+"'>推送</a>";
	 				 }
	 				 if(!full.del && !full.published ){
	 					html += ' <a href="javascript:void(0);" class="btn btn-danger btn-xs delBtn" data-toggle="confirmation-singleton" data-placement="left" data-flag="'+full.id+'">删除</a> ';
	 					//html += ' <a href="javascript:void(0);" class="btn btn-danger btn-xs editBtn" data-toggle="confirmation-singleton" data-placement="left" data-flag="'+full.id+'">编辑</a> ';
	 				 }
	 				 
	 				 if(full.seq){
	 					html += ' <a href="javascript:void(0);" class="btn btn-danger btn-xs seqclearBtn" data-toggle="confirmation-singleton" data-placement="left" data-flag="'+full.id+'"><i class="fa fa-fw fa-eraser " title="次序清空"></i></a> ';
	 				 }
	 				 return html;
	 			  }
	 	     }
     	]
    });
    
    table.on("draw.dt", function(){
    	//删除
    	$('a.delBtn').confirmation({
    		singleton:true, 
    		title:'确认删除文章吗？',
    		btnOkLabel:"确认",
        	btnCancelLabel:"取消",
    		onConfirm: function(event, element) {
    			var id = $(element).attr("data-flag");
    			$.post(ctx+'/share/delete', {
    				'shareId' : id,
    			}, function(result) {
    				if (result.success) {
    					$.bootstrapGrowl("操作成功!", {type:'success',delay:2000,offset: {from: 'top', amount: 1}});
    					$('#dataTables-share').DataTable().ajax.reload(null, false);
    				} else {
    					$.bootstrapGrowl("操作失败!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    				}
    			}, 'json');
    		},
    		onCancel: function(e, el) {
    		}
    	});  
    	
    	//发布
    	$('a.unpublishBtn').confirmation({
    		singleton:true, 
    		title:'确认撤回发布吗？',
    		btnOkLabel:"确认",
        	btnCancelLabel:"取消",
    		onConfirm: function(event, element) {
    			var id = $(element).attr("data-flag");
    			$.post(ctx+'/share/publish', {
    				'shareId' : id,
    				'published':false
    			}, function(result) {
    				if (result.success) {
    					$.bootstrapGrowl("撤回成功!", {type:'success',delay:2000,offset: {from: 'top', amount: 1}});
    					$('#dataTables-share').DataTable().ajax.reload(null, false);
    				} else {
    					$.bootstrapGrowl("撤回失败!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    				}
    			}, 'json');
    		},
    		onCancel: function(e, el) {
    		}
    	});
    	
    	//推送
    	$('a.pushBtn').confirmation({
    		singleton:true, 
    		title:'确认推送该信息吗？',
    		btnOkLabel:"确认",
        	btnCancelLabel:"取消",
    		onConfirm: function(event, element) {
    			var id = $(element).attr("data-flag");
    			$.post(ctx+'/share/push', {
    				'shareId' : id,
    			}, function(result) {
    				if (result.success) {
    					$.bootstrapGrowl("推送文章成功!", {type:'success',delay:2000,offset: {from: 'top', amount: 1}});
    					$('#dataTables-share').DataTable().ajax.reload(null, false);
    				} else {
    					$.bootstrapGrowl("推送文章失败!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    				}
    			}, 'json');
    		},
    		onCancel: function(e, el) {
    		}
    	});
    	
    	//清空次序
    	$('a.seqclearBtn').confirmation({
    		singleton:true, 
    		title:'确认清空该次序吗？',
    		btnOkLabel:"确认",
    		btnCancelLabel:"取消",
    		onConfirm: function(event, element) {
    			var id = $(element).attr("data-flag");
    			$.post(ctx+'/share/clearseq', {
    				'shareId' : id,
    			}, function(result) {
    				if (result.success) {
    					$.bootstrapGrowl("次序清空成功!", {type:'success',delay:2000,offset: {from: 'top', amount: 1}});
    					$('#dataTables-share').DataTable().ajax.reload(null, false);
    				} else {
    					$.bootstrapGrowl("次序清空失败!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    				}
    			}, 'json');
    		},
    		onCancel: function(e, el) {
    		}
    	});
    });

    
    //编辑
    $('a#editBtn').on("click", function(){
    	var data = table.row(".selected").data();
    	
    	if(!data || !data.id || data.id==''){
    		$.bootstrapGrowl("请选择要编辑的信息!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	}
    	if(data.published){
    		$.bootstrapGrowl("该信息已发布无法编辑!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	};
    	
    	$("#myModal").modal({
    		remote:ctx+"/share/to_add?type=1&shareId="+data.id,
    		toggle:'modal',
    		keyboard: false,
    	});
    });
    
    //发布
    $('a#publishBtn').on("click", function(){
    	var data = table.row(".selected").data();
    	
    	if(!data || !data.id || data.id==''){
    		$.bootstrapGrowl("请选择要发布的信息!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	}
    	if(data.published){
    		$.bootstrapGrowl("该信息已发布!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	};
    	
    	$("#myModal").modal({
    		remote:ctx+"/share/to_publish?shareId="+data.id,
    		toggle:'modal',
    		keyboard: false,
    	});
    });
    
    //查看
    $('a#viewBtn').on("click", function(){
    	var data = table.row(".selected").data();
    	
    	if(!data || !data.id || data.id==''){
    		$.bootstrapGrowl("请选择要查看的信息!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	}
    	
    	$("#myModal").modal({
    		remote:ctx+"/share/to_view?shareId="+data.id,
    		toggle:'modal',
    		keyboard: false,
    	});
    });
    
    //打开设置次序窗口
    $('a#seqBtn').on("click", function(){
    	var data = table.row(".selected").data();
    	
    	if(!data || !data.id || data.id==''){
    		$.bootstrapGrowl("请选择要设置次序的信息!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	}
    	if(!data.published){
    		$.bootstrapGrowl("请先发布该信息后再设置次序!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		return ;
    	};
    	
    	$("#seqModal").modal({
    		toggle:'modal',
    		keyboard: false,
    	}).data("shareid", data.id);
    });
    
    $("#setseqBtn").on("click", function(e){
    	var seq = $("#share_seq").val();
    	if(!seq || seq==''||seq==null){
    		$.bootstrapGrowl("请设置次序的信息!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		$("#share_seq")[0].focus();
    		return ;
    	}
    	
    	if(!seq.match("^[1-9]\\d*$")){
    		$.bootstrapGrowl("请输入数字!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
    		$("#share_seq").val("");
    		$("#share_seq")[0].focus();
    		return ;
    	}
    	
    	$("#seqform").ajaxSubmit({
			type:'post',
			data:{shareId:$("#seqModal").data("shareid")},
			success:function(json){
				if(json.success){
					$.bootstrapGrowl("次序保存成功！", {type:'success',delay:1000,offset: {from: 'top', amount: 1}});
					$('#dataTables-share').DataTable().ajax.reload(null, false);
					$("#seqform").resetForm();
					$("#seqModal").modal("hide");
				}else if(json.error){
					$.bootstrapGrowl("次序信息保存失败！", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
				}
			}
		});
    	
    });
    
    
    //清除页面缓存
    $( "#myModal").on( "hidden.bs.modal" , function () {
    	$( this ).removeData( "bs.modal" ); 
    });
    
    $( "#seqModal").on( "hidden.bs.modal" , function () {
    	$( this ).removeData( "bs.modal" ); 
    });
    
    $( "#commentModal").on( "hidden.bs.modal" , function () {
    	$( this ).removeData( "bs.modal" ); 
    	$("body").addClass("modal-open");
    	$("#commentform textarea").val("");
    	$("#comment_user").val("");
    	$('#comment_user').change();
    });
    
    
    $("#searchBtn").bind("click", function(){
    	$('#dataTables-share').DataTable().ajax.reload(null, false);
    });
   
	$(".pushStatus").on("click", function(){
		$("#search-btn-push").val($(this).attr("ref"));
		$("#search-btn-group_push span:first").text($(this).text());
	});  
	$(".publishStatus").on("click", function(){
		$("#search-btn-published").val($(this).attr("ref"));
		$("#search-btn-group_published span:first").text($(this).text());
	});  
	$(".labelStatus").on("click", function(){
		$("#search-btn-label").val($(this).attr("ref"));
		$("#search-btn-group_label span:first").text($(this).text());
	});  
	$(".seqStatus").on("click", function(){
		$("#search-btn-seq").val($(this).attr("ref"));
		$("#search-btn-group_seq span:first").text($(this).text());
	});  
	
	//第一次打开评论窗口时，初始化评论人
	$( "#commentModal").on( "show.bs.modal" , function () {
		
		if($("#commentModal").data("inituser")){//已初始化评论人
			return;
		}
		//初始化评论人
		$("#comment_user").select2({
			formatResult : function(object, container, query) {
				var html = "用户名：" + object.text;
				return html;
			},
			allowClear : true,
			enable : true,
			//选中默认选项
			initSelection : function(element, callback) {
				var data = [];
	            data.push({
	            	pid :$('#comment_user').val(),
	            	text :$('#comment_user').val()
	            });
	            callback(data[0]);
			},
			query : function(options) { //search
				var realParams = {
					length : 5, //默认每次显示5条记录
					start : options.page,
					"username" : options.term,
					"sysuser" : 1
				};
				$.ajax({
					url : ctx+"/usr/sysuser",
					dataType : "json",
					type : "POST",
					data : realParams,
					success : function(data) {
						if (data.success) {
							options.callback(data.json);
						} else {
							options.callback({
								results : []
							});
						}
					}
				});
			}
		}).on('select2-selected', function(e) { //fire when selected the option
			var text = e.choice.text;
			$("#comment_user").val(text);
		});
		
		$("#commentModal").data("inituser", true);
    });
	
	
	$("#comment-submit").on("click", function(){
		
		if($("#comment_user").val()==''){
			$.bootstrapGrowl("请选择评论人！", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
			return;
		}
		if($("#commentform textarea").val()==''){
			$.bootstrapGrowl("请输入评论内容！", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
			return;
		}
		
		var shareId = $("#commentModal").data("shareid")
		$("#commentform").ajaxSubmit({
			type:'post',
			data:{shareId:shareId},
			success:function(json){
				if(json.success){
					$.bootstrapGrowl("评论保存成功！", {type:'success',delay:1000,offset: {from: 'top', amount: 1}});
					
					//重新加载评论！
					reloadcmt(shareId, true);
					
					$("#commentform").resetForm();
					$("#commentModal").modal("hide");
				}else if(json.error){
					$.bootstrapGrowl("评论信息保存失败！", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
				}
			}
		});
	});
    
	
    $("#dataTables-share tbody").on('click', 'tr', function() {
        if($(this).hasClass("selected")) {
        	$(this).removeClass("selected");
        } else {
            table.$("tr.selected").removeClass("selected");
            $(this).addClass("selected");
        }
        var evaluateId = table.row(this).data().id;
        /*$('#editBtn').attr('href',''+ctx+'/share/to_add?type=1&shareId='+evaluateId+'');*/
    });
    
    //upload image
    $(document).on("click", "#fileuploadIcon", function(){
	    $('#fileuploadIcon').fileupload({
	    	dataType: 'json',
	    	acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	    	maxFileSize: 2097152,// 2 MB
	    	done: function (e, data) {
	    		$("div.progress").hide();
	    		var url = data.result[0].name;
	    		if(!url || url==null || url=="null" || url==""){
	    			return;
	    		}
	    		
	    		var html = "<div class='product-img'>" +
	    		"<img src='"+data.result[0].name+"'/>"+
	    		"<i class='fa fa-times-circle itrue-close' onclick='$(this).parent().remove();'></i>" +
	    		"</div>";
	    		$("#files").append(html);
	    		
	    	},
	    	progressall: function (e, data) {
	    		var progress = parseInt(data.loaded / data.total * 100, 10);
	    		$("div.progress-bar").css('width', progress + '%' );
	    	}
	    }).on('fileuploadprocessalways', function (e, data) {
	    	if(data.files.error){
	    		if(data.files[0].error=='acceptFileTypes' || data.files[0].error=='File type not allowed'){
	    			$.bootstrapGrowl("图片格式不对，请上传正确的格式!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
	    		}
	    		if(data.files[0].error=='maxFileSize'|| data.files[0].error=='File is too large'){
	    			$.bootstrapGrowl("图片太大，请上传小于2M的图片!", {type:'danger',delay:3000,offset: {from: 'top', amount: 1}});
	    		}
	    	} 
	    })
	    .prop('disabled', !$.support.fileInput)
	    .parent().addClass($.support.fileInput ? undefined : 'disabled')
	    .bind('fileuploadstart', function (e) {
	    	$("div.progress-bar").width(0);
	    	$("div.progress").show();
	    });
    });
    
    //保存
    $(document).on('click', '#saveBtn', function() {
    	$("#saveShareform").data("save", "save");
    	$("#saveShareform").bootstrapValidator('validate');
	});
    
    $(document).on('click', '#saveNewBtn', function() {
    	$("#saveShareform").data("save", "saveNew");
    	$("#saveShareform").bootstrapValidator('validate');
    });
    
	 
});

function reloadcmt(shareId, renew){
	var length = 0;
	if(renew){
		length = 0;
	}else{
		length = $("#content-comment ul li").length;
	}
	
	$.post(ctx+'/share/cmtlist', {
		'start' : length,
		'length': 10,
		'shareId': shareId
	}, function(result) {
		if (result.success) {
			
			if(renew){
				$("#content-comment ul").empty();
			}
			
			var template;
			var data = result.data;
			for(var i=0; i<data.length; i++){
				template = $("#share-detail-comment").clone().removeAttr("id");
				template.find(".pull-left img").attr("src", data[i].avatar==null || data[i].avatar==''||!data[i].avatar?ctx+"/static/itrue/img/default_round_head.png":data[i].avatar);
				template.find(".name").text(data[i].userName);
				template.find(".name").next().text(data[i].createDate);
				template.find(".comment-content").text(data[i].comment);
				template.find(".comment-zan").text(data[i].agreeCount);
				template.attr("username", data[i].userName);
				template.find(".comment-zan-btn").attr("ref", data[i].id);
				$("#content-comment ul").append(template.show());
			}
			
			length = $("#content-comment ul li").length;
			if(length == result.recordsTotal){
				$("#more-comment-btn").parent().hide();
			}
		} else {
			$.bootstrapGrowl("评论获取失败!", {type:'danger',delay:5000,offset: {from: 'top', amount: 1}});
		}
	}, 'json');
}