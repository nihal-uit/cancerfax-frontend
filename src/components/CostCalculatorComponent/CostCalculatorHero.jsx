import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import { Row, Col } from 'react-bootstrap';
import { 
  updateFormField, 
  fetchDiseasesByAgeAndGender,
  fetchTherapiesByDisease,
  setSubmissionStatus,
  setCalculationResult
} from '../../store/slices/costCalculatorSlice';

const CostCalculatorHero = ({ 
  DiseaseName = "Estimate your cost for free",
  heroBannner = "../images/cancer-treatment-usa-hero.jpg",
}) => {
  const dispatch = useDispatch();
  const { 
    formData, 
    submissionStatus, 
    loading, 
    error,
    diseases,
    therapies,
    diseasesLoading,
    therapiesLoading
  } = useSelector((state) => state.costCalculator);
  const [locationLoading, setLocationLoading] = useState(false);
  const [userCountryCode, setUserCountryCode] = useState(null);
  const [userCountryName, setUserCountryName] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
          dispatch(updateFormField({ field: 'location', value: locationValue }));
        }
      } catch (error) {
        console.error('Error fetching location from IP:', error);
      } finally {
        setLocationLoading(false);
      }
    };
  
    fetchLocationFromIP();
  }, [dispatch]);
  
  
  useEffect(() => {
    if (formData.ageCategory) {
      dispatch(fetchDiseasesByAgeAndGender({ ageCategory: formData.ageCategory }));
    }
  }, [formData.ageCategory, dispatch]);

  // Fetch therapies when disease changes
  useEffect(() => {
    if (formData.diseaseId) {
      dispatch(fetchTherapiesByDisease(formData.diseaseId));
    }
  }, [formData.diseaseId, dispatch]);

  // Note: We no longer need to extract countries from therapy data

  const handleInputChange = (field, value) => {
    if (field === 'disease') {
      // Find the disease from the diseases list by ID
      const diseaseId = parseInt(value);
      const selectedDisease = diseases.find(d => d.id === diseaseId);
      if (selectedDisease) {
        dispatch(updateFormField({ field: 'disease', value: selectedDisease.name }));
        dispatch(updateFormField({ field: 'diseaseId', value: diseaseId.toString() }));
      }
    } else if (field === 'treatment') {
      // Find the therapy from the therapies list by ID
      const therapyId = parseInt(value);
      const selectedTherapy = therapies.find(t => t.id === therapyId);
      if (selectedTherapy) {
        dispatch(updateFormField({ field: 'treatment', value: selectedTherapy.name }));
        dispatch(updateFormField({ field: 'treatmentId', value: therapyId.toString() }));
      }
    } else {
      dispatch(updateFormField({ field, value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const missingFields = [];
    if (!formData.ageCategory) missingFields.push('Age Category');
    if (!formData.diseaseId) missingFields.push('Disease');
    if (!formData.treatmentId) missingFields.push('Treatment');
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (locationLoading) {
      alert('Please wait while we detect your location...');
      return;
    }

    // Find selected therapy and extract cost data from country_costs
    const selectedTherapy = therapies.find(t => t.id === parseInt(formData.treatmentId));
    let costData = {
      currentLocation: formData.location || userCountryName || 'Unknown',
      minCost: null,
      maxCost: null,
      currency: 'USD',
      currencySymbol: '$',
      currencyCode: 'USD',
      showLocationMessage: true,
    };

    // Helper function to check if location matches a country
    const isLocationMatch = (country, locationValue, userCountryCode) => {
      if (!country) return false;
      const countrySlug = country?.slug?.toLowerCase();
      const countryName = country?.country?.toLowerCase();
      const countryCode = country?.country_code?.toLowerCase();
      
      return countrySlug === locationValue || 
             countryName === locationValue || 
             countryName?.replace(/\s+/g, '-') === locationValue ||
             countryCode === locationValue ||
             (userCountryCode && countryCode === userCountryCode.toLowerCase());
    };

    // Helper function to extract country from relation
    const extractCountry = (countryRel) => {
      return countryRel?.data || countryRel;
    };

    if (selectedTherapy) {
      const locationValue = formData.location?.toLowerCase() || '';
      
      // First, check if user's location is in the countries field
      let isLocationAvailable = false;
      if (selectedTherapy.countries && Array.isArray(selectedTherapy.countries)) {
        isLocationAvailable = selectedTherapy.countries.some(countryRel => {
          const country = extractCountry(countryRel);
          return isLocationMatch(country, locationValue, userCountryCode);
        });
      }

      // If location is available in countries field, check for cost data
      if (isLocationAvailable && selectedTherapy.country_costs && Array.isArray(selectedTherapy.country_costs)) {
        // Find the country cost entry that matches the selected location
        const matchedCountryCost = selectedTherapy.country_costs.find(cost => {
          const country = extractCountry(cost.country);
          return isLocationMatch(country, locationValue, userCountryCode);
        });

        if (matchedCountryCost) {
          // Cost data available, show it
          costData.minCost = matchedCountryCost.cost_min;
          costData.maxCost = matchedCountryCost.cost_max;
          costData.currency = matchedCountryCost.currency || 'USD';
          costData.daysInHospital = matchedCountryCost.days_in_hospital;
          costData.daysOutsideHospital = matchedCountryCost.days_outside_hospital;
          costData.totalDays = matchedCountryCost.total_days;
          costData.showLocationMessage = false; // Location found with cost, don't show message
          
          // Set currency symbol based on currency code
          const currencySymbols = {
            'USD': '$',
            'INR': '₹',
            'EUR': '€',
            'GBP': '£',
            'CNY': '¥',
          };
          costData.currencySymbol = currencySymbols[costData.currency] || '$';
          costData.currencyCode = costData.currency;
          
          // Get country name for display
          const country = extractCountry(matchedCountryCost.country);
          if (country?.country) {
            costData.currentLocation = country.country;
          }
        } else {
          // Location available but no cost data - still don't show message, just no cost
          costData.showLocationMessage = false;
        }
      } else {
        // Location not available in countries field, show message and available countries
        costData.showLocationMessage = true;
      }
    }

    // Format cost range string
    if (costData.minCost && costData.maxCost) {
      costData.costRange = `${costData.currencySymbol}${costData.minCost.toLocaleString()} - ${costData.currencySymbol}${costData.maxCost.toLocaleString()}`;
    }

    // Extract available countries from therapy's countries field (preferred) or country_costs (fallback)
    if (selectedTherapy) {
      if (selectedTherapy.countries && Array.isArray(selectedTherapy.countries)) {
        // Use countries field - this is the source of truth for availability
        costData.availableCountries = selectedTherapy.countries
          .map(countryRel => {
            const country = extractCountry(countryRel);
            return {
              id: country?.id,
              name: country?.country || '',
              slug: country?.slug || country?.country?.toLowerCase().replace(/\s+/g, '-') || '',
              countryCode: country?.country_code || '',
            };
          })
          .filter(country => country.name); // Filter out invalid entries
      } else if (selectedTherapy.country_costs && Array.isArray(selectedTherapy.country_costs)) {
        // Fallback to country_costs if countries field is not available
        costData.availableCountries = selectedTherapy.country_costs
          .filter(cost => cost.country && cost.is_available !== false)
          .map(cost => {
            const country = extractCountry(cost.country);
            return {
              id: country?.id,
              name: country?.country || '',
              slug: country?.slug || country?.country?.toLowerCase().replace(/\s+/g, '-') || '',
              countryCode: country?.country_code || '',
            };
          })
          .filter(country => country.name);
      }
    }
    
    // Add therapy slug and full therapy data for navigation
    if (selectedTherapy?.slug) {
      costData.therapySlug = selectedTherapy.slug;
    }
    
    // Add full therapy data so it can be passed via navigation state
    if (selectedTherapy) {
      costData.therapyData = selectedTherapy;
    }

    dispatch(setSubmissionStatus('succeeded'));
    dispatch(setCalculationResult(costData));
    
    // Scroll to CalculatedCostSection after a brief delay to ensure it's rendered
    setTimeout(() => {
      const calculatedSection = document.querySelector('.calculated_cost_section');
      if (calculatedSection) {
        calculatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className='homeHero_sec cancer_hero_sec'>
      <div className='home-hero-banner hospital_details_hero'>
        <div className='ratio'>
          <BackgroundImage
            src={heroBannner}
            alt={DiseaseName}
            loading="lazy"
          />
        </div>
      </div>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>
            <ScrollAnimationComponent animationVariants={fadeIn}>
            <HeaderRow>
              <HeaderLeft>
                <DiseaseTitle className='title-1 mb-4'>{DiseaseName}</DiseaseTitle>
                  <WhiteBox>
                    <FormContainer onSubmit={handleSubmit}>
                      {error && (
                        <ErrorMessage>
                          {typeof error === 'string' ? error : 'An error occurred. Please try again.'}
                        </ErrorMessage>
                      )}
                      <RowWrap>
                        <Row className='g-3 flex-grow-1'>
                          <Col sm={6} md={6} lg={3}>
                            <FormGroup>
                              <Label htmlFor="ageCategory">Age Category*</Label>
                              <Select
                                name="ageCategory"
                                value={formData.ageCategory}
                                onChange={(e) => handleInputChange('ageCategory', e.target.value)}
                                required
                                id='ageCategory'
                              >
                                <option value="">Select age category here</option>
                                <option value="pediatricMale">Pediatric Male</option>
                                <option value="pediatricFemale">Pediatric Female</option>
                                <option value="adultMale">Adult Male</option>
                                <option value="adultFemale">Adult Female</option>
                              </Select>
                            </FormGroup>
                          </Col>
                          <Col sm={6} md={6} lg={3}>
                            <FormGroup>
                              <Label htmlFor="disease">Disease*</Label>
                              <Select
                                name="disease"
                                value={formData.diseaseId || ''}
                                onChange={(e) => handleInputChange('disease', e.target.value)}
                                required
                                id='disease'
                                disabled={!formData.ageCategory || diseasesLoading}
                              >
                                <option value="">
                                  {diseasesLoading 
                                    ? 'Loading diseases...' 
                                    : !formData.ageCategory 
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
                          <Col sm={6} md={6} lg={3}>
                            <FormGroup>
                              <Label htmlFor="treatment">Treatment*</Label>
                              <Select
                                name="treatment"
                                value={formData.treatmentId || ''}
                                onChange={(e) => handleInputChange('treatment', e.target.value)}
                                required
                                id='treatment'
                                disabled={!formData.diseaseId || therapiesLoading}
                              >
                                <option value="">
                                  {therapiesLoading 
                                    ? 'Loading treatments...' 
                                    : !formData.diseaseId 
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
                          <Col sm={6} md={6} lg={3}>
                            <FormGroup>
                              <Label htmlFor="location">Location*</Label>
                              <Select
                                name="location"
                                value={formData.location || ''}
                                required
                                id='location'
                                disabled={true}
                              >
                                <option value={formData.location || ''}>
                                  {locationLoading 
                                    ? 'Detecting location...' 
                                    : userCountryName || formData.location || 'Location not detected'}
                                </option>
                              </Select>
                            </FormGroup>
                          </Col>
                        </Row>
                        <SubmitButton 
                          className='btn btn-pink-solid btn-md px-5' 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Submitting...' : 'Submit'}
                        </SubmitButton>
                      </RowWrap>
                    </FormContainer>
                  </WhiteBox>
              </HeaderLeft>
            </HeaderRow>
            </ScrollAnimationComponent>       
         </div>
        </div>
      </div>    
    </section>
  );
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

const RowWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: flex-end;
  @media (max-width: 1024px) {
  flex-wrap: wrap;
  }
`;

const WhiteBox = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
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

const Select = styled.select`
  font-family: 'Be Vietnam Pro', sans-serif;
  padding: 14px 14px;
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


export default CostCalculatorHero;
