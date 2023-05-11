import { Line } from "react-chartjs-2";
export const LineChart = ({ chartData, labelName }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{labelName} Test Header</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Text goes here"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};