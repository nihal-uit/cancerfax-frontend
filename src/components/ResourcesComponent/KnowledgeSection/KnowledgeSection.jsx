import React from "react";
import styled from "styled-components";
import "./KnowledgeSection.css";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KnowledgeSection = () => {
  return (
    <section className="subscription_sec py-120" id="subscription">
      <div className="containerWrapper z-2 position-relative">
        <ContentWrapper>
          <h2 className="title-3">Knowledge Section</h2>
        </ContentWrapper>
      </div>
    </section>
  );
};

export default KnowledgeSection;