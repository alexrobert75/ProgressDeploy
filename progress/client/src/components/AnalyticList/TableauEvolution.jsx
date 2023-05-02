import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";

const TableauEvolution = ({ evaluations, questions }) => {
  const findScore = (evaluation, question) => {
    for (let i = 0; i < evaluation.answerList.length; i++) {
      if (evaluation.answerList[i].questionId._id === question) {
        return evaluation.answerList[i].reponse;
      }
    }
  };

  return (
    <>
      <Table celled textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              {evaluations[0].userId.firstName} {evaluations[0].userId.lastName}
            </Table.HeaderCell>
            {evaluations &&
              evaluations.map((evaluation) => {
                return (
                  <Table.HeaderCell>
                    {evaluation.evalTitle} du{" "}
                    {moment(evaluation.createdAt).locale("fr").format("LL")}
                  </Table.HeaderCell>
                );
              })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {questions &&
            questions.map((question) => {
              return (
                <Table.Row>
                  <Table.HeaderCell>{question.competences}</Table.HeaderCell>
                  {evaluations.map((evaluation) => {
                    return (
                      <Table.HeaderCell>
                        {findScore(evaluation, question._id)}
                      </Table.HeaderCell>
                    );
                  })}
                </Table.Row>
              );
            })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Moyenne</Table.HeaderCell>
            {evaluations &&
              evaluations.map((evaluation) => {
                return <Table.Cell>{evaluation.globalGrade}</Table.Cell>;
              })}
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default TableauEvolution;
