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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SubHeader from "../components/UserInterface/Sub-Header/SubHeader";
import NftCard from "../components/UserInterface/Nft-card/NftCard";
import img from "../assets/example.png";
import "../styles/create-item.css";
import Base64 from "../assets/Base64";
import Wallet from "./Wallet";

const action = {
  id: "01",
  assetName: "Whitepaper",
  description:
    "The foundational document of the littlefish foundation; our values, philosophy, the problem space, and our approach to solving problems in it.",
  image: img,
  ownerName: "Littlefish DAO",
  actionType: "Research & Development",
  price: "20",
};

const Create = (props) => {
  const initialInputState = {
    walletID: "",
    assetName: "",
    name: "",
    description: "",
    ownerName: "",
    actionType: null,
    youtubeLink: "",
    otherLink: "",
    image: "",
    //colonyName: "",
    mediaType: "",
    price: null,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [actionType1, setActionType1] = useState("");

  const [colonyName1, setColonyName1] = useState("");

  const onChangeSelection = (e) => {
    setActionType1(e.target.value);
  };

  const onChangeColony = (e) => {
    setColonyName1(e.target.value);
  };

  const Type = { actionType: actionType1 };
  console.log(Type);

  const Colony = { colonyName: colonyName1 };

  const {
    assetName,
    name,
    description,
    ownerName,
    //actionType,
    youtubeLink,
    otherLink,
    //colonyName,
    //image,
    //mediaType,
    price,
  } = eachEntry;

  Object.assign(eachEntry, Type, Colony);
  // console.log(newEachEntry);
  console.log(eachEntry);

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

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.littlefish.foundation/action/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachEntry),
    }).then(() => {});

    console.log(eachEntry);
    setEachEntry(initialInputState);
    setActionType1("");
    setColonyName1("");
  };

  return (
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
                        If you are not able to see your Wallet ID, reconnect
                        your wallet
                      </FormText>
                    </FormGroup>

                    <Base64 />

                    <FormGroup className="form__input">
                      <Label for="ownerName">Action Producer</Label>
                      <Input
                        name="ownerName"
                        type="text"
                        placeholder="Enter the Name of the Producer"
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
                        placeholder="Enter the full Name of the Action"
                        onChange={handleInputChange}
                        value={name}
                      />
                    </FormGroup>

                    <FormGroup className="form__input">
                      <Label for="actionType">Action Type</Label>
                      <Input
                        type="select"
                        name="actionType"
                        onChange={onChangeSelection}
                        value={actionType1}
                      >
                        <option>Choose Action Type</option>
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
                        If you want to sell this action please add a price in
                        ADA, otherwise you may leave it empty.
                      </FormText>
                    </FormGroup>

                    <Button onClick={toggle}>Submit</Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Create;
