import React from "react";
import { Table } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/fr";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";


const GraphEvolution = ({ evaluations, questions }) => {

  const findScore = (evaluation, question) => {
    for (let i = 0; i < evaluation.answerList.length; i++) {
      if (evaluation.answerList[i].questionId._id === question) {
        return evaluation.answerList[i].reponse;
      }
    }
  };

  const [listeEvalGraph, setListeEvalGraph] = useState([]);

  useEffect(() => {
    const listeDataEval = evaluations.map((evaluation) => {
      const newEvalData = {};
      newEvalData.name = evaluation.evalTitle;
      newEvalData.moyenne = evaluation.globalGrade;

      questions.map((question) => {
        newEvalData[question.competences] = findScore(evaluation, question._id);
      });
      return newEvalData;
    });
    setListeEvalGraph(listeDataEval);
  }, [evaluations, questions]);

  return (
    <>
      <Table celled textAlign="center">
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell>
              {evaluations[0].userId.firstName} {evaluations[0].userId.lastName}
            </Table.HeaderCell>
            <Table.Cell>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart
                  width={500}
                  height={200}
                  data={listeEvalGraph}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                   type="number" domain={[0, 4]}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="moyenne" barSize={20} fill="rgba(60, 14, 166, 0.6)" />

                  {questions &&
                    questions.map((question) => (
                      <Line
                        type="monotone"
                        dataKey={question.competences}
                        stroke={question.color}
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    ))}
                  {/* <Line
                  type="monotone"
                  dataKey="moyenne"
                  stroke="red"
                  activeDot={{ r: 8 }}
                  strokeWidth={4}
                /> */}
                </ComposedChart>
              </ResponsiveContainer>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default GraphEvolution;
