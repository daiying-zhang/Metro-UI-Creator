/**
 * User: dying-zhang
 * Date: 5/18/13
 * Time: 4:31 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
/**
 * User: dying-zhang
 * Date: 5/17/13
 * Time: 10:36 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.fn.mTab = function(){
        return this.each(function(){
            new Tab($(this));
        })
    }

    function Tab(ele){

        this._id = ele.attr('data-id');
        this._con = $('.tab-content[data-id="'+this._id+'"]');
        this._trigger = ele.children('.trigger');

        var _this = this;
        function init(){
            _this._show(ele.children('.active').index());
            ele.bind('click.maccordion',function(e){
                var $ele = $(e.target);
                if($ele.is('.trigger')){
                    _this._show($ele.index());
                }
                e.stopPropagation();
                return false
            })
        }
        init();

    }
    Tab.prototype._show = function(index){
        this._trigger.removeClass('active').eq(index).addClass('active');
        this._con.children('.tab-item').hide().eq(index).show();
    }
    $('[data-role="m-tab"]').mTab();
})(jQuery);