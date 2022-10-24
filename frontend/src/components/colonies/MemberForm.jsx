import React, { useState } from "react";
import SubHeader from "../../components/UserInterface/Sub-Header/SubHeader";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import useBase64ConverterUserProfile from "../../Hooks/useBase64ConverterUserProfile";
import UserSuccessModal from "../UserInterface/Modal/UserSuccessModal";
import UserErrorModal from "../UserInterface/Modal/UserErrorModal";
import UserLoadingModal from "../UserInterface/Modal/UserLoadingModal";
import "./MemberForm.css";

import { LITTLEFISH_API_URL } from "../../config.json";

const MemberForm = (props) => {
  const maxCount = 90;

  const initialInput = {
    walletAddress: "",
    name: "",
    colonyName: "",
    avatar: "",
    bio: "",
  };

  const [eachField, setEachField] = useState(initialInput);
  const [colonyName1, setColonyName1] = useState("");
  const [postStatus, setPostStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { singleImgBase64, uploadImage } = useBase64ConverterUserProfile();
  const walletid = sessionStorage.getItem("walletID");

  const onChangeColony = (e) => {
    setColonyName1(e.target.value);
  };

  const Colony = { colonyName: colonyName1 };
  const { name, bio } = eachField;
  Object.assign(eachField, Colony);

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

    fetch(`${LITTLEFISH_API_URL}/user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachField),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        setPostStatus(Object.entries(data)[0][0]);
        setErrorMessage(Object.entries(data)[0][1]);
        console.log(Object.entries(data)[0][0]);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });
    console.log(eachField);
    setEachField(initialInput);
    setShowModal(true);
  };

  return (
    <div onClick={() => showModal && setShowModal(false)}>
      <SubHeader />
      <section>
        <Container>
          <Row>
            <Col
              lg="8"
              md="8"
              sm="6"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              <h2
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "30px ",
                }}
              >
                Apply for Colony Membership
              </h2>

              <div className="create__item">
                <Form>
                  <FormGroup className="form__input">
                    <Label for="avatar">Upload Profile Image</Label>
                    <div
                      style={
                        singleImgBase64
                          ? {
                              border: "2px solid rgba(221, 221, 221, 0.171)",
                              padding: "10px",
                              borderRadius: "5px",
                            }
                          : null
                      }
                    >
                      <Input
                        id="avatar"
                        type="file"
                        name="avatar"
                        onChange={(event) => uploadImage(event)}
                        accept="image/*"
                      />

                      <div>
                        {singleImgBase64 && (
                          <img
                            style={{
                              width: "70px",
                              height: "70px",
                              marginTop: "10px",
                              marginLeft: "40%",
                            }}
                            src={singleImgBase64}
                            alt="avatar"
                          />
                        )}
                      </div>
                    </div>
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

                  {/* <FormGroup className="form__input">
                    <Label for="colony">Enter Colony Name</Label>

                    <Input
                      id="colonyName"
                      name="colonyName"
                      type="text"
                      placeholder="Enter the name of your colony."
                      value={colonyName}
                      onChange={handleChange}
                    />
                  </FormGroup> */}

                  <FormGroup className="form__input">
                    <Label for="colonyName">Colony Name</Label>
                    <Input
                      required
                      id="colonyName"
                      type="select"
                      name="colonyName"
                      onChange={onChangeColony}
                      value={colonyName1}
                    >
                      <option>Choose your Colony</option>
                      <option value="Littlefish Foundation">
                        Littlefish Foundation
                      </option>
                    </Input>
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
                      id="bio"
                      type="textarea"
                      name="bio"
                      rows="4"
                      maxLength="90"
                      placeholder="Enter a short Bio about yourself"
                      onChange={handleChange}
                      value={bio}
                      className="w-90"
                    ></Input>
                    <div className="Char__counter">
                      {bio?.length}/ {maxCount}
                    </div>
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
                  {postStatus === "success" && showModal && (
                    <UserSuccessModal setShowModal={setShowModal} />
                  )}
                  {postStatus === "error" && showModal && (
                    <UserErrorModal
                      errorMessage={errorMessage}
                      setShowModal={setShowModal}
                    />
                  )}
                  {postStatus === null && showModal && (
                    <UserLoadingModal setShowModal={setShowModal} />
                  )}
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
