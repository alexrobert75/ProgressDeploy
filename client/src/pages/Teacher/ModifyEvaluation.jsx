import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHandler from "../../api/axiosHandler";
import Neweval from "../../components/Neweval/Neweval";

const ModifyEvaluation = () => {
  const id = useParams().id;

  const [evaluationdata, setEvaluationData] = useState(null);

  useEffect(() => {
    async function fetchEvaluationData() {
      console.log("call api");
      const result = await apiHandler.getOneEval(id);
      setEvaluationData(result);
    }
    fetchEvaluationData();
  }, []);

  console.log("qlrhsdflh", evaluationdata);

  return (
    <>
      <h1>ModifyEvaluation</h1>
      {evaluationdata ? <Neweval evaluationdata={evaluationdata} /> : "loading"}
    </>
  );
};

export default ModifyEvaluation;
