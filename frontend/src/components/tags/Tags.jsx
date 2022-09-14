

import React, { useState } from "react";
import { Button, ButtonGroup, FormGroup, Input } from "reactstrap";
import useFetchForPopularActionType from "../../Hooks/getPopularActionType";
import "./Tags.css";

function Tags(props) {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [actionTypes, setActionTypes] = useState([]);

  const { popularActionType } = useFetchForPopularActionType(
    "https://api.littlefish.foundation/action-type/popular"
  );

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };

  return (
    <div>
      <h6 style={{ color: "white" }}>Action Type*</h6>

      <FormGroup className="form__tag">
        {popularActionType?.actionTypes?.map((item) => (
          <Button
            value={item.name}
            outline
            style={{
              backgroundColor: "transparent",
              marginRight: "3px",
              marginBottom: "3px",
            }}
            onClick={() => onCheckboxBtnClick(item.name)}
            active={cSelected?.includes(item.name)}
          >
            {" "}
            {item.name}{" "}
          </Button>
        ))}
      </FormGroup>
      <p>Selected: {JSON.stringify(cSelected)}</p>
    </div>
  );
}

export default Tags;
