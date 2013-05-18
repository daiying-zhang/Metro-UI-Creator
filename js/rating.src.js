/**
 * User: dying-zhang
 * Date: 5/18/13
 * Time: 11:18 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
(function($){
    $.fn.mRating = function(opt){

        var defaults = {
                total_stars:5,
                onrating:null,
                onfinish:null
            },
            DATAINDEX = 'data-index',
            TOTALSTARS = 'data-t-st',
            TOTALSCORE = 'data-t-sc',
            DISABLE = 'data-disable',
            options = $.extend({},defaults,opt),
            _this = this,
            api = {
                //获取评分
                getScore : function(){
                    var index = _this.data(DATAINDEX);
                    return getScoreByIndex(typeof index !== 'undefined' ? index : -1)
                },
                //设置分数,仅用于评分未开启的情况
                setScore : function(args){
                    _this.data(DATAINDEX, args / 10 / (10 / options.total_stars) - 1)
                        .children('.m-rating-score,.m-rating-small-score')
                        .animate({'width':args+'%'},800);
                    return args / 100 * 10
                },
                //禁用评分
                disableRating : function(){
                    _this.data(DISABLE,false);
                },
                //启用评分
                enableRating : function(){
                    _this.data(DISABLE,true);
                }
            };
        if(typeof opt === 'string'){
            var args = Array.prototype.slice.call(arguments,1);
            if(api[opt]){
                return api[opt](args)
            }
            return this
        }

        function moveRating(type, index, $this){
            $('.'+type+'-item',$this).removeClass(type+'-final');
            $('.'+type+'-item:lt('+(index+1)+')',$this).addClass(type+'-hover');
            $('.'+type+'-item:gt('+index+')',$this).removeClass(type+'-hover');
            (typeof options.onrating === 'function') && options.onrating(getScoreByIndex(index));
            $this.trigger('rating',[getScoreByIndex(index)]);
        }
        function getScoreByIndex(index){
            index = +index;
            return 10 * (index + 1) / (_this.data(TOTALSTARS) || options.total_stars);
        }
        function clearRating(type, $this){
            var dataindex = $this.data(DATAINDEX);
            var index = typeof dataindex === 'undefined' ? -1 : parseInt(dataindex);
            $('.'+type+'-item:gt('+index+')',$this).removeClass(type+'-hover');
            $('.'+type+'-item:lt('+(index + 1)+')',$this).addClass(type+'-final');
        }
        return this.each(function(){
            var i= 0,
                $this = $(this)
                    .data(TOTALSCORE,10)
                    .data(TOTALSTARS,options.total_stars),
                items = $this.find('.m-rating-item,.m-rating-small-item'),
                len = parseInt($this.attr('data-stars')) || options.total_stars,
                type = $this.attr('data-role'),
                width = (/small/.test(type) ? 14 : 27 ) * len,
                itemArr = [],
                static = $this.find('.'+type+'-score');

            if(static.length > 0){
                $this.width(width);
                $this.data(DATAINDEX,((static.width() / $this.width()).toFixed(2)) * options.total_stars - 1);
                return;
            }
            for(; i < len; i+=1){
                itemArr.push('<div class="'+type+'-item" href="javascript:void(0);"></div>')
            }
            if(len > 0){
                $this.html('').append(itemArr.join('')).width(width);
                items = $this.find('.m-rating-item,.m-rating-small-item')
            }

            items.each(function(i){
                $(this).bind(
                    'mouseover.mrating',
                    function(){
                        ($this.data(DISABLE) !== false) && moveRating(type,i,$this)
                    }
                ).bind(
                    'click.mrating',
                    function(){
                        ($this.data(DISABLE) !== false) && $this.data(DATAINDEX,i);
                        $this.trigger('finish',[getScoreByIndex(i)]);
                        (typeof options.onfinish === 'function') && options.onfinish(getScoreByIndex(i));
                    }
                )
            });
            $this.bind('mouseout.mrating',function(){
                ($this.data(DISABLE) !== false) && clearRating(type,$this);
            })

        })
    }

    $('[data-role*="m-rating"]').mRating({
        total_stars:5/*,
         //TODO onraging,onfinish should be called like   $('ele').on('finish',function(){//......})
         onrating:function(score){
         $('#Rating').text(score)
         },
         onfinish:function(score){
         alert('Your Score:'+score)
         }*/
    });
    /*
     $('.m-button').click(function(){
     var _this = $(this),
     forEle = $(_this.attr('data-for')),
     fun = _this.attr('data-fun'),
     param = _this.attr('data-param'),
     result = forEle.mRating(fun,param);
     (typeof result !=='undefined') && alert( result + '分');
     })*/
})(jQuery)