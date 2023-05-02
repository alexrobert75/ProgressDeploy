import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../../api/axiosHandler";
import ClassesforEval from "../ClassesforEval/ClassesforEval";

const OpenCloseEval = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await apiHandler.getallusers();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      <ClassesforEval data={data} />
    </>
  );
};

export default OpenCloseEval;
