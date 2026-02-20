import React, { useState, useEffect, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  fetchContactFormSection, 
  fetchTestimonials, 
  fetchInquiryTypes, 
  submitContactForm,
  resetSubmissionStatus
} from '../../store/slices/contactFormSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import ReactStars from "react-rating-stars-component";
import { formatMedia, renderRichTextWithImages } from '@/utils/strapiHelpers';
import { Link, useNavigate } from 'react-router-dom';

  
const ContactFormSection = ({ data }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { 
    sectionData, 
    inquiryTypes, 
    submissionStatus,
    error: submissionError 
  } = useSelector((state) => state.contactForm);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    zip_code: '',
    inquiry_type: '',
    message: '',
    consent: false,
  });

  // useEffect(() => {
  //   dispatch(fetchContactFormSection());
  //   dispatch(fetchTestimonials());
  //   dispatch(fetchInquiryTypes());
  // }, [dispatch]);

  useEffect(() => {
    if (submissionStatus === 'succeeded') {
      // Reset form after successful submission
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        zip_code: '',
        inquiry_type: '',
        message: '',
        consent: false,
      });
      navigate('/thank-you');
      // Show success message and reset after 3 seconds
      setTimeout(() => {
        dispatch(resetSubmissionStatus());
      }, 3000);
    }
  }, [submissionStatus, dispatch, navigate]);

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

  const defaultInquiryTypes = [
    { id: 1, attributes: { name: 'General Inquiry', value: 'general' } },
    { id: 2, attributes: { name: 'Treatment Information', value: 'treatment' } },
    { id: 3, attributes: { name: 'Appointment Request', value: 'appointment' } },
    { id: 4, attributes: { name: 'Support', value: 'support' } }
  ];

  const defaultFormFields = {
    firstNameLabel: 'First Name*',
    firstNamePlaceholder: 'Enter first name',
    lastNameLabel: 'Last Name*',
    lastNamePlaceholder: 'Enter last name',
    emailLabel: 'Email Address*',
    emailPlaceholder: 'Enter email address',
    phoneLabel: 'Phone Number*',
    phonePlaceholder: 'Enter phone number',
    zipCodeLabel: 'Zip code*',
    zipCodePlaceholder: 'Enter zip code',
    inquiryTypeLabel: 'Inquiry type*',
    inquiryTypePlaceholder: 'Select Inquiry type',
    messageLabel: 'Message*',
    messagePlaceholder: 'Write your message',
    termsText: 'By reaching out to us, you agree to our',
    termsLinkText: 'Terms & Condition',
    termsLink: '/default',
    buttonText: 'Send Message'
  };

  // Get data from Strapi or use defaults
  const availableInquiryTypes = inquiryTypes.length > 0 ? inquiryTypes : defaultInquiryTypes;
  const formFields = sectionData?.attributes || defaultFormFields;

  return (
    <ContactCard>
      <ContactRow>
        <LeftContent>
          <LeftBox>
            <TextContent>
              <Description>
                {renderRichTextWithImages(data?.description_block)||data?.description_text}
              </Description>
            </TextContent>

            <Swiper
              ref={carouselRef}
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              className="pagination_slider"
            >
              {data?.reviews.map((testimonials) => {
                return (
                  <SwiperSlide key={testimonials.id}>
                    <TestimonialCard>
                      <Stars>
                          <ReactStars
                            count={5}
                            value={testimonials.rating}
                            size={40}
                            isHalf={true}
                            color= "#e1e1e1"
                            activeColor="#F89939"
                            edit={false}
                          />
                      </Stars>
                      <TestimonialText>
                        {testimonials.review}
                      </TestimonialText>
                      <ProfileSection>
                        <Avatar src={formatMedia(testimonials.image)} alt='' />
                        <ProfileInfo>
                          <ProfileName>{testimonials.name}</ProfileName>
                          <ProfileRole>{testimonials.titke}</ProfileRole>
                        </ProfileInfo>
                      </ProfileSection>
                    </TestimonialCard>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </LeftBox>
        </LeftContent>

        <RightContent>
          <RightBox>
            <FormContainer onSubmit={handleSubmit}>
              {submissionStatus === 'succeeded' && (
                <SuccessMessage>Thank you! Your message has been sent successfully.</SuccessMessage>
              )}
              {submissionStatus === 'failed' && (
                <ErrorMessage>{submissionError || 'Sorry, there was an error sending your message. Please try again.'}</ErrorMessage>
              )}
              
              <FormRow>
                <FormGroup>
                  <Label>{formFields.firstNameLabel || 'First Name*'}</Label>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder={formFields.firstNamePlaceholder || 'Enter first name'}
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    disabled={submissionStatus === 'loading'}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{formFields.lastNameLabel || 'Last Name*'}</Label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder={formFields.lastNamePlaceholder || 'Enter last name'}
                    value={formData.last_name}
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

              <FormRow>
                <FormGroup>
                  <Label>{formFields.zipCodeLabel || 'Zip code*'}</Label>
                  <Input
                    type="text"
                    name="zip_code"
                    placeholder={formFields.zipCodePlaceholder || 'Enter zip code'}
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                    disabled={submissionStatus === 'loading'}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{formFields.inquiryTypeLabel || 'Inquiry type*'}</Label>
                  <Select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    required
                    disabled={submissionStatus === 'loading'}
                  >
                    <option value="" disabled>{formFields.inquiryTypePlaceholder || 'Select Inquiry type'}</option>
                    {availableInquiryTypes.map((type) => (
                      <option key={type.id} value={type.attributes?.value || type.value}>
                        {type.attributes?.name || type.name}
                      </option>
                    ))}
                  </Select>
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

              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  name="consent"
                  id="agreeToTerms"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  disabled={submissionStatus === 'loading'}
                />
                <CheckboxLabel htmlFor="consent">
                  {data?.consent_message || ''}
                  <TermsLink to={formFields.termsLink || '#'}>
                    {formFields.termsLinkText || 'Terms & Condition'}
                  </TermsLink>
                </CheckboxLabel>
              </CheckboxWrapper>

              <SubmitButton className='btn btn-pink-solid' type="submit" disabled={submissionStatus === 'loading'}>
                {submissionStatus === 'loading' ? 'Sending...' : (formFields.buttonText || 'Send Message')}
              </SubmitButton>
            </FormContainer>
          </RightBox>
        </RightContent>
      </ContactRow>
    </ContactCard>
  );
};

const ContactCard = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 30px;
 
  @media (max-width: 1024px) {
    padding: 30px;
  }

  @media (max-width: 575px) {
    padding: 24px;
  }
`;

const ContactRow = styled.div`
  display: flex;
  gap: 90px;
  align-items: flex-start;

  @media (max-width: 1200px) {
    gap: 60px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const LeftContent = styled.div`
  width: 380px;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const LeftBox = styled.div`
`;

const RightContent = styled.div`
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const RightBox = styled.div`
  background: rgba(54, 69, 79, 0.05);
  border-radius: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 110px;
  
  @media (max-width: 1024px) {
    width: 100%;
    margin-bottom: 60px;
  }
`;

const Description = styled.div`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  color: #36454F;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }     
`;

const TestimonialCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #E9E9E9;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;  
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
`;

const Star = styled.span`
  font-size: 16px;
  color: #FFD700;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TestimonialText = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #36454F;
  margin: 0;
  text-align: left;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
`;

const ProfileName = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #36454F;
  margin: 0;
  line-height: 24px;
`;

const ProfileRole = styled.p`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: rgba(55, 65, 81, 0.6);
  margin: 0;
  line-height: 20px;
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
  gap: 24px;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
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
  padding: 14px 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
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

const Select = styled.select`
  font-family: 'Be Vietnam Pro', sans-serif;
  padding: 14px 16px;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  border-radius: 16px;
  font-size: 12px;
  color: #36454F;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2336454F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 14px;
  padding-right: 48px;
  font-weight: 400;

  &:invalid {
    color: rgba(55, 65, 81, 0.5);
  }
  &:focus {
    outline: none;
    border-color: #36454F;
  }

  option {
    font-family: 'Be Vietnam Pro', sans-serif;
    padding: 12px;
    background: white;
    color: #36454F;
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
  height: 120px;
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 6px 0;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border: 1px solid #36454F;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
  
  &:checked {
    accent-color: #FF69B4;
    background-color: #FF69B4;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #36454F;
  line-height: 20px;
  cursor: pointer;
`;

const TermsLink = styled(Link)`
  color: #0e7490;
  text-decoration: none;
  font-weight: 400;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default memo(ContactFormSection);
