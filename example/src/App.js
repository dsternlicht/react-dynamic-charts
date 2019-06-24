import React, { Component } from 'react';

import { LiveBarChart} from 'react-live-charts';

import helpers from './helpers';
import mocks from './mocks';

import 'react-live-charts/dist/index.css';

export default class App extends Component {
  render () {
    return (
      <div>
        <LiveBarChart 
          data={helpers.generateData(100, mocks.defaultChart)}
          roundTimeout={100}
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
            console.log('Done!');
          }}
          startRunningTimeout={2500}
        />
        
        <LiveBarChart 
          data={helpers.generateData(20, mocks.baselineWithNegatives, { prefix: 'Year', initialValue: 2000 })}
          barHeight={30}
          roundTimeout={1000}
          startRunningTimeout={1500}
          baseline={0}
          mainWrapperStyles={{
            padding: '50px'
          }}
        />

        <LiveBarChart 
          data={helpers.generateData(100, mocks.customLabels, { prefix: 'Round' })}
          roundTimeout={100}
          chartWrapperStyles={{
            maxWidth: '1200px'
          }}
          mainWrapperStyles={{
            backgroundColor: '#eee'
          }}
          startRunningTimeout={2500}
        />
      </div>
    )
  }
}
