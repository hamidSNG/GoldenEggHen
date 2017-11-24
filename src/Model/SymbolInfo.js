import React, {
    Component
} from 'react'
import ReactDOM from 'react-dom';

class SymbolInfo extends Component {

    constructor(props)
    {
      
        super(props);
        console.log(props);
        this.state = {
            isin : this.props.isin,
            symbolData : "is null"
        }

    
    }

    componentDidMount(){
        this.timerId = setInterval(()=>{
            this.GetSymboleData(this.state.isin);
        },30000)
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

            'h1', null, this.state.symbolData
        );
    }
}

export default SymbolInfo;