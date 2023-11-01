/* eslint-disable react/prop-types */
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarGraph({ pData, label, xLabels }) {
  return (
    <BarChart
      width={500}
      height={400}
      series={[
        {
          data: pData,
          label: label,
          id: "pvId",
          stack: "total",
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
