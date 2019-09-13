import React, { Component } from 'react';
import { read } from 'fs';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import optionSymbol from '../Data/optionSymbol.json';
import SymbolInfo from './SymbolInfo';
import buildQuery from 'odata-query';


export default class OptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "نماد", field: "SymbolName", filter: true
      }, {
        headerName: "قیمت اعمال", field: "ApplyPrice"
      }, {
        headerName: "تاریخ اعمال", field: "date", sortable: true
      }
        , {
        headerName: "مانده روز", field: "leaveDay"
      }, {
        headerName: "قیمت", field: "Price"
      }
        , {
        headerName: "قیمت سهم پایه", field: "BasePrice"
      }
        , {
        headerName: "تعداد برای فروش", field: "BestSellQuantity", filter: "agNumberColumnFilter"
      }
        , {
        headerName: "قیمت برای فروش", field: "BestSellPrice"
      }
      , {
        headerName: "قیمت من", field: "MyPrice", filter: "agNumberColumnFilter"
      }

      ],
      rowData: optionSymbol
    }
    //
  }



  componentWillMount() {

    setInterval(() => {
      this.UpdatePrices();
    }, 20000);
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  async UpdatePrices() {
   await this.setState((state) => {
      rowData: state.rowData.map((symbol) => {
        var isin = symbol.BaseISIN;
        const filter = { SymbolISIN: isin }
        const query = buildQuery({ filter });
        let url = `http://mdapi.tadbirrlc.com/api/symbol/${query}`;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
          .then((response) => {
            response.json().then((data) => {
              // var data = JSON.stringify(contents);
              var result = data.List[0];
              if (result !== "undefined") {
                try {
                  if ('LastTradedPrice' in result)
                    symbol.BasePrice = result.LastTradedPrice;
                }
                catch (err) { console.log(result) };

              }

            })
              .catch(console.log("Can’t acces " + url + " response. Blocked browser?"))




          }

          )
      })
    });

    await this.setState((state) => {
      rowData: state.rowData.map((symbol) => {
        var isin = symbol.ISIN;
        const filter = { SymbolISIN: isin }
        const query = buildQuery({ filter });
        let url = `http://mdapi.tadbirrlc.com/api/symbol/${query}`;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
          .then((response) => {
            response.json().then((data) => {
              // var data = JSON.stringify(contents);
              var result = data.List[0]
              //console.log(result);
              try {
                if (result !== "undefined") {
                  if ('LastTradedPrice' in result)
                    symbol.Price = result.LastTradedPrice;

                  if ('BidAskFirstRow' in result)
                    symbol.BestSellPrice = result.BidAskFirstRow.BestSellPrice;


                  if ('BidAskFirstRow' in result)
                    symbol.BestSellQuantity = result.BidAskFirstRow.BestSellQuantity;
                }
              }
              catch (err) { console.log(result) };
            })
              .catch(console.log("Can’t acces " + url + " response. Blocked browser?"))




          }

          )
      })
    });

    this.setState((state) => {
      rowData: state.rowData.filter(symbol =>

        symbol.BestSellQuantity > 0
      )
    });


    await this.setState((state) => {
      rowData: state.rowData.map((symbol) => {
        symbol.MyPrice = symbol.BasePrice -(symbol.ApplyPrice + symbol.Price) ;
      })
    });

    this.gridApi.redrawRows();

  }
  render() {


    return (
      <div
        className="ag-theme-material"
        style={{
          height: '500px',
          width: '1500px'
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          enableRtl={true}
          onGridReady={this.onGridReady}
        >



        </AgGridReact>
      </div>
    );
  }
}

