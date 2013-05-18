/**
 * User: dying-zhang
 * Date: 5/18/13
 * Time: 7:40 PM
 * Email:97532151@qq.com
 * Site: http://sanjh.cn
 */
;(function($){
    $.fn.mMenu = function(){
        return this.each(function(){
            var $this = $(this),
                closeAllMenus = function(){
                    $('.m-menus:visible').each(function(i){
                        var _self = $(this);
                        if(_self.css('position') !== 'static' && !_self.hasClass('open')){
                            _self.slideUp('fast');
                        }
                    });
                },
                /**
                 * 显示子菜单
                 * @param holder 点击的一个菜单项或者是其他的触发器，必须有data-role="m-menu-trigger"属性
                 */
                    showSubMenu = function(holder){
                    var submenu = holder.find('.m-menus:first');
                    if(submenu && submenu.css('display') === 'block'){ //菜单已经显示，则关闭菜单
                        submenu.slideUp('fast');
                    }else{
                        submenu && submenu.slideDown('fast'); //显示子菜单
                    }
                }
                ;
            $this.bind('click.mmenu',function(e){
                e.stopPropagation();
                closeAllMenus();
                showSubMenu($this);
            })
            $('html').bind('click.mmenu',function(e){
                closeAllMenus()
            })
        })
    }
    $('[data-role="m-menu-trigger"]').each(function(){
        $(this).mMenu();
    })
})(jQuery)