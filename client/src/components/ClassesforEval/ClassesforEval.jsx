import React from "react";
import { useEffect, useState } from "react";
import ClasseSquare from "../ClasseSquare/ClasseSquare";

const ClassesforEval = ({ data }) => {
  const [listeDesClasses, setListeDesClasses] = useState([]);
  const [openClasses, setOpenClasses] = useState([]);

  useEffect(() => {
    const classesList = new Set();
    const openClassesList = new Set();
    data?.map((x) => {
      classesList.add(x.schoolClass);
      if (x.currentEvaluation.isOpen) {
        openClassesList.add(x.schoolClass);
      }
    });
    setListeDesClasses(Array.from(classesList));
    setOpenClasses(Array.from(openClassesList));
  }, [data]);

  console.log(listeDesClasses);

  return (
    <>
      {listeDesClasses.map((x) => (
        <ClasseSquare data={x} openClasses={openClasses} />
      ))}
    </>
  );
};

export default ClassesforEval;
