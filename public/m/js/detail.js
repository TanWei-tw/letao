$(function() {

    var id = getQueryString('id');
    // 2. 请求API获取数据 传入当前id参数
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: id },
        success: function(data) {
            // 3. 这个返回数据data.size尺码是字符串 40-50字符串 把字符串转成数组
            // 3.1  拿到当前字符串最小值
            var min = data.size.split('-')[0] - 0;
            // 3.2  拿到当前字符串最小值
            var max = data.size.split('-')[1];
            // 3.4 把data.size赋值为空数组
            data.size = [];
            // 3.5 循环从最小开始到最大结束
            for (var i = min; i <= max; i++) {
                // 3.6 把循环的每个都添加到数组里面
                data.size.push(i);
            }
            console.log(data);
            // 4. 调用商品详情的模板生成html
            var html = template('productDetailTpl', data);
            $('#productDetail').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 
            });
            mui('.mui-slider').slider({
            });
            mui('.mui-numbox').numbox();
            $('.btn-size').on('tap', function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }
    });

   
    // 1. 给加入购车按钮添加点击事件
    $('.btn-add-cart').on('tap', function() {
        // 2. 获取当前选择尺码和数量信息
        var size = $('.btn-size.active').data('size');
        console.log(size);
        
        // 3. 判断如果尺码没有选择 提示用户选择尺码
        if (!size) {
            // toast 消息提示框 提示用户选择尺码 第一个参数 提示内容 第二个参数提示配置项
            mui.toast('请选择尺码！', { duration: 3000, type: 'div' });
            return false;
        }
        // 4. 获取当前选择的数量
        var num = mui('.mui-numbox').numbox().getValue();
        // 5. 判断是否选择了数量
        if (!num) {
            mui.toast('请选择数量！', { duration: 3000, type: 'div' });
            return false;
        }
        // 6. 调用加入购物车的API去加入购车
        $.ajax({
        		url:'/cart/addCart',
        		type:'post',//提交数据 都是post
        		// 注意API文档要求参数productId 但是我们的变量名是id
        		data:{productId:id,size:size,num:num},
        		success:function (data) {
                    console.log(data);
                    
        			if(data.success){
        				mui.confirm('加入购物车成功！ 是否要去购物车查看?', 'hello 单身狗', ['去看','发呆','不看'], function(e){
        					// 获取当前用户点击了左边的还是右边
        					console.log(e);
        					if(e.index == 0){
        					}else{
        						mui.toast('你继续加一件就可以脱离单身了！', { duration: 3000, type: 'div' });
        					}
        				});
        			}
        		}
        })
    });

    // 根据url参数名取值
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
