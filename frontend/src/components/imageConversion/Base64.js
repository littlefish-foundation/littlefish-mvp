import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import PopOvers from "../UserInterface/popovers/PopOvers";

class Base64 extends React.Component {
  state = {
    file: null,
    base64URL: "",
  };

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
        var baseData = baseURL;
        return baseData;
      };
    });
  };

  handleFileInputChange = (e) => {
    e.preventDefault();
    let { file } = this.state;
    file = e.target.files[0];
    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        var arr = Object.values(file);
        this.props.parentCallback(arr[0]);
        window.bas64Data = arr[0];
        console.log(window.bas64Data);
        this.setState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0],
    });
  };

  render() {
    return (
      <FormGroup className="form__input">
        <Label for="image">Upload Cover Image</Label>

        <Input
          id="image"
          type="file"
          url="https://api.littlefish.foundation/action/"
          name="image"
          onChange={this.handleFileInputChange}
          accept="*/*"
        />

        <PopOvers />
      </FormGroup>
    );
  }
}

export default Base64;
