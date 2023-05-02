import React from "react";
import { Button, Card, Table } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";
import { Link } from "react-router-dom";

const sliderLabel = [
  "Non acquis",
  "A travailler",
  "En voie d'acquisition",
  "Acquis",
];

const EvaluationShort = (props) => {
  const calculMoyenne = (item) => {
    return item.reduce((m, x) => {
      return m + (x.reponse * x.repartition) / 100;
    }, 0);
  };

  return (
    <Card color={props.color} style={{ width: "fit-content" }}>
      <Card.Content>
        <Card.Header>
          Evaluation du {moment(props.data.createdAt).locale("fr").format("LL")} {props.data.evalTitle}
        </Card.Header>
        <Card.Description>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Compétences</Table.HeaderCell>
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
                      <Table.Cell>{item.questionId.competences}</Table.Cell>
                      <Table.Cell>{item.repartition}</Table.Cell>
                      <Table.Cell>{sliderLabel[item.reponse - 1]}</Table.Cell>
                    </Table.Row>
                  );
                })}
              <Table.Row>
                <Table.Cell />
                <Table.Cell>
                  <b>Moyenne</b>
                </Table.Cell>
                <Table.Cell>
                  <b>{calculMoyenne(props.data.answerList).toFixed(2)}</b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Description>
        <Link to={`/evaluation/${props.data._id}`}>
          <Button>Voir Détails</Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default EvaluationShort;
