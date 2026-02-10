import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CostCalculatorForm from './CostCalculatorForm';
import { Link } from 'react-router-dom';

// Helper function to format option values to display labels
const formatDisplayLabel = (value, type) => {
  if (!value) return '';

  const formatters = {
    ageCategory: {
      pediatricMale: 'Pediatric Male',
      pediatricFemale: 'Pediatric Female',
      adultMale: 'Adult Male',
      adultFemale: 'Adult Female',
    },
    disease: {
      bloodCancer: 'Blood Cancer',
      lungCancer: 'Liver Cancer',
      throatCancer: 'Throat Cancer',
      breastCancer: 'Breast Cancer',
    },
    treatment: {
      aicd: 'AICD Implantation',
      proton: 'Proton Therapy',
      carTCell: 'CAR T-Cell Therapy',
      lymphoma: 'Lymphoma Therapy',
    },
    location: {
      usa: 'USA',
      india: 'India',
      china: 'China',
      uk: 'UK',
      germany: 'Germany',
    },
  };

  return formatters[type]?.[value] || value;
};

const CalculatedCostSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { formData, calculationResult, submissionStatus, therapies } = useSelector((state) => state.costCalculator);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Extract data from calculation result (adjust based on your API response structure)
  const costRange = calculationResult?.costRange || calculationResult?.estimatedCost || calculationResult?.cost;
  const minCost = calculationResult?.minCost || calculationResult?.costMin;
  const maxCost = calculationResult?.maxCost || calculationResult?.costMax;
  const currentLocation = calculationResult?.currentLocation || formData.location || 'USA';
  const proposedLocations = calculationResult?.proposedLocations || calculationResult?.alternativeLocations || [];
  const availableCountries = calculationResult?.availableCountries || [];

  // Get therapy slug and data from calculationResult or find it from therapies array
  let therapySlug = calculationResult?.therapySlug;
  let therapyData = calculationResult?.therapyData;
  if (!therapySlug && formData.treatmentId && therapies.length > 0) {
    const selectedTherapy = therapies.find(t => t.id === parseInt(formData.treatmentId));
    therapySlug = selectedTherapy?.slug;
    if (!therapyData && selectedTherapy) {
      therapyData = selectedTherapy;
    }
  }

  // Show message only if explicitly set to true (location not found in therapy's country_costs)
  const showLocationMessage = calculationResult?.showLocationMessage === true;

  // Handle country click - navigate to therapy page with country parameter and therapy data
  const handleCountryClick = (country) => {
    const countryParam = country.slug || country.countryCode?.toLowerCase() || country.name?.toLowerCase().replace(/\s+/g, '-');
    if (therapySlug) {
      // Use therapyData from calculationResult or find from therapies array
      const selectedTherapy = therapyData || (therapies.length > 0 ? therapies.find(t => t.slug === therapySlug || t.id === parseInt(formData.treatmentId)) : null);
      navigate(`/therapy/${therapySlug}?country=${countryParam}`, {
        state: {
          therapyData: selectedTherapy,
          countryCostData: calculationResult,
          diseaseName: formData.disease || formatDisplayLabel(formData.disease, 'disease')
        }
      });
    }
  };

  // Format cost display
  const costDisplay = costRange
    ? costRange
    : (minCost && maxCost)
      ? `$${minCost.toLocaleString()} - ${maxCost.toLocaleString()}`
      : null;

  const hasSuccessfulSubmission = submissionStatus === 'succeeded' && calculationResult;

  if (!hasSuccessfulSubmission) {
    return null;
  }

  return (
    <>
      <section className='calculated_cost_section bg_light_gray pt-120'>
        <div className='containerWrapper'>
          <WhiteBox className='commContent_wrap'>
            <h4 className='title-4'>Cost of {formatDisplayLabel(formData.disease, 'disease')} in {formatDisplayLabel(currentLocation, 'location')}</h4>
            <GrayBox>
              <div className='d-flex align-items-center'>
                <h5 className='flex-grow-1'>
                  {costDisplay
                    ? `As per your input, your estimated cost will be ${costDisplay}`
                    : 'Please submit the form above to calculate your estimated cost'}
                </h5>
                <div className='btn-wrap'>
                  {!showLocationMessage && therapySlug && (
                    <Link
                      className='btn btn-dark-outline'
                      to={`/therapy/${therapySlug}?country=${formData.location || currentLocation}`}
                      state={{
                        therapyData: therapyData || (therapies.length > 0 ? therapies.find(t => t.slug === therapySlug || t.id === parseInt(formData.treatmentId)) : null),
                        countryCostData: calculationResult,
                        diseaseName: formData.disease || formatDisplayLabel(formData.disease, 'disease')
                      }}
                    >
                      View Details
                    </Link>
                  )
                  }
                  <OpenFormButton
                    onClick={handleOpenModal}
                    className='btn btn-pink-solid'
                    type='button'
                  >
                    Cost breakup
                  </OpenFormButton>
                </div>
              </div>
              {(formData.ageCategory || formData.disease || formData.treatment) && (
                <div className='cost-list'>
                  <ul>
                    {formData.ageCategory && (
                      <li>
                        Age Category*: <span>{formatDisplayLabel(formData.ageCategory, 'ageCategory')}</span>
                      </li>
                    )}
                    {formData.disease && (
                      <li>
                        Disease: <span>{formatDisplayLabel(formData.disease, 'disease')}</span>
                      </li>
                    )}
                    {formData.treatment && (
                      <li>
                        Treatment: <span>{formatDisplayLabel(formData.treatment, 'treatment')}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {(formData.location || (currentLocation && currentLocation !== 'USA')) && (
                <div className='current-location-wrap'>
                  <span className='location-pin'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                      <path d="M0 4.37307C0 6.0783 1.20726 8.55928 3.62178 11.816C3.99176 12.315 4.76376 12.3076 5.12822 11.816C7.54274 8.55928 8.75 6.0783 8.75 4.37307C8.75 1.95539 6.79375 0 4.375 0C1.95625 0 0 1.95539 0 4.37307ZM2.8125 4.37307C2.8125 3.51095 3.5125 2.81126 4.375 2.81126C5.2375 2.81126 5.9375 3.51095 5.9375 4.37307C5.9375 5.23519 5.2375 5.93488 4.375 5.93488C3.5125 5.93488 2.8125 5.23519 2.8125 4.37307Z" fill="white" />
                    </svg>
                  </span>
                  <h6>Current location: {
                    (currentLocation && currentLocation !== 'USA' && currentLocation.charAt(0) === currentLocation.charAt(0).toUpperCase() && !currentLocation.includes('-'))
                      ? currentLocation
                      : formatDisplayLabel(formData.location || currentLocation, 'location')
                  }</h6>
                </div>
              )}
              {showLocationMessage && calculationResult && (
                <>
                  <p>
                    {calculationResult.locationMessage ||
                      'Currently we do not offer the selected treatment in your location. However, you can select a different country from the list below that best suits your needs.'}
                  </p>
                  {availableCountries.length > 0 && (
                    <div className='available-countries-list mt-3'>
                      <p className='mb-2'><strong>Available countries:</strong></p>
                      <div className='d-flex flex-wrap gap-2'>
                        {availableCountries.map((country) => (
                          <CountryButton
                            key={country.id || country.name}
                            onClick={() => handleCountryClick(country)}
                            type='button'
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                              <path d="M0 4.37307C0 6.0783 1.20726 8.55928 3.62178 11.816C3.99176 12.315 4.76376 12.3076 5.12822 11.816C7.54274 8.55928 8.75 6.0783 8.75 4.37307C8.75 1.95539 6.79375 0 4.375 0C1.95625 0 0 1.95539 0 4.37307ZM2.8125 4.37307C2.8125 3.51095 3.5125 2.81126 4.375 2.81126C5.2375 2.81126 5.9375 3.51095 5.9375 4.37307C5.9375 5.23519 5.2375 5.93488 4.375 5.93488C3.5125 5.93488 2.8125 5.23519 2.8125 4.37307Z" fill="currentColor" />
                            </svg>
                            {country.name}
                          </CountryButton>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </GrayBox>
            {proposedLocations.length > 0 && (
              <div className='proposed-location-list'>
                <p className='mb-3'>Proposed location:</p>
                <ul>
                  {proposedLocations.map((location, index) => {
                    const locationValue = typeof location === 'string' ? location : location.value || location.name;
                    const locationLabel = typeof location === 'string'
                      ? formatDisplayLabel(location, 'location')
                      : location.label || location.name || formatDisplayLabel(locationValue, 'location');

                    return (
                      <li key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
                          <path d="M0 4.37307C0 6.0783 1.20726 8.55928 3.62178 11.816C3.99176 12.315 4.76376 12.3076 5.12822 11.816C7.54274 8.55928 8.75 6.0783 8.75 4.37307C8.75 1.95539 6.79375 0 4.375 0C1.95625 0 0 1.95539 0 4.37307ZM2.8125 4.37307C2.8125 3.51095 3.5125 2.81126 4.375 2.81126C5.2375 2.81126 5.9375 3.51095 5.9375 4.37307C5.9375 5.23519 5.2375 5.93488 4.375 5.93488C3.5125 5.93488 2.8125 5.23519 2.8125 4.37307Z" fill="#008080" />
                        </svg>
                        <span>{locationLabel}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </WhiteBox>
        </div>
      </section>

      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <FormWrapper>
              <ModalHeader className='commContent_wrap'>
                <h4 className='flex-grow-1 f-w-600'>Please fill up these details for the cost breakup</h4>
                <CloseButton onClick={handleCloseModal} aria-label='Close modal'>
                  <CloseIcon viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M18 6L6 18M6 6l12 12'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </CloseIcon>
                </CloseButton>
              </ModalHeader>
              <CostCalculatorForm onSuccess={handleCloseModal} />
            </FormWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const WhiteBox = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GrayBox = styled.div`
  background: #F8F8F8;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CountryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #008080;
  border-radius: 8px;
  color: #008080;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Be Vietnam Pro', sans-serif;

  &:hover {
    background: #008080;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 128, 128, 0.2);
  }

  svg {
    flex-shrink: 0;
  }
`;

const OpenFormButton = styled.button`
  margin-top: 0;
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  padding: 10px;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  background: #F8F8F8;
  border-radius: 12px;
  overflow-y: auto;
  cursor: default;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 85vh;
  }
`;

const CloseButton = styled.button`
  min-width: 30px;
  min-height: 30px;
  background: rgba(0, 0, 0, 0.24);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10000;

  &:hover {
    background: rgba(0, 0, 0, 0.41);
    transform: scale(1.1);
  }
`;

const CloseIcon = styled.svg`
  width: 16px;
  height: 16px;
  color: #fff;
`;

const FormWrapper = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export default CalculatedCostSection;