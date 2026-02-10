import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const locations = [
  'India',
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Ireland',
];

const AvailableTreatmentComponent = () => {
  // const [activeLocation, setActiveLocation] = useState(countryParam);
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const handleSelect = (location) => {
    setSearchParams({ country: location });
  };
  return (
    <div>
      <section className='treatmentwise_cost_section pb-120'>
        <div className='containerWrapper'>
          <div className='treatment_new_row'>
            <div className='treatment_new_left'>
              <CommContent className="commContent_wrap">
                <Label className="contentLabel">
                  Hand in hand
                </Label>
                <Title className="title-3">
                  Treatment available
                </Title>
              </CommContent>
            </div>
            <div className='treatment_new_right'>
              <div class="commContent_wrap content-gap-40">
                <p class="text-16 text_theme_dark">
                  Dr. Wang is skilled in individualized targeted and immunotherapy for rare tumors and lung cancer, as well as multidisciplinary comprehensive treatment...
                </p>
              </div>
            </div>
          </div>
          {/* <div className="treatment_location_wrap">
              {locations.map((location, index) => (
                <div className="treatment_location_list" key={index}>
                  <LocationIcon />
                  <h5>{location}</h5>
                </div>  
              ))}          
              </div> */}

          {/* <div className="treatment_location_wrap">
            {locations.map((location, index) => {
              const isActive = countryParam === location;

              return (
                <div
                  key={index}
                  className={`treatment_location_list ${isActive ? "active_location" : ""
                    }`}
                >
                  <LocationIcon isActive={isActive} />
                  <h5>{location}</h5>
                </div>
              );
            })}
          </div> */}


          {/* <div className="treatment_location_wrap">
            {locations.map((location, index) => {
              const isActive = activeLocation === location;

              return (
                <button
                  key={index}
                  type="button"
                  className={`treatment_location_list ${isActive ? "active_location" : ""
                    }`}
                  onClick={() => setActiveLocation(location)}
                >
                  <LocationIcon isActive={isActive} />
                  <h5>{location}</h5>
                </button>
              );
            })}
          </div> */}

          <div className="treatment_location_wrap">
            {locations.map((location, index) => {
              const isActive = countryParam === location;

              return (
                <button
                  key={index}
                  type="button"
                  className={`treatment_location_list ${isActive ? "active_location" : ""
                    }`}
                  onClick={() => handleSelect(location)}
                >
                  <LocationIcon isActive={isActive} />
                  <h5>{location}</h5>
                </button>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  max-width: 100%;
  margin-inline: auto;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Label = styled.p`
  color: ${(props) => props.theme.colors.black};
`;

const Title = styled.h3`
  color: ${(props) => props.theme.colors.black};
`;

const LocationIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
    <path d="M0 4.37307C0 6.0783 1.20726 8.55928 3.62178 11.816C3.99176 12.315 4.76376 12.3076 5.12822 11.816C7.54274 8.55928 8.75 6.0783 8.75 4.37307C8.75 1.95539 6.79375 0 4.375 0C1.95625 0 0 1.95539 0 4.37307ZM2.8125 4.37307C2.8125 3.51095 3.5125 2.81126 4.375 2.81126C5.2375 2.81126 5.9375 3.51095 5.9375 4.37307C5.9375 5.23519 5.2375 5.93488 4.375 5.93488C3.5125 5.93488 2.8125 5.23519 2.8125 4.37307Z" fill="#008080" />
    fill={isActive ? "#008080" : "#9CA3AF"}
  </svg>
)

export default AvailableTreatmentComponent;