import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const chartData = data?.map((item) => ({
    x: new Date(item.time_open),
    y: [item.open, item.high, item.low, item.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading Chart..... "
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData || [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
