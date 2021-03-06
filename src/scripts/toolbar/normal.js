/**
 * [description]
 * 工具栏具体点击事件
 * sort排序筛选项，地址选择，分页按钮-异步获取商品
 * 价格区间，在结果中搜索，特殊活动-跳转新页面
 * 初始化设置，特殊活动是否勾选，分页按钮置灰
 */
define(function(require,exports,module){
    /**
     * sort排序点击事件，使用function.getGoods模块获取商品
     * 【一】价格按钮前置绑定一次事件，设置价格高→低，低→高状态，修改本身sort值
     * 【二】绑定通用事件，修改pageData.sort，重置pageData.currentPage为1
     */
    $('#sort-price').bind('click', function (event) {
        if(!pageData.ajaxStatus){
            var _this = $(this);
            if(_this.attr('data-sort') === "21"){
                _this.attr('data-sort',"20").removeClass("price-down").addClass("price-up");
            }else{
                _this.attr('data-sort',"21").removeClass("price-up").addClass("price-down");
            }
        }
    });
	$('#filter-order-box li').bind('click', function (event) {
        var _this = $(this),
            sort_target = _this.attr('data-sort');
        if(pageData.sort !== sort_target && !pageData.ajaxStatus){
            pageData.ajaxStatus = true;
            _this.addClass('cur').siblings('.cur').removeClass('cur');
            pageData.sort = sort_target;
            pageData.currentPage=1;

            require('../function/getGoods').getGoods();
        }
    }).find('a').click(function (event) {
        event.preventDefault();
    });
    /**
     * 分页点击事件，仅修改pageData.currentPage，使用function.getGoods模块获取商品
     * 【一】下一页
     * 【二】上一页
     */
    $("#mp-next").bind('click', function (event) {
        event.preventDefault();
        if(pageData.currentPage >= pageData.totalPage || pageData.ajaxStatus){
            return false;
        }else{
            pageData.ajaxStatus = true
        }
        pageData.currentPage++;

        require('../function/getGoods').getGoods();
    });
    $("#mp-prev").bind('click', function (event) {
        event.preventDefault();
        if(pageData.currentPage == 1 || pageData.ajaxStatus){
            return false;
        }else{
            pageData.ajaxStatus = true
        }
        pageData.currentPage--;
        require('../function/getGoods').getGoods();
    });
    /**
     * 特殊活动筛选
     * 【一】初始换筛选标签是否勾选
     * 【二】绑定点击事件，调用function.makeHelf模块处理跳转地址*/
    (function(){
        var url = window.location.href;
        if(url.indexOf("promoFlag=1") > 0 || url.split("-")[10] == 1){
            $("#specialScreening").addClass("checke");
        }
    })();
    $("#specialScreening").bind("click",function(){
        if($(this).hasClass("checke")){
            promoFlagVal = 0;
        }else{
            promoFlagVal = 1;
        }
        require('../function/makeHelf').dofacet('promoFlag',promoFlagVal);
    })
});