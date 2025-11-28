import React from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';

const DoctorsGrid = ( { doctors, loading }) => {
  if (loading) {
    return null;
  }

  // Fallback hospital data for demonstration
  const defaultDoctors = [
    {
      id: 1,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 2,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 3,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 4,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 5,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 6,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1519167758481-83f29da8c9d0?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 7,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 8,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800' } } },
      specialty: 'Specialty goes here',
    },
    {
      id: 9,
      name: 'Doctor name goes here',
      doctor: 'Dr Bharat Patodiya',
      address: '4th Floor, Pi Cancer Care, Above Pi Electronics, Indira Nagar, Gachibowli, Hyderabad, India',
      phone: '(+91) 83741 90429',
      image: { data: { attributes: { url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800' } } },
      specialty: 'Specialty goes here',
    },
  ];

  const doctorsList = doctors?.length > 0 ? doctors.map((doctor,index) => ({
    id: doctor.id || defaultDoctors[index % 9].id,
    name: `${doctor.first_name} ${doctor.last_name ? doctor.last_name : ''}` || defaultDoctors[index % 9].name,
    image: getMediaUrl(doctor.profilePicture) || defaultDoctors[index % 9].image,
    specialty: doctor.specialization || defaultDoctors[index % 9].specialty,
  })) : defaultDoctors;

  return (
    <>
        <Grid>
          {doctorsList.map((doctor) => {
            return (
              <Card key={doctor.id}>
                <CardImage bgImage={doctor.image} />
                <CardContent>
                  <div className='doctors-text'>
                    <DoctorName>{doctor.name}</DoctorName>
                    <span>{doctor.specialty}</span>
                  </div>
                  <ArrowIcon>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </ArrowIcon>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 1400px) {
    gap: 25px;
  }
  
  @media (max-width: 1200px) {
    gap: 20px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 308px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 28px);
  height: 64px;
  padding: 0 12px;
  z-index: 2;
  background: white;
  border-radius: 12px;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  .doctors-text {
    display: flex;
    justify-content: flex-start;
    gap: 2px;
    flex-direction: column;
    color: #008080;
    font-size: 14px;
  }
`;

const DoctorName = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
    stroke: #36454F;
    transition: all 0.3s ease;
  }
`;

export default DoctorsGrid;

