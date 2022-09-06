import React, { useState, useEffect } from "react";
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
import { Tag } from "primereact/tag";

import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import img from "../assets/avatarsAndImages/example.png";
import "../styles/create-item.css";
import Base64 from "../components/imageConversion/Base64";
import PopOvers from "../components/UserInterface/popovers/PopOvers";
import DynamicFields from "../components/UserInterface/DynamicFields/DynamicFields";
import SuccessModal from "../components/UserInterface/Modal/SuccessModal";
import ErrorModal from "../components/UserInterface/Modal/ErrorModal";
import LoadingModal from "../components/UserInterface/Modal/LoadingModal";
import AuthContext from "../store/auth-context";
import { TagsInput } from "react-tag-input-component";

const actionInitialState = {
  assetName: "Whitepaper",
  image: img,
  ownerName: "Littlefish DAO",
  price: "20",
};

const Create = (props) => {
  const initialInputState = {
    walletID: "",

    assetName: "",
    name: "",
    description: "",
    ownerName: "",

    image: "",
    colonyName: "",
    mediaType: "",
    price: "",
  };

  const maxCount = 256;

  //const state = { imageConversion: "" };

  const walletid = localStorage.getItem("walletID");

  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState("");

  const [eachEntry, setEachEntry] = useState(initialInputState);
  //const [actionType1, setActionType1] = useState("");

  const [colonyName1, setColonyName1] = useState("");
  const [postStatus, setPostStatus] = useState(null);
  const [actionType, setActionType] = useState("");

  //* ************************************************************************************************************* *////
  const [allUrls, setAllUrls] = useState([{ urlName: "", url: "" }]);

  const handleCallback = (childData) => {
    setImageData(childData);
  };

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

  ///* ************************************************************************************************************* *///

  const onChangeSelection = (e) => {
    e.preventDefault();
    setActionType(e.target.value);
  };
  const onChangeColony = (e) => {
    setColonyName1(e.target.value);
  };

  const Type = { actionType: actionType };
  //console.log(Type);

  const Colony = { colonyName: colonyName1 };
  const urls = { links: allUrls };
  //const taggings = { tags: tags };

  const { assetName, name, description, ownerName, price } = eachEntry;

  Object.assign(eachEntry, Type, Colony, urls /*taggings*/);

  console.log(eachEntry);

  const handleInputChange = (e) => {
    setEachEntry({
      ...eachEntry,
      [e.target.name]: e.target.value,
      image: imageData.split(",")[1],
      mediaType: imageData?.split(",")[0]?.split(":")?.pop()?.split(";")[0],
      walletID: walletid,
    });
  };
  // ***************************************************************************************//

  // ***************************************************************************************//

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/action/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachEntry),
    })
      .then((response) => response.json())

      .then((data) => {
        setPostStatus(Object.entries(data)[0][0]);

        console.log(Object.entries(data)[0][0]);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });

    console.log(eachEntry);
    setEachEntry(initialInputState);

    setActionType("");
    setColonyName1("");
    setShowModal(true);
  };

  console.log(eachEntry);

  return (
    <div onClick={() => showModal && setShowModal(false)}>
      <SubHeader assetName="Generate a New Action" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Example Action</h5>
              <NftCard item={actionInitialState} />
            </Col>

            <Col lg="8" md="8" sm="6">
              <div className="create__item">
                <Form>
                  <FormGroup className="form__input">
                    <Label for="walletID">Wallet ID*</Label>

                    <Input
                      //required
                      id="walletID"
                      name="walletID"
                      type="text"
                      placeholder="Connect your wallet to fill this part"
                      //onChange={handleInputChange}
                      value={walletid}
                    ></Input>
                    <PopOvers />
                  </FormGroup>

                  <Base64 parentCallback={handleCallback} />

                  <FormGroup className="form__input">
                    <Label for="ownerName">Action Producer*</Label>
                    <Input
                      //required
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      placeholder="Enter the Name of the Producer"
                      onChange={handleInputChange}
                      value={ownerName}
                    />
                    <PopOvers />
                  </FormGroup>
                  <FormGroup className="form__input">
                    <Label for="assetName">Action Name*</Label>
                    <Input
                      //required
                      id="assetName"
                      name="assetName"
                      type="text"
                      placeholder="Enter the Name of the Action"
                      onChange={handleInputChange}
                      value={assetName}
                    />
                    <PopOvers />
                  </FormGroup>
                  <FormGroup className="form__input">
                    <Label for="name">Name*</Label>
                    <Input
                      //required
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter the full Name of the Action"
                      onChange={handleInputChange}
                      value={name}
                    />
                    <PopOvers />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="actionType">Action Type*</Label>
                    <Input
                      //required

                      id="actionType"
                      type="select"
                      name="actionType"
                      onChange={onChangeSelection}
                      value={actionType}
                    >
                      <option></option>
                      <option value="Software Developing">
                        Sofware Developing
                      </option>
                      <option value="Research">Research</option>
                      <option value="Community Help">Community Help</option>
                      <option value="Plan & Strategy">Plan & Strategy</option>
                    </Input>
                  </FormGroup>

                  {/*<FormGroup className="form__input">
                    <div className="TagsInput">
                      <Label for="actionType">Action Type*</Label>
                      <TagsInput
                        //disabled
                        value={actionType}
                        //onChange={actionType[0]}
                        name="actionType"
                        placeHolder="Enter Action Types"
/>

                      <em
                        style={{
                          color: "#fff",
                          display: "flex",
                          alignContent: "end",
                          justifyContent: "end",
                        }}
                      >
                        Press enter to add new tag
                      </em>
                    </div>
                  </FormGroup>*/}

                  <FormGroup className="form__input">
                    <Label for="description">Description*</Label>
                    <Input
                      //required
                      id="description"
                      type="textarea"
                      name="description"
                      rows="4"
                      //minLength="50"
                      maxLength="256"
                      placeholder="Enter description"
                      onChange={handleInputChange}
                      value={description}
                      className="w-90"
                    ></Input>
                    <div className="Char__counter">
                      {description.length}/ {maxCount}
                    </div>

                    <PopOvers />
                  </FormGroup>
                  <FormGroup className="form__input">
                    <Label for="colonyName">Colony Name*</Label>
                    <Input
                      //required
                      id="colonyName"
                      type="select"
                      name="colonyName"
                      onChange={onChangeColony}
                      value={colonyName1}
                    >
                      <option>Choose your Colony</option>
                      <option value="littlefish Foundation">
                        littlefish Foundation
                      </option>
                    </Input>
                    <PopOvers />
                  </FormGroup>
                  <FormGroup className="form__input">
                    <Label for="price">Price*</Label>
                    <Input
                      //required
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Please enter a price in ADA"
                      onChange={handleInputChange}
                      value={price}
                    />

                    <PopOvers />
                  </FormGroup>
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
                                    onChange={(event) =>
                                      handleUrlInputChange(index, event)
                                    }
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
                                    onChange={(event) =>
                                      handleUrlInputChange(index, event)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </>
                    )}
                    <Button
                      className="cancel-btn-first"
                      onClick={() => handleRemoveUrls()}
                    >
                      Delete
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                    <Button
                      className="add-btn-second"
                      onClick={() => handleAddLinks()}
                    >
                      Add
                    </Button>
                  </div>
                  <br />
                  <Button
                    style={{ backgroundColor: "#5142fc", width: "185px" }}
                    onClick={handleFinalSubmit}
                  >
                    Submit
                  </Button>
                  {postStatus === "success" && showModal && (
                    <SuccessModal setShowModal={setShowModal} />
                  )}
                  {postStatus === "error" && showModal && (
                    <ErrorModal setShowModal={setShowModal} />
                  )}
                  {postStatus === null && showModal && (
                    <LoadingModal setShowModal={setShowModal} />
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

export default Create;
