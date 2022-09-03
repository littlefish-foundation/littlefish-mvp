import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "../../../styles/create-item.css";
import "./DynamicFields.css";

const DynamicFields = () => {
  const [allLinks, setAllLinks] = useState([{ linkName: "", link: "" }]);

  const handleAddLinks = () => {
    const values = [...allLinks];
    values.push({
      linkName: "",
      link: "",
    });
    setAllLinks(values);
  };

  const handleRemoveLinks = (index) => {
    const values = [...allLinks];
    values.pop();
    setAllLinks(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...allLinks];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;

    setAllLinks(values);
  };

  console.log(allLinks);

  return (
    <div>
      {allLinks.length > 0 && (
        <>
          {allLinks.map((field, index) => (
            <div>
              {" "}
              <Row>
                <Col lg="4">
                  <FormGroup className="form__input">
                    <Label for="linkName">Name of the Link</Label>

                    <Input
                      type="text"
                      name="linkName"
                      placeholder="Enter the Link Name"
                      value={field.linkName}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="8">
                  <FormGroup className="form__input">
                    <Label for="link">Link</Label>

                    <Input
                      type="text"
                      name="link"
                      placeholder="Paste the Link"
                      value={field.link}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          ))}
          <div>
            <Button className="cancel-btn-first"  onClick={() => handleRemoveLinks()}>
              Cancel
            </Button>
            &nbsp;
            &nbsp;
            &nbsp;
            <Button className="add-btn-second" onClick={() => handleAddLinks()}>
              Add Link
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicFields;
