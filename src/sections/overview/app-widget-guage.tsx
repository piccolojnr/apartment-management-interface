import GaugeChart from "react-gauge-chart";
import { Card, CardHeader } from "@mui/material";
import GaugeComponent from "react-gauge-component";

interface AppWidgetGaugeProps {
  subheader: string;
  title: string;
  usage: number;
  colors?: string[];
  sx?: object;
  width?: number;
  height?: number;
}
const AppWidgetGauge = ({
  subheader,
  title,
  usage,
  colors = ["#FF0000", "#FFFF00", "#00FF00"],
  sx,
  width = 200,
  height = 120,

  ...other
}: AppWidgetGaugeProps) => {
  return (
    <Card
      sx={{
        padding: 2,
      }}
      {...other}
    >
      <CardHeader title={title} subheader={subheader} />
      <GaugeComponent
        type="radial"
        arc={{
          width: 0.3,
          colorArray: colors,
        }}
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value}v`,
            matchColorWithArc: true,
            maxDecimalDigits: 0,
            style: {
              font: "bold 20px Arial",
              color: "black",
              textAlign: "center",
            },
          },
          tickLabels: {
            defaultTickValueConfig: {
              formatTextValue: (value) => `${value}v`,
              style: {
                font: "bold 15px Arial",
                color: "black",
                textAlign: "center",
              },
            },
            ticks: [{ value: 0 }, { value: 50 }, { value: 100 }],
          },
        }}
        value={usage}
        minValue={0}
        maxValue={100}
      />
      {/* 
      <GaugeChart
        id={`gauge-chart-${title}`}
        nrOfLevels={20}
        percent={normalizedUsage}
        colors={[...colors]}
        textColor="black"
        arcWidth={0.3}
        style={{ width: "100%" }}
        formatTextValue={(value) => `${value}%`}
      /> */}
    </Card>
  );
};

export default AppWidgetGauge;
