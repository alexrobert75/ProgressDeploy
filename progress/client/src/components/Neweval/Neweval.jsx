import React, { useEffect} from "react";
import { Table, Button, Icon, Message } from "semantic-ui-react";
import apiHandler from "../../api/axiosHandler";
import RepartitionInput from "./RepartitionInput";
import ResponseInput from "./ReponseInput";
import Modal from "../Modal/Modal";
import PopupInfo from "../Popup/Popup";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

const Neweval = ({ evaluationdata }) => {
  const [reponseList, setReponseList] = useState([]);
  const [totalRepartition, setTotalRepartition] = useState(100);
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const [open, setOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [context, setContext] = useContext(UserContext);

  const sendEval = (evaluation) => {
    const finalGrade = calculMoyenne(evaluation);
    const evalToSend = [...evaluation];
    const evalTitle = context.data.currentEvaluation.evaluationTitle;
    const evalFormatted = evalToSend.map((evaluation) => {
      return {
        questionId: evaluation.questionId._id,
        repartition: evaluation.repartition,
        reponse: parseInt(evaluation.reponse),
      };
    });
    if (totalRepartition === 100) {
      console.log("100");
      apiHandler.submitEval({evalFormatted, finalGrade, evalTitle}).then((data) => {
        setOpen(true);
        const newContext = {... context};
        newContext.data.currentEvaluation = {isOpen: false};
        setContext(newContext);
      });
    } else {
      console.log(" pas 100");
      setShowAlert(true);
      setAlert((prev) => (prev += "La répartition n'est pas égale à 100"));
    }
    console.log("20100");
  };

  const updateEvaluation = (id, evaluation) => {
    const evalToSend = [...evaluation];
    const finalGrade = calculMoyenne(evaluation);
    const evalFormatted = evalToSend.map((evaluation) => {
      return {
        answerId: evaluation.answerId,
        repartition: evaluation.repartition,
        reponse: parseInt(evaluation.reponse),
      };
    });
    if (totalRepartition === 100) {
      console.log("100");
      apiHandler.updateEval(id, {evalFormatted, finalGrade}).then((data) => {
        setOpen(true);
      });
    } else {
      console.log(" pas 100");
      setShowAlert(true);
      setAlert((prev) => (prev += "La répartition n'est pas égale à 100"));
    }
    console.log("20100");
  };

  const calculMoyenne = (item) => {
    const result = item.reduce((m, x) => {
      return m + (x.reponse * x.repartition) / 100;
    }, 0);
    return result.toFixed(2);
  };

  const setResult = (x, i, k) => {
    const previousAnswerList = [...reponseList];
    previousAnswerList[i][k] = x;
    setReponseList(previousAnswerList);
    if (k === "repartition") {
      setTotalRepartition(
        previousAnswerList.reduce((m, x) => {
          return m + x.repartition;
        }, 0)
      );
    }
  };

  useEffect(() => {
    async function fetchQuestions() {
      const responseListState = [];
      if (evaluationdata && evaluationdata.answerList) {
        const answers = evaluationdata.answerList;

        console.log("existing eval");
        setIsCreate(false);
        answers.map((answer) => {
          responseListState.push({
            questionId: {
              _id: answer.questionId._id,
              competences: answer.questionId.competences,
              capacites: answer.questionId.capacites,
              questions: answer.questionId.questions,
            },
            repartition: answer.repartition,
            reponse: answer.reponse,
            answerId: answer._id,
          });
        });
      } else {
        const questions = await apiHandler.fetchQuestionsForEval();
        const defaultRepartition = 100 / questions.length;
        console.log("pas existing eval");

        questions.map((question) => {
          responseListState.push({
            questionId: {
              _id: question._id,
              competences: question.competences,
              capacites: question.capacites,
              questions: question.questions,
            },
            repartition: defaultRepartition,
            reponse: 3,
          });
        });
      }
      setReponseList(responseListState);
    }
    fetchQuestions();
  }, []);

  return (
    <>
      <Modal open={open} />
      <h1>Evaluation: {context.data.currentEvaluation.evaluationTitle}</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Compétences</Table.HeaderCell>
            <Table.HeaderCell>Capacités</Table.HeaderCell>
            {/* <Table.HeaderCell>Question</Table.HeaderCell> */}
            <Table.HeaderCell>Répartition</Table.HeaderCell>
            <Table.HeaderCell>Réponse</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reponseList &&
            reponseList.map((response, i) => {
              return (
                <Table.Row>
                  <Table.Cell>{response.questionId.competences}</Table.Cell>
                  <Table.Cell><PopupInfo capacite={response.questionId.capacites} infos='xxviii'/></Table.Cell>
                  {/* <Table.Cell>{response.questionId.questions}</Table.Cell> */}
                  <Table.Cell>
                    <RepartitionInput
                      repartitionScore={response.repartition}
                      setScore={setResult}
                      index={i}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <ResponseInput
                      reponseScore={response.reponse}
                      setScore={setResult}
                      index={i}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}

          <Table.Row>
            <Table.Cell />
            {/* <Table.Cell /> */}
            <Table.Cell />
            {totalRepartition === 100 && (
              <Table.Cell positive>
                <b>Total: {totalRepartition} </b>
              </Table.Cell>
            )}
            {totalRepartition !== 100 && (
              <Table.Cell negative>
                <b>Total: {totalRepartition} </b>
              </Table.Cell>
            )}
            <Table.Cell>
              <b>Moyenne: {calculMoyenne(reponseList)}</b>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() =>
                  isCreate
                    ? sendEval(reponseList)
                    : updateEvaluation(evaluationdata._id, reponseList)
                }
              >
                <Icon name="send" /> Envoyer
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {showAlert && <Message error header="Problème" content={alert} />}
    </>
  );
};

export default Neweval;
