$(function () {
    var vCode = "";
    $('.btn-register').on('tap', function() {
        // 1. 定义一个是否验证通过变量 默认为true是通过的
        var check = true;
        // 1.1 获取所有Input输入进行遍历判断
        mui(".mui-input-row input").each(function() {
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        });
        // 判断手机号是否合法
        if (check == true) {
            var mobile = $('.mui-input-row .mobile').val();
            console.log(mobile);
            
            if (!(/^1[34578]\d{9}$/.test(mobile))) {
                mui.toast('您输入的手机号不合法')
                return false;
            }
            // 判断名字是否大于10
            var username = $('.mui-input-row .username').val();
            console.log(username);
            
            if (username.length > 10) {
                mui.toast('您输入的账号过长')
                return false;
            }
            // 判断2次输入的密码是否一样
            var password1 = $('.password1').val();
            var password2 = $('.password2').val();
            console.log(password1, password2);

            if (password1 != password2) {
                mui.toast('您输入的2次密码不一致')
                return false;
            }
            var vcode = $('.vcode').val();
            // 判断2个验证码不一致表示输入错误
            if(vCode != vcode){
            	mui.alert("验证码输入有误!");
                return false;
            }
            $.ajax({
                url: "/user/register",
                type: "post",
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: vCode
                },
                success: function (data) {
                    console.log(data);
                    if(data.success){
                        location="login.html?returnURL=user.html"
                    }else{
                        mui.alert(data.message);
                    }

                }
            })

        }


    })
    $('.mui-input-row .verification').on('tap', function () {
        $.ajax({
            url: "/user/vCode",
            success: function (data) {
                vCode = data.vCode;
                console.log(data, vCode);

            }
        })
    })
})