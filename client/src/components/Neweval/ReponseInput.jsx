import React from "react";
import { Form, Icon } from "semantic-ui-react";

const sliderLabel = [
  "Non acquis",
  "A travailler",
  "En voie d'acquisition",
  "Acquis",
];

const ResponseInput = (props) => {
  const k = "reponse";
  return (
    <>
      <Form>
        <Form.Input
          label={sliderLabel[props.reponseScore - 1]}
          min={1}
          max={4}
          name="duration"
          onChange={(e) => props.setScore(e.target.value, props.index, k)}
          step={1}
          type="range"
          value={props.reponseScore}
        />
      </Form>
    </>
  );
};

export default ResponseInput;
