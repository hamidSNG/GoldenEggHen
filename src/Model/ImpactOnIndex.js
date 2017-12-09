var convert = require('xml-js');

export default class ImpactOnIndex {
    constructor() {
        var symboleData = {}
        let url = 'http://www.tsetmc.com/Loader.aspx?Partree=151316&Flow=1';
        var x = '';
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
    }

    getData() {
        fetch(this.proxyurl + this.url)
            .then(response => response.text())
            .then(contents => process(contents))
            .catch(console.log("Can’t acces " + url + " response. Blocked browser?"))

        var process = function (returnData) {
            var el = document.createElement('html');
            el.innerHTML = returnData;

            var t = el.getElementsByTagName("table")[0];
            // console.log(t.rows);
            var obj = [].reduce.call(t.rows, function (res, row) {
                res[row.cells[0].textContent] = {
                    impact: row.cells[3].textContent,
                    url: row.cells[0].children[0]
                };
                return res
            }, {});

            var impacts = [];
            let i = 0;
            for (var key in obj) {
                if (key == 'نماد') {} else {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key].impact.includes(")")) {
                            i = obj[key].impact.replace(")", "");
                            i = -1 * i.replace("(", "");
                        } else {
                            i = 1 * obj[key].impact;
                        }
                        impacts.push({
                            symbol: key,
                            impact: i,
                            url: obj[key].url.href
                        })
                    }
                }
            }
            return impacts;
        }
        process();
    }

}