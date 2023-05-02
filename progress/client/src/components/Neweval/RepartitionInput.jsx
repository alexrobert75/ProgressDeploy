import React from "react";
import { Button, Icon } from "semantic-ui-react";

const RepartitionInput = (props) => {
  const k = "repartition";
  return (
    <>
      <Button.Group basic vertical>
        <Button
          onClick={() =>
            props.repartitionScore < 100
              ? props.setScore(props.repartitionScore + 5, props.index, k)
              : props.setScore(props.repartitionScore, props.index, k)
          }
        >
          <Icon name="plus" />
        </Button>
        <Button
          onClick={() =>
            props.repartitionScore > 0
              ? props.setScore(props.repartitionScore - 5, props.index, k)
              : props.setScore(props.repartitionScore, props.index, k)
          }
        >
          <Icon name="minus" />
        </Button>
      </Button.Group>
      <span>{props.repartitionScore}</span>
    </>
  );
};

export default RepartitionInput;
