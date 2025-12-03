import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import "./CancerFaxServices.scss";

const steps = [
  // row 1
  "Our USA medical expert team researches for you the best option based on success rate",
  "Collect complete medical documents",
  "Translate all foreign prescriptions to generics",
  "Standardize the format of medical documents as per USA hospital guidelines",
  "Imaging collected in DICOM format as per USA hospital guidelines",

  // row 2
  "Standardize and then coordinate with hospitals before submitting to their portals",
  "Coordinate with hospitals to confirm submission",
  "Work with hospitals to make sure medical documents are accepted for the case",
  "If any rejection happens, then our team coordinates with hospital and international patients to make sure any missing documents are provided",
  "We work with your hospital to get right format of ‘Medical Letter’ required by your country’s embassy for USA visa",

  // row 3 (example texts)
  "Our USA medical expert team researches for you the best option based on success rate",
  "Our USA medical expert team researches for you the best option based on success rate",
  "Our USA medical expert team researches for you the best option based on success rate",
];


const CancerFaxServices = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='cancerFax_services_sec pb-120'>
      <div className="containerWrapper">
        <div className="cancerFax_row">
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <RatioHolder>
                <div className="commContent_wrap commContent_new">
                  <h3 className="title-3">
                  Why take CancerFax services?                   
                  </h3>
                </div>
              </RatioHolder>
            </ScrollAnimationComponent>
          </div>
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <div className="commContent_wrap">
                <p>
                  At CancerFax, we’re transforming the way patients discover and receive life-saving therapies, simplifying global care with science, technology, and trust.          
                </p>
              </div>
            </ScrollAnimationComponent>
          </div>
        </div>
        <div className="services-wrap">
          <div className="steps-grid">
                {steps.map((text, idx) => (
                <div className="steps-grid__item" key={idx}>
                  {text}
                </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RatioHolder = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 1023.98px) {
    gap: 30px;
  }
  @media screen and (max-width: 767.98px) {
    gap: 24px;
  }
`;

export default CancerFaxServices;
