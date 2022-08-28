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
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
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
    colonyName: "",
    mediaType: "",
    price: null,
  };

  const [eachEntry, setEachEntry] = useState(initialInputState);
  const [actionType1, setActionType1] = useState(null);

  const onChangeSelection = (e) => {
    setActionType1(e.target.value);
  };

  const Type = { actionType: actionType1 };
  console.log(Type);

  const {
    assetName,
    name,
    description,
    ownerName,
    //actionType,
    youtubeLink,
    otherLink,
    colonyName,
    //image,
    //mediaType,
    price,
  } = eachEntry;

  Object.assign(eachEntry, Type);
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
  //console.log(eachEntry);

  /*fetch('http://185.203.34.66:8080/action/', {
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

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    fetch("http://185.203.34.66:8080/action/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eachEntry),
    }).then(() => {});

    console.log(eachEntry);
    setEachEntry(initialInputState);
  };

  return (
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
  );
};

export default Create;
