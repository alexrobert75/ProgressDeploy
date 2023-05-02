import React from "react";
import { useState, useContext } from "react";
import { Button, Header, Icon, Input, Modal, Divider } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import apiHandler from "../../api/axiosHandler";

const EvaluationModal = (props) => {
  const [evalTitle, setEvalTitle] = useState("");

  const handleClick = () => {
    props.setIsOpen(!props.changeEval);
    apiHandler
      .openCloseEval(props.nameOfClass, !props.changeEval, evalTitle)
      .then((data) => {
        console.log(data);
        props.setOpen(false);
      });
  };

  return (
    <Modal basic open={props.open} size="small">
      <Header icon>Attention !</Header>
      <Modal.Content>
        {!props.changeEval && (
          <>
            <p>Donnez un titre à l'évaluation</p>
            <Input
              type="text"
              placeholder={"Evaluation des " + props.nameOfClass}
              onChange={(e) => setEvalTitle(e.target.value)}
            />
          </>
        )}
        <Divider />
        <p>
          Êtes-vous sûr de vouloir {props.changeEval ? "fermer" : "ouvrir"}{" "}
          l'évaluation pour les {props.nameOfClass}?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
          onClick={() => {
            console.log("ok");
            handleClick();
          }}
        >
          <Icon name="checkmark" /> Ok
        </Button>

        <Button color="red" inverted onClick={() => props.setOpen(false)}>
          Non
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EvaluationModal;
