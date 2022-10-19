const isLongerThan64 = (str) => {
  return str.length > 64;
};

const isAnyNonString = (arr) => {
  return arr.find((e) => typeof e !== "string");
};
const isAnyNonObject = (arr) => {
  return arr.find((e) => typeof e !== "object");
};

const isAnElementLongerThan64 = (arr) => {
  return arr.find((e) => e.length > 64);
};

const isURL = (str) => {
  let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
  ); // fragment locators
  return !!pattern.test(str);
};

const isIpfs = (str) => {
  const reg = /ipfs:\/\/\w+/g;
  return reg.test(str);
};

const isImageType = (img) => {
  if (!img.startsWith("image/")) {
    return false;
  }
  const imgMimeTypes = ["png", "jpg", "jpeg", "svg"];
  const imgMimeType = img.split("/")[1];
  return imgMimeTypes.includes(imgMimeType);
};

const isMimeType = (element) => {
  if (!element.startsWith("image/") && !element.startsWith("application/")) {
    return false;
  }
  const elementMimeBase = element.split("/")[0];
  const elementMimeType = element.split("/")[1];
  const imgMimeTypes = ["png", "jpg", "jpeg", "svg"];
  const applicationMimeTypes = ["pdf, json"];

  if (elementMimeBase === "application") {
    return applicationMimeTypes.includes(elementMimeType);
  } else if (elementMimeBase === "image") {
    return imgMimeTypes.includes(elementMimeType);
  }
};

const actionMetadataValidator = (action) => {
  let actionErrors = [];

  if (!action) {
    console.log("Action should not be undefined / null");
    return;
  }
  if (Object.keys(action).length !== 1) {
    console.log("Action should have only 1 key-value pair");
    return;
  }

  const mainId = Object.keys(action)[0];

  if (mainId !== "721") {
    actionErrors.push(`The key should be "721"`);
  }

  const valueOf721 = action[mainId];

  if (
      Object.keys(valueOf721).length === 1 ||
      Object.keys(valueOf721).length === 2
  ) {
    const policyIdKey = Object.keys(valueOf721).find(
        (key) => key !== "version"
    );

    const policyIdValue = valueOf721[policyIdKey];

    if (Object.keys(policyIdValue).length > 1) {
      console.log(
          "Policy Id Object should only have 1 key value pair with the asset name key."
      );
      return;
    }

    const assetNameKey = Object.keys(policyIdValue)[0];
    const assetNameValue = policyIdValue[assetNameKey];

    const { name, image, mediaType, description, files } = assetNameValue;

    // NAME CHECK

    if (!name || !typeof name === "string") {
      actionErrors.push("name field should be provided with a string");
    } else if (isLongerThan64(name)) {
      actionErrors.push("name value should not be more than 64 characters.");
    }
    // IMAGE CHECK

    if (!image || (!typeof image === "string" && !Array.isArray(image))) {
      actionErrors.push(
          "image field should be provided with a string or an array of strings"
      );
    } else if (typeof image === "string") {
      if (isLongerThan64(image)) {
        actionErrors.push("image value should not be more than 64 characters.");
      }
      if (!isIpfs(image)) {
        actionErrors.push("image should be a valid URL");
      }
    } else if (Array.isArray(image)) {
      if (isAnyNonString(image)) {
        actionErrors.push(
            "Each array element in image should be type of string"
        );
      }
      if (isAnElementLongerThan64(image)) {
        actionErrors.push(
            "Each array element in image should have a maximum of 64 characters"
        );
      }

      if (!isIpfs(image.join(""))) {
        console.log("image elements should concatenate to a valid URL");
      }
    }

    // MEDIATYPE CHECK

    if (!mediaType || !typeof mediaType === "string") {
      actionErrors.push("mediaType field should be provided with a string");
    } else if (!isImageType(mediaType)) {
      actionErrors.push(
          ` mediaType should be in the format of "image/<mime_sub_type>" e.g. "image/png" `
      );
    }

    // DESCRIPTION CHECK

    if (
        !description ||
        (!typeof description === "string" && !Array.isArray(description))
    ) {
      actionErrors.push(
          "description field should be provided with a string or an array of strings"
      );
    } else if (typeof description === "string" && isLongerThan64(description)) {
      actionErrors.push(
          "description value should not be more than 64 characters."
      );
    } else if (
        Array.isArray(description) &&
        description.isAnElementLongerThan64
    ) {
      ("Each array element in description should have a maximum of 64 characters.");
    }

    //FILES

    if (!files || !Array.isArray(files) || isAnyNonObject(files)) {
      actionErrors.push(
          "files field should be provided with an array containing objects"
      );
      return;
    }

    let fileNameHasError = false;
    let fileMediaTypeHasError = false;
    let fileSrcHasError = false;

    // Other properties
    let objHasError = false;
    let strHasError = false;
    let arrHasError = false;
    let arrWithStringsHasError = false;
    let arrWithObjectsHasError = false;

    for (let file of files) {
      const { name: fileName, mediaType: fileMediaType, src: fileSrc } = file;

      if (
          (typeof fileName !== "string" || isLongerThan64(fileName)) &&
          !fileNameHasError
      ) {
        fileNameHasError = true;
      }

      if (!fileMediaType || !isMimeType(fileMediaType)) {
        fileMediaTypeHasError = true;
      }
      if (
          !fileSrc ||
          (!typeof fileSrc === "string" && !Array.isArray(fileSrc))
      ) {
        fileSrcHasError = true;
      } else if (typeof fileSrc === "string") {
        if (isLongerThan64(fileSrc)) {
          fileSrcHasError = true;
        }
        if (!isIpfs(fileSrc)) {
          fileSrcHasError = true;
        }
      } else if (Array.isArray(fileSrc)) {
        if (isAnyNonString(fileSrc)) {
          fileSrcHasError = true;
        }
        if (isAnElementLongerThan64(fileSrc)) {
          fileSrcHasError = true;
        }

        if (!isIpfs(fileSrc.join(""))) {
          fileSrcHasError = true;
        }
      }

      const fileKeys = Object.keys(file);

      for (let key of fileKeys) {
        if (key === "name" || key === "mediaType" || key === "src") {
          continue;
        }
        let fileValue = file[key];

        // is string
        if (typeof fileValue === "string" && !strHasError) {
          if (isLongerThan64(fileValue)) {
            strHasError = true;
          }
        }
        //is array
        else if (Array.isArray(fileValue)) {
          let isArrayWithObjects = true;
          let isArrayWithStrings = true;
          fileValue.forEach((item) => {
            if (typeof item !== "string") {
              isArrayWithStrings = false;
              return;
            }
          });
          fileValue.forEach((item) => {
            if (typeof item !== "object") {
              isArrayWithObjects = false;
              return;
            }
          });

          // array with strings
          if (isArrayWithStrings && !arrWithStringsHasError) {
            fileValue.forEach((str) => {
              if (isLongerThan64(str) && !arrWithStringsHasError) {
                arrWithStringsHasError = true;

                return;
              }
            });
          }

          //array with objects
          else if (isArrayWithObjects && !arrWithObjectsHasError) {
            fileValue.forEach((obj) => {
              const objKeys = Object.keys(obj);

              objKeys.forEach((key) => {
                if (
                    (typeof obj[key] !== "string" || isLongerThan64(obj[key])) &&
                    !arrWithObjectsHasError
                ) {
                  arrWithObjectsHasError = true;
                  return;
                }
              });
            });
          } else if (
              !isArrayWithStrings &&
              !isArrayWithObjects &&
              !arrHasError
          ) {
            arrHasError = true;
          }
        }

        // is object
        else if (typeof fileValue === "object") {
          const fileValueKeys = Object.keys(fileValue);

          fileValueKeys.forEach((key) => {
            if (
                (typeof fileValue[key] !== "string" ||
                    isLongerThan64(fileValue[key])) &&
                !objHasError
            ) {
              objHasError = true;
              return;
            }
          });
        }
      }
    }

    /*
    .
    .
    */
    const keys = Object.keys(assetNameValue);

    for (let key of keys) {
      if (
          key === "name" ||
          key === "image" ||
          key === "mediaType" ||
          key === "description" ||
          key === "files"
      ) {
        continue;
      }
      let valueInAssetName = assetNameValue[key];

      // is string
      if (typeof valueInAssetName === "string" && !strHasError) {
        if (isLongerThan64(valueInAssetName)) {
          strHasError = true;
        }
      }
      //is array
      else if (Array.isArray(valueInAssetName)) {
        let isArrayWithObjects = true;
        let isArrayWithStrings = true;
        valueInAssetName.forEach((item) => {
          if (typeof item !== "string") {
            isArrayWithStrings = false;
            return;
          }
        });
        valueInAssetName.forEach((item) => {
          if (typeof item !== "object") {
            isArrayWithObjects = false;
            return;
          }
        });

        // array with strings
        if (isArrayWithStrings && !arrWithStringsHasError) {
          valueInAssetName.forEach((str) => {
            if (isLongerThan64(str) && !arrWithStringsHasError) {
              arrWithStringsHasError = true;
              return;
            }
          });
        }

        //array with objects
        else if (isArrayWithObjects && !arrWithObjectsHasError) {
          valueInAssetName.forEach((obj) => {
            const objKeys = Object.keys(obj);

            objKeys.forEach((key) => {
              if (
                  (typeof obj[key] !== "string" || isLongerThan64(obj[key])) &&
                  !arrWithObjectsHasError
              ) {
                arrWithObjectsHasError = true;
                return;
              }
            });
          });
        } else if (!isArrayWithStrings && !isArrayWithObjects && !arrHasError) {
          arrHasError = true;
        }
      }

      // is object
      else if (typeof valueInAssetName === "object") {
        const valueInAssetNameKeys = Object.keys(valueInAssetName);

        valueInAssetNameKeys.forEach((key) => {
          if (
              (typeof valueInAssetName[key] !== "string" ||
                  isLongerThan64(valueInAssetName[key])) &&
              !objHasError
          ) {
            objHasError = true;
            return;
          }
        });
      }
    }

    fileNameHasError &&
    actionErrors.push(
        "name field which is a string having a maximum of 64 characters should be provided in the files objects"
    );
    fileMediaTypeHasError &&
    actionErrors.push(
        `mediaType field having the format of a mime type e.g. "application/pdf" should be provided in the files objects`
    );
    fileSrcHasError &&
    actionErrors.push(
        "src field which is a string and a valid ipfs having a maximum of 64 characters or a string array where each element has a maximum of 64 characters and concatenate into a valid IPFS should be provided in the files objects"
    );
    strHasError &&
    actionErrors.push(
        "any string value should not be more than 64 characters"
    );
    objHasError &&
    actionErrors.push(
        "the values in the objects should be types of strings having no more than 64 characters."
    );
    arrWithStringsHasError &&
    actionErrors.push(
        "strings in an array should not be longer than 64 characters"
    );
    arrWithObjectsHasError &&
    actionErrors.push(
        "the values in the objects inside of an array should be types of strings having no more than 64 characters."
    );
    arrHasError &&
    actionErrors.push(
        "in an array, all elements should be type of string or all of them should be type of objects"
    );
  } else {
    console.log("Only Policy Id Version (optional) fields are allowed");
    return;
  }

  if (actionErrors.length > 0) {
    actionErrors.forEach((error) => console.log(error));
  } else {
    console.log("Action metadata is valid")
  }
};

const action = require("./action.json");
actionMetadataValidator(action);
