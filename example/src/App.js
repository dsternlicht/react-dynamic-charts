import React, { Component } from 'react';

import { LiveBarChart} from 'react-live-charts';

import 'react-live-charts/dist/index.css';

const getRandomNumber = () => {
  return Math.round(Math.random(1, 1000) * 100);
};

const data = (() => {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    const values = [
      {
        id: 1,
        label: 'Google',
        value: getRandomNumber()
      },
      {
        id: 2,
        label: 'Facebook',
        value: getRandomNumber()
      },
      {
        id: 3,
        label: 'Outbrain',
        value: getRandomNumber()
      },
      {
        id: 4,
        label: 'Outbrain',
        value: getRandomNumber()
      },
      {
        id: 5,
        label: 'Amazon',
        value: getRandomNumber()
      },
    ];
    arr.push({
      name: `Round ${i}`,
      values
    });
  }
  return arr;
})();

export default class App extends Component {
  render () {
    return (
      <div className="bg">
        <LiveBarChart 
          data={data}
          roundTimeoutTtl={500}
        />
        <LiveBarChart 
          data={data}
          roundTimeoutTtl={500}
          baseline={17}
        />
      </div>
    )
  }
}
