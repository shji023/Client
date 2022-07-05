import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

function LineChart() {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setChartData(lineChartData);
    setChartOptions(lineChartOptions);
  }, []);
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}

export default LineChart;
