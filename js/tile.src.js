/**
 * User: daiying.zhang
 * Date: 13-4-23
 * Time: 下午4:07
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.fn.tileslider = function(settings){
        var defaults = {
                speed: 1000,
                showTime:3000,
                tileHeight:120
            },
            KEY_NAME = 'tileslider',
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
            $(this).data(KEY_NAME,new TileSlider($(this),opt));
        })
    }

    function TileSlider(ele,settings){
        this.obj = ele;
        this.settings = settings;
        this.tileCount = this.obj.find('.tile_content').length;
        this.slideTimer = null;
        this.slideTop = 0;
        this._start();
    }
    TileSlider.prototype = {
        /**
         * 滚动Tile
         */
        _slideTile : function(_this){
            var th = _this.settings.tileHeight;
            _this.slideTop += th;
            (_this.slideTop >= _this.tileCount * th) && (_this.slideTop = 0);
            this.obj.find('.tile_content:first').animate({
                'margin-top': -_this.slideTop +'px'
            } ,_this.slideTop == 0 ? 500 :_this.settings.speed);
        },
        /**
         * 启动定时器滚动Tile
         */
        _start : function(){
            var _this = this;
            this.slideTimer = setInterval(function(){
                _this._slideTile(_this)
            },this.settings.showTime + _this.settings.speed)
        },
        /**
         * 停止滚动
         */
        stop : function(){
            clearInterval(this.slideTimer)
        }
    }
})(jQuery);