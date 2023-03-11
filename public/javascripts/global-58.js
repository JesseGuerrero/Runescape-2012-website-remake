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



    try {
        document.domain='runescape.com';
    }
    catch(err) {
    }

    /* requestAnimFrame polyfill */
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame    ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame    ||
            window.msRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout( callback , 1000 / 60 );
            };
    })();

    var RSGLOBAL = {};

    RSGLOBAL.hoverImageReplace = function(domObject) {

        if ( !domObject.find("img").attr("src") )
        {
            var originalColor =domObject.css("color");
            domObject
                .hover(function(event) {
                    event.preventDefault();
                })
                .mouseover(function(event) {
                    event.preventDefault();
                    $(this).stop().animate({color: "#FFFFFF"}, 300 );
                })
                .mouseout(function() {
                    $(this).stop().animate({color: originalColor}, 300 );
                });
        }
        else
        {


            var imgObj = new Image();
            imgObj.src = domObject.find("img").attr("src");
            var myDiv;
            if (imgObj.src.toUpperCase().split(".PNG").length > 0)
            {
                myDiv = RSGLOBAL.pngOpacityFix(imgObj);
            }
            else
            {
                myDiv = imgObj;
            }

            $(myDiv).addClass("HoverImgJsFg");
            // console.log($(myDiv).find("img").attr("src"))
            domObject.find("img").after(myDiv);


            domObject
                .removeClass("HoverImg")
                .addClass("HoverImgJs");
        }
    }

    RSGLOBAL.pngOpacityFix = function(pngImage) {
        var myObject;


        if ($.browser.msie && $.browser.version < 9) {
            myObject = $("<div></div>").css({width:pngImage.width,height:pngImage.height,'filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src='+pngImage.src+')'});
        } else {
            myObject = pngImage;
        }

        return myObject;
    }

    RSGLOBAL.pngOpacityBgSwap = function(pngImageDiv) {
        if ($.browser.msie && $.browser.version < 9) {
            var backgroundImage = pngImageDiv.css("background-image").match(/\"(.*?)\"/)[1];
            var backPos = pngImageDiv.css("background-position");
            pngImageDiv.css({'background-image':'none','filter':'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src='+backgroundImage+')'});
        }
    }

    RSGLOBAL.slowClassSelecter = ($.browser.msie && $.browser.version < 9 );

    RSGLOBAL.playerInfoAjax = function() {





        var playernames = [];
        var span = RSGLOBAL.slowClassSelector ? 'span' : '';

        var titleElements = $(span+".PlayerInfoTitle");
        var memberElements = $(span+".PlayerInfoMember");
        var onlineElements = $(span+".PlayerInfoOnline");
        var inclanElements = $(".PlayerInfoInClan");

        if ( titleElements.length <= 0 && memberElements.length <= 0 && onlineElements.length <= 0 ) {
            return false;
        }

        titleElements.each(function() {
            playernames.push($(this).data("displayname"));
        });
        memberElements.each(function() {
            playernames.push($(this).data("displayname"));
        });
        onlineElements.each(function() {
            playernames.push($(this).data("displayname"));
        });
        inclanElements.each(function() {
            playernames.push($(this).data("displayname"));
        });

        function process(data) {
            var counter = 0;
            titleElements.each(function() {
                var that = $(this);
                if (data[counter].title != "")
                {
                    that.text(data[counter].title);
                }
                counter++;
            });
            memberElements.each(function() {
                var that = $(this);
                if (data[counter].member === true) {
                    that.html('<img src="https://raw.githubusercontent.com/JesseGuerrero/web-files-darkan/master/2012/icon-pro.png" title="" alt="Member">');
                }
                else {
                    that.html('<img src="https://raw.githubusercontent.com/JesseGuerrero/web-files-darkan/master/2012/icon-nopro.png" title="" alt="No Member">');
                }
                counter++;
            });
            onlineElements.each(function() {
                var that = $(this);
                if (data[counter].online === true) {
                    that.html('<img src="https://raw.githubusercontent.com/JesseGuerrero/web-files-darkan/master/2012/icon-status-green.png" title="'+data[counter].world+'" alt="Online">');
                }
                else {
                    that.html('<img src="https://raw.githubusercontent.com/JesseGuerrero/web-files-darkan/master/2012/icon-status-red.png" title="Not Online" alt="Not Online">');
                }
                counter++;
            });
            inclanElements.each(function() {
                var that = $(this);
                if (data[counter].clan !== undefined) {
                    $("#CrestWrapper").css("display","block");
                }
                counter++;
            });
        }



        $.ajax({
            url: "https://web.archive.org/web/20120627163932/http://services.runescape.com/m=website-data/l=3/playerDetails.ws?names=" + JSON.stringify(playernames),
            dataType: "jsonp",
            success: function(response) {
                process(response);
            }
        });
    }

    RSGLOBAL.jsGameLinks = function() {
        $('.GameLink').each(function(){
            if(this.tagName == "A") this.href += (this.href.indexOf('?') != -1 ? '&' : '?') + 'j=1';
            else if(this.tagName == "FORM") $(this).prepend('<input name="j" value="1" type="hidden">');
        });
    }

    RSGLOBAL.jScrollPane = function(){
        if ( $.browser.webkit ){
            $('.scroll-pane').css('overflow-y','auto').addClass('webkit');
        }else if( $.fn.jScrollPane ){
            $('.scroll-pane').jScrollPane({
                verticalDragMaxHeight:50,
                verticalDragMinHeight:10,
                stickToBottom:true,
                animateScroll:true
            });
        }
    }

    RSGLOBAL.noSpamSubmit = function(){

        $(".noSpamSubmit").click(function(ev){
            var $submit=$(this);

            if ($submit.data("bag-disable")=="true"){

                ev.preventDefault();
                return;
            }
            $submit.data("bag-disable","true"); // Mark the button as being hit once already
            $submit.closest("form").find("input,textarea").each(function(){

                $(this).keypress(function(){
                    $submit.data("bag-disable","false");
                });
            });
        });
    }

    RSGLOBAL.waving_banner = function(){



        var shadow=new Image();

        $(function(){
            shadow.src="https://raw.githubusercontent.com/JesseGuerrero/web-files-darkan/master/2012/crestShadow.png"; // Dropped shadow tailored to our banner shape. Will paste this into the canvas before the banner
        });

        $(window).load(function(){
            shadowWidth=shadow.width; // Work out shadow width and height once loaded
            shadowHeight=shadow.height;
            var $imgs=$("img.WavingBanner"); // every image we're going to wave
            var canvasIndex=0;  // First canvas/context
            var ctx=new Array();  // A canvas context for each image to be replaced
            var apparentWidth,apparentHeight; // Image width & height after css scaling

            $imgs.each(function(){

                var $img=$(this);
                var imgWidth, imgHeight; // Actual image width and height before CSS scaling
                $("<img/>") /* In memory copy to avoid css issues */
                    .load(function(){

                        apparentWidth=$img.width();
                        apparentHeight=$img.height();

                        imgWidth=this.width;
                        imgHeight=this.height;
                        var scale=apparentWidth/imgWidth;

                        var imgTop=$img.position().top;
                        var imgLeft=$img.position().left;

                        if (!Modernizr.canvas){
                            // We don't have a canvas enabled browser

                            // Don't wave it, but add a drop shadow and remove the redundant canvas.

                            // New shadow image. Set original to be absolute positioned
                            // (so it z-indexes over the shadow)
                            $img.css({'position':'absolute'}).parent().prepend("<img id='WavingBannerShadow"+canvasIndex+"'/>");

                            // Set shadow css based on original image
                            $('#WavingBannerShadow'+canvasIndex).css({'top':imgTop,'left':imgLeft,'position':'absolute','height':apparentHeight*shadowHeight/imgHeight,'width':apparentWidth*shadowWidth/imgWidth})[0].src=shadow.src;

                        }else{
                            // We have a canvas enabled browser

                            // Physics
                            var j=0;
                            var amplitudeAsFractionOfHeight=0.015;
                            var amplitude=amplitudeAsFractionOfHeight*imgHeight;
                            var pleats=2;  // Number of pleats (full waves) visible at any one time
                            var speed=300; // speed of travel of waves in milliseconds
                            var clearHeight=shadowHeight*(amplitudeAsFractionOfHeight+1);
                            var angularIncrement=pleats*2*Math.PI/shadowWidth;

                            // Create the new canvas in the DOM, scaled appropriately
                            $img.parent().append("<canvas id='WavingBanner"+canvasIndex+"' width='"+shadowWidth*scale+"' height='"+clearHeight*scale+"'></canvas>");

                            // Get a jQuery handle on it
                            $canvas=$('#WavingBanner'+canvasIndex);

                            // Try to match the CSS of the image and apply it to the canvas. Note that offset and position alone are not enough */
                            $canvas.css({'float':$img.css('float'),'top':imgTop,'left':imgLeft,'position':$img.css('position'),'margin-top':$img.css('margin-top'),'margin-bottom':$img.css('margin-bottom'),'margin-right':$img.css('margin-right'),'margin-left':$img.css('margin-left')});

                            // Set up the 2d context
                            ctx[canvasIndex] = document.getElementById('WavingBanner'+canvasIndex).getContext('2d');
                            var thisCanvas=canvasIndex;

                            // Test the banner to see if the user has a clan.
                            // It's a transparent banner if not.

                            // Allow us to read from the image even if it's cross domain
                            $img[0].crossOrigin='anonymous';

                            // transparent banner?
                            // We have a non-transparent banner. Continue

                            // Because the animation loop isn't a set number of milliseconds
                            // betwen frames (We get a frame when the processor has a mo), we
                            // need to see how far along our animation should have progressed at
                            // that point in time, so measure the timespan
                            var timeLast = (new Date());

                            // A one time scaling of the canvas
                            if ( apparentWidth != imgWidth )ctx[thisCanvas].scale(scale,scale);

                            // Get in
                            (function animloop(){
                                requestAnimFrame(animloop);

                                // More timing
                                var timeNow = (new Date());
                                var elapsed = timeNow-timeLast;

                                // Clear the canvas before drawing the next frame
                                ctx[thisCanvas].clearRect(0,0,shadowWidth,clearHeight);

                                // Slice and dice!
                                for (i=0;i<shadowWidth;i+=1){

                                    var amplitudeSinJ=amplitude*Math.sin(j);

                                    // Copy slices of shadow
                                    ctx[thisCanvas].drawImage(shadow,i,0,1,shadowHeight,i,0,1,(shadowHeight+amplitudeSinJ));

                                    // Copy slices of flag
                                    if (i<imgWidth){
                                        ctx[thisCanvas].drawImage($img[0],i,0,1,imgHeight,i,0,1,(imgHeight+amplitudeSinJ));
                                    }

                                    j+=angularIncrement;
                                }

                                j-=elapsed/speed;

                                if (j>2*Math.PI) j-=2*Math.PI;

                                timeLast=timeNow;

                            })();

                            // Hide the original image, let the canvas take over.
                            $img.hide();
                        }/* Canvas enabled browser */
                        // Says canvas but we're using it for drop shadows where we don't have wavy banners too
                        canvasIndex+=1;
                    })
                    .attr("src",$img.attr("src"));

            }); // Images Each
        }); // Window Load
    }


    function addCommas(nStr){
        nStr += '';
        x=nStr.split('.');
        x1=x[0];
        x2=x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)){
            x1=x1.replace(rgx,'$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    function TrackingPixel(strTag){
        $.ajax({
            url: 'https://web.archive.org/web/20120627163932/http://www.runescape.com/l=3/track/'+strTag,
            dataType: 'jsonp',
            success: function(){
            }
        });
        return false; // Not to interupt navigation from links
    }

    $(function() {

        $(".HoverImg:not(.NoFade)").each(function() {
            // var srcStr = $(this).find("img").attr("src");
            // if (!(srcStr.toUpperCase().indexOf("MODALLOGINFB") >= 0 && $.browser.msie && $.browser.version < 9)) {
            //     RSGLOBAL.hoverImageReplace($(this));
            // }
        });

        RSGLOBAL.playerInfoAjax();
        RSGLOBAL.jsGameLinks();

        $(".HoverImgJs").live('mouseover', function(){
            var domObject = $(this);
            if ( !domObject.hasClass("Special") )
            {
                domObject.find(".HoverImgJsFg").stop().animate({opacity:0}, 700);
            }
        })
            .live('mouseout', function(){
                var domObject = $(this);
                if ( !domObject.hasClass("selected") && !domObject.hasClass("Special") )
                {
                    domObject.find(".HoverImgJsFg").stop().animate({opacity:1}, 700, function() {
                        domObject.find(".HoverImgJsFg").css({opacity: ''});
                    });
                }
            })
        ;

        if(!Modernizr.csstransitions){

            $(".MainMenu > li")
                .removeClass("CSS3")
                .each(function(){var $this = $(this);
                    var $menu = $this.find('.DropDown div');
                    if($menu.length < 1) return;
                    var h = $menu.outerHeight();
                    $this.hover(
                        function(){ $menu.stop().animate({marginTop:0},600); },
                        function(){ $menu.stop().animate({marginTop:-h},600); }
                    );
                })
            ;

            var $lis = $("#SubNav").find("nav > ul > li").filter('.Support, .Account');
            var $masks = $lis.find('.Mask');
            var $dropdowns = $lis.find('.DropDown > div');
            var dropDownDuration = 600;

            $lis
                .removeClass("CSS3")
                .mouseenter(
                    function(){
                        var $this = $(this);
                        $this.find("div.DropDown > div").stop().animate({marginTop:"0"},{duration: dropDownDuration});
                        $masks.css({opacity: 0, visibility: "hidden"});
                        $this.find($masks).css({opacity: 1, visibility: "visible"});
                    }
                )
                .mouseleave(
                    function(){
                        var $this = $(this);
                        $this.find($dropdowns).stop().animate({marginTop:"-160px"},{duration: dropDownDuration, complete: function(){
                                $this.find($masks).css({opacity: 0, visibility: "hidden"});
                            }});
                    }
                );

        }


        $("html.no-csstransition .HoverImageCss3").mouseover(function(){
            var $this=$(this);
            $this.find("img").fadeOut();
        });
        $("html.no-csstransition .HoverImageCss3").mouseout(function(){
            var $this=$(this);
            $this.find("img").fadeIn();
        });


        $(".no-csstransitions .HoverGradient *:not(img)").each(function() {
            var domObject = $(this);
            if ( typeof $.effects !== 'object' ) return false;
            var originalColor = domObject.css("color");
            domObject.parents("a")
                .live('hover', function(event){
                    event.preventDefault();
                })
                .live('mouseover', function(event){
                    event.preventDefault();
                    domObject.stop().animate({color: "#FFFFFF"}, 300 );
                })
                .live('mouseout', function(event){
                    domObject.stop().animate({color: originalColor}, 300 );
                });
        });

        $(".csstransitions #LoginButton1").click(function(){
            var $this = $(this);
            $this.parent().addClass("open");
            $("#username").focus();
            $(".no-csstransitions #Login.open a.LoginX").show().mouseover(function(){
                var $this = $(this);
                $this.stop().show().animate({opacity:'1'},200);
            });
            $(".no-csstransitions #Login.open a.LoginX").mouseout(function(){
                var $this = $(this);
                $this.stop().animate({opacity:'0'},200);
            });


            $(".no-csstransitions #LoginButton1").click(function(){
                var $this=$(this);
                var $LoginPanel=$("#LoginPanel").stop().animate({'top':'53px'},1000);
                $this.fadeOut(1000);
                $("#Login #RegisterButton,#LoginPanel #GetAccess").stop().fadeOut(1000);
                $("#LoginPanel .Facebooklogin").stop().animate({'opacity':'1','display':'block','z-index':'3'},1000);
                $("#Login .LoginX,#Login .LoginXbottom").stop().fadeIn(1000);
            });
            $(".no-csstransitions #Login .LoginXtop").mouseenter(function(){
                var $this=$(this);
                $this.stop().fadeIn(1000);
            });
            $(".no-csstransitions #Login .LoginXtop").mouseleave(function(){
                var $this=$(this);
                $this.stop().fadeOut(1000);
            });
            $(".no-csstransitions #Login .LoginXtop").click(function(){
                var $this=$(this);
                var $LoginPanel=$("#LoginPanel").stop().animate({'top':'-155px'},1000);
                $this.fadeOut(1000);
                $("this,#LoginButton1,#Login #RegisterButton,#LoginPanel #GetAccess").stop().fadeIn(1000);
                $("#LoginPanel .Facebooklogin").stop().animate({'opacity':'0'},1000);
                $("#Login .LoginX,#Login .LoginXbottom").stop().fadeOut(1000);
                $("#Login a.LoginX").unbind();
            });
            $(".csstransitions a.LoginX").click(function(){
                var $this = $(this);
                $this.parent().removeClass("open");
                $("#Login a.LoginX").unbind();
            });
        });


        $(".no-csstransitions #LoginButton1").click(function(){
            var $this=$(this);
            var $LoginPanel=$("#LoginPanel").stop().animate({'top':'53px'},1000);
            $this.fadeOut(1000);
            $("#Login #RegisterButton,#LoginPanel #GetAccess").stop().fadeOut(1000);
            $("#LoginPanel .Facebooklogin").stop().animate({'opacity':'1','display':'block','z-index':'3'},1000);
            $("#Login .LoginX,#Login .LoginXbottom").stop().fadeIn(1000);
            $(".no-csstransitions #Login .LoginXtop").mouseenter(function(){
                var $this=$(this);
                $this.stop().fadeIn(1000);
            });
            $(".no-csstransitions #Login .LoginXtop").mouseleave(function(){
                var $this=$(this);
                $this.stop().fadeOut(1000);
            });
            $(".no-csstransitions #Login .LoginXtop").click(function(){
                var $this=$(this);
                var $LoginPanel=$("#LoginPanel").stop().animate({'top':'-155px'},1000);
                $this.fadeOut(1000);
                $("this,#LoginButton1,#Login #RegisterButton,#LoginPanel #GetAccess").stop().fadeIn(1000);
                $("#LoginPanel .Facebooklogin,#Login .LoginX,#Login .LoginXbottom").stop().fadeOut(1000);
                $("#Login a.LoginX").unbind();
            });
        });

        $(".no-csstransitions .InPageDropDownNew").css({'height':'45px'});

        $(".no-csstransitions .InPageDropDownNew").removeClass("CSS3")
            .mouseenter(function(){
                var $this = $(this);
                var $dropListWrapper=$this.find(".DropListWrapper");
                var expand=$this.data("expand");
                $this.css({'height':expand});
                $dropListWrapper.stop().animate({'top':'-8px'},400);
            })
            .mouseleave(function(){
                var $this = $(this);
                var $dropListWrapper=$this.find(".DropListWrapper");
                var retract=$dropListWrapper.data("retract");
                $dropListWrapper.stop().animate({'top':retract},400);
                setTimeout(function(){
                    $dropListWrapper.parent().stop().css({'height':'45px'});
                },500); /*Shrink the parent shortly after the dropdown retracts */
            });



        $("#Login").removeClass("NoJS");


        var $PlayerCount = $("#PlayerCount");
        if( $PlayerCount.length > 0){
            // Show the PlayerCount? Did it get a value from Web Sys through the sig?
            if ( parseInt($("#PlayerCount").find(".top span").html().replace(',','')) > 0 ||
                parseInt($("#PlayerCount").find(".bottom span").html().replace(',','')) > 0 ){
                $PlayerCount.show();
            }else{
                /* Didn't get it through the sig so poll immediately */
                $PlayerCount.hide();
                PollPlayerCount();
            }
            setInterval( PollPlayerCount,20000)
        }

        function PollPlayerCount(){
            $.ajax({
                url: 'https://web.archive.org/web/20120627163932/http://www.runescape.com/l=3/player_count.js?varname=iPlayerCount',
                dataType: 'jsonp',
                success: function(iPlayerCount){
                    if (iPlayerCount > 0 ){
                        $("#PlayerCount").show();
                        if ( $("#PlayerCount p.top").css("display")=='block' ){
                            $("#PlayerCount p.bottom span").html(addCommas(iPlayerCount));
                            $("#PlayerCount p").fadeToggle(1000);
                        }else{
                            $("#PlayerCount p.top span").html(addCommas(iPlayerCount));
                            $("#PlayerCount p").fadeToggle(1000);
                        }
                    }else{
                        $("#PlayerCount").hide();
                    }
                }
            });
        }


        if($.fn.placeholder){
            $("textarea:not(.NoPlaceholder),input:text:not(.NoPlaceholder),input:password:not(.NoPlaceholder)").placeholder({
                attribute: "title"
            });
            $("textarea:not(.NoPlaceHolder)").addClass("placeholderSubtle");

        }


        $("span.FacebookLike,span.TwitterTweet").show();


        RSGLOBAL.jScrollPane();




        RSGLOBAL.waving_banner();
        RSGLOBAL.noSpamSubmit();

    });



}
/*
     FILE ARCHIVED ON 16:39:32 Jun 27, 2012 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:24:07 Mar 10, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 113.986
  exclusion.robots: 8.635
  exclusion.robots.policy: 8.616
  cdx.remote: 0.081
  esindex: 0.01
  LoadShardBlock: 49.657 (3)
  PetaboxLoader3.datanode: 50.757 (4)
  load_resource: 287.54
  PetaboxLoader3.resolve: 248.572
*/

