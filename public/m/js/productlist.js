$(function(){
    var search=decodeURI(location.search.split('=')[1]);
    $.ajax({
  url:"/product/queryProduct",
  data:{
      page:1,
      pageSize:4,
      proName:search
  },
  success:function(data){
    console.log(data);
    var html=template('queryProductTpl' ,data);
    $('.product-box ul').html(html);
    
  }
  

    })
    
})