import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList } from 'rechart';
    
class ClientChangesChart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (       <LineChart
            width={400}
            height={400}
            
            data={[
              { name: 'Page A',  pv: 2400 },
              { name: 'Page B',  pv: 4567 },
              { name: 'Page C',  pv: 1398 },
              { name: 'Page D',  pv: 9800 },
              { name: 'Page E',  pv: 5500 },
              { name: 'Page F',  pv: 4800 },
              { name: 'Page G',  pv: 4800 },
              { name: 'Page H',  pv: 4800 },
              { name: 'Page I',  pv: 4800 },
              { name: 'Page J',  pv: 4800 },
            ]}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
    
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          </LineChart> )
    }
}

export default ClientChangesChart;
