$(function () {
    // 1. 添加搜索记录
    $('.btn-search').on('tap', function () {
        // 2. 获取输入框输入的内容
        var search = $('.input-search').val();
        if (!search.trim()) {
            alert('请输入要搜索的商品');
            return;
        }
        // 4. 获取之前本地存储存储的值 如果有值使用默认值 没有值就使用空数组
        var historyData = JSON.parse(localStorage.getItem('searchHistory')) || [];
        console.log(historyData);

        // 5. 往本地存储的数组中添加值
      
        if (historyData.indexOf(search) != -1) {
            historyData.splice(historyData.indexOf(search), 1);
        }
        historyData.unshift(search);
        localStorage.setItem('searchHistory', JSON.stringify(historyData));
        queryHistory();
        location="productlist.html?search="+search;
    });
    queryHistory();
    // 2. 查询搜索记录
    function queryHistory() {
        var historyData = JSON.parse(localStorage.getItem('searchHistory')) || [];
        // 2. 数据是一个数组 模板引擎要求对象 需要包装一下
        historyData = {
            rows: historyData
        };
        console.log(historyData);

        var html = template('searchListTpl', historyData);

        $('.search-history .mui-table-view').html(html);
    }
    $('.search-history .mui-table-view').on('tap', '.btn-delete', function () {
        var index = $(this).data('index');
        var historyData = JSON.parse(localStorage.getItem('searchHistory')) || [];
        historyData.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(historyData));

        queryHistory();
    });
    // 4. 清空搜索记录
    // 1. 给清空按钮添加点击事件
    $('.btn-clear').on('tap', function () {
        // 2. 删除整个searchHistory的键
        localStorage.removeItem('searchHistory');
        // 3. 清空之后重新调用查询刷新页面
        queryHistory();
    });
});