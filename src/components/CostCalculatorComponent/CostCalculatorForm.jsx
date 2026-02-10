import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import {
  updateCostBreakupFormField,
  submitCostBreakupForm,
  resetCostBreakupSubmissionStatus,
  fetchDiseasesByAgeAndGender,
  fetchTherapiesByDisease,
  updateFormField
} from '../../store/slices/costCalculatorSlice';
import { useEffect, useState } from 'react';

const CostCalculatorForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const {
    costBreakupFormData,
    costBreakupSubmissionStatus,
    loading,
    error,
    diseases,
    therapies,
    diseasesLoading,
    therapiesLoading,
    formData
  } = useSelector((state) => state.costCalculator);

  const [locationLoading, setLocationLoading] = useState(false);
  const [userCountryCode, setUserCountryCode] = useState(null);
  const [userCountryName, setUserCountryName] = useState('');

  useEffect(() => {
    dispatch(resetCostBreakupSubmissionStatus());
  }, [dispatch]);

  // Fetch user location from IP on mount
  useEffect(() => {
    const fetchLocationFromIP = async () => {
      setLocationLoading(true);
      try {
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();
        if (data?.country_code) {
          const countryCode = data.country_code.toUpperCase();
          const countryName = data.country || '';

          setUserCountryCode(countryCode);
          setUserCountryName(countryName);

          // Set location value based on country code or name
          const locationValue = data.country?.toLowerCase().replace(/\s+/g, '-') || countryCode.toLowerCase();
          dispatch(updateCostBreakupFormField({ field: 'location', value: locationValue }));
        }
      } catch (error) {
        console.error('Error fetching location from IP:', error);
      } finally {
        setLocationLoading(false);
      }
    };
    fetchLocationFromIP();
  }, [dispatch]);

  // Fetch diseases when age category changes
  useEffect(() => {
    if (costBreakupFormData.ageCategory) {
      dispatch(fetchDiseasesByAgeAndGender({ ageCategory: costBreakupFormData.ageCategory }));
    }
  }, [costBreakupFormData.ageCategory, dispatch]);

  // Fetch therapies when disease changes
  useEffect(() => {
    if (costBreakupFormData.diseaseId) {
      dispatch(fetchTherapiesByDisease(costBreakupFormData.diseaseId));
    }
  }, [costBreakupFormData.diseaseId, dispatch]);

  const handleInputChange = (field, value) => {
    // For disease and treatment, we need to handle both the ID and name
    if (field === 'disease') {
      const diseaseId = parseInt(value);
      const selectedDisease = diseases.find(d => d.id === diseaseId);
      dispatch(updateCostBreakupFormField({ field: 'diseaseId', value: diseaseId }));
      dispatch(updateCostBreakupFormField({ field: 'disease', value: selectedDisease?.name || value }));
      // Reset treatment when disease changes
      dispatch(updateCostBreakupFormField({ field: 'treatmentId', value: '' }));
      dispatch(updateCostBreakupFormField({ field: 'treatment', value: '' }));
    } else if (field === 'treatment') {
      const treatmentId = parseInt(value);
      const selectedTherapy = therapies.find(t => t.id === treatmentId);
      dispatch(updateCostBreakupFormField({ field: 'treatmentId', value: treatmentId }));
      dispatch(updateCostBreakupFormField({ field: 'treatment', value: selectedTherapy?.name || value }));
    } else if (field === 'ageCategory') {
      dispatch(updateCostBreakupFormField({ field, value }));
      // Reset disease and treatment when age category changes
      dispatch(updateCostBreakupFormField({ field: 'diseaseId', value: '' }));
      dispatch(updateCostBreakupFormField({ field: 'disease', value: '' }));
      dispatch(updateCostBreakupFormField({ field: 'treatmentId', value: '' }));
      dispatch(updateCostBreakupFormField({ field: 'treatment', value: '' }));
    } else {
      dispatch(updateCostBreakupFormField({ field, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!costBreakupFormData.ageCategory || !costBreakupFormData.diseaseId || !costBreakupFormData.treatmentId) {
      alert('Please fill in all required fields');
      return;
    }

    const fullName = costBreakupFormData.name?.trim() || '';
    const nameParts = fullName.split(/\s+/);

    const first_name = nameParts[0] || '';
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const formatAgeCategory = (value = '') =>
      value
        .replace(/([A-Z])/g, ' $1')   // insert space before capitals
        .replace(/^./, c => c.toUpperCase()) // capitalize first letter
        .trim();

    const apiPayload = {
      first_name,
      last_name,
      phone: costBreakupFormData.phoneNumber,
      email: costBreakupFormData.email,
      age_category: formatAgeCategory(costBreakupFormData.ageCategory),
      country: costBreakupFormData.location,
      // disease_id: costBreakupFormData.diseaseId,
      disease: costBreakupFormData.disease,
      // therapy_id: costBreakupFormData.treatmentId,
      therapy: costBreakupFormData.treatment,
      message: costBreakupFormData.message,
      page_path: '/cost',
    };

    try {
      await dispatch(submitCostBreakupForm(apiPayload)).unwrap();
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {error && (
        <ErrorMessage>
          {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
        </ErrorMessage>
      )}
      {costBreakupSubmissionStatus === 'succeeded' && (
        <SuccessMessage>
          Form submitted successfully!
        </SuccessMessage>
      )}
      <Row className='g-3 flex-grow-1'>
        <Col sm={6} md={6} lg={6}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id='name'
              placeholder="Enter Your name"
              value={costBreakupFormData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={loading}
            />
          </FormGroup>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              id='phoneNumber'
              placeholder="Enter Your Phone Number"
              value={costBreakupFormData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              disabled={loading}
            />
          </FormGroup>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              id='email'
              placeholder="Enter Your Email"
              value={costBreakupFormData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={loading}
            />
          </FormGroup>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Select
              name="location"
              value={costBreakupFormData.location || formData?.location || ''}
              required
              id='location'
              disabled={true}
            >
              <option value={costBreakupFormData.location || formData?.location || ''}>
                {locationLoading
                  ? 'Detecting location...'
                  : userCountryName || costBreakupFormData.location || formData?.location || 'Location not detected'}
              </option>
            </Select>
          </FormGroup>
        </Col>
        <Col sm={6} md={4} lg={4}>
          <FormGroup>
            <Label htmlFor="ageCategory">Age Category*</Label>
            <Select
              name="ageCategory"
              value={costBreakupFormData.ageCategory}
              onChange={(e) => handleInputChange('ageCategory', e.target.value)}
              required
              id='ageCategory'
              disabled={loading}
            >
              <option value="">Select age category here</option>
              <option value="pediatricMale">Pediatric Male</option>
              <option value="pediatricFemale">Pediatric Female</option>
              <option value="adultMale">Adult Male</option>
              <option value="adultFemale">Adult Female</option>
            </Select>
          </FormGroup>
        </Col>
        <Col sm={6} md={4} lg={4}>
          <FormGroup>
            <Label htmlFor="disease">Disease*</Label>
            <Select
              name="disease"
              value={costBreakupFormData.diseaseId || ''}
              onChange={(e) => handleInputChange('disease', e.target.value)}
              required
              id='disease'
              disabled={!costBreakupFormData.ageCategory || diseasesLoading || loading}
            >
              <option value="">
                {diseasesLoading
                  ? 'Loading diseases...'
                  : !costBreakupFormData.ageCategory
                    ? 'Select age category first'
                    : 'Select your disease here'}
              </option>
              {diseases.map((disease) => (
                <option key={disease.id} value={disease.id}>
                  {disease.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Col>
        <Col sm={12} md={4} lg={4}>
          <FormGroup>
            <Label htmlFor="treatment">Treatment*</Label>
            <Select
              name="treatment"
              value={costBreakupFormData.treatmentId || ''}
              onChange={(e) => handleInputChange('treatment', e.target.value)}
              required
              id='treatment'
              disabled={!costBreakupFormData.diseaseId || therapiesLoading || loading}
            >
              <option value="">
                {therapiesLoading
                  ? 'Loading treatments...'
                  : !costBreakupFormData.diseaseId
                    ? 'Select disease first'
                    : 'Select preferred treatment here'}
              </option>
              {therapies.map((therapy) => (
                <option key={therapy.id} value={therapy.id}>
                  {therapy.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              name="message"
              placeholder="Write your message"
              rows="6"
              value={costBreakupFormData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              disabled={loading}
            />
          </FormGroup>
        </Col>
        <Col sm={12} className='text-end'>
          <SubmitButton
            className='btn btn-pink-solid btn-md px-5 mt-3'
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </Col>
      </Row>
    </FormContainer>
  );
};

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-top: 30px;
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
    padding: 12px 14px;
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

const Select = styled.select`
    font-family: 'Be Vietnam Pro', sans-serif;
    padding: 12px 14px;
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
    background-position: right 10px center;
    background-size: 14px;
    padding-right: 24px;
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
    padding: 12px 14px;
    background: #FFFFFF;
    border: 1px solid #E9E9E9;
    border-radius: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #36454F;
    outline: none;
    resize: none;

    &::placeholder {
      color: #36454F;
      opacity: 0.5;
    }

    &:focus {
      border-color: #36454F;
    }
  `;

const SubmitButton = styled.button`
    font-size: 14px;
    border-radius: 14px;
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  `;

const ErrorMessage = styled.div`
    padding: 12px 16px;
    background-color: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    color: #c33;
    font-size: 14px;
    margin-bottom: 16px;
    font-family: 'Be Vietnam Pro', sans-serif;
  `;

const SuccessMessage = styled.div`
    padding: 12px 16px;
    background-color: #efe;
    border: 1px solid #cfc;
    border-radius: 8px;
    color: #3c3;
    font-size: 14px;
    margin-bottom: 16px;
    font-family: 'Be Vietnam Pro', sans-serif;
  `;

export default CostCalculatorForm;