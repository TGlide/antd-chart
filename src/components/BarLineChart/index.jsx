import { AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, LinePath } from "@visx/shape";
import { Text } from "@visx/text";
import React from "react";
import "./styles.css";

import { ReactComponent as LineSVG } from "../../line.svg";

const defaultMargin = { top: 40, right: 40, bottom: 40, left: 40 };
const defaultPadding = { top: 40, right: 40, bottom: 40, left: 40 };
const background = "#ffffff";

export default function BarLineChart({
  width,
  height,
  lineData,
  barData,
  events = false,
  margin = defaultMargin,
  padding = defaultPadding,
}) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const barYMax = yMax - 50;

  const xScale = scaleBand({
    domain: lineData.map((d) => d.x),
    range: [0, xMax],
    round: true,
    padding: 0.2,
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...lineData.map((d) => d.y || 0))],
    range: [yMax, 0],
  });

  const barYScale = scaleLinear({
    domain: [
      10,
      Math.max(...barData.map((d) => Math.max(d.y1, d.y2, d.y3) || 0)),
    ],
    range: [barYMax, 0],
  });

  const barWidth = 40;

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
          left={margin.left}
          top={margin.top}
          right={margin.right}
          bottom={margin.bottom}
        >
          <LinePath
            data={lineData}
            stroke="#BFBFBF"
            strokeWidth={""}
            x={(a) => xScale(a.x) + xScale.bandwidth() / 2}
            y={(a) => yScale(a.y)}
          />
          {lineData.map((d) => {
            const x = xScale(d.x) + xScale.bandwidth() / 2;
            return (
              <>
                <circle
                  r={5}
                  cx={x}
                  cy={yScale(d.y)}
                  stroke="#ACACAC"
                  fill="#ACACAC"
                />

                <Text
                  x={x}
                  y={yScale(d.y)}
                  dy={-15}
                  textAnchor="middle"
                  stroke="#ACACAC"
                  fill="#ACACAC"
                >
                  {`${d.y}%`}
                </Text>
              </>
            );
          })}

          {barData.map((d) => {
            const barHeight = barYMax - barYScale(d.y2);
            const barX =
              xScale(d.x) + xScale.bandwidth() / 2 - barWidth - barPadding / 2;
            const barY = yMax - barHeight;
            return (
              <>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  fill="transparent"
                  stroke="#595959"
                  strokeWidth="1"
                  height={barHeight}
                />
                <Text
                  x={barX + barWidth / 2}
                  y={barY}
                  dy={20}
                  textAnchor="middle"
                  fill="#595959"
                >
                  {`${d.y2}`}
                </Text>
              </>
            );
          })}

          {barData.map((d) => {
            const barWidth = 40;
            const barHeight = barYMax - barYScale(d.y1);
            const barX =
              xScale(d.x) + xScale.bandwidth() / 2 - barWidth - barPadding / 2;
            const barY = yMax - barHeight;
            const color = d.y3 > Math.max(d.y2, d.y1) ? "red" : "green";

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
            const barWidth = 40;
            const barHeight = barYMax - barYScale(d.y3);
            const barX =
              xScale(d.x) +
              xScale.bandwidth() / 2 +
              (d.y1 ? barPadding / 2 : -barWidth / 2);
            const barY = yMax - barHeight;
            return (
              <>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  fill="#ACACAC"
                  strokeWidth="1"
                  height={barHeight}
                />
                <Text
                  x={barX + barWidth / 2}
                  y={barY}
                  dy={20}
                  textAnchor="middle"
                  fill="white"
                >
                  {`${d.y3}`}
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
          <div className="legends__color legends__color--black-stroke" />
          <div className="legends__label">HC Ativo</div>
        </div>
        <div className="legends__item">
          <div className="legends__color legends__color--green" />
          <div className="legends__label">HC Trabalhando</div>
        </div>
        <div className="legends__item">
          <div className="legends__color legends__color--gray" />
          <div className="legends__label">Meta HC Ativo</div>
        </div>
        <div className="legends__item">
          <div className="legends__color">
            <LineSVG />
          </div>
          <div className="legends__label">
            Atingimento HC Trabalhando X Meta HC Ativo
          </div>
        </div>
      </div>
    </div>
  );
}
