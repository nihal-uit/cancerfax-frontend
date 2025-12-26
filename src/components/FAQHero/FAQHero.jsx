import { memo } from 'react';
import styled from 'styled-components';

const FAQHero = ({ data }) => {
  return (
    <section className='faqHero_sec homeHero_sec'>
      <div className='heroContent_wrap'>
        <div className='containerWrapper'>
          <div className='commContent_wrap'>      
            <HeroContentGrid>
              <FaqTitle className='title-1'>{data?.heading}</FaqTitle>
              <FaqDescription className='text-16'>{data?.subHeading}</FaqDescription>
            </HeroContentGrid>          
         </div>
        </div>
      </div>
    </section>
  );
};

const HeroContentGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

const FaqTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`;

const FaqDescription = styled.p`
  color: ${props => props.theme.colors.white};
`;

export default memo(FAQHero);
