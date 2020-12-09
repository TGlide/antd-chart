import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scalePoint } from "@visx/scale";
import { Bar, LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import React from "react";
import "./styles.css";

import { ReactComponent as LineSVG } from "../../line.svg";
import { Col, Row } from "antd";

const defaultMargin = { top: 40, right: 0, bottom: 40, left: 40 };
const background = "#ffffff";

export default function DetailedChart({
  width,
  height,
  contractsData,
  turnoverData,
  events = false,
  margin = defaultMargin,
}) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const barYMax = yMax - 50;

  const xScale = scaleBand({
    domain: contractsData.map((d) => d.x),
    range: [0, xMax],
    round: true,
    padding: 0.2,
  });

  const barYScale = scaleLinear({
    domain: [
      0,
      Math.max(...contractsData.map((d) => Math.max(d.bar || 0) || 0)),
    ],
    range: [barYMax, 50],
  });

  const lineYScale = scaleLinear({
    domain: [
      0,
      Math.max(...contractsData.map((d) => Math.max(d.line || 0) || 0)),
    ],
    range: [50, 0],
  });

  const turnoverXScale = scaleBand({
    domain: turnoverData.map((d) => d.x),
    range: [0, xMax],
    round: true,
    padding: 0.2,
  });

  const turnoverYScale = scaleLinear({
    domain: [
      0,
      Math.max(...turnoverData.map((d) => Math.max(d.bar || 0) || 0)),
    ],
    range: [barYMax, 50],
  });

  const barWidth = 50;
  const barPadding = 10;

  const contractsMeta = contractsData[contractsData.length - 1].bar;
  const turnoverMeta = turnoverData[turnoverData.length - 1].bar;

  return width < 10 ? null : (
    <Row gutter={8}>
      <Col span={12}>
        <div className="header" style={{ marginLeft: margin.left }}>
          <h1 className="header__title">Contratações</h1>
          <h3 className={`header__subtitle`}>Atingimento</h3>
          <span className={`header__data`}>75%</span>
        </div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={background}
            rx={14}
          />
          <Group
            top={margin.top}
            left={margin.left}
            right={margin.right}
            bottom={margin.bottom}
          >
            <LinePath
              data={contractsData}
              stroke="#BFBFBF"
              strokeWidth={""}
              x={(a) => xScale(a.x) + xScale.bandwidth() / 2}
              y={(a) => lineYScale(a.line)}
            />
            {contractsData.map((d) => {
              const x = xScale(d.x) + xScale.bandwidth() / 2;
              if (d.line === undefined) return null;
              return (
                <>
                  <circle
                    r={5}
                    cx={x}
                    cy={lineYScale(d.line)}
                    stroke="#ACACAC"
                    fill="#ACACAC"
                  />

                  <Text
                    x={x}
                    y={lineYScale(d.line)}
                    dy={-15}
                    textAnchor="middle"
                    stroke="#ACACAC"
                    fill="#ACACAC"
                  >
                    {`${d.line}%`}
                  </Text>
                </>
              );
            })}

            {contractsData.map((d) => {
              const barHeight = barYMax - barYScale(d.bar);
              const barX = xScale(d.x) + xScale.bandwidth() / 2 - barWidth / 2;
              const barY = yMax - barHeight;
              const color = d.x.includes("Meta")
                ? "#8c8c8c"
                : contractsMeta > d.bar
                ? "#D4380D"
                : "#73D13D";

              return (
                <>
                  <Bar
                    x={barX}
                    y={barY}
                    width={barWidth}
                    fill={color}
                    stroke={color}
                    height={barHeight}
                  />
                  <Text
                    x={barX + barWidth / 2}
                    y={barY}
                    dy={20}
                    textAnchor="middle"
                    stroke="white"
                    fill="white"
                  >
                    {`${d.bar}`}
                  </Text>
                </>
              );
            })}
          </Group>
          <Group left={margin.left} right={margin.right}>
            <AxisBottom
              top={yMax + margin.top}
              scale={xScale}
              stroke={"black"}
              tickStroke={"black"}
              // hideAxisLine
              tickLabelProps={() => ({
                fill: "black",
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          </Group>
        </svg>
        <div className={`legends`} style={{ marginLeft: margin.left }}>
          <div className="legends__item">
            <div className="legends__color legends__color--green" />
            <div className="legends__label">Acima da meta</div>
          </div>
          <div className="legends__item">
            <div className="legends__color legends__color--red" />
            <div className="legends__label">Abaixo da meta</div>
          </div>
          <div className="legends__item">
            <div className="legends__color legends__color--gray" />
            <div className="legends__label">Meta</div>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="header" style={{ marginLeft: margin.left }}>
          <h1 className="header__title">Turnover</h1>
          <h3 className={`header__subtitle`}>Atingimento</h3>
          <span className={`header__data`}>75%</span>
        </div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill={background}
            rx={14}
          />
          <Group
            top={margin.top}
            left={margin.left}
            right={margin.right}
            bottom={margin.bottom}
          >
            {turnoverData.map((d) => {
              const barHeight = barYMax - barYScale(d.bar);
              const barX = xScale(d.x) + xScale.bandwidth() / 2 - barWidth / 2;
              const barY = yMax - barHeight;
              const color = d.x.includes("Meta")
                ? "#8c8c8c"
                : turnoverMeta < d.bar
                ? "#D4380D"
                : "#73D13D";

              return (
                <>
                  <Bar
                    x={barX}
                    y={barY}
                    width={barWidth}
                    fill={color}
                    stroke={color}
                    height={barHeight}
                  />
                  <Text
                    x={barX + barWidth / 2}
                    y={barY}
                    dy={20}
                    textAnchor="middle"
                    stroke="white"
                    fill="white"
                  >
                    {`${d.bar}`}
                  </Text>
                  <Text
                    x={barX + barWidth / 2}
                    y={barY}
                    dy={-20}
                    textAnchor="middle"
                    fill="#8c8c8c"
                  >
                    {`${d.barPercent}%`}
                  </Text>
                </>
              );
            })}
          </Group>
          <Group left={margin.left} right={margin.right}>
            <AxisBottom
              top={yMax + margin.top}
              scale={xScale}
              stroke={"black"}
              tickStroke={"black"}
              // hideAxisLine
              tickLabelProps={() => ({
                fill: "black",
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          </Group>
        </svg>
        <div className={`legends`} style={{ marginLeft: margin.left }}>
          <div className="legends__item">
            <div className="legends__color legends__color--green" />
            <div className="legends__label">Acima da meta</div>
          </div>
          <div className="legends__item">
            <div className="legends__color legends__color--red" />
            <div className="legends__label">Abaixo da meta</div>
          </div>
          <div className="legends__item">
            <div className="legends__color legends__color--gray" />
            <div className="legends__label">Meta</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
