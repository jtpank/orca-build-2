import React, { Component } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { LineChart } from './LineChart';
class LiveChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _chartData: {
              labels: [],
              datasets: [
                {
                  label: "Dataset 1",
                  data: [],
                  fill: false,
                  borderColor: "#f44336",
                  tension: 0.1,
                },
              ],
            },
            _labelName:"<Example Label>",
          };
          this.updateChart = this.updateChart.bind(this);
      }
    componentDidMount() {
      Chart.register(CategoryScale);
    }
    componentDidUpdate(prevProps) {
      if (prevProps.liveChartOddsData !== this.props.liveChartOddsData) {
        let new_data = [];
        if (this.props.liveChartOddsData && this.props.liveChartOddsData.length > 0) 
        {
          // console.log( this.props.liveChartOddsData)
          new_data = this.props.liveChartOddsData.map((element) => 
          element[0].markets[0].outcomes[0].price
          );
        }
        console.log(new_data)
        this.updateChart(new_data, this.props.liveChartTimeStamps);
      }
    }
    updateChart(new_data, new_labels) {
      this.setState(prevState => ({
        _chartData: {
          ...prevState._chartData,
          labels: new_labels,
          datasets: [
            {
              ...prevState._chartData.datasets[0],
              data: new_data,
            }
          ]
        }
      }));
    }
  render() {
    return (
        <div>
            Live Chart!
            <LineChart
            chartData={this.state._chartData}
            labelName={this.state._labelName}
            ></LineChart>
        </div>
    );
  }
}

export default LiveChart;