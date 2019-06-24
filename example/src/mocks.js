import React from 'react';

import helpers from './helpers';

const defaultChart = [
  {
    id: 1,
    label: 'Google',
    value: helpers.getRandomNumber(0, 50)
  },
  {
    id: 2,
    label: 'Facebook',
    value: helpers.getRandomNumber(0, 50)
  },
  {
    id: 3,
    label: 'Outbrain',
    value: helpers.getRandomNumber(0, 50)
  },
  {
    id: 4,
    label: 'Apple',
    value: helpers.getRandomNumber(0, 50)
  },
  {
    id: 5,
    label: 'Amazon',
    value: helpers.getRandomNumber(0, 50)
  },
];

const baselineWithNegatives = [
  {
    id: 1,
    label: 'Google',
    value: - (helpers.getRandomNumber(100, 1000))
  },
  {
    id: 2,
    label: 'Facebook',
    value: - (helpers.getRandomNumber(100, 1000))
  },
  {
    id: 3,
    label: 'Outbrain',
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 4,
    label: 'Apple',
    value: - (helpers.getRandomNumber(1, 1000))
  },
  {
    id: 5,
    label: 'Amazon',
    value: helpers.getRandomNumber(1, 1000)
  },
];

const customLabels = [
  {
    id: 1,
    color: '#ea4335',
    label: (
      <React.Fragment>
        <img src={'https://cdn3.iconfinder.com/data/icons/google-suits-1/32/1_google_search_logo_engine_service_suits-512.png'} alt="Google" />
      </React.Fragment>
    ),
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 2,
    color: '#3b5998',
    label: (
      <React.Fragment>
        <img src={'https://image.flaticon.com/icons/png/512/124/124010.png'} alt="Facebook" />
      </React.Fragment>
    ),
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 3,
    color: '#f18421',
    label: (
      <React.Fragment>
        <img src={'https://www.outbrain.com/favicon/favicon-192x192.png'} alt="Outbrain" />
      </React.Fragment>
    ),
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 4,
    color: '#7cbb00',
    label: (
      <React.Fragment>
        <img src={'https://diylogodesigns.com/wp-content/uploads/2016/04/Microsoft-Logo-icon-png-Transparent-Background-768x768.png'} alt="Microsoft" />
      </React.Fragment>
    ),
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 5,
    color: '#146eb4',
    label: (
      <React.Fragment>
        <img src={'https://www.freeiconspng.com/uploads/amazon-icon-6.png'} alt="Amazon" />
      </React.Fragment>
    ),
    value: helpers.getRandomNumber(1, 1000)
  },
];

const runByCommand = [
  {
    id: 1,
    color: '#000000',
    label: 'This',
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 2,
    color: '#333333',
    label: 'is',
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 3,
    color: '#666666',
    label: 'So',
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 4,
    color: '#999999',
    label: 'Freaking',
    value: helpers.getRandomNumber(1, 1000)
  },
  {
    id: 5,
    color: '#cccccc',
    label: 'Awesome!!!',
    value: helpers.getRandomNumber(1, 1000)
  },
];

export default {
  defaultChart,
  baselineWithNegatives,
  customLabels,
  runByCommand
}