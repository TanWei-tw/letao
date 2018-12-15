$(function () {
  var search = getQueryString(search);
  // 初始化调用
  queryProduct();
  // 请求数据函数
  function queryProduct() {
    $.ajax({
      url: "/product/queryProduct",
      data: {
        page: 1,
        pageSize: 4,
        proName: search
      },
      success: function (data) {
        console.log(data);
        var html = template('queryProductTpl', data);
        $('.product-box ul').html(html);
      }
    })
  }
  // 当前页面点击搜索页面内容调用函数
  $('.form-search .btn-search').on('tap', function () {
    search = $('.form-search .input-search').val();
    queryProduct();
  })
  // 点击切换搜索排行
  $('.title ul li a').on('tap', function () {
    sort = $(this).data('sort');
    ranking = $(this).data('sort-type');
    console.log(sort, ranking);
    sort = sort == 1 ? 2 : 1;
    $(this).data('sort', sort);
    params = {
        page: 1,
        pageSize: 4,
        proName: search
      },
      // 往数组里面添加排序类型的元素
      params[ranking]=sort;
      console.log(params);
      
      $.ajax({
        url: "/product/queryProduct",
        data:params ,
        success: function (data) {
          console.log(data);
          var html = template('queryProductTpl', data);
          $('.product-box ul').html(html);
        }
      })

  })
  // 下拉刷新
  
// 获取url上的值
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  }
  var page=1;
  // 向上拉下拉
  mui.init({
    pullRefresh : {
      container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
         
          setTimeout(function(){
            queryProduct();

            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
            // 结束加载有BUG百度
            mui('#refreshContainer').pullRefresh().refresh(true);
            // 重置上拉加载
            page=1;
           
          },1000)
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      up : {
        height:50,//可选.默认50.触发上拉加载拖动距离
        auto:true,//可选,默认false.自动上拉加载一次
        contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback :function(){
          setTimeout(function(){
            $.ajax({
              url: "/product/queryProduct",
              data: {
                page: page++,
                pageSize: 4,
                proName: search
              },
              success: function (data) {
                console.log(data);
                if(data.data.length>0){
                  var html = template('queryProductTpl', data);
                  $('.product-box ul').append(html);
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                }else{
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                }
                }
              
            })
           
          },1000)
        }
      }
    }
    
  });
  // 获取购买的ID给所有立即购买点击事件
  $('.product-box').on('tap','.btn-buy',function(){
    var id=$(this).data('id')
    console.log(id);
    location = 'detail.html?id='+id;
    
  })
 
})