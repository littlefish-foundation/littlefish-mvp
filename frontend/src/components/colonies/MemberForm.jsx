import React, { useState } from "react";
import Select from "react-select";

import SubHeader from "../../components/UserInterface/Sub-Header/SubHeader";
import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import "./MemberForm.css";
import useBase64Converter from "../../Hooks/useBase64Converter";

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

  const initialInput = {
    walletAddress: "",
    name: "",
    colonyName: "",
    avatar: "",
    //bio: "",
  };

  const [eachField, setEachField] = useState(initialInput);

  const { singleImgBase64, uploadImage } = useBase64Converter();
  const walletid = sessionStorage.getItem("walletID");

  console.log(singleImgBase64);

  const { name, colonyName, bio } = eachField;

  console.log(eachField);

  const handleChange = (e) => {
    setEachField({
      ...eachField,
      [e.target.name]: e.target.value,
      walletAddress: walletid,
      avatar: singleImgBase64,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachField),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
    console.log(eachField);
    setEachField(initialInput);
  };

  return (
    <div>
      <SubHeader assetName="Membership Form" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light"></h5>
            </Col>
            <Col lg="8" md="8" sm="6">
              <h2>Apply for Colony Membership</h2>

              <div className="create__item">
                <Form>
                  <FormGroup className="form__input">
                    <Label for="avatar">Upload Profile Image</Label>

                    <Input
                      id="avatar"
                      type="file"
                      name="avatar"
                      onChange={(e) => uploadImage(e)}
                      accept="*/*"
                    />
                  </FormGroup>
                  <FormGroup className="form__input">
                    <Label for="name">Enter Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name or nickname"
                      value={name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="colony">Enter Colony Name</Label>

                    <Input
                      id="colonyName"
                      name="colonyName"
                      type="text"
                      placeholder="Enter the name of your colony."
                      value={colonyName}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="walletAddress">Enter Your WalletID</Label>

                    <Input
                      id="walletAddress"
                      type="text"
                      name="walletAddress"
                      placeholder="Enter you wallet address"
                      value={walletid}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="bio">Bio</Label>
                    <Input
                      required
                      id="bio"
                      type="textarea"
                      name="bio"
                      rows="4"
                      maxLength="256"
                      placeholder="Enter a short Bio about yourself"
                      onChange={handleChange}
                      value={bio}
                      className="w-90"
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
