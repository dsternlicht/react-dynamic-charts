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
        <div className="chart-row">
          <div className="description">
            <h3>Hello Live Charts!</h3>
            <p>A few words about live charts</p>
          </div>
          <LiveBarChart 
            data={helpers.generateData(100, mocks.defaultChart)}
            iterationTimeout={100}
            showTitle={false}
            mainWrapperStyles={{
              backgroundColor: '#fff',
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
        </div>

        <div className="chart-row">
          <div className="description">
            <h3>Baseline</h3>
          </div>
          <LiveBarChart 
            data={helpers.generateData(20, mocks.baselineWithNegatives, { prefix: 'Year', initialValue: 2000 }, 100)}
            barHeight={30}
            iterationTimeout={1000}
            startRunningTimeout={1500}
            baseline={0}
            mainWrapperStyles={{
              backgroundColor: '#fff'
            }}
          />
        </div>

        <div className="chart-row">
          <div className="description">
            <h3>Custom Labels</h3>
          </div>
          <LiveBarChart 
            data={helpers.generateData(100, mocks.customLabels, { prefix: 'Round' }, 10)}
            iterationTimeout={100}
            chartWrapperStyles={{
              maxWidth: '1200px'
            }}
            mainWrapperStyles={{
              backgroundColor: '#fff'
            }}
            startRunningTimeout={0}
          />
        </div>

        <div className="chart-row">
          <div className="description">
            <h3>Run by Command</h3>
            <button onClick={() => this.defaultChart.current.start()}>Start Running!</button>
          </div>
          <LiveBarChart 
            data={helpers.generateData(100, mocks.runByCommand)}
            showTitle={false}
            iterationTimeout={100}
            barHeight={20}
            chartWrapperStyles={{
              maxWidth: '1200px'
            }}
            mainWrapperStyles={{
              backgroundColor: '#fff'
            }}
            startAutomatically={false}
            ref={this.defaultChart}
            onRunStart={() => {
              console.log('It is on!');
            }}
          />
        </div>

      </div>
    )
  }
}
