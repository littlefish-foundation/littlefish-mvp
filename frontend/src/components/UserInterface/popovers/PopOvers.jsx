import React from "react";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import "./popovers.css";

const PopOvers = (props) => {
  return (
    <div>
      <UncontrolledPopover
        placement="right"
        target="walletAddress"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          If you are not able to see your Wallet Address here, please try to
          reconnect your wallet.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}

      <UncontrolledPopover
        placement="right"
        target="producer"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          Please in This Part Enter the Name or Nickname of the Action Producer.
        </PopoverBody>
      </UncontrolledPopover>

   

      {/* ******************************************************************** */}

      <UncontrolledPopover
        placement="right"
        target="name"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          This generally is the same with Action Name. However you can provide a
          more detailed name in this part. This name is added to the action's
          it’s metadata.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}
      {/* <UncontrolledPopover
        placement="right"
        target="actionType"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          How would you categorize the type of your Action? What skills did you
          use to make this possible?
        </PopoverBody>
      </UncontrolledPopover> */}

      {/* ******************************************************************** */}

      <UncontrolledPopover
        placement="right"
        target="description"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          Briefly describe your action. This part should have more than 50 and
          less than 256 characters.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}
      <UncontrolledPopover
        placement="left"
        target="colony"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader>Hint!</PopoverHeader>
        <PopoverBody>
          Select the colony you are a part of. Your actions will appear inside
          this colony aswell.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}

      <UncontrolledPopover
        placement="right"
        target="image"
        trigger="hover focus"
        delay={1500}
      >
        <PopoverHeader className="pop-headerStyle">Hint!</PopoverHeader>
        <PopoverBody className="pop-bodyStyle">
          The image you upload here will serve as the cover of your action.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}
      <UncontrolledPopover
        placement="left"
        target="minimumPrice"
        delay={1500}
        trigger="hover focus"
      >
        <PopoverHeader>Hint!</PopoverHeader>
        <PopoverBody>
          If you want to sell this action, please add the price in ADA.
          Otherwise, you may leave this part empty.
        </PopoverBody>
      </UncontrolledPopover>

      {/* ******************************************************************** */}
    </div>
  );
};
export default PopOvers;
