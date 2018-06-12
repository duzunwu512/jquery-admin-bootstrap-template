	$.mockjax({
          url: '/share/shareList',
          contentType: 'text/json',
          responseTime:100,
          responseText: {
            "msg":"success",
  			"draw": 1,
  			"recordsTotal": 57,
  			"recordsFiltered": 57,
  			"data": [
			    {
			      "name": "Airi",
			      "published": "Satou",
			      "label": "1",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "name": "Airi",
			      "published": "Satou",
			      "label": "1",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "name": "Airi",
			      "published": "Satou",
			      "label": "1",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "name": "Airi",
			      "published": "Satou",
			      "label": "1",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    }
			  ],
			"code":0,
          }
        });

	$.mockjax({
          url: '/sys/menu/tree',
          contentType: 'text/json',
          responseTime:100,
          responseText: {
            "msg":"success",
  			"draw": 1,
  			"recordsTotal": 57,
  			"recordsFiltered": 57,
  			"menuList": [
			    {
			      "id": "1",
			      "parentId": "",
			      "name": "NAME1",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "id": "2",
			      "parentId": "1",
			      "name": "NAME2",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "id": "3",
			      "parentId": "1",
			      "name": "NAME3",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "id": "4",
			      "parentId": "",
			      "name": "NAME4",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "id": "5",
			      "parentId": "4",
			      "name": "NAME5",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    },
			    {
			      "id": "6",
			      "parentId": "4",
			      "name": "NAME6",
			      "seq": "1",
			      "createDate": "28th Nov 08",
			      "publishDate": "28th Nov 08",
			      "publisher":"dddddddd",
			    }
			  ],
			"code":0,
          }
        });

