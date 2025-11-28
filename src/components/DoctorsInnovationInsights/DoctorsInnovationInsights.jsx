import styled from 'styled-components';
import InnovativeGalleryMarqueComponent from '../reusable/InnovativeGalleryMarqueComponent';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';

const DoctorsInnovationInsights = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='innovationInsight_sec py-120'>
      <div className='containerWrapper'>
       <ScrollAnimationComponent animationVariants={fadeIn}>
        <Header className='commContent_wrap content-gap-40'>
          <Label className='contentLabel text_theme_dark'>INNOVATION & INSIGHTS</Label>
          <Title className='title-3 text_theme_dark'>Why Our Hospital Network Matters</Title>
          <Description className='text-16 text_theme_dark'>
            At CancerFax, our strength lies not just in what we recommend, but with whom we partner. We carefully vet and collaborate with leading cancer hospitals and research institutions around the globe, ensuring your care is built on credibility, safety, and excellence.
          </Description>
        </Header>
        </ScrollAnimationComponent>
      </div>
      <InnovativeGalleryMarqueComponent /> 
    </section>
  );
};

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const Label = styled.div`
`;

const Title = styled.h3`
`;

const Description = styled.p`
`;

export default DoctorsInnovationInsights;
