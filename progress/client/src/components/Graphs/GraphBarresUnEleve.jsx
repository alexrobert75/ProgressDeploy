import React, { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";

export default function GraphBarresUnEleve(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const tempObject = { name: props.data.evalTitle };
        props.data.answerList.map((x) => {
            tempObject[x.questionId.competences] = x.reponse;
        });
        setData([tempObject]);
    }, [props.data]);

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
           
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
            type="number" domain={[0, 4]}/>
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            {props.data.answerList && props.data.answerList.map((x) => {
            return <Bar dataKey={x.questionId.competences} fill={x.questionId.color} />
        })}

        </BarChart>
    );
}
