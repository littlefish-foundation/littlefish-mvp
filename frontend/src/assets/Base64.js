import React from "react";
import {

  FormGroup,
  Input,
  Label,
} from "reactstrap";

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
        //console.log("Called", reader);
        baseURL = reader.result;

        resolve(baseURL);
        var baseData = baseURL;
        return baseData;
      };
      //console.log(reader.onload);
    });
  };

  handleFileInputChange = (e) => {
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;

        var arr = Object.values(file);

        window.bas64Data = arr[0];

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
          type="file"
          url="http://localhost:8000/action/"
          name="image"
          onChange={this.handleFileInputChange}
          accept="image/*"
        />
      </FormGroup>
    );
  }
}

export default Base64;
