import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import dataSlider from "./dataSlider";
import { useParams } from "react-router-dom";
import useFetchByActionID from "../../Hooks/getActionByID";

export default function Slider() {
  const { _id } = useParams();
  const { actionData } = useFetchByActionID(
    `https://api.littlefish.foundation/action/${_id}`
  );
  const objFile = {};
  const displayDataArray = [];
  console.log(displayDataArray);

  const coverImage = {
    src: "data:" + actionData?.mediaType + ";base64," + actionData?.imageBase64,
  };

  displayDataArray.push(coverImage);
  console.log(displayDataArray);

  const base64Files = actionData?.filesBase64?.map((file) => {
    return {
      ...objFile,
      src: file,
    };
  });
  console.log(displayDataArray);

  base64Files?.map((file) => displayDataArray.push(file));

  console.log(displayDataArray);

  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== displayDataArray.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === displayDataArray.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(displayDataArray.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {displayDataArray?.map((obj, index) => {
        return (
          <div
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={obj.src} />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: displayDataArray.length }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}
