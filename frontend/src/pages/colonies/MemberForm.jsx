import React, { useState } from "react";
import Select from "react-select";

import CommonSection from "../../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import "./MemberForm.css";

const MemberForm = () => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      border: "1px solid rgba(221, 221, 221, 0.171)",
      fontSize: "0.8rem",
      alignText: "left !important",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,

    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
  };

  const avatars = [
    {
      value:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_vader.jpeg",
      avatar: (
        <img src="https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_vader.jpeg" />
      ),
    },
    {
      value:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_fett.jpeg",
      avatar: (
        <img src="https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_fett.jpeg" />
      ),
    },
    {
      value:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_3cpo.jpeg",
      avatar: (
        <img src="https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_3cpo.jpeg" />
      ),
    },
    {
      value:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_r2d2.jpeg",
      avatar: (
        <img src="https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_r2d2.jpeg" />
      ),
    },
    {
      value:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_bb8.jpeg",
      avatar: (
        <img src="https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_bb8.jpeg" />
      ),
    },
  ];

  const initialInput = {
    walletAddress: "",
    name: "",
    colonyName: "Littlefish Foundation",
    avatar: null,
  };

  const [eachField, setEachField] = useState(initialInput);
  const [selected, setSelected] = useState(null);

  const onChangeSelection = (e) => {
    setSelected(e);
    setSelected(e.value);
  };

  const { name, colonyName } = eachField;
  const Avatars = { avatar: selected };

  Object.assign(eachField, Avatars);

  console.log(eachField);

  const handleChange = (e) => {
    setEachField({
      ...eachField,
      [e.target.name]: e.target.value,
      walletAddress: window.namiAddress,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachField),
    }).then(() => {});

    console.log(eachField);
    setEachField(initialInput);
  };

  return (
    <div>
      <CommonSection assetName="Membership Form" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Apply for Colony Membership</h2>

              <div className="contact mt-4">
                <Form>
                  <FormGroup className="form__input">
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your name or nickname"
                      value={name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Input
                      name="colonyName"
                      type="text"
                      placeholder="Enter the name of your colony."
                      value={colonyName}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Input
                      type="text"
                      name="walletAddress"
                      placeholder="Enter you wallet address"
                      value={window.namiAddress}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Select
                      placeholder="Choose an Avatar"
                      styles={customStyles}
                      name="avatar"
                      options={avatars}
                      value={selected}
                      onChange={onChangeSelection}
                      getOptionLabel={(e) => (
                        <div
                          style={{
                            display: "fit",
                            alignItems: "center",
                          }}
                        >
                          {e.avatar}
                        </div>
                      )}
                    ></Select>
                  </FormGroup>

                  <Button
                    className="send__btn"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                    onClick={handleSubmit}
                  >
                    Submit Application
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default MemberForm;
