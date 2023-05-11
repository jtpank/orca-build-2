import React, { Component } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
class LiveChart extends Component {
    constructor(props) {
        super(props);
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
        </div>
    );
  }
}

export default LiveChart;