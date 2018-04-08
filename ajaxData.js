  var lang = {
      "sProcessing": "处理中...",
      "sLengthMenu": "每页 _MENU_ 条记录",
      "sZeroRecords": "没有匹配结果",
      "sInfo": "当前显示第 _START_ 至第 _END_ 条记录，共 _TOTAL_ 条记录。",
      "sInfoEmpty": "当前显示第 0 至 0 条记录，共 0 条记录",
      "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
      "sInfoPostFix": "",
      "sSearch": "搜索:",
      "sUrl": "",
      "sEmptyTable": "表中数据为空",
      "sLoadingRecords": "载入中...",
      "sInfoThousands": ",",
      "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页",
          "sJump": "跳转"
      },
      "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
      }
  };

  myTable = $('#mainTable').dataTable({
      language: lang, //中文提示  
      //"lengthChange": false,//不让用户选择每页item数量  
      "aLengthMenu": [
          [7, 25, 50, -1],
          [7, 25, 50, "全部"]
      ], //让用户选择页面记录数量  
      "iDisplayLength": 7, //默认页面中的记录数量。  
      "bFilter": true, //过滤功能  
      //"bSort": false, //禁用排序  
      "aoColumnDefs": [{ "bSortable": false, "aTargets": [0] }], //设置第一列不可排序  
      //"aaSorting": [[ 0, "desc" ]], //设置第一列默认降序  
      "serverSide": true, //服务端进行分页处理  
      "ajax": {
          data: function(d) {
              console.log('custom request');
              //默认会有  
              //start，表示要从第几行记录开始显示，例如0表示要取第一行记录开始的页面。  
              //length，表示要取的记录数量，即页面大小。  
              //[order][0][column]参数为0表示第一列，1表示第二列，[order][0][dir]参数为asc，表示要求服务端返回所指向列升序的表。  
              //接住Shift可以选择多列排序，会添加下面的键值对请求  
              //[order][1][column]参数为2表示第三列，3表示第四列，[order][1][dir]参数为asc，表示要求服务端返回所指向列升序的表。  
              //达到多列排序的目的。  
              //search[regex]的默认值为"false"，search[value]里存放的是待搜索字符串，如果没有东西要Search则里面是空字符串。  
              return $.extend({}, d, {
                  'data': '{}' //自己增加个data请求参数  
              })
          },
          dataSrc: function(json) {
              console.log('process response data from server side before display.');
              return json.data;
          },
          url: "./data.json",
          type: "POST",
          crossDomain: true
      },
      columns: [
          { "data": "idWarningInfo", "width": 24 }, //这里的宽度指的是尽可能小的宽度  
          {
              "data": "warningType",
              render: function(data, type, row) {
                  if (data == '0') {
                      return "<span class=\"label label-sm label-warning\">入侵</span>";
                  } else if (data == '1') {
                      return "<span class=\"label label-sm label-danger\">设备故障</span>";
                  } else if (data == '2') {
                      return "设备离线";
                  }
                  return '未知';
              },
              "width": 96
          },
          { "data": "eventTime" },
          { "data": "StaffName", "width": 32 }
      ]
  });


  $('#mainTable tbody').on('click', 'tr', function() {
      if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
      } else {
          myTable.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');

          //取选中行的信息  
          var aData = myTable.fnGetData(this); // get datarow  
          if (null != aData) // null if we clicked on title row  
          {
              console.log(aData.idWarningInfo);
          }
      }
  });