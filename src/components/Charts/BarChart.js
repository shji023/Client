import React, { useEffect, useState } from "react";
import { lineChartData, lineChartOptions } from "variables/charts";

function LineChart() {
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setChartData(lineChartData);
    setChartOptions(lineChartOptions);
  }, []);
  return <Chart options={chartOptions} series={chartData} type="bar" width="100%" height="100%" />;
}

export default LineChart;
