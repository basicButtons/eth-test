import React from 'react';
import { Line } from '@antv/g2plot';
import { DataView } from '@antv/data-set';
import * as _ from '@antv/util';
import "./index.css"
class TrendChart extends React.Component {
  chartNodeRef = React.createRef();
  chartRef = React.createRef();

  state = {
    tooltipItems: [],
    activeTooltipTitle: null,
    activeSeriesList: [],
  };

  componentDidMount() {
    // Step 2: 创建图表
    const chartDom = this.chartNodeRef.current;
    fetch('./data.json')
      .then( async(res) => {
        let result = await res.json()
        result.forEach(item=>{
          item.Beijing = item.California
          item.Shanghai = item.BA9C
          item.Guangzhou = item.Marin
        }
        )
        return  result
      })
      .then((originData) => {
        const dv = new DataView().source(originData);
        dv.transform({
          type: 'fold',
          fields: ['USA', 'Beijing', 'Shanghai', 'Guangzhou'], // 展开字段集
          key: 'series',
          value: 'value',
        });
        const data = dv.rows.map((d) => ({
          ...d,
          value: d.value ? Number(d.value) : d.value,
        }));
        if (this.chartRef) {
          this.chartRef?.current?.clear();
        }
        const line = new Line(chartDom, {
          data,
          autoFit: true,
          xField: 'Date',
          yField: 'value',
          seriesField: 'series',
          xAxis: {
            type: 'cat',
            label: {
              autoRotate: false,
              formatter: (v) => {
                return v.split('/').reverse().join('-');
              },
            },
          },
          yAxis: {
            grid: {
              line: {
                style: {
                  lineWidth: 0.5,
                },
              },
            },
          },
          meta: {
            Date: {
              range: [0.04, 0.96],
            },
          },
          point: {
            shape: 'circle',
            size: 2,
            style: () => {
              return {
                fillOpacity: 0,
                stroke: 'transparent',
              };
            },
          },
          appendPadding: [0, 0, 0, 0],
          legend: false,
          smooth: true,
          lineStyle: {
            lineWidth: 1.5,
          },
          tooltip: {
            showMarkers: false,
            follow: false,
            position: 'top',
            customContent: () => null,
          },
          theme: {
            geometries: {
              point: {
                circle: {
                  active: {
                    style: {
                      r: 4,
                      fillOpacity: 1,
                      stroke: '#000',
                      lineWidth: 1,
                    },
                  },
                },
              },
            },
          },
          interactions: [{ type: 'marker-active' }, { type: 'brush' }],
        });

        line.render();
        this.chartRef = line;
        // 初始化，默认激活
        const lastData = _.last(data);
        const point = line.chart.getXY(lastData);
        line.chart.showTooltip(point);
        const activeTooltipTitle = lastData.Date;
        this.setState({ tooltipItems: data.filter((d) => d.Date === activeTooltipTitle), activeTooltipTitle });

        line.on('plot:mouseleave', () => {
          line.chart.hideTooltip();
        });
        line.on('tooltip:change', (evt) => {
          const { title } = evt.data;
          const tooltipItems = data.filter((d) => d.Date === title);
          this.setState({ tooltipItems, activeTooltipTitle: title });
        });
      });
  }

  changeActiveSeries = (activeSeries) => {
    const { activeTooltipTitle, activeSeriesList } = this.state;
    let newList = [];
    if (!activeSeriesList.includes(activeSeries)) {
      newList = [...activeSeriesList, activeSeries];
    } else {
      newList = activeSeriesList.filter((s) => s !== activeSeries);
    }
    this.setState({ activeSeriesList: newList }, () => {
      // @ts-ignore
      const chart = this.chartRef?.chart;
      if (chart && activeSeries) {
        chart.filter('series', (series) => {
          return newList.includes(series) ? false : true;
        });
        chart.render(true);
        chart.geometries
          .find((geom) => geom.type === 'point')
          .elements.forEach((ele) => {
            const { Date, series } = ele.getModel().data;
            if (Date === activeTooltipTitle && series === activeSeries) {
              ele.setState('active', true);
            }
          });
      }
    });
  };

  generateTooltip = () => {
    // @ts-ignore
    const chart = this.chartRef?.chart;
    if (!chart) {
      return;
    }
    const { tooltipItems, activeSeriesList, activeTooltipTitle } = this.state;
    const { colors10 } = chart.themeObject;
    return (
      <div className="g2-tooltip">
        <div className="g2-tooltip-title">{activeTooltipTitle}</div>
        <div className="g2-tooltip-items">
          {tooltipItems.map((item, idx) => {
            const changeActiveSeries = () => this.changeActiveSeries(item.series);
            return (
              <div
                className={`g2-tooltip-item tooltip-${item.series} ${
                  activeSeriesList.includes(item.series) ? 'inactive' : ''
                }`}
                onClick={changeActiveSeries}
              >
                <div className="g2-tooltip-item-marker" style={{ background: colors10[idx] }}></div>
                <div className="g2-tooltip-item-label">{item.series}</div>
                <div className="g2-tooltip-item-value">{item.value || '-'}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    return (
      <section className={'wrapper trend-wrapper'}>
        {this.generateTooltip()}
        <div className={'chart-wrapper'} ref={this.chartNodeRef} />
      </section>
    );
  }
}


export default TrendChart