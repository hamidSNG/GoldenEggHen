import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom';

class SymbolInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            
            symbolData : "is null"
        }

        setInterval(()=>{
            this.GetSymboleData();
        },10000)
    }

    GetSymboleData = (isin)=>
    {
        let url = `http://mdapi.tadbirrlc.com/api/INDINSTTRADE/${isin}`;
                const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.text())
            .then(contents => {
                this.setState({
                    symbolData: contents});
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