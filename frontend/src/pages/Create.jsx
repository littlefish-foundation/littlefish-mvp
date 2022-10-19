import React, { useState } from "react";
import useBase64ConverterAdditionalSources from "../Hooks/base64ConvAdditSources";
import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import img from "../assets/example.png";
import Base64 from "../components/imageConversion/Base64";
import PopOvers from "../components/UserInterface/popovers/PopOvers";
import SuccessModal from "../components/UserInterface/Modal/SuccessModal";
import ErrorModal from "../components/UserInterface/Modal/ErrorModal";
import LoadingModal from "../components/UserInterface/Modal/LoadingModal";
import useFetchForPopularActionType from "../Hooks/getPopularActionType";
import { LITTLEFISH_API_URL } from "../../config.json";
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
import "../styles/create-item.css";

const Create = (props) => {
  const actionInitialState = {
    name: "Whitepaper",
    image: img,
    producerName: "Littlefish DAO",
    minimumPrice: "20",
  };

  const initialInputState = {
    walletAddress: "",
    name: "",
    description: "",
    producerName: "",
    image: "",
    colony: "",
    mediaType: "",
    minimumPrice: "",
  };

  const { popularActionType } = useFetchForPopularActionType();

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { imgBase64, onChangeImgFile } = useBase64ConverterAdditionalSources();

  const maxCount = 256;
  const maxAssetNameCount = 31;
  const walletid = sessionStorage.getItem("walletID");
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState("");
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [colony, setColony] = useState("");
  const [postStatus, setPostStatus] = useState(null);
  const [types, setTypes] = useState([]);
  const [newActionType, setNewActionType] = useState([{ value: null }]);
  const [allUrls, setAllUrls] = useState([
    /*{ urlName: "", url: "" }*/
  ]);

  console.log(types);

  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////

  const onCheckboxBtnClick = (selected) => {
    const index = types.indexOf(selected);
    if (index < 0) {
      types.push(selected);
    } else {
      types.splice(index, 1);
    }
    setTypes([...types]);
  };

  ///* *********************************************************************************************************************************** *////
  ///* *********************************************************************************************************************************** *////

  const handleCallback = (childData) => {
    setImageData(childData);
  };

  const handleNewActionTypeChange = (i, event) => {
    const values = [...newActionType];
    newActionType[i].value = event.target.value;
    setNewActionType(values);
  };

  const handleSubmitNewType = () => {
    newActionType.map((type) => types.push(type.value));
    setTypes([...types]);
  };

  const handleAddNewTypeClick = () => {
    const values = [];
    values.push({ value: null });
    setNewActionType(values);
  };

  console.log(newActionType.map((type) => type.value));

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
    setColony(e.target.value);
  };

  const Type = { types: types };
  const Colony = { colony: colony };
  const urls = { links: allUrls };
  const { name, description, producerName, minimumPrice } = eachEntry;
  Object.assign(eachEntry, Type, Colony, urls);

  const handleInputChange = (e) => {
    setEachEntry({
      ...eachEntry,
      [e.target.name]: e.target.value,
      image: imageData?.split(",")[1],
      mediaType: imageData?.split(",")[0]?.split(":")?.pop()?.split(";")[0],

      files: imgBase64,
      walletAddress: walletid,
    });
  };

  console.log(eachEntry);

  ///* ************************************************************************************************************************************ *///

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    function clean(eachEntry) {
      for (var links in eachEntry) {
        if (eachEntry[links.length] === 0) {
          delete eachEntry[links];
        }
      }
      return eachEntry;
    }
    fetch(`${LITTLEFISH_API_URL}/action/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(clean(eachEntry)),
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

    console.log(eachEntry);
    setEachEntry(initialInputState);

    setColony("");
    setShowModal(true);
  };

  ///* ************************************************************************************************************************************ *///
  console.log(eachEntry);
  console.log(postStatus);
  console.log(errorMessage);

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
            Create New Action
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
                      <Label for="walletAddress">Wallet Address*</Label>

                      <Input
                        required="true"
                        id="walletAddress"
                        name="walletAddress"
                        type="text"
                        placeholder="Connect your wallet to fill this part"
                        value={walletid}
                      ></Input>
                      <PopOvers />
                    </FormGroup>

                    <Base64 parentCallback={handleCallback} />

                    <FormGroup className="metadata_basic_section">
                      <FormGroup className="form__input" required>
                        <Label for="name">Action Name*</Label>
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

                      <FormGroup className="form__input">
                        <Label for="producerName">Action Producer*</Label>
                        <Input
                          required
                          id="producerName"
                          name="producerName"
                          type="text"
                          placeholder="Enter the Name of the Producer"
                          onChange={handleInputChange}
                          value={producerName}
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
                            active={types?.includes(item.name)}
                          >
                            {item.name}
                          </Button>
                        ))}
                        <div>
                          {newActionType.map((field, idx) => {
                            return (
                              <div style={{ display: "flex" }}>
                                <Input
                                  style={{
                                    backgroundColor: "inherit",
                                    color: "white",
                                    width: "auto",
                                    border:
                                      "2px solid rgba(221, 221, 221, 0.171)",
                                    fontSize: "0.8rem",
                                  }}
                                  name="newActionType"
                                  type="text"
                                  placeholder="Add new Action Type"
                                  value={field.value || ""}
                                  onChange={(event) =>
                                    handleNewActionTypeChange(idx, event)
                                  }
                                ></Input>
                                <Button
                                  style={{
                                    background: "green",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "25px",
                                    fontSize: "1rem",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "5px",
                                    marginLeft: "2px",
                                    color: "#fff",
                                    border:
                                      "1px solid rgba(221, 221, 221, 0.171)",
                                  }}
                                  onClick={() => handleSubmitNewType()}
                                >
                                  +
                                </Button>
                              </div>
                            );
                          })}

                          <Button
                            style={{
                              background: "#6c757d",
                              borderRadius: "5px",
                              width: "auto",
                              height: "auto",
                              fontSize: "0.8rem",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "7px",
                              marginLeft: "2px",
                              color: "#fff",
                              border: "2px solid rgba(221, 221, 221, 0.171)",
                            }}
                            onClick={() => handleAddNewTypeClick()}
                          >
                            Add new Type
                          </Button>
                        </div>

                        <p
                          style={{
                            marginBottom: "3px",
                            color: "inherit",
                            fontWeight: "300",
                            fontSize: "0.8rem",
                          }}
                        >
                          Selected: {JSON.stringify(types)}
                        </p>
                      </FormGroup>
                    </div>

                    <FormGroup className="form__input">
                      <Label for="additionalImages">
                        Upload Additional Images or PDF files
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
                      <Label for="colony">Colony*</Label>
                      <Input
                        required
                        id="colony"
                        type="select"
                        name="colony"
                        onChange={onChangeColony}
                        value={colony}
                      >
                        <option>Choose your Colony</option>
                        <option value="Littlefish Foundation">
                          Littlefish Foundation
                        </option>
                      </Input>
                      <PopOvers />
                    </FormGroup>

                    <FormGroup className="form__input">
                      <Label for="minimumPrice">Price*</Label>
                      <Input
                        required
                        id="minimumPrice"
                        name="minimumPrice"
                        type="number"
                        placeholder="Please enter a price in ADA"
                        onChange={handleInputChange}
                        value={minimumPrice}
                      />

                      <PopOvers />
                    </FormGroup>

                    <div>
                      {allUrls.length > 0 && (
                        <React.Fragment>
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
                        </React.Fragment>
                      )}
                      {allUrls.length !== 0 && (
                        <div>
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
                            Add Link
                          </Button>
                        </div>
                      )}

                      {allUrls.length === 0 && (
                        <Button
                          onClick={() => handleAddLinks()}
                          style={{
                            background: "inherit",
                            border: "2px solid rgba(221, 221, 221, 0.171)",
                            width: "100%",
                            marginBottom: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Click Here to Add External Source Link
                        </Button>
                      )}
                    </div>
                  </FormGroup>

                  <Button
                    style={{
                      backgroundColor: "#70582a",
                      width: "185px",
                      marginTop: "1px",
                      marginBottom: "10px",
                    }}
                    onClick={handleFinalSubmit}
                  >
                    Submit
                  </Button>
                  {postStatus === "success" && showModal && (
                    <SuccessModal setShowModal={setShowModal} />
                  )}
                  {postStatus === "error" && showModal && (
                    <ErrorModal
                      setShowModal={setShowModal}
                      errorMessage={errorMessage}
                    />
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
