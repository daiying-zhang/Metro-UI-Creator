/**
 * User: dying-zhang
 * Date: 5/18/13
 * Time: 10:15 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
(function($){
    $.fn.mProgressbar = function(opt,value){
        //TODO to support changed event
        function setValue(node, value){
            value = Math.min(value,100); // value can't great then 100
            node.data('data-value',value).animate({'width':value + '%'},300);
        }
        if(opt === 'setValue'){ //set the progress value
            setValue($(this).find('.m-progress'),value || 0);
            return this;
        }else if(opt === 'getValue'){ //get the progress value
            return this.find('.m-progress').data('data-value')
        }
        return this.each(function(){
            var $this = $(this).find('.m-progress');
            setValue($this,Math.floor($this.width() / $(this).width() * 100));
        });
    }
    $('.m-progressbar').mProgressbar(); // auto call mProgressbar function
})(jQuery)