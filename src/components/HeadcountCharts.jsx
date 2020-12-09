import { Card, Radio } from "antd";
import React from "react";
import BarGraph from "./BarChart";
import BarLineChart from "./BarLineChart";
import "./HeadcountCharts.css";

const data = {
  labels: ["Outubro MTD", "Novembro", "Dezembro"],
  datasets: [
    { data: [39, 0, 0], backgroundColor: "#D4380D" },
    { data: [42, 44, 44], backgroundColor: "#8C8C8C" },
  ],
};

const data2 = {
  labels: ["15/09", "16/09", "17/09"],
  datasets: [
    { data: [35, 34, 28], backgroundColor: ["#237804", "#237804", "#D4380D"] },
    { data: [33, 44, 44], backgroundColor: "#8C8C8C" },
    { data: [111, 100, 94], type: "line", backgroundColor: "#00000000" },
  ],
};

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const HeadcountCharts = () => {
  return (
    <>
      <Card title="HC Ativo x HC Trabalhando" className={`hc-chart`}>
        <BarGraph width={1000} height={500} />
      </Card>
      <Card title="HC Ativo x HC Trabalhando" className={`hc-chart`}>
        <BarLineChart width={1000} height={500} />
      </Card>
    </>
  );
};

export default HeadcountCharts;
