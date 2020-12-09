import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scalePoint } from "@visx/scale";
import { Bar, LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import React from "react";
import "./styles.css";

import { ReactComponent as LineSVG } from "../../line.svg";

const defaultMargin = { top: 40, right: 0, bottom: 40, left: 40 };
const defaultPadding = { top: 40, right: 40, bottom: 40, left: 40 };
const background = "#ffffff";

const barData = [
  { x: "Outubro MTD", y1: 111, y2: 150 },
  { x: "Novembro", y2: 100 },
  { x: "Dezembro", y2: 94 },
];

export default function BarLineChart({
  width,
  height,
  events = false,
  margin = defaultMargin,
  padding = defaultPadding,
}) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const barYMax = yMax - 50;

  const xScale = scaleBand({
    domain: barData.map((d) => d.x),
    range: [0, xMax],
    round: true,
    padding: 0.2,
  });

  const barYScale = scaleLinear({
    domain: [
      10,
      Math.max(...barData.map((d) => Math.max(d.y1 || 0, d.y2 || 0) || 0)),
    ],
    range: [barYMax, 0],
  });

  const barWidth = 50;
  const barPadding = 10;

  return width < 10 ? null : (
    <div>
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
          {barData.map((d) => {
            if (!d.y1) return null;

            const barHeight = barYMax - barYScale(d.y1);
            const barX =
              xScale(d.x) + xScale.bandwidth() / 2 - barWidth - barPadding / 2;
            const barY = yMax - barHeight;
            const color = d.y2 > d.y1 ? "#D4380D" : "#73D13D";

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
                  {`${d.y1}`}
                </Text>
              </>
            );
          })}

          {barData.map((d) => {
            if (!d.y2) return null;

            const barHeight = barYMax - barYScale(d.y2);
            const barX =
              xScale(d.x) +
              xScale.bandwidth() / 2 +
              (d.y1 ? barPadding / 2 : -barWidth / 2);
            const barY = yMax - barHeight;
            const color = "#8c8c8c";

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
                  {`${d.y2}`}
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
      <div className={`legends`}>
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
    </div>
  );
}
