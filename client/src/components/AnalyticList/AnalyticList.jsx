import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../../api/axiosHandler";
import ClassesRadio from "../ClassesRadio/ClassesRadio";
import moment from "moment";
import "moment/locale/fr";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import TableauEvolution from "./TableauEvolution";
import GraphEvolution from "./GraphEvolution";

const AnalyticList = () => {
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [classesToDisplay, setClassesToDisplay] = useState("");
  const [listeDesClasses, setListeDesClasses] = useState();
  const [listeDesEvalParEleve, setListeDesEvalParEleve] = useState([]);
  const [listeDesEleves, setListeDesEleves] = useState([]);
  const [searchData, setSearchData] = useState('');


  const fetchData = async () => {
    const result = await apiHandler.getAllEvalsForTeacherAllDetails();
    setData(result);
  };

  const fetchQuestions = async () => {
    const result = await apiHandler.fetchQuestionsForEval();
    setQuestions(
      result.sort(function (a, b) {
        return a.displayOrder - b.displayOrder;
      })
    );
  };

  useEffect(() => {
    fetchData();
    fetchQuestions();
  }, []);

  useEffect(() => {
    const classesList = new Set();
    data?.map((x) => classesList.add(x.userId.schoolClass));

    const elevesList = {};

    data?.map((x) => {
      if (!elevesList[x.userId._id]) {
        elevesList[x.userId._id] = [x];
      } else {
        elevesList[x.userId._id].push(x);
      }
    });

    setListeDesEvalParEleve(elevesList);
    setListeDesEleves(Object.keys(elevesList));
    setListeDesClasses(classesList);
  }, [data]);

  return (
    <>
      <h1>Vue Analytique</h1>
      <p>Sélectionnez une classe à afficher puis rechercher un élève si besoin.</p>
      <Search search={setSearchData} />
      {listeDesClasses && (
        <ClassesRadio
          classes={listeDesClasses}
          check={setClassesToDisplay}
          listClasses={classesToDisplay}
        />
      )}

      {listeDesEleves &&
        listeDesEleves.map((x) => {
          if (
            classesToDisplay.includes(
              listeDesEvalParEleve[x][0]["userId"]["schoolClass"]
            ) && (listeDesEvalParEleve[x][0]["userId"]["firstName"].toLowerCase().includes(searchData.toLowerCase()) || listeDesEvalParEleve[x][0]["userId"]["lastName"].toLowerCase().includes(searchData.toLowerCase()))
          ) {
            return (
              <GraphEvolution
                evaluations={listeDesEvalParEleve[x]}
                questions={questions}
              />
            );
          }
        })}
    </>
  );
};

export default AnalyticList;
