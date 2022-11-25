import React from "react";
import Canvas from "@antv/f2-react";
import { Chart, Interval, Legend } from "@antv/f2";
import { Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap";
import isEmpty from "lodash.isempty";

const INTERVAL_PROPS = {
  x: "a",
  y: "percent",
  adjust: "stack",
  color: {
    field: "name",
    range: ["#1890FF", "#13C2C2", "#2FC25B", "#FACC14", "#F04864", "#8543E0"],
  },
};

export const JobAnalytics = ({ jobData }) => {
  return (
    <Card
      className="m-2"
      style={{
        width: "40rem",
      }}
    >
      <CardHeader className="fw-bold text-center">
        Job Queue Analytics
      </CardHeader>
      <CardBody>
        <CardTitle className="text-center">
          {isEmpty(jobData)
            ? "No Jobs yet"
            : `This shows the status for ${jobData.all} jobs`}
        </CardTitle>
        {!isEmpty(jobData) && (
          <CardText>
            <Canvas pixelRatio={window.devicePixelRatio} width={600}>
              <Chart
                data={formatJobData(jobData)}
                coord={{
                  transposed: true,
                  type: "polar",
                }}
              >
                <Interval {...INTERVAL_PROPS} />

                <Legend
                  style={{ marginLeft: -50 }}
                  nameStyle={{ fontSize: 14 }}
                  position="right"
                  clickable={false}
                  itemStyle={{ marginBottom: 10 }}
                />
              </Chart>
            </Canvas>
          </CardText>
        )}
      </CardBody>
    </Card>
  );
};

export default JobAnalytics;

function formatJobData(data) {
  const { created, active, completed, failed, all } = data;

  return [
    {
      name: `Created (${created})`,
      percent: created / all,
      a: "1",
    },
    {
      name: `Active (${active})`,
      percent: active / all,
      a: "1",
    },
    {
      name: `Completed (${completed})`,
      percent: completed / all,
      a: "1",
    },
    {
      name: `Failed (${failed})`,
      percent: failed / all,
      a: "1",
    },
  ];
}
