const Handlebars = require('handlebars')
let { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
let {getSkillIDByName, getSkillLevelByXP} = require("./utils");

function hbsHelpers(hbs) {
    return hbs.create({
        extname: 'hbs',
        defaultLayout: 'layout.hbs',
        layoutsDir   : 'views/layouts',
        partialsDir  : ['views/partials', 'views/partials/highscores-partials'],
        handlebars: allowInsecurePrototypeAccess(Handlebars),
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
                return getSkillLevelByXP(data['xp'][getSkillIDByName(skill)])
            },
            getHSSkillXP: function (data, skill) {
                if(skill == "Overall")
                    return data.totalXp
                return data['xp'][getSkillIDByName(skill)]
            },
            getLevelFromXP: function (xp) {
                return getSkillLevelByXP(parseInt(xp));
            },
            formatDate: function(date) {
                return new Date(date).toLocaleDateString();
            },
            selectedIfEqual: function(num1, num2) {
                if(num1 == num2)
                    return "selected"
            },
            isEqual: function(num1, num2) {
                return num1 == num2;
            },
            isGreater: function(greaterNum, lesserNum) {
                return greaterNum > lesserNum;
            },
            ifNotFirstArticleCollapse: function(num) {
                if(num == 0)
                    return ""
                return "ArticleCollapsed"
            },
            formatDateForNews: function(date) {
                let pastDate = new Date(date)
                let nowDate = new Date()
                const diffTime = Math.abs(nowDate - pastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays <= 21)
                    return (diffDays + " days ago")
                return new Date(date).toDateString()
            }
            // More helpers...
        }
    });
}

module.exports = hbsHelpers;
