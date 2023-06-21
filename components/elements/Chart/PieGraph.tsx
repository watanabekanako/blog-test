import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieGraph: React.FC<any> = ({ name, categoryGroups }) => {
  console.log({ categoryGroups }, "props");
  console.log(name, "name");
  const newSubtotal = categoryGroups?.data?.map(
    (data: { subtotal: number }) => data.subtotal
  );
  const newName = categoryGroups?.data?.map(
    (data: { name: string }) => data.name
  );

  const pieColor = categoryGroups.data?.map((data: any) => data.color);
  console.log(pieColor, "color");
  const data = {
    labels: newName,
    datasets: [
      {
        data: newSubtotal,
        backgroundColor: pieColor,
        borderColor: pieColor,
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Pie data={data} />
    </>
  );
};

export default PieGraph;
