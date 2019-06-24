import React, { Component } from 'react';

import { LiveBarChart} from 'react-live-charts';

import 'react-live-charts/dist/index.css';

const getRandomNumber = (min, max) => {
  return Math.round(Math.random(min, max) * 100);
};

const data = (negativeValues) => {
  const arr = [];
  for (let i = 0; i <= 100; i++) {
    const values = [
      {
        id: 1,
        label: (
          <React.Fragment>
            <img src={'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'} />
          </React.Fragment>
        ),
        value: i === 0 ? getRandomNumber(1, 1000) : arr[i - 1].values[0].value + getRandomNumber(0, 100)
      },
      {
        id: 2,
        label: 'Facebook',
        value: i === 0 ? (negativeValues ? -getRandomNumber(1, 1000) : getRandomNumber(1, 1000)) : arr[i - 1].values[1].value + getRandomNumber(0, 100)
      },
      {
        id: 3,
        color: '#f18421',
        label: (
          <React.Fragment>
            <img src={'https://www.outbrain.com/images/logo.png?version=f80704f215b146c0d269a38cb085de856f58da30'} />
          </React.Fragment>
        ),
        value: i === 0 ? (negativeValues ? -getRandomNumber(1, 1000) : getRandomNumber(1, 1000)) : arr[i - 1].values[2].value + getRandomNumber(0, 100)
      },
      {
        id: 4,
        label: 'Apple',
        color: ['blue', 'lime'],
        value: i === 0 ? (negativeValues ? -1000 - getRandomNumber(1, 1000) : getRandomNumber(1, 1000)) : arr[i - 1].values[3].value + getRandomNumber(0, 100)
      },
      {
        id: 5,
        label: 'Amazon',
        value: i === 0 ? getRandomNumber(1, 1000) : arr[i - 1].values[4].value + getRandomNumber(0, 100)
      },
    ];
    arr.push({
      name: `Year ${2000 + i}`,
      values
    });
  }
  return arr;
};

export default class App extends Component {
  render () {
    return (
      <div className="bg">
        <LiveBarChart 
          data={data()}
          barHeight={20}
          roundTimeoutTtl={750}
          chartWrapperStyles={{
            backgroundColor: '#333',
            color: '#fff'
          }}
        />
        <LiveBarChart 
          data={data(true)}
          roundTimeoutTtl={350}
          baseline={0}
        />
      </div>
    )
  }
}
