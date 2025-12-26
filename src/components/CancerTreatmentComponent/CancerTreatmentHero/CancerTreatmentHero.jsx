import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import {
  submitContactForm,
  resetSubmissionStatus,
} from '../../../store/slices/contactFormSlice';
import { useNavigate } from 'react-router-dom';
import { formatMedia } from '@/utils/strapiHelpers';

const CancerTreatmentHero = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { submissionStatus } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (submissionStatus === 'succeeded') {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
      
      setTimeout(() => {
        dispatch(resetSubmissionStatus());
      }, 3000);
    }
  }, [submissionStatus, dispatch]);

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  const defaultFormFields = {
    fullNameLabel: 'Full Name*',
    fullNamePlaceholder: 'Enter full name',
    emailLabel: 'Email Address*',
    emailPlaceholder: 'Enter email address',
    phoneLabel: 'Phone Number*',
    phonePlaceholder: 'Enter phone number',
    messageLabel: 'Message*',
    messagePlaceholder: 'Write your message',
    buttonText: 'Send Message'
  };

  // Use local default labels for the form fields (no GET config needed)
  const formFields = defaultFormFields;

  const backgroundImageUrl = formatMedia(data?.backgroundImage);

  if (!data?.isActive) {
    return null;
  }

  return (
    <section className='homeHero_sec cancer_hero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          {backgroundImageUrl && (
            <BackgroundImage
              src={backgroundImageUrl}
              alt={data?.heading || ''}
              loading="lazy"
            />
          )}
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <ScrollAnimationComponent animationVariants={fadeIn}>
            <HeaderRow>
              <HeaderLeft>
                <div>
                  {data?.heading && (
                    <DiseaseTitle className='title-1 mb-3'>
                      {data.heading}
                    </DiseaseTitle>
                  )}
                  {(data?.subHeading || data?.description_text) && (
                    <Description className='text-16'>
                      {data.subHeading || data.description_text}
                    </Description>
                  )}
                </div>
              </HeaderLeft>
              <HeaderRight>
                <RightBox>
                  <FormContainer onSubmit={handleSubmit}>
                    {submissionStatus === 'succeeded' && (
                      // <SuccessMessage>Thank you! Your message has been sent successfully.</SuccessMessage>
                      navigate('/thank-you')
                    )}
                    {submissionStatus === 'failed' && (
                      <ErrorMessage>Sorry, there was an error sending your message. Please try again.</ErrorMessage>
                    )}
                    
                    <FormRow>
                      <FormGroup>
                        <Label>{formFields.fullNameLabel || 'Full Name*'}</Label>
                        <Input
                          type="text"
                          name="fullName"
                          placeholder={formFields.fullNamePlaceholder || 'Enter Full name'}
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          disabled={submissionStatus === 'loading'}
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>{formFields.emailLabel || 'Email Address*'}</Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder={formFields.emailPlaceholder || 'Enter email address'}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={submissionStatus === 'loading'}
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <Label>{formFields.phoneLabel || 'Phone Number*'}</Label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder={formFields.phonePlaceholder || 'Enter phone number'}
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          disabled={submissionStatus === 'loading'}
                        />
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <Label>{formFields.messageLabel || 'Message*'}</Label>
                      <TextArea
                        name="message"
                        placeholder={formFields.messagePlaceholder || 'Write your message'}
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        disabled={submissionStatus === 'loading'}
                      />
                    </FormGroup>

                    <SubmitButton className='btn btn-pink-solid btn-md' type="submit" disabled={submissionStatus === 'loading'}>
                      {submissionStatus === 'loading' ? 'Sending...' : (formFields.buttonText || 'Send Message')}
                    </SubmitButton>
                  </FormContainer>
                </RightBox>
              </HeaderRight>
            </HeaderRow>
            </ScrollAnimationComponent>       
         </div>
        </div>
      </div>    
    </section>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};


const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const DiseaseTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.white};
`;

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 70px;

  @media (max-width: 1200px) {
    gap: 50px;
  }

  @media (max-width: 1024px) {
    gap: 32px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
  
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const HeaderRight = styled.div`
  width: 480px;
  flex: 0 0 480px;
  box-sizing: border-box;
  min-width: 0;
  @media (max-width: 1200px) {
    width: 420px;
    flex: 0 0 420px;
  }
  @media (max-width: 767px) {
    width: 100%;
    flex: 1;
  }
`;

const RightBox = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const SuccessMessage = styled.div`
  padding: 12px 16px;
  background: #D4EDDA;
  border: 1px solid #C3E6CB;
  border-radius: 8px;
  color: #155724;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #F8D7DA;
  border: 1px solid #F5C6CB;
  border-radius: 8px;
  color: #721C24;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #36454F;
  line-height: 20px;
`;

const Input = styled.input`
  font-family: 'Be Vietnam Pro', sans-serif;
  padding: 12px 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 13.5px;
  font-size: 12px;
  color: #36454F;
  transition: all 0.3s ease;
  font-weight: 400;

  &::placeholder {
    color: rgba(55, 65, 81, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #36454F;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Be Vietnam Pro', sans-serif;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
  font-size: 12px;
  color: #36454F;
  resize: none;
  height: 103px;
  transition: all 0.3s ease;
  font-weight: 400;

  &::placeholder {
    color: rgba(55, 65, 81, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #36454F;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  font-size: 14px;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;


export default CancerTreatmentHero;
