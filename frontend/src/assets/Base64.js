import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { Tooltip } from "reactstrap";
import PopOvers from "../components/UserInterface/popovers/PopOver";

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
        <Label for="image">Upload Cover Image*</Label>

        <Input
          //required
          type="file"
<<<<<<< Updated upstream
          url="http://localhost:8000/action/"
=======
          id="image"
          url="https://api.littlefish.foundation/action/"
>>>>>>> Stashed changes
          name="image"
          onChange={this.handleFileInputChange}
          accept="image/*"
        />
        <PopOvers />
      </FormGroup>
    );
  }
}

export default Base64;
