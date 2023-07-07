import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { styled } from "styled-components";
import ApexChart from "react-apexcharts";

const Ul = styled.ul`
  align-items: center;
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  console.log(data);

  const priceChange = [
    data?.quotes.USD.percent_change_15m,
    data?.quotes.USD.percent_change_30m,
    data?.quotes.USD.percent_change_1h,
    data?.quotes.USD.percent_change_6h,
    data?.quotes.USD.percent_change_12h,
    data?.quotes.USD.percent_change_24h,
    data?.quotes.USD.percent_change_7d,
    data?.quotes.USD.percent_change_30d,
    data?.quotes.USD.percent_change_1y,
  ];

  const xValues = ["15m", "30m", "1h", "6h", "12h", "24h", "7d", "30d", "1y"];

  return (
    <div>
      {isLoading ? (
        "Loading Chart..... "
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "변동폭",
              data: priceChange as number[],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#9bd137"],
                stops: [0, 100],
              },
              colors: ["#00ff0d"],
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            xaxis: {
              categories: xValues,
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Price;
