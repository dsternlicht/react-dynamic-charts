import React, { Component } from 'react';

import { LiveBarChart} from 'react-live-charts';

import helpers from './helpers';

import 'react-live-charts/dist/index.css';

export default class App extends Component {
  render () {
    return (
      <div className="bg">
        <LiveBarChart 
          data={helpers.generateData()}
          roundTimeout={100}
          mainWrapperStyles={{
            backgroundColor: '#333',
            color: '#fff'
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
          data={helpers.generateData(true)}
          barHeight={30}
          roundTimeout={250}
          baseline={0}
          mainWrapperStyles={{
            padding: '50px'
          }}
        />
      </div>
    )
  }
}
