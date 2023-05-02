import React, { useEffect } from "react";
import "./ClasseSquare.css";
import { useState } from "react";
import apiHandler from "../../api/axiosHandler";
import EvaluationModal from "../EvaluationModal/EvaluationModal";

const ClasseSquare = ({ data, openClasses }) => {
  const [isOpen, setIsOpen] = useState();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (openClasses.includes(data)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [openClasses]);

  return (
    <>
      <EvaluationModal
        open={open}
        setOpen={setOpen}
        nameOfClass={data}
        changeEval={isOpen}
        setIsOpen={setIsOpen}
      />
      <div
        className="classsquare"
        style={{ backgroundColor: isOpen ? "green" : "red" }}
        onClick={handleClick}
      >
        <div className="nomClasse">{data}</div>
      </div>
    </>
  );
};

export default ClasseSquare;
