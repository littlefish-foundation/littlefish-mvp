import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { useParams } from "react-router-dom";
import useFetchByActionID from "../../Hooks/getActionByID";
import { Link } from "react-router-dom";

export default function Slider() {
  const { _id } = useParams();
  const { actionData } = useFetchByActionID(_id);
  const objFile = {};
  const displayDataArray = [];

  const coverImage = {
    src: actionData?.image,
  };

  displayDataArray.push(coverImage);

  const otherFiles = actionData?.files?.map((file) => {
    return {
      ...objFile,
      src: file?.src,
      type: file?.type,
    };
  });

  otherFiles?.map(
    (file) => file?.type !== "application/pdf" && displayDataArray.push(file)
  );

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
          <a href={displayDataArray[slideIndex - 1].src}>
            <div
              className={
                slideIndex === index + 1 ? "slide active-anim" : "slide"
              }
            >
              <img src={obj.src} alt="" />
            </div>
          </a>
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
