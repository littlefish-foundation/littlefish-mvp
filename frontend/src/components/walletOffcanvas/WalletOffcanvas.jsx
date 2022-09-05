import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
function WalletOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Connect to Wallet
      </Button>

      <Offcanvas placement="bottom" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
export default WalletOffcanvas;
