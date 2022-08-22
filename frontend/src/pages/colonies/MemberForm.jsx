import React, { useRef } from "react";

import CommonSection from "../../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

const MemberForm = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const walletAddresstRef = useRef("");
  const messageRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Apply for Colony Membership</h2>
              
              <div className="contact mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter your name or nickname"
                      ref={nameRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter you wallet address"
                      ref={walletAddresstRef}
                    />
                  </div>
                  <div className="form__input">
                    <textarea
                      rows="7"
                      placeholder="Anything else we need to know"
                      ref={messageRef}
                    ></textarea>
                  </div>

                  <button
                    className="send__btn"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Submit Application
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MemberForm;
