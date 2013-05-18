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
            },
            KEY_NAME = 'maccordion',
            obj = this.data(KEY_NAME);

        if(settings === 'getObject'){
            if(obj){
                return obj //TileSlider实例对象
            }else{
                throw new Error('This object is not availbale!');
            }
        }

        return this.each(function(){
            var opt = $.extend({},defaults,settings);
            $(this).data(KEY_NAME,new Accordion($(this),opt));
        })
    }

    function Accordion(ele,settings){
        this.obj = ele;
        this.settings = settings;

        var _this = ele;
        function init(){
            ele.bind('click.maccordion',function(e){
                var el = e.target,
                    $ele = $(el),
                    par = $ele.parent('.acc-item'),
                    curr = ele.find('.active');
                if(par.hasClass('active')) return false;
                if($ele.is('.acc-item>a')){
                    curr.children('div').slideUp(settings.speed,function(){
                        curr.removeClass('active')
                    });

                    par.addClass('active').children('div').slideDown(settings.speed);
                    e.stopPropagation();
                }
                return false
            })
        }

        init();
    }
    $('[data-role="m-accordion"]').mAccordion();
})(jQuery);