import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchQuickFindsSection } from '../../store/slices/quickFindsSlice';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { renderRichTextWithImages } from '@/utils/strapiHelpers';

const ClinicalFeature = ({ componentData, data }) => {
  const dispatch = useDispatch();
  const listingData = componentData || data;
  const { countries, specialties, treatments } = useSelector(
    (state) => state.quickFinds
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');

  useEffect(() => {
    dispatch(fetchQuickFindsSection());
  }, [dispatch]);

  if (!listingData) {
    return null;
  }

  const countryOptions =
    Array.isArray(countries) && countries.length > 0 ? countries : [];
  const specialtyOptions =
    Array.isArray(specialties) && specialties.length > 0 ? specialties : [];
  const treatmentOptions =
    Array.isArray(treatments) && treatments.length > 0 ? treatments : [];

  const handleSearch = () => {
    // Implement search functionality
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='quickFinds_sec py-120'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <TopSection>
            <div className='commContent_wrap commContent_new '>
              <p className='contentLabel'>{listingData?.heading || ''}</p>
              <h3 className='title-3'>{listingData?.subHeading || ''}</h3>
              <div className='content__des text_theme_dark'>
                <p className='text-16'>{renderRichTextWithImages(listingData?.description_block)||listingData?.description_text || ''}</p>
              </div>
            </div>
          </TopSection>

          <FiltersContainer>
            <SearchInput>
              <Input
                type='text'
                placeholder='Search with keywords'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SearchIcon onClick={handleSearch}>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.35-4.35' />
                </svg>
              </SearchIcon>
            </SearchInput>

            {countryOptions.length > 0 && (
              <SelectWrapper>
                <Select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value=''>Select country</option>
                  {countryOptions.map((country) => (
                    <option
                      key={country?.id || country?.value}
                      value={country?.value || ''}
                    >
                      {country?.name || ''}
                    </option>
                  ))}
                </Select>
                <SelectDisplay
                  className={!selectedCountry ? 'placeholder' : ''}
                >
                  {selectedCountry
                    ? countryOptions.find((c) => c.value === selectedCountry)
                        ?.name || 'Select country'
                    : 'Select country'}
                </SelectDisplay>
                <DropdownIcon>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </DropdownIcon>
              </SelectWrapper>
            )}

            {specialtyOptions.length > 0 && (
              <SelectWrapper>
                <Select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value=''>Select specialty</option>
                  {specialtyOptions.map((specialty) => (
                    <option
                      key={specialty?.id || specialty?.value}
                      value={specialty?.value || ''}
                    >
                      {specialty?.name || ''}
                    </option>
                  ))}
                </Select>
                <SelectDisplay
                  className={!selectedSpecialty ? 'placeholder' : ''}
                >
                  {selectedSpecialty
                    ? specialtyOptions.find(
                        (s) => s.value === selectedSpecialty
                      )?.name || 'Select specialty'
                    : 'Select specialty'}
                </SelectDisplay>
                <DropdownIcon>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </DropdownIcon>
              </SelectWrapper>
            )}

            {treatmentOptions.length > 0 && (
              <SelectWrapper>
                <Select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                >
                  <option value=''>Select treatment</option>
                  {treatmentOptions.map((treatment) => (
                    <option
                      key={treatment?.id || treatment?.value}
                      value={treatment?.value || ''}
                    >
                      {treatment?.name || ''}
                    </option>
                  ))}
                </Select>
                <SelectDisplay
                  className={!selectedTreatment ? 'placeholder' : ''}
                >
                  {selectedTreatment
                    ? treatmentOptions.find(
                        (t) => t.value === selectedTreatment
                      )?.name || 'Select treatment'
                    : 'Select treatment'}
                </SelectDisplay>
                <DropdownIcon>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                </DropdownIcon>
              </SelectWrapper>
            )}
          </FiltersContainer>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};
const TopSection = styled.div`
  width: 910px;
  max-width: 100%;
  margin-bottom: 52px;

  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 40px;
  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 30px;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454f;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  background: transparent;

  &::placeholder {
    color: rgba(54, 69, 79, 0.5);
  }

  &.placeholder {
    color: rgba(54, 69, 79, 0.5);
    background-color: transparent;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgba(54, 69, 79, 1);
  font-size: 18px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454f;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(54, 69, 79, 0.5);
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 17px 20px;
  border-radius: 50px;
  z-index: 2;

  option {
    font-family: 'Be Vietnam Pro', sans-serif;
    padding: 12px;
    background: white;
    color: #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const SelectDisplay = styled.div`
  flex: 1;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  pointer-events: none;
  z-index: 1;

  &.placeholder {
    color: rgba(54, 69, 79, 0.5);
    background-color: transparent;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgba(54, 69, 79, 0.5);
  font-size: 18px;
  pointer-events: none;
  transition: transform 0.3s ease;
  z-index: 1;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CardListHolder = styled.div``;
const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 1199.98px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767.98px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  border-width: 0px 0px 1px 1px;

  border-style: solid;

  border-color: #727b81;
  border-bottom-left-radius: 24px;
  padding: 40px;
  height: 100%;
  @media (max-width: 991.98px) {
    padding: 30px;
  }
  @media (max-width: 767.98px) {
    padding: 20px;
  }
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  height: 100%;
  @media (max-width: 767.98px) {
    gap: 20px;
  }
`;
const CardSl = styled.p`
  color: #768792;
  font-size: 16px;
  font-weight: 600;
  line-height: calc(24 / 16);
  margin: 0;
`;
const CardTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.primary};
  font-size: 24px;
  font-weight: 600;
  line-height: calc(36 / 24);
  margin-bottom: 90px;
  @media (max-width: 1199.98px) {
    font-size: 22px;
    margin-bottom: 70px;
  }
  @media (max-width: 767.98px) {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;
const CardButton = styled.div`
  margin-top: auto;
`;
const ButtonHolder = styled.div`
  text-align: center;
  margin-top: 52px;
  @media (max-width: 991.98px) {
    margin-top: 40px;
  }
  @media (max-width: 767.98px) {
    margin-top: 30px;
  }
`;

export default ClinicalFeature;
