import { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ id }) => {
  const [options] = useState({
    chart: {
      id: id,
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    xaxis: {
      labels: {
        show: false,
      },
      range: 10,
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 10,
    },
    tooltip: {
      enabled: false,
    },
  });

  const series = [
    {
      name: "Usage",
      data: [],
    },
  ];

  return <Chart options={options} series={series} />;
};

export default LineChart;
