import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
};

export class LiveBarChart extends Component {
  static propTypes = {
    roundTimeoutTtl: PropTypes.number,
    data: PropTypes.array,
    startStreamingTimeout: PropTypes.number,
    barHeight: PropTypes.number,
    baseline: PropTypes.number,
    mainWrapperStyles: PropTypes.object,
    chartWrapperStyles: PropTypes.object
  };
  static defaultProps = {
    roundTimeoutTtl: 200,
    data: [],
    startStreamingTimeout: 0,
    barHeight: 50,
    baseline: null,
    mainWrapperStyles: {},
    chartWrapperStyles: {}
  };
  eventStream = null;
  roundTimeout = null;
  state = {
    loading: true,
    dataQueue: [],
    activeItemIdx: 0,
    highestValue: 0,
    currentValues: {}
  };

  componentDidMount() {
    this.start();
  }

  start = () => {
    window.setTimeout(() => {
      this.setState({
        dataQueue: this.props.data
      }, () => this.nextStep(true));
    }, this.props.startStreamingTimeout);
  }

  nextStep = (firstRun) => {
    const { dataQueue, activeItemIdx, currentValues } = this.state;

    if (!dataQueue[activeItemIdx]) {
      console.log('No item in data queue.', activeItemIdx, dataQueue);
      this.roundTimeout = null;
      return;
    }

    if (firstRun) {
      this.setState({ loading: false });
    }

    const roundData = dataQueue[activeItemIdx].values;
    const nextRanking = {};
    let highestValue = 0;
    roundData.map((c) => {
      nextRanking[c.id] = {
        ...c,
        color: c.color || (currentValues[c.id] || {}).color || getRandomColor()
      };

      if (Math.abs(c.value) > highestValue) {
        highestValue = Math.abs(c.value);
      }

      return c;
    });

    this.setState({
      currentValues: nextRanking,
      highestValue
    });

    this.setState({
      activeItemIdx: activeItemIdx + 1
    }, () => {
      this.roundTimeout = window.setTimeout(this.nextStep, firstRun ? 2000 : this.props.roundTimeoutTtl);
    });
  }

  render() {
    const { currentValues, highestValue, dataQueue, activeItemIdx } = this.state;
    const { barHeight, baseline, roundTimeoutTtl, chartWrapperStyles, mainWrapperStyles } = this.props;
    const maxValue = highestValue / 0.85;
    const sortedCurrentValues = Object.keys(currentValues).sort((a, b) => currentValues[b].value - currentValues[a].value);
    const hasBaseline = baseline !== null && !isNaN(baseline);
    const currentItem = dataQueue[activeItemIdx - 1] || {};

    return (
      <div className="live-chart" style={mainWrapperStyles}>
        {
          <React.Fragment>
            <h1>{currentItem.name}</h1>
            <section className="chart" style={chartWrapperStyles}>
              {
                hasBaseline &&
                <div className="baseline"><span>{baseline}</span></div>
              }
              <div className={`chart-bars ${hasBaseline ? 'with-baseline' : ''}`} style={{ height: (barHeight + 20) * Object.keys(currentValues).length }}>
                {
                  sortedCurrentValues.map((key, idx) => {
                    const currentValueData = currentValues[key];
                    const value = hasBaseline ? (currentValueData.value || baseline) - baseline : currentValueData.value;
                    let width = Math.abs((value / maxValue * 100));
                    let behindbaseline = false;
                    if (hasBaseline && currentValueData.value < baseline) {
                      behindbaseline = true;
                    }

                    if (hasBaseline) {
                      width = width / 2;
                    }

                    let widthStr;
                    if (isNaN(width) || !width) {
                      widthStr = '1px';
                    } else {
                      widthStr = `${width}%`;
                    }

                    return (
                      <div className={`bar-wrapper ${behindbaseline ? 'behind-baseline' : ''}`} style={{ width: widthStr, top: (barHeight + 20) * idx, transitionDuration: roundTimeoutTtl / 1000 }} key={`bar_${key}`}>
                        <label>
                          {
                            !currentValueData.label &&
                            <span>{key}</span>
                          }
                          {
                            currentValueData.label &&
                            (
                              typeof currentValueData.label === 'string'
                                ? <span>{currentValueData.label}</span>
                                : currentValueData.label
                            )
                          }
                        </label>
                        <div className="bar" style={{ height: barHeight, background: typeof currentValueData.color === 'string' ? currentValueData.color : `linear-gradient(to right, ${currentValueData.color.join(',')})` }} />
                        <span className="value" style={{ color: typeof currentValueData.color === 'string' ? currentValueData.color : currentValueData.color[0] }}>{currentValueData.value}</span>
                      </div>
                    );
                  })
                }
              </div>
            </section>
          </React.Fragment>
        }
      </div>
    );
  }
}
