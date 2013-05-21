/**
 * User: dying-zhang
 * Date: 5/17/13
 * Time: 10:36 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.fn.mAccordion = function(settings){
        var defaults = {
                speed: 150
            }/*,
            KEY_NAME = 'maccordion',
            obj = this.data(KEY_NAME);*/

        /*if(settings === 'getObject'){
            if(obj){
                return obj //TileSlider实例对象
            }else{
                throw new Error('This object is not availbale!');
            }
        }*/

        return this.each(function(){
            var opt = $.extend({},defaults,settings);
            new Accordion($(this),opt);
            /*$(this).data(KEY_NAME,new Accordion($(this),opt));*/
        })
    }

    function Accordion(ele,settings){
        this.obj = ele;
        this.settings = settings;

        var _this = ele;
        function init(){
            ele.bind('click.maccordion',function(e){
                var $ele = $(e.target), //被点击的元素
                    par = $ele.parent('.acc-item'), //被点击元素的父元素
                    curr = ele.find('.active'); //当前展开的元素
                if(par.hasClass('active')) return false; //当前的元素已经展开
                if($ele.is('.acc-item>a')){
                    //首先关闭当前展开的元素
                    curr.children('div').slideUp(settings.speed,function(){
                        curr.removeClass('active')
                    });

                    par.addClass('active').children('div').slideDown(settings.speed);
                    //e.stopPropagation();
                }
                return false
            })
        }

        init();
    }
    $('[data-role="m-accordion"]').mAccordion();
})(jQuery);