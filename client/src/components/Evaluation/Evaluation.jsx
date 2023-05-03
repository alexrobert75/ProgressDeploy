import React from "react";
import { Card, Table, Button } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";
import GraphBarresUnEleve from "../Graphs/GraphBarresUnEleve";
import GraphRadarUnEleve from "../Graphs/GraphRadarUnEleve";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

const sliderLabel = [
  "Non acquis",
  "A travailler",
  "En voie d'acquisition",
  "Acquis",
];


const Evaluation = (props) => {

  const [context, setContext] = useContext(UserContext);

  console.log("EVALUATION EN PROPS ", props.data)

  const calculMoyenne = (item) => {
    return item.reduce((m, x) => {
      return m + (x.reponse * x.repartition) / 100;
    }, 0);
  };

  return (
    <>
    <h1>{props.data.evalTitle}</h1>
    <Card color={props.color} style={{ width: "fit-content" }}>
      <Card.Content>
        <Card.Header>
          Evaluation du {moment(props.data.createdAt).locale("fr").format("LL")}
          <p>Elève {props.data.userId.firstName} {props.data.userId.lastName}</p>
        </Card.Header>
        <Card.Description>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Compétences</Table.HeaderCell>
                <Table.HeaderCell>Capacités</Table.HeaderCell>
                <Table.HeaderCell>Répartition</Table.HeaderCell>
                <Table.HeaderCell>Réponse</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.data &&
                props.data.answerList &&
                props.data.answerList.map((item) => {
                  return (
                    <Table.Row>
                      <Table.Cell style={{backgroundColor: item.questionId.color}}>{item.questionId.competences}</Table.Cell>
                      <Table.Cell>{item.questionId.capacites}</Table.Cell>
                      <Table.Cell>{item.repartition}</Table.Cell>
                      <Table.Cell>{sliderLabel[item.reponse - 1]}</Table.Cell>
                    </Table.Row>
                  );
                })}
              <Table.Row>
                <Table.Cell>
                  <b>Moyenne</b>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell>
                  <b>{calculMoyenne(props.data.answerList).toFixed(2)}</b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {props.data && <GraphBarresUnEleve data={props.data} />}
          {props.data && <GraphRadarUnEleve data={props.data} />}

        </Card.Description>
        {context.isLoggedIn && context.data?.isTeacher === true && <Link to={`/teacher/profile`}>
          <Button>Retour aux évaluations</Button>
        </Link>}
        {context.isLoggedIn && context.data?.isTeacher === false && <Link to={`/profile`}>
          <Button>Retour à mes évaluations</Button>
        </Link>}
      </Card.Content>
    </Card>
    </>
  );
};

export default Evaluation;
