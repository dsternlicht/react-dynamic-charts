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
    roundTimeout: PropTypes.number,
    data: PropTypes.array,
    startRunningTimeout: PropTypes.number,
    barHeight: PropTypes.number,
    baseline: PropTypes.number,
    mainWrapperStyles: PropTypes.object,
    chartWrapperStyles: PropTypes.object,
    baselineStyles: PropTypes.object,
    iterationTitleStyles: PropTypes.object,
    labelStyles: PropTypes.object,
    onRunStart: PropTypes.func,
    onRunEnd: PropTypes.func,
    startAutomatically: PropTypes.bool,
    showTitle: PropTypes.bool
  };
  static defaultProps = {
    startAutomatically: true,
    showTitle: true,
    roundTimeout: 200,
    data: [],
    startRunningTimeout: 0,
    barHeight: 50,
    baseline: null,
    mainWrapperStyles: {},
    chartWrapperStyles: {},
    baselineStyles: {},
    iterationTitleStyles: {},
    labelStyles: {},
    onRunStart: null,
    onRunEnd: null
  };
  eventStream = null;
  roundTimeout = null;
  state = {
    dataQueue: [],
    activeItemIdx: 0,
    highestValue: 0,
    currentValues: {}
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.setState({
      dataQueue: this.props.data
    }, () => {
      if (this.props.startAutomatically) {
        this.start();
      } else {
        this.setNextValues();
      }
    });
  }

  start = () => {
    if (this.props.onRunStart) {
      this.props.onRunStart();
    }
    this.nextStep(true);
  }

  setNextValues = (callback = () => {}) => {
    const { dataQueue, activeItemIdx, currentValues } = this.state;

    if (!dataQueue[activeItemIdx]) {
      this.roundTimeout = null;
      if (this.props.onRunEnd) {
        this.props.onRunEnd();
      }
      return;
    }

    const roundData = dataQueue[activeItemIdx].values;
    const nextValues = {};
    let highestValue = 0;
    roundData.map((c) => {
      nextValues[c.id] = {
        ...c,
        color: c.color || (currentValues[c.id] || {}).color || getRandomColor()
      };

      if (Math.abs(c.value) > highestValue) {
        highestValue = Math.abs(c.value);
      }

      return c;
    });

    this.setState({
      currentValues: nextValues,
      highestValue,
      activeItemIdx: activeItemIdx + 1
    }, callback);
  }

  nextStep = (firstRun) => {
    this.setNextValues(() => {
      this.roundTimeout = window.setTimeout(this.nextStep, firstRun ? this.props.startRunningTimeout : this.props.roundTimeout);
    });
  }

  render() {
    const { currentValues, highestValue, dataQueue, activeItemIdx } = this.state;
    const { barHeight, baseline, roundTimeout, chartWrapperStyles, mainWrapperStyles, iterationTitleStyles, labelStyles, baselineStyles, showTitle } = this.props;
    const maxValue = highestValue / 0.85;
    const sortedCurrentValues = Object.keys(currentValues).sort((a, b) => currentValues[b].value - currentValues[a].value);
    const hasBaseline = baseline !== null && !isNaN(baseline);
    const currentItem = dataQueue[activeItemIdx - 1] || {};

    return (
      <div className="live-chart" style={mainWrapperStyles}>
        {
          <React.Fragment>
            {
              showTitle &&
              <h1 style={iterationTitleStyles}>{currentItem.name}</h1>
            }
            <section className="chart" style={chartWrapperStyles}>
              {
                hasBaseline &&
                <div className="baseline" style={baselineStyles}><span>{baseline}</span></div>
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
                      <div className={`bar-wrapper ${behindbaseline ? 'behind-baseline' : ''}`} style={{ width: widthStr, top: (barHeight + 20) * idx, transitionDuration: roundTimeout / 1000 }} key={`bar_${key}`}>
                        <label style={labelStyles}>
                          {
                            !currentValueData.label
                              ? key
                              : currentValueData.label
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
