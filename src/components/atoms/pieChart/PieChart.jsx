import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ id, label, series }) => {
  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
        id,
      },
      labels: label,
      legend: {
        formatter: function (seriesName, opts) {
          return [seriesName, " : ", opts.w.globals.series[opts.seriesIndex]];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }),
    [label]
  );

  return <Chart options={options} series={series} type="donut" />;
};

export default PieChart;
