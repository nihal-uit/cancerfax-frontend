import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CookieBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 10000;
  display: ${props => props.show ? 'block' : 'none'};
  border-top: 2px solid #e0e0e0;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const BannerText = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  flex: 1;

  a {
    color: #007bff;
    text-decoration: underline;
    margin-left: 5px;

    &:hover {
      color: #0056b3;
    }
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex: 1;
    padding: 12px 20px;
  }
`;

const AcceptButton = styled(Button)`
  background: #007bff;
  color: #fff;

  &:hover {
    background: #0056b3;
  }
`;

const RejectButton = styled(Button)`
  background: #6c757d;
  color: #fff;

  &:hover {
    background: #5a6268;
  }
`;

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    localStorage.setItem('tracking_consent', 'true');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    localStorage.setItem('tracking_consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <CookieBanner show={showBanner}>
      <BannerContent>
        <BannerText>
          We use cookies to enhance your browsing experience and analyze site traffic.
          By clicking "Accept", you consent to our use of cookies.{' '}
          <Link to="/cookie-policy">Learn more</Link>
        </BannerText>
        <ButtonGroup>
          <RejectButton onClick={rejectCookies}>Reject</RejectButton>
          <AcceptButton onClick={acceptCookies}>Accept</AcceptButton>
        </ButtonGroup>
      </BannerContent>
    </CookieBanner>
  );
};

export default CookieConsent;
