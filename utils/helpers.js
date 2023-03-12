let constants = require("../utils/constants");
const {getSkillIDByName} = require("./constants");

function hbsHelpers(hbs) {
    return hbs.create({
        extname: 'hbs',
        defaultLayout: 'layout.hbs',
        layoutsDir   : 'views/layouts',
        partialsDir  : 'views/partials',
        helpers: { // This was missing
            display: function (value) {
                console.log(value)
            },
            add: function (value1, value2) {
                return (parseInt(value1) + parseInt(value2)).toString();
            },
            multiply: function(value1, value2) {
                return (parseInt(value1) * parseInt(value2)).toString();
            },
            formatNum: function (num) {
                return num.toLocaleString("en-US");
            },
            showIfPositive: function (num) {
                if(parseInt(num) > 0)
                    return num
                return ""
            },
            getRank: function (index, page, limit) {
                return (parseInt(index) + 1) + ((parseInt(page) - 1)*parseInt(limit))
            },
            getHSSkillLevel: function (data, skill) {
                if(skill == "Overall")
                    return data.totalLevel
                return constants.getSkillLevelByXP(data['xp'][getSkillIDByName(skill)])
            },
            getHSSkillXP: function (data, skill) {
                if(skill == "Overall")
                    return data.totalXp
                return data['xp'][getSkillIDByName(skill)]
            },
            getLevelFromXP: function (xp) {
                return constants.getSkillLevelByXP(parseInt(xp));
            }
            // More helpers...
        }
    });
}

module.exports = hbsHelpers;
