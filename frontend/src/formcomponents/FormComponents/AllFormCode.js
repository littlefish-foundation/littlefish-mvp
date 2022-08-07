import "primereact/resources/themes/bootstrap4-dark-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import "../index.css";
import "./FormDemo.css";

const AllFormCode = (props) => {
  const [nameValue, setNameValue] = useState("");
  const [discordValue, setDiscordValue] = useState("");
  const [actionTypeValue, setActionTypeValue] = useState("");

  const [descriptionValue, setDescriptionValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const toast = useRef(null);
  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      
      const uploadType = reader.result.split(',')[0];
      const base64data = reader.result.split(',')[1];
      window.basedata = base64data;
      window.uploadType = uploadType
      console.log(uploadType);
    };
  };
  //console.log(window.basedata);

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Name or Nickname is required.";
    }

    if (!data.discordServer) {
      errors.discordServer = "Discord Server Name is required.";
    }

    if (!data.actionType) {
      errors.actionType = "Action Type is required.";
    }

    if (!data.description) {
      errors.description = "You need to desribe your action.";
    }
    return errors;
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const [url1, setURL1] = useState("");
  const isInputTextChanged1 = (e) => {
    console.log(e.target.value);
    let urlVal1 = e.target.value;
    if (urlVal1.includes("https://")) urlVal1 = urlVal1.split("https://")[1];
    window.url1 = urlVal1;

    setURL1(urlVal1);
  };

  const [url2, setURL2] = useState("");
  const isInputTextChanged2 = (e) => {
    console.log(e.target.value);
    let urlVal2 = e.target.value;
    if (urlVal2.includes("https://")) urlVal2 = urlVal2.split("https://")[1];
    window.url2 = urlVal2;

    setURL2(urlVal2);
  };

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    //console.log(formData);
    window.name = data.name;
    window.discordServer = data.discordServer;
    window.actionType = data.actionType;
    window.description = data.description;

    form.restart();
  };

  const options = {
    method: "POST",
    url: "http://localhost:8000/nft",
    data: {
      nft: {
        tokens: [
          {
            owner_name: window.name,
            asset_name: window.discordServer,
            desc: window.description,
            //media_type: "image/jpeg",
            image: window.basedata,
            link_1: window.url1,
            link_2: window.url2,
          },
        ],
      },
    },
  };
  console.log(options.data);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-spinner"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Your NFT is being Minted...!</h5>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center" style={{ color: "white" }}>
            Create a New Action
          </h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              discordServer: "",
              actionType: "",
              description: "",
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="inputtext"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Owner's Name or Nickname*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="discordServer"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <InputText
                          id="discordServer"
                          value={discordValue}
                          onChange={(e) => setDiscordValue(e.target.value)}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="inputtext"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Action name*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="actionType"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <InputText
                          id="actionType"
                          value={actionTypeValue}
                          onChange={(e) => setActionTypeValue(e.target.value)}
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="inputtext"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Action Type*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputTextarea
                          id="description"
                          value={descriptionValue}
                          onChange={(e) => setDescriptionValue(e.value)}
                          rows={3}
                          {...input}
                          autoResize
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="textarea"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Describe Your Action.*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">https://</span>
                  <InputText
                    id="YoutubeLink"
                    value={url1}
                    placeholder="Enter YouTube link if any."
                    onChange={isInputTextChanged1}
                  />
                </div>

                <br />
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">https://</span>
                  <InputText
                    id="OtherLinks"
                    value={url2}
                    placeholder="Enter other relevant links."
                    onChange={isInputTextChanged2}
                  />
                </div>

                <br />
                <br />

                <div>
                  <Toast ref={toast}></Toast>
                  <h5 style={{ color: "white" }}>
                    Upload a Cover Image for your Action
                  </h5>
                  <FileUpload
                    name="image"
                    //url="http://localhost:8000/nft"
                    accept="image/*"
                    customUpload
                    uploadHandler={customBase64Uploader}
                    auto
                  />
                </div>

                <br />
                <br />

                <Button type="submit" label="Submit" className="mt-2" />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AllFormCode;
