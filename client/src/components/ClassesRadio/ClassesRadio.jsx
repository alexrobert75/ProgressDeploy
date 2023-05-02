import React from 'react'
import { Button, Radio } from 'semantic-ui-react'
import { useState, useEffect } from 'react'

const ClassesRadio = (props) => {

    const [checked, setChecked] = useState("")

    // Gestion des checks/unchecks des classes

    const setAnswer = (nom) => {
            props.check(nom);
            setChecked(nom);
    }

    return (
        <>
            {props.classes && Array.from(props.classes).sort().map((classe) => {
                return (
                    <>
                        {checked.includes(classe) && <Button color="green" onClick={() => { setAnswer(classe) }}>
                            {classe}
                        </Button>}
                        {!checked.includes(classe) && <Button onClick={() => { setAnswer(classe) }}>
                            {classe}
                        </Button>}
                        <Radio
                            label=''
                            name='radioGroup'
                            onChange={() => setAnswer(classe)}
                            checked={checked.includes(classe)}
                        />
                    </>
                )
            }
            )
            }
        </>
    )
}

export default ClassesRadio
