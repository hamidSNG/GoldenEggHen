var convert = require('xml-js');
var symboleData= {}

let url = 'http://www.tsetmc.com/Loader.aspx?Partree=151316&Flow=1';
var x = '';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => process(contents))
.catch(console.log("Can’t acces " + url + " response. Blocked browser?")) 

var process = function(returnData)
{
    var el = document.createElement( 'html' );
    el.innerHTML = returnData;
    console.log(returnData);
    //var formContent =el.getElementsByTagName('form')['form1'];
    
    var t = el.getElementsByTagName("table")[0];
    

    var obj = [].reduce.call(t.rows, function(res, row) {
        res[row.cells[0].textContent] = row.cells[3].textContent;
        return res
    }, {});
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(key + " -> " + obj[key]);
        }
    }

   // formContent = '<?xml version="1.0" encoding="utf-8"?>' +String.toString(formContent);
    //let jsonContent = convert.xml2json(, {compact: true, spaces: 4})
    //let scriptData= formContent.getElementsByTagName('script')[0].innerHTML;
    // scriptData =scriptData.toString().replace(";", ","); 
    // scriptData =scriptData.toString().replace(";", ","); 
   // scriptData =scriptData.toString().replace(',',';'); 

    
    
    
//     scriptData =scriptData.toString().replace("var", ""); 

//     scriptData = 'var  obj= {' + scriptData + ';}';
    //let arr = scriptData.split(',');

    //console.log(JSON.parse(scriptData));
   // var x = JSON.parse(returnData)
   // console.log(x.IndInstTrade.SymbolFa);
    // eval(scriptData); 
    // console.log(LSecVal);
}
process();
