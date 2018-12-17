$(function(){
  
//    登陆逻辑代码
    $('.btn-login').on('tap', function() {
        // 2. 获取当前输入用户名 和 密码
        var username = $('.username').val();
        // 3. 验证用户是否输入 没有输入使用mui 确认框提示用户
        if (!username.trim()) {
            // mui.alert('提示内容','提示标题','提示按钮的文字','回调函数可以不加')
            mui.alert('请输入用户名', '温馨提示', '确定');
            return false;
        }
        var password = $('.password').val();
        if (!password.trim()) {
            mui.alert('请输入密码', '温馨提示', '确定');
            return false;
        }
        // 4. 如果输入了 就调用APi请求登录接口
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: { username: username, password: password },
            success: function(data) {
                console.log(data);
                if(data.success){
                 var retrunURL=  getQueryString('retrunURL');
                    location=retrunURL;
                }else{
                    mui.alert( "请输入正确的账号或者密码" );
                }
                
                
          
            }
        });
    });
    // 免费注册跳转
    $('.btn-register').on('tap',function(){
        location="register.html?retrunURL="+location.href;
    })
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        // console.log(r);
        if (r != null) {
            //转码方式改成 decodeURI
            return decodeURI(r[2]);
        }
        return null;
    }
})