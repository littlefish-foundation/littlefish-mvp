import React, { useState } from "react";
import { Avatar } from "@mui/material";

import CommonSection from "../../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";

const MemberForm = () => {
  const avatars = [
    {
      value: "vader",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_vader.jpeg",
    },
    {
      value: "fett",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_fett.jpeg",
    },
    {
      value: "c3po",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_3cpo.jpeg",
    },
    {
      value: "r2d2",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_r2d2.jpeg",
    },
    {
      value: "bb8",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_bb8.jpeg",
    },
    {
      value: "trooper",
      image:
        "https://littlefish-mvp.s3.eu-central-1.amazonaws.com/avatar_trooper.jpeg",
    },
  ];

  const initialInput = {
    walletAddress: "",
    name: "",
    colony: "Littlefish Foundation",
    //avatar: null,
  };

  const [eachField, setEachField] = useState(initialInput);
  const [avatar1, setAvatar1] = useState("");

  const onChangeSelection = (e) => {
    setAvatar1(e.target.value);
    console.log(e.target.value);
  };

  const Avatars = { avatar: avatar1 };

  const { /*walletAddress*/ name, colony } = eachField;

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

    fetch("http://localhost:8000/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachField),
    }).then(() => {});

    console.log(eachField);
    setEachField(initialInput);
  };

  return (
    <div>
      <CommonSection title="Contact" />
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
                  <div className="form__input">
                    <Input
                      name="colony"
                      type="text"
                      //placeholder="Enter the name of your colony."
                      value={colony}
                      //onChange={handleChange}
                      disabled
                    />
                  </div>
                  <FormGroup className="form__input">
                    <input
                      type="text"
                      name="walletAddress"
                      placeholder="Enter you wallet address"
                      value={window.namiAddress}
                    />
                  </FormGroup>

                  <FormGroup row tag="fieldset">
                    <Input
                      name="avatar"
                      type="select"
                      value={avatar1}
                      onChange={onChangeSelection}
                    ></Input>
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
