import styled from 'styled-components';
import { Suspense } from 'react';
import ContactFormSection from '../ContactFormSection/ContactFormSection';

const ContactHero = ({ data }) => {
  return (
    <section className='contact_hero_sec comm_hero_pt'>
        <div className='containerWrapper py-60'>
            <ContentWrapper className='commContent_wrap'>
              <span className='contentLabel'>{data?.heading}</span>
              <h1 className='title-1'>{data?.subHeading}</h1>
            </ContentWrapper>
            <Suspense fallback={<LoadingSection>Loading...</LoadingSection>}>
              <ContactFormSection data={data} />
            </Suspense>
        </div>
      </section>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

const LoadingSection = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FAF5F0;
`;

export default ContactHero;