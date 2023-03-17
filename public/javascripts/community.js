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
}
