import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const MarketDominanceChart = ({ marketCapPercentage }) => {
  const sortedEntries = Object.entries(marketCapPercentage).sort(
    (a, b) => b[1] - a[1]
  );
  const topFiveEntries = sortedEntries.slice(0, 5);

  const data = {
    labels: sortedEntries.map(([symbol]) => symbol.toUpperCase()),
    datasets: [
      {
        data: sortedEntries.map(([_, percentage]) => percentage),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9DE00",
        ],
        borderWidth: 2,
        borderColor: "#fff",
        hoverBorderColor: "#000",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        bodyFont: {
          size: 14,
        },
        bodyColor: "#fff",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-4xl mx-auto flex flex-col md:flex-row md:items-start gap-6 md:flex-wrap">
      <div className="w-full text-center mb-4"></div>
      <div className="flex-1 min-w-[300px]" style={{ height: "300px" }}>
        <Pie data={data} options={options} />
      </div>
      <div className="flex-1 min-w-[300px] overflow-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Currency</th>
              <th className="border border-gray-300 px-4 py-2">
                Market Cap (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {topFiveEntries.map(([symbol, percentage]) => (
              <tr key={symbol}>
                <td className="border border-gray-300 px-4 py-2">
                  {symbol.toUpperCase()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-700 text-sm">
        This chart displays the market dominance of various cryptocurrencies
        based on their market capitalization percentage. The pie chart
        illustrates the overall distribution, while the table highlights the top
        five currencies. This data provides insight into which assets hold the
        most significant share of the market, helping investors and analysts
        gauge trends and dominance shifts.
      </p>
    </div>
  );
};

MarketDominanceChart.propTypes = {
  marketCapPercentage: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MarketDominanceChart;
