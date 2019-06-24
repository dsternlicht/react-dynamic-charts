import React, { Component } from 'react';

import { LiveBarChart} from 'react-live-charts';

import helpers from './helpers';
import mocks from './mocks';

import 'react-live-charts/dist/index.css';

export default class App extends Component {
  defaultChart = React.createRef();

  render () {
    return (
      <div>
        <LiveBarChart 
          data={helpers.generateData(100, mocks.defaultChart)}
          roundTimeout={100}
          showTitle={false}
          mainWrapperStyles={{
            backgroundColor: '#eee',
          }}
          chartWrapperStyles={{
            maxWidth: '1200px'
          }}
          onRunStart={() => {
            console.log('Started!');
          }}
          onRunEnd={() => {
            console.log('Ended!');
          }}
          startRunningTimeout={2500}
        />
        
        <LiveBarChart 
          data={helpers.generateData(20, mocks.baselineWithNegatives, { prefix: 'Year', initialValue: 2000 }, 100)}
          barHeight={30}
          roundTimeout={1000}
          startRunningTimeout={1500}
          baseline={0}
          mainWrapperStyles={{
            padding: '50px'
          }}
        />

        <LiveBarChart 
          data={helpers.generateData(100, mocks.customLabels, { prefix: 'Round' }, 10)}
          roundTimeout={100}
          chartWrapperStyles={{
            maxWidth: '1200px'
          }}
          mainWrapperStyles={{
            backgroundColor: '#eee'
          }}
          startRunningTimeout={0}
          startAutomatically={false}
          ref={this.defaultChart}
          onRunStart={() => {
            console.log('It is on!');
          }}
        />
        <button onClick={() => this.defaultChart.current.start()}>Start Running!</button>
      </div>
    )
  }
}
