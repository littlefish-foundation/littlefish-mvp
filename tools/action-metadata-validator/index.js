const actionErrors = [];
let fileNameHasError = false;
let fileMediaTypeHasError = false;
let fileSrcHasError = false;

let objHasError = false;
let strHasError = false;
let arrHasError = false;
let arrWithStringsHasError = false;
let arrWithObjectsHasError = false;

const isLongerThan64 = (str) => {
  return str.length > 64;
};

const isUndefinedOrNotString = (element) => {
  return !element || typeof element !== "string";
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
  if (isImageType(element)) {
    return true;
  }

  if (!element.startsWith("application/")) {
    return false;
  }
  const elementMimeType = element.split("/")[1];
  const applicationMimeTypes = ["pdf, json"];

  return applicationMimeTypes.includes(elementMimeType);
};

const pushStringOrArrayError = (element, fieldName) => {
  if (isUndefinedOrNotString(element) && !Array.isArray(element)) {
    actionErrors.push(
      `${fieldName} field should be provided with a string or an array of strings.`
    );
  } else if (typeof element === "string") {
    if (isLongerThan64(element)) {
      actionErrors.push(
        `${fieldName} value should not be more than 64 characters.`
      );
      if (fieldName === "files.src") {
        fileSrcHasError = true;
      }
    }
    if (
      (fieldName === "image" || fieldName === "files.src") &&
      !isIpfs(element)
    ) {
      actionErrors.push(`${fieldName} should be a valid IPFS`);
      if (fieldName === "files.src") {
        fileSrcHasError = true;
      }
    }
  } else if (Array.isArray(element)) {
    if (isAnElementLongerThan64(element)) {
      actionErrors.push(
        `each array element in ${fieldName} should have a maximum of 64 characters.`
      );
    }
    if (
      (fieldName === "image" || fieldName === "files.src") &&
      !isIpfs(element.join(""))
    ) {
      actionErrors.push(
        `${fieldName} elements should concatenate into a valid IPFS`
      );
    }
  }
};

const pushOtherPropertyErrors = (element) => {
  if (typeof element === "string" && !strHasError) {
    if (isLongerThan64(element)) {
      strHasError = true;
      actionErrors.push(
        "any string value should not be more than 64 characters"
      );
    }
  }
  //is array
  else if (Array.isArray(element)) {
    let isArrayWithStrings = !isAnyNonString(element);
    let isArrayWithObjects = !isAnyNonObject(element);

    // array with strings
    if (isArrayWithStrings && !arrWithStringsHasError) {
      element.forEach((str) => {
        if (isLongerThan64(str) && !arrWithStringsHasError) {
          arrWithStringsHasError = true;
          actionErrors.push(
            "strings in an array should not be longer than 64 characters"
          );
        }
      });
    }

    //array with objects
    else if (isArrayWithObjects && !arrWithObjectsHasError) {
      element.forEach((obj) => {
        const objKeys = Object.keys(obj);

        objKeys.forEach((key) => {
          if (
            (typeof obj[key] !== "string" || isLongerThan64(obj[key])) &&
            !arrWithObjectsHasError
          ) {
            arrWithObjectsHasError = true;
            actionErrors.push(
              "the values in the objects inside of an array should be types of strings having no more than 64 characters."
            );
          }
        });
      });
    } else if (!isArrayWithStrings && !isArrayWithObjects && !arrHasError) {
      arrHasError = true;
      actionErrors.push(
        "in an array, all elements should be type of string or all of them should be type of objects"
      );
    }
  }

  // is object
  else if (typeof element === "object") {
    const elementKeys = Object.keys(element);

    elementKeys.forEach((key) => {
      if (
        (typeof element[key] !== "string" || isLongerThan64(element[key])) &&
        !objHasError
      ) {
        objHasError = true;
        actionErrors.push(
          "the values in the objects should be types of strings having no more than 64 characters."
        );
      }
    });
  }
};

const actionMetadataValidator = (action) => {
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

    if (isUndefinedOrNotString(name)) {
      actionErrors.push("name field should be provided with a string");
    } else if (isLongerThan64(name)) {
      actionErrors.push("name value should not be more than 64 characters.");
    }
    // IMAGE CHECK

    pushStringOrArrayError(image, "image");

    // MEDIATYPE CHECK

    if (isUndefinedOrNotString(mediaType)) {
      actionErrors.push("mediaType field should be provided with a string");
    } else if (!isImageType(mediaType)) {
      actionErrors.push(
        `mediaType should be in the format of "image/<mime_sub_type>" e.g. "image/png"`
      );
    }

    // DESCRIPTION CHECK

    pushStringOrArrayError(description, "description");

    //FILES

    if (!files || !Array.isArray(files) || isAnyNonObject(files)) {
      actionErrors.push(
        "files field should be provided with an array containing objects"
      );
      return;
    }

    // Other properties

    for (let file of files) {
      const { name: fileName, mediaType: fileMediaType, src: fileSrc } = file;

      if (
        (typeof fileName !== "string" || isLongerThan64(fileName)) &&
        !fileNameHasError
      ) {
        fileNameHasError = true;
        actionErrors.push(
          "name field which is a string having a maximum of 64 characters should be provided in the files objects"
        );
      }

      if (
        (!fileMediaType || !isMimeType(fileMediaType)) &&
        !fileMediaTypeHasError
      ) {
        fileMediaTypeHasError = true;
        actionErrors.push(
          `mediaType field having the format of a mime type e.g. "application/pdf" should be provided in the files objects`
        );
      }
      if (!fileSrcHasError) {
        pushStringOrArrayError(fileSrc, "files.src");
      }

      const fileKeys = Object.keys(file);

      // OTHER PROPERTY ERRORS (IN FILES)
      for (let key of fileKeys) {
        if (key === "name" || key === "mediaType" || key === "src") {
          continue;
        }
        let fileValue = file[key];

        pushOtherPropertyErrors(fileValue);
      }
    }

    // OTHER PROPERTY ERRORS
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

      pushOtherPropertyErrors(valueInAssetName);
    }
  } else {
    console.log("Only Policy Id Version (optional) fields are allowed");
  }
};

const action = require("./action.json");
actionMetadataValidator(action);

if (actionErrors.length > 0) {
  actionErrors.forEach((error) => console.log(error));
} else {
  console.log("Action metadata is valid");
}
