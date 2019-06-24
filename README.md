# react-live-charts ([demo](https://dsternlicht.github.io/react-live-charts/))

> Super awesome live charts library for React.

[![NPM](https://img.shields.io/npm/v/react-live-charts.svg)](https://www.npmjs.com/package/react-live-charts) [![Build Status](https://travis-ci.com/dsternlicht/react-live-charts.svg?branch=master)](https://travis-ci.com/dsternlicht/react-live-charts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Demo](https://raw.githubusercontent.com/dsternlicht/react-live-charts/master/example/demo.gif)](https://dsternlicht.github.io/react-live-charts/)

## Install

```bash
npm install --save react-live-charts
```

## Usage

Check out the [Demo](https://dsternlicht.github.io/react-live-charts/) to see it in action.

```jsx
import React, { Component } from 'react'

import { LiveBarChart } from 'react-live-charts'

class App extends Component {
  render () {
    return (
      <LiveBarChart
        
      />
    )
  }
}
```

## Props

| Property      | Type               | Default                               | Description                                                                                                                                  |
|:--------------|:-------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `data`  | array           | []                                  | An array of objects that contain the data of the chart. |
| `iterationTimeout`  | number           | 200                         | Number of milliseconds you want between iterations. |
| `startAutomatically`  | boolean           | true                                  | Whether the visualization should start running automatically. Default is `true` |
| `startRunningTimeout`  | number           | 0                         | Number of milliseconds you want before running the visualization. |
| `onRunStart`  | function           | null                                  | A callback function that being called once the visualization **starts** |
| `onRunEnd`  | function           | null                                  | A callback function that being called once the visualization **ends** |
| `showTitle`  | boolean           | true                                  | Whether you want to show each iteration's title |
| `barHeight`  | number           | 50                                  | The height (in pixels) of each bar item |
| `mainWrapperStyles`  | object           | {}                                  | Styles object for the component's main wrapper |
| `chartWrapperStyles`  | object           | {}                                  | Styles object for the chart wrapper |
| `baselineStyles`  | object           | {}                                  | Styles object for the baseline element |
| `iterationTitleStyles`  | object           | {}                                  | Styles object for the title element |
| `labelStyles`  | object           | {}                                  | Styles object for the chart's labels |

## License

MIT © [Daniel Sternlicht](https://github.com/dsternlicht)
