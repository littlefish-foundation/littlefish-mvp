



/*const CoverImage = () => {
    const toast = useRef(null);
    const customBase64Uploader = async (event) => {
  // convert file to base64 encoded
    const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
  reader.readAsDataURL(blob);
  reader.onloadend = function () {
    const uploadType = reader.result.split(",")[0];
    const base64data = reader.result.split(",")[1];
    window.basedata = base64data;
    window.uploadType = uploadType.split(":").pop().split(";")[0];
    //console.log(uploadType);

    return(

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
  </div>)
  };
  

};
*/