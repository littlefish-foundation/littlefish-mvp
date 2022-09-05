import React, { useState } from "react";
import { Row, Col, Button, FormGroup, Input, Label } from "reactstrap";
import "../../../styles/create-item.css";
import "./DynamicFields.css";
import AuthContext from "../../../store/auth-context";

const DynamicFields = () => {
  const [allUrls, setAllUrls] = useState([{ urlName: "", url: "" }]);

  const handleAddLinks = () => {
    const values = [...allUrls];
    values.push({
      urlName: "",
      url: "",
    });
    setAllUrls(values);
  };

  const handleRemoveUrls = (index) => {
    const values = [...allUrls];
    values.pop();
    setAllUrls(values);
  };

  const handleUrlInputChange = (index, event) => {
    const values = [...allUrls];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;

    setAllUrls(values);
  };

  console.log(allUrls);

  return (
    <div>
      {allUrls.length > 0 && (
        <>
          {allUrls.map((field, index) => (
            <div>
              {" "}
              <Row>
                <Col lg="4">
                  <FormGroup className="form__input">
                    <Label for="linkName">Name of the URL</Label>

                    <Input
                      id="url"
                      type="text"
                      name="urlName"
                      placeholder="Enter the URL Name"
                      value={field.linkName}
                      onChange={(event) => handleUrlInputChange(index, event)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="8">
                  <FormGroup className="form__input">
                    <Label for="url">URL</Label>

                    <Input
                      id="url"
                      type="text"
                      name="url"
                      placeholder="Paste the URL"
                      value={field.url}
                      onChange={(event) => handleUrlInputChange(index, event)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          ))}
        </>
      )}
      <Button className="cancel-btn-first" onClick={() => handleRemoveUrls()}>
        Delete
      </Button>
      &nbsp; &nbsp; &nbsp;
      <Button className="add-btn-second" onClick={() => handleAddLinks()}>
        Add
      </Button>
    </div>
  );
};

export default DynamicFields;
