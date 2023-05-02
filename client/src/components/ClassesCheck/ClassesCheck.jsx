import React from 'react'
import { Button, Checkbox } from 'semantic-ui-react'
import { useState, useEffect } from 'react'

const ClassesCheck = (props) => {

    const [checked, setChecked] = useState({})

    // Initialisation des classes à afficher et des checkbox à all true par défaut

    useEffect(() => {
        const tempState = {};
        const tempList = [];
        Array.from(props.classes).map((x) => {tempState[x] = true; tempList.push(x)});
        setChecked(tempState);
        props.check(tempList);
    }, [props.classes]);

    // Gestion des checks/unchecks des classes

    const setAnswer = (data, nom) => {
        const newState = { ...checked };
        newState[nom] = data;
        const newClassesToDisplay = [...props.listClasses];
        if (data) {
            newClassesToDisplay.push(nom);
        } else {
            const indexToRemove = newClassesToDisplay.indexOf(nom);
            newClassesToDisplay.splice(indexToRemove, 1)
        }
        setChecked(newState);
        props.check(newClassesToDisplay);
    }

    return (
        <>
            {props.classes && Array.from(props.classes).sort().map((classe) => {
                return (
                    <>
                        {checked[classe] && <Button color="green" onClick={() => { checked[classe] ? setAnswer(false, classe) : setAnswer(true, classe) }}>
                            {classe}
                        </Button>}
                        {!checked[classe] && <Button onClick={() => { checked[classe] ? setAnswer(false, classe) : setAnswer(true, classe) }}>
                            {classe}
                        </Button>}
                        <Checkbox
                            label=''
                            onChange={(e, data) => setAnswer(data.checked, classe)}
                            checked={checked[classe]}
                        />
                    </>
                )
            }
            )
            }
        </>
    )
}

export default ClassesCheck
