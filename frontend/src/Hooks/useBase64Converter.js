import React, { useState } from "react";

function useBase64Converter() {
  const [imgBase64, setImgBase64] = useState([]);
  const [singleImgBase64, setSingleImgBase64] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSingleImgBase64(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const onChangeImgFile = (e) => {
    const imgFileAry = e.target.files;

    setImgBase64([]);

    for (let i = 0; i < imgFileAry.length; i++) {
      if (imgFileAry[i]) {
        let reader = new FileReader();

        reader.readAsDataURL(imgFileAry[i]);

        reader.onloadend = () => {
          const base64 = reader.result;

          if (base64) {
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  return { imgBase64, onChangeImgFile, singleImgBase64, uploadImage };
}

export default useBase64Converter;

// const [imgsSrc, setImgsSrc] = useState([]);
// const onChange = (e) => {
//   for (const file of e.target.files) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       setImgsSrc((imgs) => [...imgs, reader.result]);
//     };
//     reader.onerror = () => {
//       console.log(reader.error);
//     };
//   }
// };
