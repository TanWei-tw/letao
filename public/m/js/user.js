$(function(){
    // 渲染页面
    $.ajax({
        url:"/user/queryUserMessage",
        success:function(data){
            console.log(data);
            $('.mui-media-body .usernam').html(data.username);
            $('.mui-media-body .mobile').html(data.mobile);
        }
    })
    // 退出回到登陆页面
    $('.btn-login').on('tap',function(){
        $.ajax({
            url:"/user/logout",
            success:function(data){
                console.log(data);
                if(data.success){
                    location="login.html?retrunURL="+location.href;
                }
                
            }
        })
    })
})