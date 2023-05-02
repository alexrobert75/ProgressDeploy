import React, { useEffect } from "react";
import { UserContext } from "../../App";
import { useState, useContext } from "react";
import EvaluationShort from "../../components/Evaluation/EvaluationShort";
import apiHandler from "../../api/axiosHandler";
import { Card } from "semantic-ui-react";

export const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await apiHandler.getEvals();
      setData(result);
    }
    fetchData();
  }, []);

  const [context, setContext] = useContext(UserContext);

  const pickColor = () => {
    const colors = [
      "blue",
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "violet",
      "purple",
      "pink",
      "brown",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <h1>Mon profil</h1>
      <h2>
        {context?.data?.firstName} {context?.data?.lastName}
      </h2>
      <h3>En classe de : {context?.data?.schoolClass}</h3>
      <h3>Mes évaluations</h3>
      <Card.Group itemsPerRow={3}>
        {data &&
          data.map((item) => (
            <EvaluationShort data={item} color={pickColor()} />
          ))}
      </Card.Group>
    </div>
  );
};
