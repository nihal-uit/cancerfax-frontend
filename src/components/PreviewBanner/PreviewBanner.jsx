import React from 'react';
import styled from 'styled-components';
import { isPreviewMode, exitPreviewMode } from '../../utils/preview';

const BannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
`;

const Message = styled.span`
  flex: 1;
  text-align: center;
`;

const ExitButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PreviewBanner = () => {
  const [isPreview, setIsPreview] = React.useState(false);

  React.useEffect(() => {
    setIsPreview(isPreviewMode());
  }, []);

  const handleExitPreview = () => {
    exitPreviewMode();
    setIsPreview(false);
    // Reload page to show published content
    window.location.reload();
  };

  if (!isPreview) {
    return null;
  }

  return (
    <BannerContainer>
      <Message>
        👁️ You are viewing a draft version of this page. Changes may not be published yet.
      </Message>
      <ExitButton onClick={handleExitPreview}>
        Exit Preview
      </ExitButton>
    </BannerContainer>
  );
};

export default PreviewBanner;
