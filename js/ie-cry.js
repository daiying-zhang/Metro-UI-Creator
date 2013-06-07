/**
 * User: dying-zhang
 * Date: 6/7/13
 * Time: 8:22 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.iecry = function(){
        var browser = $.browser,
            version = browser.version,
            template =
                ['<div class="ie-cry">',
                    '<div class="cry">',
                    '<h3 class="cry-title">:(</h3>',
                    '<p>Um~~ Sorry,your browser doesn\'t support this page, but don\'t be nervous :)<br/>',
                    'This page supports IE 9+,FireFox,Google Chrome,Safari and Opera.<br/>',
                    '<ul class="browser">',
                    '<li>&#xe1bf;</li>',
                    '<li>&#xe1be;</li>',
                    '<li>&#xe1bd;</li>',
                    '<li>&#xe1c1;</li>',
                    '<li>&#xe1c0;</li>',
                    '</ul><br/>',
                    'You can upgrade your browser.</p>',
                    '</div>',
                    '</div>'];
        if(browser.msie && version < 9){
            $(template.join('')).appendTo($('body').html(''))
        }
    }
    $.iecry();
})(jQuery);
