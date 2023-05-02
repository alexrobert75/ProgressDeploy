import React from "react";
import { useState, useContext } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import apiHandler from "../../api/axiosHandler";


function ModalExampleBasic(props) {
  const [context, setContext] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Modal basic open={props.open} size="small">
      <Header icon>Succès!</Header>
      <Modal.Content>
        {!context.data?.isTeacher && (
          <p>Votre évaluation a bien été envoyée.</p>
        )}
        {context.data?.isTeacher && props.type !== 'delete' && (
          <p>Votre évaluation a bien été actualisée.</p>
        )}
        {context.data?.isTeacher && props.type === 'delete' && (
          <p>Êtes-vous sûr de vouloir supprimer l'évaluation {props.idDelete}?</p>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
          onClick={() => {
            if (!context.data?.isTeacher) {
              navigate("/profile");
            }
            else if (context.data?.isTeacher && props.type !== 'delete') {
              navigate("/teacher/profile");
            } else if (context.data?.isTeacher && props.type === 'delete') {
              props.deleteEval(props.idDelete);
              props.close(false);
            }
          }
          }
        >
          <Icon name="checkmark" /> Ok
        </Button>
        {context.data?.isTeacher && props.type === 'delete' && <Button
          color="red"
          inverted
          onClick={() => props.close(false)}>Non</Button>}
      </Modal.Actions>
    </Modal>
  );
}

export default ModalExampleBasic;
