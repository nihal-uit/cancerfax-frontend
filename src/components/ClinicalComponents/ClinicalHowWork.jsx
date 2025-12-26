import React from 'react';
import { Image } from 'react-bootstrap';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import { formatMedia, formatRichText } from '../../utils/strapiHelpers';

const ClinicalHowWork = ({ componentData, data }) => {
  const understandingData = componentData || data;

  if (!understandingData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageUrl = formatMedia(understandingData?.image);
  const points = understandingData?.why_card?.points || [];

  return (
    <section className='clinical__howwork_sec py-120 pb-0'>
      {imageUrl && (
        <div className='chowworkbg'>
          <div className='ratio'>
            {/* <img
              src={imageUrl}
              alt={understandingData?.image?.alternativeText || "Clinical How Work"}
            /> */}
          </div>
        </div>
      )}
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <div className='commContent_wrap commContent_new text-center text-white'>
            <p className='contentLabel'>{understandingData?.heading || ''}</p>
            <h3 className='title-3'>{understandingData?.subHeading || ''}</h3>
            <div className='content__des'>
              {formatRichText(understandingData?.description_text) || ''}
            </div>
          </div>
        </ScrollAnimationComponent>
        {points.length > 0 && (
          <div className='work__matter__list'>
            {imageUrl && (
              <div className='work__matter__item'>
                <div className='ratio__holder'>
                  <div className='ratio'>
                    <img
                      src={imageUrl}
                      alt={
                        understandingData?.image?.alternativeText ||
                        'Work Matter'
                      }
                    />
                  </div>
                </div>
              </div>
            )}
            <div className='work__matter__item matter__list'>
              <ScrollAnimationComponent animationVariants={fadeIn}>
                {understandingData?.why_card?.heading && (
                  <h4 className='work__matter__title'>
                    {understandingData.why_card.heading}
                  </h4>
                )}
                <ul>
                  {points.map((point) => (
                    <li key={point?.id}>
                      <Image
                        src='./images/ccheck-icon.svg'
                        width={28}
                        height={28}
                        alt='Check icon'
                      />
                      <span>{point?.point || ''}</span>
                    </li>
                  ))}
                </ul>
              </ScrollAnimationComponent>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClinicalHowWork;
