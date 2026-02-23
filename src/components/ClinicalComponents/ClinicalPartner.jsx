import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Marquee from 'react-fast-marquee';
import { formatMedia, renderRichTextWithImages } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import { fetchPartners } from '../../store/slices/partnerHospitalsSlice';

const ClinicalPartner = ({ componentData, data }) => {
  const dispatch = useDispatch();
  const collaborationData = componentData || data;
  const partnersFromApi = useSelector((state) => state.partnerHospitals?.partners) || [];

  useEffect(() => {
    const fromData =
      collaborationData?.partners ||
      collaborationData?.logos ||
      collaborationData?.badges ||
      collaborationData?.images ||
      [];
    const hasFromData = Array.isArray(fromData) && fromData.length > 0;
    if (!hasFromData) {
      dispatch(fetchPartners());
    }
  }, [dispatch, collaborationData]);

  if (!collaborationData) {
    return null;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Prefer partners from component data; fallback to /partners API
  const fromData =
    collaborationData?.partners ||
    collaborationData?.logos ||
    collaborationData?.badges ||
    collaborationData?.images ||
    [];
  const useApiPartners = !Array.isArray(fromData) || fromData.length === 0;
  const rawPartners = useApiPartners ? partnersFromApi : fromData;

  const partners = Array.isArray(rawPartners)
    ? rawPartners
        .map((p, index) => {
          if (useApiPartners) {
            const logo = p?.attributes?.logo ?? p?.logo;
            return {
              id: p?.id ?? p?.documentId ?? index,
              logo: formatMedia(logo),
              name: p?.attributes?.name ?? p?.name ?? p?.attributes?.alternativeText ?? 'Partner logo',
            };
          }
          return {
            id: p?.id ?? index,
            logo: formatMedia(p?.logo ?? p?.image ?? p),
            name: p?.name ?? p?.alternativeText ?? 'Partner logo',
          };
        })
        .filter((p) => p.logo)
    : [];

  const hasPartners = partners.length > 0;

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
                  const logoUrl = partner.logo;
                  return (
                    <div
                      key={partner?.id ?? index}
                      className='certificate__item'
                    >
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          alt={partner.name}
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
