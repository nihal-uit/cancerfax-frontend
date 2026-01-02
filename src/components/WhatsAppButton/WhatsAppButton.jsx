import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalData } from '../../store/slices/globalSlice';

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  border: none;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: #20ba5a;
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }

  svg {
    width: 32px;
    height: 32px;
    fill: white;

    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }

  img {
    width: 32px;
    height: 32px;
    filter: brightness(0) invert(1);

    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 70px;
  right: 0;
  background: #f5f5f5;
  color: #333;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
  font-size: 14px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10000;

  ${FloatingButton}:hover & {
    opacity: 0;
    visibility: hidden;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PopupBox = styled.div`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 320px;
  background: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
  overflow: hidden;

  @media (max-width: 768px) {
    width: 300px;
    bottom: 65px;
  }
`;

const PopupHeader = styled.div`
  background: #25d366;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const PopupContent = styled.div`
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
`;

const PopupText = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;

  p {
    margin: 0 0 8px 0;

    &:first-child {
      font-weight: 600;
      margin-bottom: 12px;
    }
  }
`;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`;

const QRCode = styled.img`
  width: 180px;
  height: 180px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  padding: 8px;
`;

const ScanText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const StartChatButton = styled.button`
  width: 100%;
  background: #25d366;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s ease;
  margin-top: 16px;

  &:hover {
    background: #20ba5a;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;

const WhatsAppButton = () => {
  const dispatch = useDispatch();
  const globalData = useSelector((state) => state.global?.data);
  const globalLoading = useSelector((state) => state.global?.loading);
  const [whatsappConfig, setWhatsappConfig] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Fetch global data if not already loaded
  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, globalData, globalLoading]);

  // Get WhatsApp button configuration from Strapi
  useEffect(() => {
    const config = globalData?.settings?.whatsappButton;

    if (config) {
      setWhatsappConfig(config);
      // Get WhatsApp number from config
      const number = config.whatsappNumber || '';
      setWhatsappNumber(number);
    } else {
      // Fallback: try to get from settings.whatsappNumber (backward compatibility)
      const fallbackNumber =
        globalData?.settings?.whatsappNumber ||
        globalData?.whatsappNumber ||
        '+12137895655';
      setWhatsappNumber(fallbackNumber);

      // Set default config
      setWhatsappConfig({
        isEnabled: true,
        whatsappNumber: fallbackNumber,
        tooltipText: 'We Are Online! Chat With Us!',
        popupTitle: 'WhatsApp',
        englishGreeting: 'Hello,',
        englishMessage:
          'CancerFax is the most trusted online platform dedicated to connecting individuals facing advanced-stage cancer with groundbreaking cell therapies.',
        englishSubMessage: 'Send your medical reports and get a free analysis.',
        englishCallToAction: '✨ Join us in the fight against cancer. ✨',
        startChatButtonText: 'Start chat',
        qrCodeScanText: 'Scan the code',
        defaultMessage: 'Hello, I would like to know more about CancerFax.',
      });
    }
  }, [globalData, globalLoading]);

  // Generate QR code URL when WhatsApp number is available
  useEffect(() => {
    if (whatsappNumber && whatsappConfig?.defaultMessage) {
      const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
      const formattedNumber = cleanNumber.startsWith('+')
        ? cleanNumber
        : `+${cleanNumber}`;
      const message = encodeURIComponent(whatsappConfig.defaultMessage);
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${message}`;
      // Generate QR code using QR Server API
      setQrCodeUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          whatsappUrl
        )}`
      );
    }
  }, [whatsappNumber, whatsappConfig]);

  const handleWhatsAppClick = () => {
    if (!whatsappNumber) return;

    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const formattedNumber = cleanNumber.startsWith('+')
      ? cleanNumber
      : `+${cleanNumber}`;
    const message =
      whatsappConfig?.defaultMessage ||
      'Hello, I would like to know more about CancerFax.';
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleStartChat = (e) => {
    e.stopPropagation();
    if (!whatsappNumber) return;

    const cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
    const formattedNumber = cleanNumber.startsWith('+')
      ? cleanNumber
      : `+${cleanNumber}`;
    const message =
      whatsappConfig?.defaultMessage ||
      'Hello, I would like to know more about CancerFax.';
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank');
  };

  const handleClosePopup = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  // Don't render if disabled or no number
  if (!whatsappConfig?.isEnabled && whatsappConfig?.isEnabled !== undefined) {
    return null;
  }

  if (!whatsappNumber) return null;

  return (
    <FloatingButton
      onClick={handleWhatsAppClick}
      aria-label='Contact us on WhatsApp'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tooltip>
        {whatsappConfig?.tooltipText || 'We Are Online! Chat With Us!'}
      </Tooltip>
      <PopupBox
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        $isVisible={isHovered}
      >
        <PopupHeader>
          <HeaderContent>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              width='20'
              height='20'
            >
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
            </svg>
            {whatsappConfig?.popupTitle || 'WhatsApp'}
          </HeaderContent>
          <CloseButton onClick={handleClosePopup} aria-label='Close'>
            ×
          </CloseButton>
        </PopupHeader>
        <PopupContent>
          <PopupText>
            <p>{whatsappConfig?.englishGreeting || 'Hello,'}</p>
            <p>
              {whatsappConfig?.englishMessage ||
                'CancerFax is the most trusted online platform dedicated to connecting individuals facing advanced-stage cancer with groundbreaking cell therapies.'}
            </p>
            <p>
              {whatsappConfig?.englishSubMessage ||
                'Send your medical reports and get a free analysis.'}
            </p>
            <p>
              {whatsappConfig?.englishCallToAction ||
                '✨ Join us in the fight against cancer. ✨'}
            </p>
          </PopupText>

          {/* Russian translation - keeping as fallback until added to Strapi schema */}
          <PopupText
            style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid #ddd',
            }}
          >
            <p>Привет,</p>
            <p>
              CancerFax — это онлайн-платформа, предназначенная для
              предоставления людям с раком на поздних стадиях доступа к
              революционным клеточным методам лечения.
            </p>
          </PopupText>

          {qrCodeUrl && (
            <QRCodeContainer>
              <QRCode src={qrCodeUrl} alt='WhatsApp QR Code' />
              <ScanText>
                {whatsappConfig?.qrCodeScanText || 'Scan the code'}
              </ScanText>
            </QRCodeContainer>
          )}

          <StartChatButton onClick={handleStartChat}>
            {whatsappConfig?.startChatButtonText || 'Start chat'}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
            </svg>
          </StartChatButton>
        </PopupContent>
      </PopupBox>
      <Button>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
        </svg>
      </Button>
    </FloatingButton>
  );
};

export default WhatsAppButton;
