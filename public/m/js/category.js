$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });
    $.ajax({
        url:"/category/queryTopCategory",
        dataType:'json',
        success:function(data){
        console.log(data);
        var html=template('categoryLfetTpl',data);
        $('.category-left ul ').html(html);
      
        }
    })
    $('.category-left ul ').on('tap', 'li a',function(){
        var id=$(this).data('id');
        console.log(id);
        querySecondCategory(id);
        $(this).parent().addClass('active').siblings().removeClass('active');
    })
    querySecondCategory(1);
    function querySecondCategory(id){
        $.ajax({
            url:"/category/querySecondCategory",
            data:{id:id},
            success:function(data){
             console.log(data);
             var html=template('categoryRightTpl',data);
             $('.category-right ul').html(html);
             
            }
        })
    }
 

})