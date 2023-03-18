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




    (function($){ $.fn.elide = function(options){



        options = $.extend({

                titleText: true,
                elipsis: '...',
                heightElide: false,
                maxHeight: $(this).height(),
                endElementSelector: ''
            },
            options);


        options.elipsisLength = options.elipsis.length;


        function truncate(inText, $span, chunk, availableWidth){

            var
                oText = inText || $span.text(),
                nText,
                chunk = chunk || Math.round($span.text().length / 2)
            ;

            if($span.width() <= availableWidth){ return oText; }

            nText = oText.substring(0, oText.length - chunk - options.elipsisLength) + options.elipsis;
            $span.text(nText);

            if($span.width() > availableWidth){
                truncate(nText, $span, chunk, availableWidth);
            }
            else if(chunk != 1){
                $span.text(oText);
                truncate(oText, $span, Math.round(chunk/2), availableWidth);
            }

            return oText;

        }


        function truncateHeight(inText, $span, chunk, elipsis){

            var
                oText = inText || $span.text(),
                nText,
                chunk = chunk || Math.round($span.html().length / 2),
                elipsisLength = elipsis.length
            ;

            if($span.height() <= options.maxHeight){ return oText; }

            nText = oText.substring(0, oText.length - chunk - elipsisLength) + elipsis;
            $span.html(nText);

            if($span.height() > options.maxHeight){
                truncateHeight(nText, $span, chunk, elipsis);
            }
            else if(chunk != 1){
                $span.html(oText);
                truncateHeight(oText, $span, Math.round(chunk/2),elipsis);
            }

            return oText;

        }


        return this.each(function(){
            var $this = $(this);
            var heightElide = options.heightElide;

            if (heightElide) {

                var
                    originalText = $this.text(),
                    newText = originalText,

                    $rail = $this.wrapInner("<span></span>"),
                    currentHeight = $rail.children().height(),
                    $span = $rail.children(),
                    hasEndElement = (options.endElementSelector !== ''),
                    endElement = null,
                    endElementText = "",
                    elipsis = options.elipsis
                ;


                if (options.maxHeight <= 0 || options.maxHeight >= currentHeight) return;


                if (hasEndElement) {
                    endElement = $this.find(options.endElementSelector);
                    endElementText = endElement.html();
                    elipsis = options.elipsis + endElementText;
                }

                if (currentHeight > options.maxHeight) {
                    newText = truncateHeight(newText, $span, null, elipsis);
                }


                if (hasEndElement) {
                    var newTextFinal = $span.html().split(endElementText)[0];
                    $this.html(newTextFinal);
                    $this.append(endElement);
                }

            }
            else {
                var
                    availableWidth = $this.innerWidth(),
                    maxWidth = parseInt($this.css("maxWidth")),
                    originalText = $this.text(),
                    newText = originalText
                ;


                if(availableWidth <= 0 || $this.children().length > 0) return;


                if(availableWidth < maxWidth) return;


                $this.wrapInner("<span></span>");
                $rail = $this.children();
                $rail.css({
                    display: "block",
                    width: "200%"
                });

                $rail.wrapInner("<span></span>");
                $span = $rail.children();

                newText = truncate(null, $span, null, availableWidth);



                if(options.titleText && originalText != newText && !$this.attr("title")){
                    $this.attr("title", originalText);
                }
            }

        });


    }})(jQuery)

}
/*
     FILE ARCHIVED ON 14:42:54 Jul 11, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:40:17 Mar 18, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 71.573
  exclusion.robots: 0.153
  exclusion.robots.policy: 0.142
  RedisCDXSource: 2.426
  esindex: 0.007
  LoadShardBlock: 49.505 (3)
  PetaboxLoader3.datanode: 60.495 (4)
  load_resource: 57.663
  PetaboxLoader3.resolve: 42.092
*/

