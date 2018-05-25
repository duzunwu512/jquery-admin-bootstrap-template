    $.mockjax({
          url: 'sys/login',
          contentType: 'text/json',
          responseTime:500,
          dataType: "json",
          responseText: {"code":"0", "msg":"success", "token":"000111111000"}          
        });

    $.mockjax({
          url: 'sys/menu/nav',
          contentType: 'text/json',
          responseTime:500,
          responseText: {
            "msg":"success",
			"menuList":[
				{"menuId":1,"parentId":0,"parentName":null,"name":"系统管理","url":null,"perms":null,"type":0,"icon":"fa fa-cog","orderNum":0,"open":null,
					"list":[{"menuId":2,"parentId":1,"parentName":null,"name":"管理员列表","url":"modules/sys/user.html","perms":null,"type":1,"icon":"fa fa-user","orderNum":1,"open":null,"list":null},
					{"menuId":3,"parentId":1,"parentName":null,"name":"角色管理","url":"modules/sys/role.html","perms":null,"type":1,"icon":"fa fa-user-secret","orderNum":2,"open":null,"list":null},
					{"menuId":4,"parentId":1,"parentName":null,"name":"菜单管理","url":"modules/sys/menu.html","perms":null,"type":1,"icon":"fa fa-th-list","orderNum":3,"open":null,"list":null},
					{"menuId":5,"parentId":1,"parentName":null,"name":"SQL监控","url":"druid/sql.html","perms":null,"type":1,"icon":"fa fa-bug","orderNum":4,"open":null,"list":null},
					{"menuId":6,"parentId":1,"parentName":null,"name":"定时任务","url":"modules/job/schedule.html","perms":null,"type":1,"icon":"fa fa-tasks","orderNum":5,"open":null,"list":null},
					{"menuId":27,"parentId":1,"parentName":null,"name":"参数管理","url":"modules/sys/config.html","perms":"sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete","type":1,"icon":"fa fa-sun-o","orderNum":6,"open":null,"list":null},
					{"menuId":30,"parentId":1,"parentName":null,"name":"文件上传","url":"modules/oss/oss.html","perms":"sys:oss:all","type":1,"icon":"fa fa-file-image-o","orderNum":6,"open":null,"list":null},
					{"menuId":29,"parentId":1,"parentName":null,"name":"系统日志","url":"modules/sys/log.html","perms":"sys:log:list","type":1,"icon":"fa fa-file-text-o","orderNum":7,"open":null,"list":null}
					]
				},
				{"menuId":11,"parentId":0,"parentName":null,"name":"系统管理1","url":null,"perms":null,"type":0,"icon":"fa fa-cog","orderNum":0,"open":null,
					"list":[{"menuId":12,"parentId":11,"parentName":null,"name":"管理员列表1","url":"modules/sys/user1.html","perms":null,"type":1,"icon":"fa fa-user","orderNum":1,"open":null,"list":null},
					{"menuId":13,"parentId":11,"parentName":null,"name":"角色管理1","url":"modules/sys/role1.html","perms":null,"type":1,"icon":"fa fa-user-secret","orderNum":2,"open":null,"list":null},
					{"menuId":14,"parentId":11,"parentName":null,"name":"菜单管理1","url":"modules/sys/menu1.html","perms":null,"type":0,"icon":"fa fa-th-list","orderNum":3,"open":null,
						"list":[
						{"menuId":121,"parentId":14,"parentName":null,"name":"管理员列表11","url":"modules/sys/user11.html","perms":null,"type":1,"icon":"fa fa-user","orderNum":1,"open":null,"list":null},
						{"menuId":131,"parentId":14,"parentName":null,"name":"角色管理11","url":"modules/sys/role11.html","perms":null,"type":1,"icon":"fa fa-user-secret","orderNum":2,"open":null,"list":null},
						{"menuId":141,"parentId":14,"parentName":null,"name":"菜单管理11","url":"modules/sys/menu11.html","perms":null,"type":1,"icon":"fa fa-th-list","orderNum":3,"open":null,"list":null},
						{"menuId":151,"parentId":14,"parentName":null,"name":"SQL监控11","url":"druid/sql11.html","perms":null,"type":1,"icon":"fa fa-bug","orderNum":4,"open":null,"list":null},
						{"menuId":161,"parentId":14,"parentName":null,"name":"定时任务11","url":"modules/job/schedule11.html","perms":null,"type":1,"icon":"fa fa-tasks","orderNum":5,"open":null,"list":null},
						{"menuId":1271,"parentId":14,"parentName":null,"name":"参数管理11","url":"modules/sys/config11.html","perms":"sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete","type":1,"icon":"fa fa-sun-o","orderNum":6,"open":null,"list":null},
						{"menuId":1301,"parentId":14,"parentName":null,"name":"文件上传11","url":"modules/oss/oss11.html","perms":"sys:oss:all","type":1,"icon":"fa fa-file-image-o","orderNum":6,"open":null,"list":null},
						{"menuId":1291,"parentId":14,"parentName":null,"name":"系统日志11","url":"modules/sys/log11.html","perms":"sys:log:list","type":1,"icon":"fa fa-file-text-o","orderNum":7,"open":null,"list":null}
						]
					},
					{"menuId":15,"parentId":11,"parentName":null,"name":"SQL监控1","url":"druid/sql1.html","perms":null,"type":1,"icon":"fa fa-bug","orderNum":4,"open":null,"list":null},
					{"menuId":16,"parentId":11,"parentName":null,"name":"定时任务1","url":"modules/job/schedule1.html","perms":null,"type":1,"icon":"fa fa-tasks","orderNum":5,"open":null,"list":null},
					{"menuId":127,"parentId":11,"parentName":null,"name":"参数管理1","url":"modules/sys/config1.html","perms":"sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete","type":1,"icon":"fa fa-sun-o","orderNum":6,"open":null,"list":null},
					{"menuId":130,"parentId":11,"parentName":null,"name":"文件上传1","url":"modules/oss/oss1.html","perms":"sys:oss:all","type":1,"icon":"fa fa-file-image-o","orderNum":6,"open":null,"list":null},
					{"menuId":129,"parentId":11,"parentName":null,"name":"系统日志1","url":"modules/sys/log1.html","perms":"sys:log:list","type":1,"icon":"fa fa-file-text-o","orderNum":7,"open":null,"list":null}
					]
				}],
			"code":0,
			"permissions":["sys:schedule:info","sys:menu:update","sys:menu:delete","sys:config:info","sys:menu:list","sys:config:save","sys:config:update","sys:schedule:resume","sys:user:delete","sys:config:list","sys:user:update","sys:role:list","sys:menu:info","sys:menu:select","sys:schedule:update","sys:schedule:save","sys:role:select","sys:user:list","sys:menu:save","sys:role:save","sys:schedule:log","sys:role:info","sys:schedule:delete","sys:role:update","sys:schedule:list","sys:user:info","sys:schedule:run","sys:config:delete","sys:role:delete","sys:user:save","sys:schedule:pause","sys:oss:all","sys:log:list"]
          }
        });


