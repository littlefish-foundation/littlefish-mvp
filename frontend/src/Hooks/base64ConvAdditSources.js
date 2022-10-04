import { useState } from "react";
import Resizer from "react-image-file-resizer";

function useBase64ConverterAdditionalSources() {
  const [imgBase64, setImgBase64] = useState([]);
  const [singleImgBase64, setSingleImgBase64] = useState();
  // const [filesObject, setFilesObject] = useState({ type: "", src: "" });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await resizeFile(file);
    setSingleImgBase64(base64);
  };

  const onChangeImgFile = (e) => {
    e.preventDefault();
    const imgFileAry = e.target.files;

    setImgBase64([]);

    for (let i = 0; i < imgFileAry.length; i++) {
      if (imgFileAry[i]) {
        let reader = new FileReader();

        reader.readAsDataURL(imgFileAry[i]);

        reader.onloadend = () => {
          const base64 = reader.result;

          if (base64) {
            let filesObject = {};
            var base64Sub = base64.toString();
            filesObject.type = base64Sub
              ?.split(",")[0]
              ?.split(":")
              ?.pop()
              ?.split(";")[0];

            filesObject.src = base64Sub;

            setImgBase64((imgBase64) => [...imgBase64, filesObject]);
          }
        };
      }
    }
  };

  console.log(imgBase64);

  return {
    imgBase64,
    onChangeImgFile,
    singleImgBase64,
    uploadImage,
  };
}

export default useBase64ConverterAdditionalSources;
