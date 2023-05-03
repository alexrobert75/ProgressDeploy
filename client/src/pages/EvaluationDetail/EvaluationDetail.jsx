import React from "react";
import Neweval from "../../components/Neweval/Neweval";
import Evaluation from "../../components/Evaluation/Evaluation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiHandler from "../../api/axiosHandler";
import { useNavigate } from "react-router-dom";

export const EvaluationDetail = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [evaluationdata, setEvaluationData] = useState(null);

  useEffect(() => {
    async function fetchEvaluationData() {
      console.log("call api");
      const result = await apiHandler.getOneEval(id);
      setEvaluationData(result);
    }
    fetchEvaluationData();
  }, []);

  console.log("DATA EVALUATIONSDETAIL ", evaluationdata);

  return (
    <>
      {evaluationdata && <Evaluation data={evaluationdata} />}
    </>
  );
};
