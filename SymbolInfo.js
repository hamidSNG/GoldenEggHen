import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom';
var Client = require('node-rest-client').Client;

class SymbolInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            
            testData : "is null"
        }

        setInterval(()=>{
            this.GetSymboleData();
        },10000)
    }

    GetSymboleData = ()=>
    {
        let url = 'http://mdapi.tadbirrlc.com/api/INDINSTTRADE/IRO1NSTH0001';
                const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
                this.setState({
                    testData: contents});
            })
            .catch(console.log("Can’t acces " + url + " response. Blocked browser?"))
            
    }

    render() {

        return React.createElement(

            'h1', null, this.state.testData
        );
    }
}

export default SymbolInfo;