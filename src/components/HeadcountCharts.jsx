import { Card, Radio } from "antd";
import React, { useState } from "react";
import BarChart from "./BarChart";
import BarLineChart from "./BarLineChart";
import DetailedChart from "./DetailedChart";
import "./HeadcountCharts.css";

const barData = [
  { x: "Outubro MTD", y1: 111, y2: 150 },
  { x: "Novembro", y2: 100 },
  { x: "Dezembro", y2: 94 },
];

const lineData = [
  { x: "15/06", y: 111 },
  { x: "16/06", y: 100 },
  { x: "17/06", y: 94 },
  { x: "18/06", y: 111 },
  { x: "19/06", y: 100 },
  { x: "20/06", y: 94 },
  { x: "21/06", y: 94 },
];

const bar2Data = [
  { x: "15/06", y1: 111, y2: 150, y3: 111 },
  { x: "16/06", y1: 100, y2: 140, y3: 100 },
  { x: "17/06", y1: 94, y2: 134, y3: 94 },
  { x: "18/06", y1: 110, y2: 121, y3: 111 },
  { x: "19/06", y1: 99, y2: 110, y3: 100 },
  { x: "20/06", y1: 93, y2: 114, y3: 124 },
  { x: "21/06", y1: 93, y2: 114, y3: 124 },
];

const contractsData = [
  { x: "Agosto", line: 13.7, bar: 11 },
  { x: "Setembro", line: 5.7, bar: 12 },
  { x: "Outubro MTD", line: 0, bar: 13 },
  { x: "Meta MTD", bar: 12 },
];

const turnoverData = [
  { x: "Agosto", bar: 11, barPercent: 4 },
  { x: "Setembro", bar: 12, barPercent: 4 },
  { x: "Outubro MTD", bar: 13, barPercent: 4 },
  { x: "Meta MTD", bar: 12, barPercent: 5 },
];

const HeadcountCharts = () => {
  const [hcView, setHcView] = useState("resumido");
  return (
    <>
      <Card
        title="HC Ativo x HC Trabalhando"
        className={`hc-chart`}
        extra={
          <Radio.Group
            value={hcView}
            onChange={(e) => setHcView(e.target.value)}
          >
            <Radio.Button value="resumido">Resumido</Radio.Button>
            <Radio.Button value="detalhado">Detalhado</Radio.Button>
          </Radio.Group>
        }
      >
        {hcView === "resumido" && (
          <BarChart width={1000} height={500} barData={barData} />
        )}

        {hcView === "detalhado" && (
          <DetailedChart
            width={875}
            height={500}
            contractsData={contractsData}
            turnoverData={turnoverData}
          />
        )}
      </Card>
      <Card title="HC Ativo x HC Trabalhando" className={`hc-chart`}>
        <BarLineChart
          lineData={lineData}
          barData={bar2Data}
          width={1000}
          height={500}
        />
      </Card>
    </>
  );
};

export default HeadcountCharts;
