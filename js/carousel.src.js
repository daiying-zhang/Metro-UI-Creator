/**
 * User: dying-zhang
 * Date: 5/17/13
 * Time: 10:36 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.fn.mCarousel = function(settings){
        var defaults = {
                speed: 1000,
                showTime:3000,
                active:'bg-color-black',
                bar:'bg-color-red'
            },
            KEY_NAME = 'carousel',
            obj = this.data(KEY_NAME);

        if(settings === 'getObject'){
            if(obj){
                return obj //TileSlider实例对象
            }else{
                throw new Error('This object is not available!');
            }
        }else{

        }

        return this.each(function(){
            var opt = $.extend({},defaults,settings);
            $(this).data(KEY_NAME,new Carousel($(this),opt));
        })
    }

    function Carousel(ele,settings){
        this.obj = ele;
        this.settings = settings;
        this.tileCount = ele.find('.car-content').length;
        this.slideTimer = null;
        this.slideLeft = 0;
        this.slideWidth = ele.width();
        this.bar = null;
        this.autoplay = ele.attr('data-autoplay') || 'true';
        this._start();
    }
    Carousel.prototype = {
        /**
         * 滚动到下一个
         * @name next
         */
        next : function(restart, pre){
            var setting = this.settings,
                active = setting.active,
                bar = setting.bar,
                curr = this.bar.find('i.'+active).attr('class',bar),
                next = curr.next();
            !next.length && (next = this.bar.find('i:first'));
            if(pre === true){
                next = curr.prev();
                !next.length && (next = this.bar.find('i:last'));
            }
            next.attr('class',active);
            this.slideTo(next.index(), restart, false)
        },
        /**
         * pre
         */
        pre : function(restart){
            this.next(restart, true);
        },
        /**
         * slideTo
         * @param index
         * @param restart
         * @param changeBarClassc change the class of the nav bar
         */
        slideTo : function(index, restart, changeBarClass){
            var settings = null;
            /*if(index > this.tileCount - 1){
                index = this.tileCount - 1
            }else if(index < 0){
                index = 0
            }*/
            index = Math.min(this.tileCount-1,Math.max(0,index));
            this.slideLeft = index * this.slideWidth;
            if(changeBarClass !== false){
                settings = this.settings;
                $('.car-bar',this.obj).find('i').attr('class',settings.bar).eq(index).attr('class',settings.active)
            }

            this.obj.stop().animate({
                'margin-left': -this.slideLeft +'px'
            } ,this.slideLeft == 0 ? 500 :this.settings.speed);
            restart && this.start();
        },
        /**
         * 启动定时器滚动Tile
         */
        _start : function(){
            var _this = this;
            //tw = this.obj.width();
            var nav = $('<div class="car-bar"></div>'), html = [], i=0;
            for(; i<this.tileCount; i+=1){
                html.push('<i class="bg-color-',i==0?'black':'red','"></i>');
            }
            this.bar = nav.html(html.join('')).appendTo(this.obj);
            this.obj.find('.car-content').css('width',this.slideWidth+'px');
            this.obj.width(this.slideWidth * this.tileCount).height(this.obj.height() - 12);
            //this.slideTimer = setInterval(goNext, this.settings.showTime + _this.settings.speed)
            this.start();
            this.obj.bind('click.mcar',function(e){
                var index = $(e.target).index(),
                    ele = e.target,
                    $ele = $(e.target);
                _this.stop();
                if($ele.is('i[class^="bg-color"]')){
                    _this.bar.find('i').attr('class',_this.settings.bar);
                    $ele.attr('class',_this.settings.active);
                    //_this.stop();
                    _this.slideTo(index,true,false);
                }else if($ele.is('i.next')){
                    //_this.stop();
                    _this.next(true)
                }else if($ele.is('i.pre')){
                    //_this.stop();
                    _this.pre(true)
                }
                return false;
            })
        },
        /**
         * 停止滚动
         */
        stop : function(){
            clearInterval(this.slideTimer)
        },
        start : function(){
            if(this.autoplay == 'false'){
                return
            }
            var _this = this;
            var goNext = function(){
                _this.next();
            }
            this.slideTimer = setInterval(goNext, this.settings.showTime + _this.settings.speed)
        }
    }
    $('[data-role="m-carousel"]').mCarousel();
})(jQuery);