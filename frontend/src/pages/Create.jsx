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
  FormText,
} from "reactstrap";
<<<<<<< Updated upstream
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
=======

import PopOvers from "../components/UserInterface/popovers/PopOver";

import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
>>>>>>> Stashed changes
import img from "../assets/example.png";
import "../styles/create-item.css";
import Modal from "../components/UserInterface/Modal/Modal";
import Base64 from "../assets/Base64";
import { BsInfoCircle } from "react-icons/bs";

import DynamicFields from "../components/UserInterface/DynamicFields/DynamicFields";

const action = {
  id: "01",
  assetName: "Whitepaper",
  description:
    "The foundational document of the littlefish foundation; our values, philosophy, the problem space, and our approach to solving problems in it.",
  image: img,
  ownerName: "Littlefish DAO",
  actionType: "Research & Development",
};

// const isEmpty = (value) => value?.trim() === "";
// const isNull = (value) => value === null;

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
    price: null,
  };

<<<<<<< Updated upstream
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [actionType1, setActionType1] = useState(null);
=======
  const maxCount = 256;

  const [formInputValidity, setFormInputValidity] = useState({
    assetName: true,
    name: true,
    ownerName: true,
    walletID: true,
    description: true,
  });

  const [showModal, setShowModal] = useState(false);
  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [actionType1, setActionType1] = useState("");
  const [colonyName1, setColonyName1] = useState("");
>>>>>>> Stashed changes

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  // const [mustBeValidEntries, setMustBeValidEntries] = useState(true);

  // const [assetNameValid, setAssetNameValid] = useState(true);
  // const [nameValid, setNameValid] = useState(true);
  // const [ownerNameValid, setOwnerNameValid] = useState(true);
  // const [walletIDValid, setWalletIDValid] = useState(true);
  // const [descriptionValid, setDescripttionValid] = useState(true);
  // const [priceValid, setPriceValid] = useState(true);
  // const [actionTypeValid, setActionTypeValid] = useState(true);
  // const [colonyNameValid, setColonyNameValid] = useState(true);

  const onChangeSelection = (e) => {
    setActionType1(e.target.value);
  };

  const Type = { actionType: actionType1 };

  const {
    walletID,
    assetName,
    name,
    description,
    ownerName,
    //actionType,
<<<<<<< Updated upstream
    youtubeLink,
    otherLink,
    colonyName,
=======

    //colonyName,
>>>>>>> Stashed changes
    //image,
    //mediaType,
    price,
  } = eachEntry;

  Object.assign(eachEntry, Type);
  // console.log(newEachEntry);

  const handleInputChange = (e) => {
    setEachEntry({
      ...eachEntry,
      [e.target.name]: e.target.value,
      image: window.bas64Data?.split(",")[1],
      mediaType: window.bas64Data
        ?.split(",")[0]
        ?.split(":")
        ?.pop()
        ?.split(";")[0],
        walletID: window.namiAddress,
    });
  };
  //console.log(eachEntry);

  /*fetch('http://localhost:8000/action/', {
    method: 'POST',
    body: JSON.stringify(
      eachEntry
    )
    headers: {
      'Content-type': 'application/json',
    },
  })
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        // Handle data
     })
     .catch((err) => {
        console.log(err.message);
     });*/

  console.log(eachEntry);
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // const assetNameValid = !isEmpty(assetName);
    // const nameValid = !isEmpty(name);
    // const ownerNameValid = !isEmpty(ownerName);
    // const walletIDValid = !isEmpty(walletID);
    // const descriptionValid = !isEmpty(description);

    // setFormInputValidity({
    //   assetName: assetNameValid,
    //   name: nameValid,
    //   ownerName: ownerNameValid,
    //   walletID: walletIDValid,
    //   description: descriptionValid,
    // });

    // const formIsValid =
    //   assetNameValid &&
    //   nameValid &&
    //   ownerNameValid &&
    //   walletIDValid &&
    //   descriptionValid;

    // if (!formIsValid) {
    //   return;
    // }

    fetch("http://localhost:8000/action/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => {
        console.log("Error:", err.message);
      });

    console.log(eachEntry);
    setEachEntry(initialInputState);
<<<<<<< Updated upstream
=======
    setActionType1("");
    setColonyName1("");
    setShowModal(true);
>>>>>>> Stashed changes
  };

  // const assetNameInavlidityControl = formInputValidity.assetName ? false : true;
  // const nameInavlidityControl = formInputValidity.name ? false : true;
  // const ownerNameInavlidityControl = formInputValidity.ownerName ? false : true;
  // const walletIDInavlidityControl = formInputValidity.walletID ? false : true;
  // const descriptionInavlidityControl = formInputValidity.description
  //   ? false
  //   : true;

  const assetNameInavlidityControl = formInputValidity.assetName ? false : true;
  const nameInavlidityControl = formInputValidity.name ? false : true;
  const ownerNameInavlidityControl = formInputValidity.ownerName ? false : true;
  const walletIDInavlidityControl = formInputValidity.walletID ? false : true;
  const descriptionInavlidityControl = formInputValidity.description
    ? false
    : true;

  return (
<<<<<<< Updated upstream
    <>
      <CommonSection assetName="Generate a New Action" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Example Action</h5>
              <NftCard item={action} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <Form>
                  <FormGroup className="form__input">
                    <Label for="ownerName">Wallet ID</Label>
                    <Input
                      name="walletId"
                      type="text"
                      placeholder="Connect your wallet to fill this part"
                      value={window.namiAddress}
                    />
                    <FormText>
                      If you are not able to see your Wallet ID, reconnect your
                      wallet
                    </FormText>
                  </FormGroup>

                  <Base64 />

                  <FormGroup className="form__input">
                    <Label for="ownerName">Owner Name or Nickname</Label>
                    <Input
                      name="ownerName"
                      type="text"
                      placeholder="Enter the Name or Nickname of the Owner"
                      onChange={handleInputChange}
                      value={ownerName}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="assetName">Action Name</Label>
                    <Input
                      name="assetName"
                      type="text"
                      placeholder="Enter the Name of the Action"
                      onChange={handleInputChange}
                      value={assetName}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="name">Name</Label>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter the full Name"
                      onChange={handleInputChange}
                      value={name}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="actionType">Action Type</Label>
                    <Input
                      name="actionType"
                      type="select"
                      onChange={onChangeSelection}
                      value={actionType1}
                    >
                      <option value="default" faded hidden>
                        Choose the Action Type
                      </option>
                      <option value="Software Developing">
                        Sofware Developing
                      </option>
                      <option value="Research">Research</option>
                      <option value="Community Help">Community Help</option>
                      <option value="Plan & Strategy">Plan & Strategy</option>
                    </Input>
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="description">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      rows="4"
                      placeholder="Enter description"
                      onChange={handleInputChange}
                      value={description}
                      className="w-100"
                    ></Input>
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="colonyName">Colony Name</Label>
                    <Input
                      name="colonyName"
                      type="text"
                      placeholder="Enter the colony name"
                      onChange={handleInputChange}
                      value={colonyName}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="youtubeLink">YouTube Link</Label>
                    <Input
                      name="youtubeLink"
                      type="text"
                      placeholder="Enter YouTube link if any."
                      onChange={handleInputChange}
                      value={youtubeLink}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="otherLink">Other Link</Label>
                    <Input
                      name="otherLink"
                      type="text"
                      placeholder="Enter other relavant link if any."
                      onChange={handleInputChange}
                      value={otherLink}
                    />
                  </FormGroup>

                  <FormGroup className="form__input">
                    <Label for="exampleZip">Price</Label>
                    <Input
                      name="price"
                      type="number"
                      placeholder="Please enter a price in ADA"
                      onChange={handleInputChange}
                      value={price}
                    />

                    <FormText>
                      If you want to sell this action please add a price in ADA,
                      otherwise you may leave it empty.
                    </FormText>
                  </FormGroup>

                  <Button onClick={handleFinalSubmit}>Submit</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
=======
    <div>
      <div>
        <SubHeader assetName="Generate a New Action" />

        <section>
          <Container>
            <Row>
              <Col lg="3" md="4" sm="6">
                <h5 className="mb-4 text-light">Example Action</h5>
                <NftCard item={action} />
              </Col>

              <Col lg="8" md="8" sm="6">
                <div className="create__item">
                  <Form>
                    <FormGroup className="form__input">
                      <Label for="walletID">Wallet ID*</Label>

                      <Input
                        required
                        id="walletID"
                        name="walletID"
                        type="text"
                        placeholder="Connect your wallet to fill this part"
                        onChange={handleInputChange}
                        value={window.namiAddress}
                      ></Input>
                      <PopOvers />
                    </FormGroup>

                    <Base64 />

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
                      <Label for="name">Name*</Label>
                      <Input
                        required
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
                        required
                        id="actionType"
                        type="select"
                        name="actionType"
                        onChange={onChangeSelection}
                        value={actionType1}
                      >
                        <option></option>
                        <option value="Software Developing">
                          Sofware Developing
                        </option>
                        <option value="Research">Research</option>
                        <option value="Community Help">Community Help</option>
                        <option value="Plan & Strategy">Plan & Strategy</option>
                      </Input>
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
                        minLength="50"
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
                        required
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

                    <DynamicFields />

                    {/*<FormGroup className="form__input">
                      <Label for="youtubeLink">YouTube Link</Label>
                      <Input
                        name="youtubeLink"
                        type="text"
                        placeholder="Enter YouTube link if any."
                        onChange={handleInputChange}
                        value={youtubeLink}
                      />
                    </FormGroup>

                    <FormGroup className="form__input">
                      <Label for="otherLink">Other Link</Label>
                      <Input
                        name="otherLink"
                        type="text"
                        placeholder="Enter other relavant link if any."
                        onChange={handleInputChange}
                        value={otherLink}
                      />
  </FormGroup>*/}
                    <br/>
                    <Button style={{ backgroundColor:"#5142fc" , width:"185px"}} onClick={handleFinalSubmit}>Submit</Button>

                    {showModal && <Modal setShowModal={setShowModal} />}
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
>>>>>>> Stashed changes
  );
};

export default Create;
