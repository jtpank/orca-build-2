import React, { Component } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { LineChart } from './LineChart';
class LiveChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _chartData: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [
                {
                  label: "Dataset 1",
                  data: [12, 19, 3, 5, 2, 3, 15],
                  fill: false,
                  borderColor: "#f44336",
                  tension: 0.1,
                },
                {
                  label: "Dataset 2",
                  data: [4, 9, 10, 15, 12, 8, 3],
                  fill: false,
                  borderColor: "#2196f3",
                  tension: 0.1,
                },
              ],
            },
            _labelName:"<Example Label>",
          };
      }
    componentDidMount() {
    // this.updateChart();
    // setInterval(this.updateChart, 30000);
    }
    async updateChart() {
        // const data = await this.props.fetchData();
        // this.setState({ data });
    }
  render() {
    Chart.register(CategoryScale);
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