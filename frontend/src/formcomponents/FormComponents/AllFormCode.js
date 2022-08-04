import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { classNames } from "primereact/utils";
import CoverImage from "./CoverImage";
import "../index.css";
import "./FormDemo.css";
import "primeicons/primeicons.css"; //icons

const AllFormCode = () => {
  const [nameValue, setNameValue] = useState("");
  const [discordValue, setDiscordValue] = useState("");
  const [actionTypeValue, setActionTypeValue] = useState("");


  const [descriptionValue, setDescriptionValue] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

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

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const [url, setURL] = useState("");
  const isInputTextChanged = (e) => {
    console.log(e.target.value);
    let urlVal = e.target.value;
    if (urlVal.includes("https://")) urlVal = urlVal.split("https://")[1];

    setURL(urlVal);
  };

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Create a New Action</h5>
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
                          Name or Nickname*
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
                          Discord server name*
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
                    value={url}
                    placeholder="Enter YouTube link if any."
                    onChange={isInputTextChanged}
                  />
                </div>

                <br />
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">https://</span>
                  <InputText
                    id="OtherLinks"
                    value={url}
                    placeholder="Enter other relevant links."
                    onChange={isInputTextChanged}
                  />
                </div>

                <br />
                <br />

                <CoverImage />

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
