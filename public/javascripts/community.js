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






    var community = {
        memory: {
            flash: '8.0.0'
        },
        initialise: function(){

            JAGEX.form.pritify.run();


            community.events();


            community.slider();


            community.ctas.initialise();


            community.play.initialise();

        },
        // SLIDER
        slider: function(){
            if(swfobject.hasFlashPlayerVersion(community.memory.flash)){
                $("#bannerReel a").each(function(i){
                    var $this = $(this);
                    var src = $this.find('img').attr("src");
                    var href = $this.attr("href");
                    if(src.match("/swf/")){
                        var newID = "slideSWF"+i;
                        $this.replaceWith("<div><div id='"+newID+"'></div></div>").attr({id: newID});

                        swfobject.embedSWF(
                            src.replace(/\.[^\.]{3,4}$/, ".swf"),
                            newID,
                            "1000",
                            "384",
                            community.memory.flash,
                            "",
                            {
                                click_url: href
                            },
                            {
                                wmode: "opaque"
                            }
                        );
                    }
                });
            }

            $("#bannerReel").arturoSlider({
                nextID: "bannerNext",
                prevID: "bannerPrevious",
                speed: 800,
                period: 10000
            });
        },
        // CALLS TO ACTION
        ctas: {
            initialise: function(){
                $('#ctaInnerContainer a').removeClass('ctaHover');
            },
            hover: function(_focus){
                $(_focus).find('img').stop(true,true).fadeIn(400);
            },
            unhover: function(_focus){
                $(_focus).find('img').stop(true,true).fadeOut(400);
            }
        },
        // PLAY NOW
        play: {
            initialise: function(){
                if(swfobject.hasFlashPlayerVersion(community.memory.flash)){
                    swfobject.embedSWF(
                        'https://web.archive.org/web/20120627163940/http://www.runescape.com/l=3/img/main/community/cta-play-free-now.swf',
                        'ctaPlayNow',
                        '208',
                        '37',
                        community.memory.flash,
                        '',
                        {
                            click_url: 'https://web.archive.org/web/20120627163940/http://www.runescape.com/l=3/game.ws?j=1'
                        },
                        {
                            wmode: 'opaque',
                            allowScriptAccess: 'always'
                        }
                    );
                }
            }
        },
        // NEWS
        news: {
            initialise: function(){
                this.originalHeight = $('.ArticleCollapsed').eq(0).height();
                $('.Article').height( function(x,h){ return h; } );
            },
            click: function(_clicked){
                var article = $(_clicked).closest('.Article');
                if(article.hasClass('ArticleCollapsed')) {
                    article.removeClass('ArticleCollapsed').stop().animate({ height: article.children('div').height() }, 600);
                }
                else {
                    article.addClass('ArticleCollapsed').stop().animate({ height: community.news.originalHeight }, 600);
                }
            }
        },
        // EVENTS
        events: function(){
            $('#ctaInnerContainer a').hover(function(){
                community.ctas.hover(this);
            },function(){
                community.ctas.unhover(this);
            });

            $('.ArticleControl').click(function(ev){
                ev.preventDefault();
                community.news.click(this);
            });
        }
    };

    $(function(){ community.initialise() });
    $(window).load(function() {
        community.news.initialise();
        $("#eventsContent .eventsTitle").elide();
        $("#eventsContent .event span.value").elide();
        $("#eventsContent .eventsTitle").css("width","auto");
    });

}
