import React from "react";
import styled from "styled-components";
import "./Subscription.css";

const Subscription = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <p className="title-tag">POWER PACKED</p>
        <div className="text-section">
          <h2 className="subtitle">
            Bringing Worldwide Clinical Trials Closer
          </h2>
          <p className="description">
            Discover and join advanced clinical trials from leading research
            centers worldwide. We connect patients with breakthrough treatments
            and innovative therapies beyond borders. Wherever you are, hope is
            within reach.
          </p>
        </div>
        <div className="subscribe-box">
          <p className="subscribe-text">Subscribe</p>
          <div className="subscribe-button">
            <span className="subscribe-btn-text">Subscribe</span>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img
          src="../images/clinical-trial.jpg"
          alt="Clinical Trial"
          className="main-image"
        />
      </div>
    </div>
  );
};

export default Subscription;
