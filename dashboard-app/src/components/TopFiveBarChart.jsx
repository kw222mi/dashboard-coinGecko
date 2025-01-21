import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";



const TopFiveBarChart = ({topFive}) => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options2 = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Market Cap: $${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${value / 1e9}B`; // Visar i miljarder
          },
        },
      },
    },
  };

 const data2 = {
   labels: topFive.map((item) => item.name), // Använd namnen som etiketter
   datasets: [
     {
       label: "Market Cap",
       data: topFive.map((item) => item.market_cap), // Plocka ut market_cap för varje objekt
       backgroundColor: [
         "rgba(255, 99, 132, 0.5)", 
         "rgba(54, 162, 235, 0.5)", 
         "rgba(75, 192, 192, 0.5)", 
         "rgba(153, 102, 255, 0.5)", 
         "rgba(255, 159, 64, 0.5)", 
       ],
       borderColor: [
         "rgba(255, 99, 132, 1)", 
         "rgba(54, 162, 235, 1)", 
         "rgba(75, 192, 192, 1)", 
         "rgba(153, 102, 255, 1)", 
         "rgba(255, 159, 64, 1)", 
       ],
       borderWidth: 1,
     },
   ],
 };

   return (
    <>
      <div>
        <h1>Top 5 Cryptocurrency </h1>
        <p>
          {topFive[0].name} <img src={topFive[0].image} width={15}></img>
          {topFive[0].market_cap}
        </p>
        <p>
          {topFive[1].name} <img src={topFive[1].image} width={15}></img>
          {topFive[1].market_cap}
        </p>
        <p>
          {topFive[2].name} <img src={topFive[2].image} width={15}></img>
          {topFive[2].market_cap}
        </p>
        <p>
          {topFive[3].name} <img src={topFive[3].image} width={15}></img>
          {topFive[3].market_cap}
        </p>
        <p>
          {topFive[4].name} <img src={topFive[4].image} width={15}></img>
          {topFive[4].market_cap}
        </p>

        <Bar options={options2} data={data2} />
      </div>
    </>
  );
};

TopFiveBarChart.propTypes = {
  topFive: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      market_cap: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopFiveBarChart;
