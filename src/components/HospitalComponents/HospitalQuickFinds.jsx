import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import HospitalGrid from './HospitalGrid';
import { fetchHospitals } from '../../store/slices/hospitalNetworkSlice';
import { renderRichTextWithImages } from '@/utils/strapiHelpers';

const HOSPITALS_PAGE_SIZE = 6;

const HospitalQuickFinds = ({ componentData, data }) => {
  const dispatch = useDispatch();
  const quickFindsData = componentData || data;
  const { countries, specialties, treatments } = useSelector((state) => state.quickFinds);
  const { hospitals, hospitalsLoading, hospitalsHasMore } = useSelector(state => state.hospitalNetwork)
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('');

  useEffect(() => {
    dispatch(fetchHospitals({ limit: HOSPITALS_PAGE_SIZE, start: 0, sorting: selectedSorting || '' }));
  }, [dispatch, selectedSorting]);

  if (!quickFindsData) {
    return null;
  }

  const countryOptions = Array.isArray(countries) && countries.length > 0 ? countries : [];
  const specialtyOptions = Array.isArray(specialties) && specialties.length > 0 ? specialties : [];
  const treatmentOptions = Array.isArray(treatments) && treatments.length > 0 ? treatments : [];

  const sortingOptions = [
    { id: 1, name: 'Name A-Z', value: 'a-z' },
    { id: 2, name: 'Name Z-A', value: 'z-a' },
    { id: 3, name: 'Published Date Newest', value: 'published-date-newest' },
    { id: 4, name: 'Published Date Oldest', value: 'published-date-oldest' },
  ];

  const handleSearch = () => {
    dispatch(fetchHospitals({ 
      limit: HOSPITALS_PAGE_SIZE, 
      start: 0, 
      query: searchTerm,
      sorting: selectedSorting || ''
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSelectedSorting(newSorting);
    dispatch(fetchHospitals({ 
      limit: HOSPITALS_PAGE_SIZE, 
      start: 0, 
      query: searchTerm,
      sorting: newSorting || ''
    }));
  };

  return (
    <section className='quickFinds_sec py-120'>
      <div className='containerWrapper'>
        <TopSection>
          <LeftContent className='commContent_wrap'>
            <Label className='contentLabel text_theme_dark'>
              {quickFindsData?.heading || ''}
            </Label>
            <Title className='title-3 text_theme_dark'>
              {quickFindsData?.subHeading || ''}
            </Title>
          </LeftContent>
          
          <RightContent className='commContent_wrap'>
            <Description className='text-16'>
              {renderRichTextWithImages(quickFindsData?.description_block)||quickFindsData?.description_text || ''}
            </Description>
          </RightContent>
        </TopSection>

        <FiltersContainer>
          <SearchInput>
            <Input
              type="text"
              placeholder="Search with keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </SearchIcon>
          </SearchInput>

          <SelectWrapper>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {countryOptions.map((country) => (
                <option key={country?.id || country?.value} value={country?.value || ''}>
                  {country?.name || ''}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedCountry ? 'placeholder' : ''}>
              {selectedCountry 
                ? countryOptions.find(c => c.value === selectedCountry)?.name || 'Select country'
                : 'Select country'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>

          <SelectWrapper>
            <Select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">Select specialty</option>
              {specialtyOptions.map((specialty) => (
                <option key={specialty?.id || specialty?.value} value={specialty?.value || ''}>
                  {specialty?.name || ''}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedSpecialty ? 'placeholder' : ''}>
              {selectedSpecialty 
                ? specialtyOptions.find(s => s.value === selectedSpecialty)?.name || 'Select specialty'
                : 'Select specialty'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>

          {treatmentOptions.length > 0 && (
          <SelectWrapper>
            <Select
              value={selectedTreatment}
              onChange={(e) => setSelectedTreatment(e.target.value)}
            >
              <option value="">Select treatment</option>
              {treatmentOptions.map((treatment) => (
                <option key={treatment?.id || treatment?.value} value={treatment?.value || ''}>
                  {treatment?.name || ''}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedTreatment ? 'placeholder' : ''}>
              {selectedTreatment 
                ? treatmentOptions.find(t => t.value === selectedTreatment)?.name || 'Select treatment'
                : 'Select treatment'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SelectWrapper>
          )}

          <SortSelectWrapper>
            <Select
              value={selectedSorting}
              onChange={handleSortingChange}
            >
              <option value="">Sort by</option>
              {sortingOptions.map((sorting) => (
                <option key={sorting.id} value={sorting.value}>
                  {sorting.name}
                </option>
              ))}
            </Select>
            <SelectDisplay className={!selectedSorting ? 'placeholder' : ''}>
              {selectedSorting
                ? sortingOptions.find((s) => s.value === selectedSorting)?.name || 'Sort by'
                : 'Sort by'}
            </SelectDisplay>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </DropdownIcon>
          </SortSelectWrapper>
        </FiltersContainer>

        <HospitalGrid data={hospitals || []} loading={hospitalsLoading} />

        {hospitals?.length > 0 && hospitalsHasMore && (
          <LoadMoreWrapper>
            <LoadMoreButton
              type='button'
              onClick={() =>
                dispatch(fetchHospitals({ 
                  limit: HOSPITALS_PAGE_SIZE, 
                  start: hospitals.length,
                  query: searchTerm,
                  sorting: selectedSorting || ''
                }))
              }
              disabled={hospitalsLoading}
            >
              {hospitalsLoading ? 'Loading...' : 'Load More'}
            </LoadMoreButton>
          </LoadMoreWrapper>
        )}
      </div>
    </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 500px;
  @media (max-width: 1024px) {
  flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Label = styled.div`
`;

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Description = styled.p`
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 400px repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
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
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #E9E9E9;
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454F;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454F;
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
  color: #36454F;
  background: transparent;
  
  &::placeholder {
    color: rgba(54, 69, 79, 0.5)
  }

  &.placeholder {
    color: rgba(54, 69, 79, 0.5)
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
  border: 1px solid #E9E9E9;
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454F;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454F;
  }
  
  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const SortSelectWrapper = styled(SelectWrapper)`
  max-width: 220px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
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
  color:rgba(54, 69, 79, 0.5);
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
    color: #36454F;
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
  color: #36454F;
  pointer-events: none;
  z-index: 1;
  
  &.placeholder {
    color:rgba(54, 69, 79, 0.5);
    background-color: transparent;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color:rgba(54, 69, 79, 0.5);
  font-size: 18px;
  pointer-events: none;
  transition: transform 0.3s ease;
  z-index: 1;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const LoadMoreButton = styled.button`
  padding: 14px 36px;
  border-radius: 999px;
  border: 1px solid #36454f;
  background: transparent;
  color: #36454f;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #36454f;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default HospitalQuickFinds;
