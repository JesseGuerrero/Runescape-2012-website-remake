$(document).ready(function() {
    $("#tableTabs").click(function(e){
        var id = $(e.target).parents('.tabs').length > 0 ? $(e.target).parents('.tabs').attr('id') : $(e.target).attr('id');
        switch(id){
            case "all":
                $("#all").removeClass("tabs").addClass("activetabs");
                $("#city").removeClass("activetabs").addClass("tabs");
                $("#dungeons").removeClass("activetabs").addClass("tabs");
                $("#poi").removeClass("activetabs").addClass("tabs");
                $("div.all").fadeIn('slow');
                $("div.city").fadeIn('slow');
                $("div.dungeons").fadeIn('slow');
                $("div.poi").fadeIn('slow');
                $(".cityPin").fadeIn('slow');
                $(".dungeonPin").fadeIn('slow');
                $(".poiPin").fadeIn('slow');
                $(".tabConnect").css("display", "none");
                $(".tabConnectR").css("display", "none");
                $(".tabConnectL").css("display", "block");
                break;
            case "city":
                $("#city").removeClass("tabs").addClass("activetabs");
                $("#all").removeClass("activetabs").addClass("tabs");
                $("#dungeons").removeClass("activetabs").addClass("tabs");
                $("#poi").removeClass("activetabs").addClass("tabs");
                $("div.city").fadeIn('slow');
                $("div.all").css("display", "none");
                $("div.dungeons").css("display", "none");
                $("div.poi").css("display", "none");
                $(".cityPin").fadeIn('slow');
                $(".dungeonPin").fadeOut('slow');
                $(".poiPin").fadeOut('slow');
                $(".tabConnect").css({'display':'block','left':'225px'});
                $(".tabConnectR").css("display", "none");
                $(".tabConnectL").css("display", "none");
                break;
            case "dungeons":
                $("#dungeons").removeClass("tabs").addClass("activetabs");
                $("#all").removeClass("activetabs").addClass("tabs");
                $("#city").removeClass("activetabs").addClass("tabs");
                $("#poi").removeClass("activetabs").addClass("tabs");
                $("div.dungeons").fadeIn('fast');
                $("div.all").css("display", "none");
                $("div.city").css("display", "none");
                $("div.poi").css("display", "none");
                $(".cityPin").fadeOut('slow');
                $(".dungeonPin").fadeIn('slow');
                $(".poiPin").fadeOut('slow');
                $(".tabConnect").css({'display':'block','left':'444px'});
                $(".tabConnectR").css("display", "none");
                $(".tabConnectL").css("display", "none");
                break;
            case "poi":
                $("#poi").removeClass("tabs").addClass("activetabs");
                $("#all").removeClass("activetabs").addClass("tabs");
                $("#city").removeClass("activetabs").addClass("tabs");
                $("#dungeons").removeClass("activetabs").addClass("tabs");
                $("div.poi").fadeIn();
                $("div.all").css("display", "none");
                $("div.city").css("display", "none");
                $("div.dungeons").css("display", "none");
                $(".cityPin").fadeOut('slow');
                $(".dungeonPin").fadeOut('slow');
                $(".poiPin").fadeIn('slow');
                $(".tabConnect").css("display", "none");
                $(".tabConnectR").css("display", "block");
                $(".tabConnectL").css("display", "none");
                break;
        }
        //alert(e.target.id);
        return false;
    });
    $('div.cityPin').hover(function() {
        var position = $(this).position();
        if (position.left > 660) {
            $(this).find(".redBox").css("left", "-280px");
            $(this).find(".redBoxArrow").removeClass("redBoxArrow").addClass("redBoxArrowR");
        }
        $(this).closest('div.cityPin').find('div.redBox').toggle();
    });
    $('div.dungeonPin').hover(function() {
        var position = $(this).position();
        if (position.left > 660) {
            $(this).find(".yellowBox").css("left", "-280px");
            $(this).find(".yellowBoxArrow").removeClass("yellowBoxArrow").addClass("yellowBoxArrowR");
        }
        $(this).closest('div.dungeonPin').find('div.yellowBox').toggle();
    });
    $('div.poiPin').hover(function() {
        var position = $(this).position();
        if (position.left > 660) {
            $(this).find(".blueBox").css("left", "-280px");
            $(this).find(".blueBoxArrow").removeClass("blueBoxArrow").addClass("blueBoxArrowR");
        }
        $(this).closest('div.poiPin').find('div.blueBox').toggle();
    });
});
