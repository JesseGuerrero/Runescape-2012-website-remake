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




    (function($){ $.fn.placeholder = function(options){


// configuration properties
        options = $.extend({
                // defaults
                holderText: null,
                attribute: 'placeholder',
                addclass: 'placeholder'
            },
            options);


        return this.each(function(){var $this = $(this);

            // set a property to avoid placeholdering the same element twice if we're called again
            if ( $this.data("hasPlaceholder") === true ){
                return;
            }

            if ( $this.attr(options.attribute) ){
                $this.data({ hasPlaceholder: true });
            }

            // if no placeholder text is defined, give up
            var placeholder = options.holderText || $this.attr(options.attribute);
            if(!placeholder || placeholder.length < 1) return;


            // Is this a password field? If so, make a duplicate text field to show the placeholder.
            if ( $this.attr("type") === "password" ){

                var $dummyInput = $("<input/>")
                    .addClass( $this.attr("class") )
                    .addClass( options.addclass )
                    .attr({ type: "text" })
                    .attr("tabindex", $this.attr("tabindex"))
                    .val( placeholder )
                    .insertAfter( $this )
                ;

                $this.hide();

                $dummyInput
                    .focus(function(){
                        // Hide the fake input
                        $dummyInput.hide();
                        // Show and give focus to the real password field
                        $this.val("").show().focus();
                    })
                ;

                // Proxy any click events that may be set from the placeholder element to the real one
                $dummyInput.click( $this.click() );

                var blurFunction = function(){
                    // If no value entered, hide this and show the dummy
                    if( $this.val().length === 0 ){
                        $dummyInput.show();
                        $this.hide().val( placeholder );
                    }
                }

                $this
                    .blur(blurFunction)
                ;

                // call the blur function when the page is loaded to set up placeholder text
                blurFunction();

            }/*password field*/

            else{

                // blur function - if placeholder text is there, remove it, remove placeholder class
                var blurFunction = function(){
                    var val = $this.val();
                    if(val == '' || val == placeholder && options.addclass){
                        $this.addClass(options.addclass);
                    }
                    if(val == ''){
                        $this.val(placeholder)
                    }
                }

                var clearFunction = function($obj){
                    $obj.each(function(){
                        var val = $(this).val();
                        if(val == placeholder){
                            $(this).val('');
                        }
                    });
                }

                // focus handler/function - if placeholder text is there, remove it, remove placeholder class
                $this.focus(function(){
                    clearFunction($this);
                    if(options.addclass) $this.removeClass(options.addclass);
                });

                $this.parents('form').submit(function(){
                    clearFunction($this.parents('form').find('.placeholder'));
                    if(options.addclass) $this.removeClass(options.addclass);
                });

                // focus handler - blur function separate so we can call it on page load
                $this.blur(blurFunction);

                // call the blur function when the page is loaded to set up placeholder text
                blurFunction();

            }/*other Input*/


        });/*this.each()*/


    }})(jQuery)

}
/*
     FILE ARCHIVED ON 02:23:15 May 28, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:39:00 Mar 18, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 189.951
  exclusion.robots: 0.231
  exclusion.robots.policy: 0.219
  RedisCDXSource: 0.761
  esindex: 0.008
  LoadShardBlock: 167.229 (3)
  PetaboxLoader3.datanode: 156.041 (4)
  load_resource: 80.314
  PetaboxLoader3.resolve: 66.532
*/

