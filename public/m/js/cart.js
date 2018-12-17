$(function(){
    queryCartPaging();
    function queryCartPaging(){
        $.ajax({
            url:"/cart/queryCartPaging",
            data:{
                page:1,
                pageSize:4
            },
            success:function(data){
                console.log(data);
                if (data.error) {
                    // 跳转到登录页面 同时登录成功回到当前购物车页面
                    location = 'login.html?retrunURL=' + location.href;
            
                }else{
                    console.log(data);
                    
                    if (data instanceof Array) {
                        data = {
                            data: []
                        }
                    }
                    var html=template('cartListTpl',data);
                    $('.mui-table-view').html(html);
                }
            }
        })
    }
  var page=1;
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
                queryCartPaging();
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                mui('#refreshContainer').pullRefresh().refresh(true);
                 page=1;
              },1000)
            }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          },
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
                page++;
                setTimeout(function(){
                    $.ajax({
                        url:"/cart/queryCartPaging",
                        data:{
                            page:page,
                            pageSize:4
                        },
                        success:function(data){
                            if (data.error) {
                                // 跳转到登录页面 同时登录成功回到当前购物车页面
                                location = 'login.html?retrunURL=' + location.href;
                        
                            }else{
                                console.log(data);
                                
                                if (data instanceof Array) {
                                    data = {
                                        data: []
                                    }
                                }
                                if(data.data.length>0){
                                    var html=template('cartListTpl',data);
                                    $('.mui-table-view').append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                }else{
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                              
                            }
                            console.log(data);
                         
                           
                         
                            
                        }
                    })
                },1000)
              
            }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });
})