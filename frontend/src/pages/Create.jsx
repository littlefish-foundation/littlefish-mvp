import React, { useState } from "react";
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

import useBase64Converter from "../Hooks/useBase64Converter";
import Tags from "../components/tags/Tags";
import axios from "axios";

import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import img from "../assets/avatarsAndImages/example.png";
import "../styles/create-item.css";
import Base64 from "../components/imageConversion/Base64";
import PopOvers from "../components/UserInterface/popovers/PopOvers";
import SuccessModal from "../components/UserInterface/Modal/SuccessModal";
import ErrorModal from "../components/UserInterface/Modal/ErrorModal";
import LoadingModal from "../components/UserInterface/Modal/LoadingModal";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import "../components/tags/Tags.css";
import { TagsInput } from "react-tag-input-component";

const Create = (props) => {
  const actionInitialState = {
    assetName: "Whitepaper",
    imagesBase64: img,
    ownerName: "Littlefish DAO",
    price: "20",
  };

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

  const { popularActionType } = useFetchForPopularActionType(
    "https://api.littlefish.foundation/action-type/popular"
  );

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { imgBase64, onChangeImgFile } = useBase64Converter();

  console.log(imgBase64);
  //console.log(Array.isArray(defaultTypes));    []?.push(defaultTypes)
  //console.log(defaultTypes);

  const maxCount = 256;
  const walletid = sessionStorage.getItem("walletID");

  const [newPopularActionType, setNewPopularActionType] =
    useState(popularActionType);

  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState("");
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [files, setFiles] = useState([]);
  const [colonyName1, setColonyName1] = useState("");
  const [postStatus, setPostStatus] = useState(null);
  const [actionTypes, setActionTypes] = useState([]);

  const [newActionType, setNewActionType] = useState();
  const [allUrls, setAllUrls] = useState([{ urlName: "", url: "" }]);

  console.log(actionTypes);

  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////

  const onCheckboxBtnClick = (selected) => {
    const index = actionTypes.indexOf(selected);
    if (index < 0) {
      actionTypes.push(selected);
    } else {
      actionTypes.splice(index, 1);
    }
    setActionTypes([...actionTypes]);
  };

  // const handlePostNewActionType = (e) => {
  //   e.preventDefault();
  //   setActionTypes(e.target.value);
  //   axios
  //     .post(
  //       `https://api.littlefish.foundation/action-type/?name=${newActionType}`
  //     )

  //     .then((response) => response.status)
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };

  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////

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

  const onChangeColony = (e) => {
    setColonyName1(e.target.value);
  };

  const Type = { actionTypes: actionTypes };
  const Colony = { colonyName: colonyName1 };
  const urls = { links: allUrls };
  const { assetName, name, description, ownerName, price } = eachEntry;
  Object.assign(eachEntry, Type, Colony, urls);

  const handleInputChange = (e) => {
    setEachEntry({
      ...eachEntry,
      [e.target.name]: e.target.value,
      image: imageData.split(",")[1],
      mediaType: imageData?.split(",")[0]?.split(":")?.pop()?.split(";")[0],
      files: imgBase64,
      walletID: walletid,
    });
  };

  console.log(eachEntry);

  ///* ************************************************************************************************************************************ *///

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/action/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(eachEntry),
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        setPostStatus(Object.entries(data)[0][0]);

        console.log(Object.entries(data)[0][0]);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });

    console.log(eachEntry);
    setEachEntry(initialInputState);

    //setActionTypes(actionTypes);
    setColonyName1("");
    setShowModal(true);
  };

  ///* ************************************************************************************************************************************ *///
  console.log(eachEntry);
  console.log(postStatus);

  return (
    <div onClick={() => showModal && setShowModal(false)}>
      <SubHeader />

      <section>
        <Container>
          <h2
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px ",
            }}
          >
            Generate New Action
          </h2>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Example Action</h5>
              <NftCard item={actionInitialState} />
            </Col>

            <Col lg="8" md="8" sm="6">
              <div className="create__item">
                <Form>
                  <h2>Basic Information</h2>
                  <FormGroup className="metadata_basic_section">
                    <FormGroup className="form__input">
                      <Label for="walletID">Wallet ID*</Label>

                      <Input
                        required="true"
                        id="walletID"
                        name="walletID"
                        type="text"
                        placeholder="Connect your wallet to fill this part"
                        value={walletid}
                      ></Input>
                      <PopOvers />
                    </FormGroup>

                    <Base64 parentCallback={handleCallback} />

                    <FormGroup className="form__input">
                      <Label for="ownerName">Action Producer*</Label>
                      <Input
                        required
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
                        required
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
                      <Label for="description">Description*</Label>
                      <Input
                        required
                        id="description"
                        type="textarea"
                        name="description"
                        rows="4"
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
                  </FormGroup>
                  <br />

                  <h2>Metadata Information</h2>
                  <FormGroup className="metadata_basic_section">
                    <FormGroup className="form__input" required>
                      <Label for="name">Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter the full Name of the Action"
                        onChange={handleInputChange}
                        value={name}
                      />
                      <PopOvers />
                    </FormGroup>

                    <br />
                    <div>
                      <h6 style={{ color: "white" }}>Action Type*</h6>

                      <FormGroup className="form__tag">
                        {popularActionType?.actionTypes?.map((item) => (
                          <Button
                            id="tag_button"
                            value={item.name}
                            style={{
                              color: "inherit",
                              marginRight: "3px",
                              marginBottom: "3px",
                              marginTop: "3px",
                              fontWeight: "300",
                              fontSize: "0.8rem",
                            }}
                            color="secondary"
                            outline
                            onClick={() => onCheckboxBtnClick(item.name)}
                            active={actionTypes?.includes(item.name)}
                          >
                            {item.name}
                          </Button>
                        ))}
                        {/* <Button
                          onClick={handlePostNewActionType}
                          style={{
                            backgroundColor: "transparent",
                            position: "absolute",

                            height: "33.2px",
                            paddingTop: "0px",

                            fontWeight: "300",
                            objectFit: "contain",
                          }}
                        >
                        <Input
                            style={{
                              backgroundColor: "inherit",
                              height: "31.2px",
                              color: "white",
                              width: "auto",
                              padding: "0px",
                              border: "none",
                              fontSize: "0.8rem",
                            }}
                            placeholder="Enter a New Type Here"
                            name="newActionType"
                            type="text"
                            onChange={(e) => setNewActionType(e.target.value)}
                            value={newActionType}
                          />
                        </Button>*/}

                        <p
                          style={{
                            marginBottom: "3px",
                            color: "inherit",
                            fontWeight: "300",
                            fontSize: "0.8rem",
                          }}
                        >
                          Selected: {JSON.stringify(actionTypes)}
                        </p>
                      </FormGroup>
                    </div>

                    <FormGroup className="form__input">
                      <Label for="additionalImages">
                        Upload Additional Images
                      </Label>

                      <Input
                        required={false}
                        id="additionalImages"
                        type="file"
                        name="additionalImages"
                        onChange={(e) => onChangeImgFile(e)}
                        accept="*/*"
                        multiple
                      />
                    </FormGroup>

                    <FormGroup className="form__input">
                      <Label for="colonyName">Colony Name*</Label>
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
                      <PopOvers />
                    </FormGroup>

                    <FormGroup className="form__input">
                      <Label for="price">Price*</Label>
                      <Input
                        required
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
                                    <Label for="linkName">
                                      Name of the URL
                                    </Label>

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
                  </FormGroup>
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
