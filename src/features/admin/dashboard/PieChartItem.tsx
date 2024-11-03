import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { TotalSalesCategoryType } from "../../../types/analytics";

ChartJS.register(ArcElement, Legend, ChartDataLabels);
type Props = { data: TotalSalesCategoryType[] };
function PieChartItemCategory({ data }: Props) {
  const refinedData = {
    labels: data.map((category) => category.name),
    datasets: [
      {
        label: "Most Sold Categories",
        data: data.map((category) => category.total_sales),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },

      datalabels: {
        formatter: (value: number) => {
          return `${value}`;
        },
        color: "white",
      },
    },
  };

  return <Pie options={options as any} data={refinedData} />;
}

export default PieChartItemCategory;
