import { Box, Card, CardHeader } from "@mui/material";
import GaugeComponent from "react-gauge-component";

interface AppWidgetGaugeProps {
  subheader: string;
  title: string;
  usage: number;
  colors?: string[];
  sx?: object;
  width?: number;
  height?: number;
  formatTextValue?: (value: any) => string;
  other?: any;
}
const AppWidgetGauge = ({
  subheader,
  title,
  usage,
  colors = ["#FF0000", "#FFFF00", "#00FF00"],
  sx,
  width = 200,
  height = 120,
  formatTextValue,
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
            formatTextValue: formatTextValue
              ? formatTextValue
              : (value) => `${value}%`,
            matchColorWithArc: true,
            maxDecimalDigits: 0,
            style: {
              font: "bold 20px Arial",
              color: "black",
              textAlign: "center",
              marginTop: 20,
            },
          },
          tickLabels: {
            defaultTickValueConfig: {
              formatTextValue: formatTextValue
                ? formatTextValue
                : (value) => `${value}%`,
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
    </Card>
  );
};

export default AppWidgetGauge;
