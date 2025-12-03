import styled from "styled-components";
import ScrollAnimationComponent from '../../../components/ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';

const CancerCenterBanner = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
      <section className='cancerCenter_slider_sec'>
          <div className='cancerCenter_slider_wrapper'>
              <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  // loop={true}
                  modules={[Navigation, EffectFade]}
                  effect="fade"
                  navigation={{
                    nextEl: ".customNext",
                    prevEl: ".customPrev",
                  }}
                >
                <SwiperSlide>
                  <div className='cancerCenter_info_slider'>
                    <img src="../images/cancer-center-banner-img-1.jpg" alt="" />
                    <div className='cancerCenter_info_slider_content'>
                      <div className='containerWrapper'>
                        <ScrollAnimationComponent animationVariants={fadeIn}>
                        <div className='commContent_wrap'>
                          <h3 className="title-size-36">MD Anderson Cancer Center</h3>
                          <p>MD Anderson Cancer Centre is a world-renowned cancer treatment and research facility. It is known for its holistic approach to cancer care, cutting-edge therapies, and pioneering research. It is located in Houston, Texas. MD Anderson uses a multidisciplinary team of professionals to create personalized treatment programmes for each patient, which include surgery, radiation therapy, chemotherapy, immunotherapy, and targeted treatments.</p>
                          <ButtonGroup>
                            <a href="#" className='btn btn-text text-white'>
                              Go to website
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.11181 4.42695C6.11181 4.05416 6.41402 3.75195 6.78681 3.75195H13.575C13.7541 3.75195 13.9258 3.82311 14.0524 3.94976C14.179 4.07641 14.2501 4.24817 14.25 4.42725L14.2471 11.1774C14.2469 11.5502 13.9446 11.8522 13.5718 11.8521C13.199 11.8519 12.8969 11.5496 12.8971 11.1768L12.8993 6.05725L4.9023 14.0542C4.63869 14.3179 4.21131 14.3179 3.9477 14.0542C3.6841 13.7906 3.6841 13.3633 3.9477 13.0997L11.9454 5.10195H6.78681C6.41402 5.10195 6.11181 4.79975 6.11181 4.42695Z" fill="white"/>
                              </svg>
                            </a>
                            <a href="#" className='btn btn-pink-solid'>
                              Get Opinion and Estimate
                            </a>
                          </ButtonGroup>
                        </div>
                        </ScrollAnimationComponent>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='cancerCenter_info_slider'>
                    <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600" alt="" />
                    <div className='cancerCenter_info_slider_content'>
                      <div className='containerWrapper'>
                        <ScrollAnimationComponent animationVariants={fadeIn}>
                        <div className='commContent_wrap'>
                          <h3 className="title-size-36">MD Anderson Cancer Center</h3>
                          <p>MD Anderson Cancer Centre is a world-renowned cancer treatment and research facility. It is known for its holistic approach to cancer care, cutting-edge therapies, and pioneering research. It is located in Houston, Texas. MD Anderson uses a multidisciplinary team of professionals to create personalized treatment programmes for each patient, which include surgery, radiation therapy, chemotherapy, immunotherapy, and targeted treatments.</p>
                          <ButtonGroup>
                            <a href="#" className='btn btn-text text-white'>
                              Go to website
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.11181 4.42695C6.11181 4.05416 6.41402 3.75195 6.78681 3.75195H13.575C13.7541 3.75195 13.9258 3.82311 14.0524 3.94976C14.179 4.07641 14.2501 4.24817 14.25 4.42725L14.2471 11.1774C14.2469 11.5502 13.9446 11.8522 13.5718 11.8521C13.199 11.8519 12.8969 11.5496 12.8971 11.1768L12.8993 6.05725L4.9023 14.0542C4.63869 14.3179 4.21131 14.3179 3.9477 14.0542C3.6841 13.7906 3.6841 13.3633 3.9477 13.0997L11.9454 5.10195H6.78681C6.41402 5.10195 6.11181 4.79975 6.11181 4.42695Z" fill="white"/>
                              </svg>
                            </a>
                            <a href="#" className='btn btn-pink-solid'>
                              Get Opinion and Estimate
                            </a>
                          </ButtonGroup>
                        </div>
                        </ScrollAnimationComponent>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <NavigationContainer className='customNavigation'>
                  <NavButton className='customPrev'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M15.8656 31.7313L17.6493 30.01L4.75497 17.1156H45.0481V14.6156H4.70684L17.5868 1.72125L15.8656 0L-3.43323e-05 15.8656L15.8656 31.7313Z" fill="#ffffff"/>
                    </svg>          
                  </NavButton>
                  <NavButton className="customNext">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                    <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#ffffff"/>
                    </svg>          
                  </NavButton>
                </NavigationContainer>
              </Swiper>
          </div>
      </section>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const NavigationContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  z-index: 10;
  pointer-events: none;
  width: 100%;
  max-width: 1240px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    gap: 32px;
    bottom: 52px;
    right: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding-top: 24px;
  }  
`;

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 28px;
    height: 20px;
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
  }
`;



export default CancerCenterBanner;
