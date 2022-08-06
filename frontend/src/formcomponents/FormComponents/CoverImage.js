import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
export const CoverImage = () => {
  
  const toast = useRef(null);
  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      console.log(base64data);
    };
  };
  return (
    <div>
      <Toast ref={toast}></Toast>
      <h5 style={{color: "white"}}>Upload a Cover Image for your Action</h5>
      <FileUpload
        name="image"
        //url="http://localhost:8000/nft"
        accept="image/*"
        customUpload
        uploadHandler={customBase64Uploader}
        auto
      />
    </div>
  );
};
export default CoverImage;
