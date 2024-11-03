import { Chart as ChartJS, ArcElement, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { Product } from "../../../types/product";

ChartJS.register(ArcElement, Legend, ChartDataLabels, Title);
type Props = {
  data: Product[];
};
function PieChartItemProduct({ data }: Props) {
  console.log("salam1");
  const refinedData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: "Most Sold Categories",
        data: data.map((product) => product.soldAmount),
        backgroundColor: [
          "#ff2f00",
          "#0d09c2",
          "#a47b13",
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
        position: "right",
      },

      datalabels: {
        formatter: (value: number) => {
          return `${value}`;
        },
        color: "white",
      },
    },
    animation: false,
  };

  return <Pie options={options as any} data={refinedData} />;
}

export default PieChartItemProduct;
