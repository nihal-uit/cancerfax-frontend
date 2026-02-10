import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from "../ScrollAnimation/ScrollAnimationComponent";
import CostCalculatorForm from './CostCalculatorForm';

const TreatmentwiseCost = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const countryParam = searchParams.get('country');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelers, setTravelers] = useState('')
  
  const navigationState = location.state;
  const { therapies, loading: therapiesLoading } = useSelector((state) => state.therapies || {});
  
  const [countryCostData, setCountryCostData] = useState(null);
  const [countryName, setCountryName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [therapyName, setTherapyName] = useState('');
  const [dataProcessed, setDataProcessed] = useState(false);
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    setCountryCostData(null);
    setCountryName('');
    setDiseaseName('');
    setTherapyName('');
    setDataProcessed(false);
    
    if (!countryParam) {
      setDataProcessed(true);
      return;
    }

    if (navigationState?.therapyData && navigationState?.countryCostData) {
      const therapy = navigationState.therapyData;
      const costData = navigationState.countryCostData;
      
      // Set disease name and therapy name from navigation state
      if (navigationState.diseaseName) {
        setDiseaseName(navigationState.diseaseName);
      }
      
      const therapyData = therapy?.attributes || therapy;
      if (therapyData?.name) {
        setTherapyName(therapyData.name);
      }
      
      if (costData.minCost && costData.maxCost) {
        setCountryCostData({
          costMin: costData.minCost,
          costMax: costData.maxCost,
          currency: costData.currency || 'USD',
          daysInHospital: costData.daysInHospital,
          daysOutsideHospital: costData.daysOutsideHospital,
          totalDays: costData.totalDays,
        });
        setCountryName(costData.currentLocation || countryParam);
        setDataProcessed(true);
        return;
      }
      
      if (therapyData && therapyData.country_costs && Array.isArray(therapyData.country_costs)) {
        const locationValue = countryParam.toLowerCase();
        const matchedCost = therapyData.country_costs.find(cost => {
          if (!cost.country) return false;
          const country = cost.country?.data || cost.country;
          if (!country) return false;
          
          const countrySlug = country?.slug?.toLowerCase();
          const countryName = country?.country?.toLowerCase();
          const countryCode = country?.country_code?.toLowerCase();
          
          return countrySlug === locationValue || 
                 countryName === locationValue || 
                 countryName?.replace(/\s+/g, '-') === locationValue ||
                 countryCode === locationValue;
        });

        if (matchedCost) {
          const country = matchedCost.country?.data || matchedCost.country;
          setCountryCostData({
            costMin: matchedCost.cost_min,
            costMax: matchedCost.cost_max,
            currency: matchedCost.currency || 'USD',
            daysInHospital: matchedCost.days_in_hospital,
            daysOutsideHospital: matchedCost.days_outside_hospital,
            totalDays: matchedCost.total_days,
          });
          setCountryName(country?.country || countryParam);
          
          // Set therapy name if not already set
          if (!therapyName && therapyData?.name) {
            setTherapyName(therapyData.name);
          }
          
          setDataProcessed(true);
          return;
        }
      }
    }

    if (therapiesLoading) {
      return;
    }

    if (!therapies || !Array.isArray(therapies) || therapies.length === 0) {
      setDataProcessed(true);
      return;
    }

    const therapyData = therapies[0];
    const therapy = therapyData?.attributes || therapyData;
    
    if (therapy && therapy.country_costs && Array.isArray(therapy.country_costs)) {
      const locationValue = countryParam.toLowerCase();
      
      // Find matching country cost
      const matchedCost = therapy.country_costs.find(cost => {
        if (!cost.country) return false;
        
        // Handle different country data structures (Strapi format vs direct format)
        const country = cost.country?.data || cost.country;
        if (!country) return false;
        
        const countrySlug = country?.slug?.toLowerCase();
        const countryName = country?.country?.toLowerCase();
        const countryCode = country?.country_code?.toLowerCase();
        
        return countrySlug === locationValue || 
               countryName === locationValue || 
               countryName?.replace(/\s+/g, '-') === locationValue ||
               countryCode === locationValue;
      });

      if (matchedCost) {
        const country = matchedCost.country?.data || matchedCost.country;
        setCountryCostData({
          costMin: matchedCost.cost_min,
          costMax: matchedCost.cost_max,
          currency: matchedCost.currency || 'USD',
          daysInHospital: matchedCost.days_in_hospital,
          daysOutsideHospital: matchedCost.days_outside_hospital,
          totalDays: matchedCost.total_days,
        });
        setCountryName(country?.country || countryParam);
        
        // Set therapy name from therapy data
        if (therapy?.name) {
          setTherapyName(therapy.name);
        }
      }
    }
    
    // Mark data processing as complete
    setDataProcessed(true);
  }, [therapies, countryParam, therapiesLoading, navigationState]);

  const formatCost = () => {
    if (!countryCostData) return null;
    
    const currencySymbols = {
      'USD': '$',
      'INR': '₹',
      'EUR': '€',
      'GBP': '£',
      'CNY': '¥',
    };
    
    const symbol = currencySymbols[countryCostData.currency] || '$';
    return `${symbol}${countryCostData.costMin.toLocaleString()} - ${symbol}${countryCostData.costMax.toLocaleString()}`;
  };

  if (!countryParam) {
    return null;
  }
  
  if (therapiesLoading) {
    return null;
  }
  
  if (!dataProcessed) {
    return null;
  }
  
  if (!countryCostData) {
    return null;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
    <section className='treatmentwise_cost_section pt-120 overflow-hidden'>
      <div className='containerWrapper'>
        <div className='row'>
          <div className='col-md-12'>
            <ScrollAnimationComponent
              animationVariants={fadeIn}
              className="h-100"
            >
              <FormContainer>
                <WhiteBox className='commContent_wrap'>
                  <h4 className='title-4'>Cost of {diseaseName || therapyName || 'Treatment'} In {countryName}</h4>
                  <GrayBox>
                    <div className='d-flex align-items-center'>
                      <h5 className='flex-grow-1'>
                        As per your input, your estimated cost will be {formatCost()}
                      </h5>
                    </div>
                    <div className='cost-list'>
                      <ul>
                        <li>
                          No. of Travelers: 
                          <span>
                            <Select
                              name="travelers"
                              value={travelers}
                              required
                              onChange={(e) => setTravelers(e.target.value)}
                            >
                              <option value="">Select from options</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </Select>
                          </span>
                        </li>
                        <li>
                          Days In Hospital: <span>{countryCostData.daysInHospital || 'N/A'}</span>
                        </li>
                        <li>
                          Days Outside Hospital: <span>{countryCostData.daysOutsideHospital || 'N/A'}</span>
                        </li>
                        <li>
                          Total Days In {countryName}: <span>{countryCostData.totalDays || 'N/A'}</span>
                        </li>
                      </ul>
                    </div>
                    <CheckboxWrapper>
                      <Checkbox
                        type="checkbox"
                        name="agreeToTerms"
                        required
                        id='additional_Accomodation'
                      />
                      <CheckboxLabel for="additional_Accomodation">
                        Need Additional Accomodation?
                      </CheckboxLabel>
                    </CheckboxWrapper>
                  </GrayBox>
                  <div>
                    <SubmitButton onClick={handleOpenModal} className='btn btn-pink-solid btn-md px-4' type="submit">
                      Cost breakup
                    </SubmitButton>
                  </div>
                </WhiteBox>
              </FormContainer>
            </ScrollAnimationComponent>
          </div>
        </div>
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 30px;
`;

const Select = styled.select`
  font-family: 'Be Vietnam Pro', sans-serif;
  padding: 6px 14px;
  background: #F8F8F8;
  border: 1px solid #E9E9E9;
  border-radius: 6px;
  font-size: 10px;
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

const SubmitButton = styled.button`
  font-size: 14px;
  border-radius: 14px;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
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

export default TreatmentwiseCost;