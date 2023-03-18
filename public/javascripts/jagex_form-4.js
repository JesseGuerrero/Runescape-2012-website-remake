var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");



    var JAGEX = JAGEX || {};

    JAGEX.form = new function(){

        this.pritify = {
            run: function(_area){
                JAGEX.form.pritify.radio.load(_area);
                JAGEX.form.pritify.checkbox.load(_area);
                JAGEX.form.pritify.select.load();
            },
            select: {
                load: function(){
                    var $dropdowns = $('.Dropdown select');
                    $dropdowns.each(function(){
                        var $dropdown = $(this);

                        var html =
                            "<div class='Beg'></div>" +
                            "<div class='Center'>" +
                            "<div class='SelectedLi'></div>"+
                            "<div class='Drop'>" +
                            "<div class='Scroll-paneTop'></div>"+
                            "<div class='Scroll-paneMid'>" +
                            "<ul class='SelectRS'>" +
                            "</ul>" +
                            "</div>" +
                            "<div class='Scroll-paneBot'></div>"+
                            "</div>"+
                            "</div>" +
                            "<div class='End'></div>"
                        ;

                        var $parent = $dropdown.parent();
                        $parent.append(html);

                        var $thisOptions = $dropdown.find('option');
                        $thisOptions.each(function(){
                            var $opt = $(this);
                            var li = $('<li>');
                            li.attr('selIndex', $opt.val());
                            li.text( $opt.text() );
                            if ( $opt.is(":selected") )
                            {
                                $opt.attr("default", "true");
                                li.addClass("Selected");
                                $parent.find('.SelectedLi').text( li.text() ).click( function(ev) { JAGEX.form.pritify.select.openSaysMe( $(this), ev );});
                            }
                            $parent.find('ul').append(li);
                        });

                        $parent.find('li').click( function(ev) { JAGEX.form.pritify.select.selectMe( $(this), ev );});
                        if ($parent.find('.Scroll-paneMid').height() > 100 )
                        {
                            $parent.find('.Scroll-paneMid').removeClass('Scroll-paneMid').addClass('scroll-pane');
                        }
                        $parent.find('.Drop').css('display', 'none');
                        $dropdown.addClass('Replaced');
                    });
                    if( typeof(RSGLOBAL) !== "undefined") { RSGLOBAL.jScrollPane(); }
                },
                selectMe: function(li,ev){
                    var ul = li.parent();

                    ul.find('li').removeClass("Selected").closest('.Dropdown').find('.SelectedLi').text( li.text() ).removeAttr('style');
                    li.addClass("Selected");
                    var index = ul.find('li').index(li);

                    var sel = ul.closest('.Dropdown').find('select');
                    sel.find('option').removeAttr('selected').eq(index).attr({selected: 'selected'});
                    sel.trigger('change');
                    ul.closest('.Drop').css('display', 'none');
                },
                openSaysMe: function(div,ev){
                    var $drop = div.parent().find('.Drop');

                    if($drop.css('display') == 'none')
                    {
                        $('.Drop').css('display','none').parent().find('.SelectedLi').removeAttr('style');
                        $drop.css('display','block').parent().find('.SelectedLi').css('color','#fff');

                        var $scroll = div.parent().find('.scroll-pane');
                        if( $scroll.length )
                        {
                            if ( $.browser.webkit ){
                                $scroll.css("overflow-y", "auto");
                            }else{
                                var FBpane= $scroll;
                                var FBapi=FBpane.data('jsp');
                                FBapi.reinitialise();
                            }
                        }
                    }
                    else
                    {
                        $drop.css('display','none').parent().find('.SelectedLi').removeAttr('style');
                    }
                }
            },
            radio: {
                load: function(_area){
                    if(typeof(_area) == 'undefined'){
                        _area = $(document);
                    }
                    _area.find('input[type="radio"]').each(function(){
                        $(this).css('display','none');
                        var radio = document.createElement('span');
                        radio.className = 'Radio';
                        radio.innerHTML = '<span></span>';
                        // SET ID
                        if(typeof($(this).attr('id')) != 'undefined') radio.id = $(this).attr('id');
                        // SET CHECKED STATUS
                        if(typeof($(this).attr('checked')) != 'undefined') radio.className = radio.className+' checked';
                        $(this).before(radio);
                    });
                    JAGEX.form.pritify.radio.hook();
                },
                toggle: function(_radio){
                    var input = _radio.next('input[type="radio"]');
                    var checked = _radio.hasClass('checked');


                    $('input[name="'+input.attr('name')+'"]').each(function(){
                        $(this).removeAttr('checked');
                        $(this).prev('span.Radio').removeClass('checked');
                    });


                    if(!checked){
                        input.attr('checked','checked');
                    }
                    else {
                        input.removeAttr('checked');
                    }
                    _radio.toggleClass('checked');
                },
                exists: function(_id){
                    return $('span.Radio#'+_id).length > 0 ? true : false;
                },
                hook: function(){
                    $('span.Radio span').click(function(ev){
                        JAGEX.form.pritify.radio.toggle($(ev.target).parent('.Radio'));
                    });
                    $('label').hover(function(ev){
                        if(typeof($(this).attr('for')) != 'undefined' && JAGEX.form.pritify.radio.exists($(this).attr('for'))){
                            $('span.Radio#'+$(this).attr('for')).toggleClass('Hover');
                        }
                    }).click(function(ev){
                        if(typeof($(this).attr('for')) != 'undefined' && JAGEX.form.pritify.radio.exists($(this).attr('for'))){
                            JAGEX.form.pritify.radio.toggle($('span.Radio#'+$(this).attr('for')));
                        }
                    });
                }
            },
            checkbox: {
                load: function(_area){
                    if(typeof(_area) == 'undefined'){
                        _area = $(document);
                    }
                    _area.find('input[type="checkbox"]').each(function(){
                        $(this).css('display','none');
                        var checkbox = document.createElement('span');
                        checkbox.className = 'Checkbox';
                        checkbox.innerHTML = '<span></span>';
                        // SET NAME
                        if(typeof($(this).attr('name')) != 'undefined') checkbox.setAttribute('name',$(this).attr('name'));
                        // SET ID
                        if(typeof($(this).attr('id')) != 'undefined') checkbox.id = $(this).attr('id');
                        // SET CLASS
                        if(typeof($(this).attr('class')) != 'undefined') checkbox.setAttribute('class','Checkbox ' + $(this).attr('class'));
                        // SET CHECKED STATUS
                        if(typeof($(this).attr('checked')) != 'undefined' && $(this).attr('checked','checked')) checkbox.className = checkbox.className+' checked';
                        $(this).before(checkbox);
                    });
                    JAGEX.form.pritify.checkbox.hook();
                },
                toggle: function(_checkbox){
                    var input = _checkbox.next('input[type="checkbox"]');
                    var checked = _checkbox.hasClass('checked');

                    $('span.Checkbox[name="'+_checkbox.attr('name')+'"]').each(function(){
                        $(this).next('input[type="radio"]').removeAttr('checked');
                        $(this).removeClass('checked');
                    });

                    if(!checked){
                        input.attr('checked','checked');
                        _checkbox.addClass('checked');
                    }else{
                        input.removeAttr('checked');
                        _checkbox.removeClass('checked');
                    }
                },
                exists: function(_id){
                    return $('span.Checkbox#'+_id).length > 0 ? true : false;
                },
                hook: function(){
                    $('span.Checkbox span').click(function(ev){
                        JAGEX.form.pritify.checkbox.toggle($(ev.target).parent('.Checkbox'));
                    });
                    $('label').hover(function(ev){
                        if(typeof($(this).attr('for')) != 'undefined' && JAGEX.form.pritify.checkbox.exists($(this).attr('for'))){
                            $('span.Checkbox#'+$(this).attr('for')).toggleClass('Hover');
                        }
                    }).click(function(ev){
                        if(typeof($(this).attr('for')) != 'undefined' && JAGEX.form.pritify.checkbox.exists($(this).attr('for'))){
                            JAGEX.form.pritify.checkbox.toggle($('span.Checkbox#'+$(this).attr('for')));
                        }
                    });
                }
            }
        }

    }



}
/*
     FILE ARCHIVED ON 02:00:06 Jul 02, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:40:39 Mar 18, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 187.525
  exclusion.robots: 0.177
  exclusion.robots.policy: 0.169
  RedisCDXSource: 1.59
  esindex: 0.035
  LoadShardBlock: 169.25 (3)
  PetaboxLoader3.datanode: 207.724 (5)
  load_resource: 280.365 (2)
  PetaboxLoader3.resolve: 80.204 (2)
*/

