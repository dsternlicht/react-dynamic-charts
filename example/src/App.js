import React, { Component } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { DynamicBarChart } from "react-dynamic-charts";

import helpers from "./helpers";
import mocks from "./mocks";

import "react-dynamic-charts/dist/index.css";

export default class App extends Component {
  defaultChart = React.createRef();

  render() {
    return (
      <div className="main-section">
        <a href="https://github.com/dsternlicht/react-dynamic-charts">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACVCAMAAABmfEh9AAACc1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAABnZ2eCgoKlpaWSkpJtbW2Dg4OXl5dtbW0jIyMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZGR4eHiqqqqfn595eXl0dHSVlZWJiYloaGghISEAAAAAAAAAAAAAAABlZWWKioqxsbGdnZ1+fn6kpKSamppzc3MgICAAAAAAAAAAAAAAAABhYWFzc3OhoaGTk5NycnKLi4toaGgfHx8AAAAAAAAAAAAAAAAAAAAAAAAAAABfX1+IiIi3t7d1dXWbm5tzc3MAAAAAAAAAAAAAAABdXV19fX2ioqKQkJBubm4fHx9cXFyvr696enpxcXFsbGwAAAAAAABeXl6Hh4etra2ZmZmAgICmpqZwcHAAAAAAAABbW1ujo6OYmJgAAAAAAAC2trZ0dHR2dnagoKCPj4+zs7ONjY1vb29cXFynp6eUlJRtbW13d3eoqKhsbGxdXV1ra2twcHBqamppaWmMjIyGhoZoaGhnZ2dxcXF/f39mZmZlZWVkZGSEhIRpaWl7e3tjY2NiYmLAwMBqampeXl6urq5hYWFgYGCenp7///+WlpZfX1/p6el8fHzf39+rq6vS0tJYWFhaWlrJycm8vLxZWVlbW1tdXV2FhYWpqand3d1cXFxubm60tLRvb2/09PTIyMheXl6Ojo61tbXT09NXV1e7u7tra2vq6ure3t7V1dXBwcFycnKwsLC/v79VVVW9vb2cnJxWVlaBgYGysrLg4ODo6OhUVFTHx8e+vr7U1NTLy8usrKyRkZG6urpTU1Pz8/PR0dFxcXF0dHRbW1tkZGRiYmK4ubPZAAAA0XRSTlMAAQMEBwkMiv///////9o3JB8aFhIOCgUCDRGN/////////9o7JiEcF5H////////cPSgiHQaT///////bPykjGAgQFSCV/////90qEx4lmP////9Amv///9wLLJz//////90nLpz//xsv/93//////9yc///c////nf//////////3f//////2//////bnf//////////////////////////////3P/////////////c/////93////////////////////////////c25uUkLcVs+8AAAs6SURB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"
            alt="Fork me on GitHub"
          />
        </a>
        <div className="chart-row">
          <div className="description">
            <h3>Hello Dynamic Charts!</h3>
            <p>React Dynamic Charts will allow you to create awesome animated dynamic charts to visualize your data.</p>
            <p>Here's the most basic example of how to use Dynamic Charts:</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<DynamicBarChart
  data={this.state.data}
  // Timeout in ms between each iteration
  iterationTimeout={100}
/>`
              }
            </SyntaxHighlighter>
            <p>You may also add custom callbacks when animation starts, and animation ends. Check out your console to see it in action.</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<DynamicBarChart
  data={this.state.data}
  onRunStart={() => {
    console.log("Started!");
  }}
  onRunEnd={() => {
    console.log("Ended!");
  }}
/>`
              }
            </SyntaxHighlighter>
          </div>
          <DynamicBarChart
            data={helpers.generateData(100, mocks.defaultChart, {
              prefix: "Iteration"
            })}
            iterationTimeout={100}
            showTitle={true}
            mainWrapperStyles={{
              backgroundColor: '#fff'
            }}
            chartWrapperStyles={{
              maxWidth: '1200px'
            }}
            onRunStart={() => {
              console.log("Started!");
            }}
            onRunEnd={() => {
              console.log("Ended!");
            }}
            startRunningTimeout={2500}
          />
        </div>

        <div className="chart-row">
          <div className="description">
            <h3>Custom Labels</h3>
            <p>Dynamic Charts support custom labels. So if you want to add images rather than plain text, you can!</p>
            <p>All you'll have to do is to set a React element in the `label` field as part of your data structure:</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`var data = [
  {
    id: 1,
    label: (
      <React.Fragment>
        <img src={'...'} alt="..." />
      </React.Fragment>
    )
  },
  // ...
];`
              }
            </SyntaxHighlighter>
          </div>
          <DynamicBarChart
            data={helpers.generateData(100, mocks.customLabels, { prefix: "Year", initialValue: 2000 }, 10)}
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
            <h3>Baseline</h3>
            <p>If your chart has negative values, you may want to set a <strong>baseline</strong>.</p>
            <p>The `baseline` property is any numeric value. In the example below, we set up a baseline of 0.</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<DynamicBarChart
  data={this.state.data}
  baseline={0}
/>`
              }
            </SyntaxHighlighter>
          </div>
          <DynamicBarChart
            data={helpers.generateData(
              20,
              mocks.baselineWithNegatives,
              { prefix: "Year", initialValue: 2000 },
              100
            )}
            barHeight={30}
            showTitle={false}
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
            <h3>Run by Command</h3>
            <p>By default, the animation starts automatically. You may choose to start the animation after a certain timeout:</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<DynamicBarChart
  data={this.state.data}
  // Wait 2500 ms before animation starts
  startRunningTimeout={2500}
/>`
              }
            </SyntaxHighlighter>
            <p>Another option is to start the animation programmatically by calling the `start()` method, and disabling the `startAutomatically` flag:</p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<button onClick={() => this.defaultChart.current.start()}>
  Start Running!
</button>

<DynamicBarChart
  data={this.state.data}
  startAutomatically={false}
  ref={this.defaultChart}
/>`
              }
            </SyntaxHighlighter>
            <p>Go ahead, try it out:</p>
            <button onClick={() => this.defaultChart.current.start()}>
              Click Me!
            </button>
          </div>
          <DynamicBarChart
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
              console.log('It\'s on!');
            }}
          />
        </div>
        <div className="chart-row">
          <div className="description">
            <h3>Styles Go Crazy!</h3>
            <p>Although Dynamic Charts have default styling, you have various of option to control and change how your chart looks like.</p>
            <p></p>
            <SyntaxHighlighter language="javascript" style={hybrid}>
              {
`<DynamicBarChart
  data={this.state.data}
  barHeight={50}
  mainWrapperStyles={{
    backgroundColor: '#333',
    color: '#fff'
  }}
  chartWrapperStyles={{
    maxWidth: '800px',
    padding: '40px 20px'
  }}
  labelStyles={{
    fontSize: '35px'
  }}
  iterationTitleStyles={{
    color: '#fff',
    fontSize: '24px',
    backgroundColor: '#999',
    borderRadius: '50em',
    position: 'absolute',
    right: '20px',
    top: '440px',
    padding: '10px 30px'
  }}
/>`
              }
            </SyntaxHighlighter>
          </div>
          <DynamicBarChart
            data={helpers.generateData(100, mocks.stylesGoCrazy, { prefix: 'Year', initialValue: 2020 })}
            iterationTimeout={100}
            startRunningTimeout={4000}
            barHeight={50}
            chartWrapperStyles={{
              maxWidth: '1200px',
              padding: '40px 20px'
            }}
            mainWrapperStyles={{
              backgroundColor: '#333'
            }}
            iterationTitleStyles={{
              color: '#fff',
              fontSize: '24px',
              backgroundColor: '#999',
              borderRadius: '50em',
              position: 'absolute',
              right: '20px',
              top: '440px',
              padding: '10px 30px'
            }}
            labelStyles={{
              fontSize: '35px'
            }}
          />
        </div>
      </div>
    );
  }
}
