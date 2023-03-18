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




    $(function(){

        $('.categorySelect').css('display','block');

        $('#skillStats .row').mousemove(function(ev){
            $('.row .skillDifference').css('display','none');

            if(typeof($(ev.target).attr('class')) != 'undefined' && $(ev.target).attr('class').indexOf('column',0) > -1){
                $(this).find('.'+$(ev.target).attr('class')+' .skillDifference').css('display','block');
            }
        });

        $('.categorySelect a').click(function(ev){
            ev.preventDefault();
            $('.categorySelect .firstValue').text($(this).text());
            changeSkill($(this).attr('href').replace('#',''),$(this).parents('.OrnamentalBox'));
        });
    })


    function changeSkill(_skill,_parent){
        _parent.find('.OrnamentalBoxContent').fadeOut(function(){
            $(this).find('.row').css('display','block');
            $(this).find('.row').removeClass('last-row');

            if(_skill != 'all'){
                if(_skill != 'members'){
                    $(this).find('.row:not([data-skill="'+_skill+'"])').css('display','none');
                    $(this).find('.row[data-skill="'+_skill+'"]').last().addClass('last-row');
                }
                else {
                    $(this).find('.row[data-member="false"]').css('display','none');
                    $(this).find('.row[data-member="true"]').last().addClass('last-row');
                }
            }
            else {
                $(this).find('.row').last().addClass('last-row');
            }

            $(this).fadeIn();
        });
    }

}
/*
     FILE ARCHIVED ON 04:00:45 Jan 24, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:14:49 Mar 18, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 65.311
  exclusion.robots: 0.185
  exclusion.robots.policy: 0.176
  RedisCDXSource: 0.631
  esindex: 0.008
  LoadShardBlock: 40.815 (3)
  PetaboxLoader3.datanode: 62.016 (4)
  load_resource: 75.159
  PetaboxLoader3.resolve: 23.193
*/

