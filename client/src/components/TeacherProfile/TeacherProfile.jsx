import React, { useEffect } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { UserContext } from "../../App";
import { useState, useContext } from "react";
import apiHandler from "../../api/axiosHandler";
import EvaluationsList from "../EvaluationsList/EvaluationsList"

const TeacherProfile = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await apiHandler.getAllEvalsForTeacher();
            setData(result);
        }
        fetchData();
    }, []);

    const [context, setContext] = useContext(UserContext);

    const deleteEval = (id) => {
        apiHandler.deleteEval(id).then(() => {
            fetchData();
        })
    }

    return (
        <div>
            <h1>Gestion des évaluations enregistrées</h1>
            <h2>
                {context?.data?.firstName} {context?.data?.lastName}
            </h2>
            <h3>Toutes les évaluations</h3>
            <EvaluationsList data={data} deleteEval={deleteEval} />

        </div>
    )
}

export default TeacherProfile