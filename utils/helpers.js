

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
                return value1 + value2;
            },
            formatNum: function (num) {
                return num.toLocaleString("en-US")
            },
            getHSSkillLevel: function (data, index) {

            },
            getHSTotalXP: function (data, index) {
                return data['data'][index].totalXp
            },
            getHSTotalLevel: function (data, index) {
                return data['data'][index].totalLevel
            }
            // More helpers...
        }
    });
}

module.exports = hbsHelpers;
