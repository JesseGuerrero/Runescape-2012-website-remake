var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
    let document = _____WB$wombat$assign$function_____("document");
    let bannerNum = 1;
    function nextBanner() {
        let bannerImg = document.getElementById("banner" + bannerNum)
        bannerImg.style.display = "none";
        bannerNum += 1;

        bannerImg = document.getElementById("banner" + bannerNum)
        if(document.body.contains(bannerImg)) {
            bannerImg.style.display = "block";
        }
        if(!document.body.contains(bannerImg)) {
            bannerNum = 1;
            let bannerImg = document.getElementById("banner" + bannerNum)
            bannerImg.style.display = "block";
        }
    }

    function previousBanner() {
        let bannerImg = document.getElementById("banner" + bannerNum)
        bannerImg.style.display = "none";
        bannerNum -= 1;

        bannerImg = document.getElementById("banner" + bannerNum)
        if(document.body.contains(bannerImg)) {
            bannerImg.style.display = "block";
        }
        if(!document.body.contains(bannerImg)) {
            bannerNum = 5;
            let bannerImg = document.getElementById("banner" + bannerNum)
            bannerImg.style.display = "block";
        }
    }



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
                        '',
                        'ctaPlayNow',
                        '208',
                        '37',
                        community.memory.flash,
                        '',
                        {
                            click_url: ''
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
