import React, { useState, useEffect } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";

export default function GraphRadarUnEleve(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const tempList = [];
        props.data.answerList.map((x) => tempList.push({ subject: x.questionId.competences, score: x.reponse }));
        setData(tempList);
    }, [props.data]);

    return (
        <RadarChart
            cx={300}
            cy={250}
            outerRadius={150}
            width={500}
            height={500}
            data={data}
        >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis 
            type="number" domain={[0, 4]}/>
            <Radar
                name={props.data.userId.firstName}
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
        </RadarChart>
    );
}
