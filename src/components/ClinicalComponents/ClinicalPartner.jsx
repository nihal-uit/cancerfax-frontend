import React from 'react';
import Marquee from 'react-fast-marquee';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';

const ClinicalPartner = ({ componentData, data }) => {
  const collaborationData = componentData || data;

  if (!collaborationData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Check for partner logos in various possible field names
  const partners =
    collaborationData?.partners ||
    collaborationData?.logos ||
    collaborationData?.badges ||
    collaborationData?.images ||
    [];

  const hasPartners = Array.isArray(partners) && partners.length > 0;

  return (
    <section className='clinical__partner__sec py-120 pt-0'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className='commContent_wrap commContent_new mx-auto text-center'>
            <p className='contentLabel'>{collaborationData?.heading || ''}</p>
            <h3 className='title-3'>{collaborationData?.subHeading || ''}</h3>
            <div className='content__des text_theme_dark'>
              <p>{renderRichTextWithImages(collaborationData?.description_block)||collaborationData?.description_text || ''}</p>
            </div>
          </div>
        </ScrollAnimationComponent>

        {hasPartners && (
          <div className='marquee_wrap mt-85'>
            <Marquee
              pauseOnHover={true}
              speed={60}
              gradient={true}
              autoFill={true}
              direction='left'
              gradientColor='#F8F8F8'
            >
              <div className='certificate_grid'>
                {partners.map((partner, index) => {
                  const logoUrl = formatMedia(
                    partner?.logo || partner?.image || partner
                  );
                  return (
                    <div
                      key={partner?.id || index}
                      className='certificate__item'
                    >
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt={
                            partner?.name ||
                            partner?.alternativeText ||
                            'Partner logo'
                          }
                          style={{ height: '60px', objectFit: 'contain' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClinicalPartner;
