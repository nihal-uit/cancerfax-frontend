import React from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import { formatMedia, formatRichText } from '../../utils/strapiHelpers';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { useNavigate } from 'react-router-dom';
import { useLoadMore } from '../../utils/useLoadMore';
import SkeletonBlogCard from '../reusable/SkeletonBlogCard';

const HospitalGrid = ( { data, loading }) => {
  const navigate = useNavigate();
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCardClick = (hospital) => {
    if (!hospital?.slug) return;
    navigate(`/hospitals/${hospital?.slug}`);
  };

  const handleCallClick = (e, phone) => {
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleShareClick = (e, hospital) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: hospital.name,
        text: `Check out ${hospital.name}`,
        url: window.location.href,
      });
    }
  };

  const { visibleItems, loadMore, hasMore, isLoadingMore } = useLoadMore(
    data,
    6,
    3
  );

  if (loading) {
    return (
      <Grid>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBlogCard key={i} />
        ))}
      </Grid>
    );
  }

  if(data?.length === 0) {
    return (
      <Grid>
        <EmptyState>No hospitals found</EmptyState>
      </Grid>
    );
  }

  return (
    <>
        <Grid>
          {visibleItems.map((hospital) => {
            return (
              <ScrollAnimationComponent animationVariants={fadeIn}>
              <Card key={hospital?.id} onClick={() => handleCardClick(hospital)}>
                <CardImage bgImage={formatMedia(hospital?.about?.featuredImage)} />
                <CardContent>
                  <HospitalName>{hospital?.name}</HospitalName>
                  <ArrowIcon>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </ArrowIcon>
                  <HoverContent>
                    <HospitalAddress>
                      {hospital?.doctors[0]?.first_name} {hospital?.doctors[0]?.last_name}, {hospital?.address?.address?.city}, {hospital?.address?.address?.country}
                    </HospitalAddress>
                    <ActionsRow>
                      <CallButton onClick={(e) => handleCallClick(e, hospital?.contact_details?.phone)}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        {hospital?.contact_details?.phone}
                      </CallButton>
                      <IconButtonsGroup>
                        <IconButton onClick={(e) => handleShareClick(e, hospital)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                          <path d="M3.69965 6.9308C3.73648 7.32405 4.08511 7.61299 4.47836 7.57616C4.74569 7.55113 4.97647 7.37847 5.07594 7.12908L7.52858 0.980098C7.6749 0.613239 7.49613 0.197219 7.12927 0.0508907C6.95915 -0.0169636 6.76949 -0.0169636 6.59937 0.0508907L0.450387 2.50352C0.0835284 2.64985 -0.0952471 3.06587 0.0510812 3.43273C0.150555 3.68212 0.381339 3.85478 0.648668 3.87981L3.43844 4.14103L3.69965 6.9308ZM6.78898 0.790489L4.4373 6.68638L4.13385 3.44561L0.893088 3.14217L6.78898 0.790489Z" fill="white"/>
                          </svg>
                        </IconButton>
                        <IconButton onClick={() => handleCardClick(hospital)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 7" fill="none">
                          <path d="M3.98451 0.109041C3.84796 0.243661 3.83516 0.456382 3.94709 0.605635L3.98071 0.644661L6.29146 2.98792L0.37875 2.98792C0.169572 2.98792 0 3.15749 0 3.36667C0 3.55975 0.144487 3.71909 0.33124 3.74247L0.37875 3.74542H6.29146L3.98071 6.08867C3.84609 6.22522 3.8363 6.4381 3.95034 6.58575L3.98451 6.62429C4.12105 6.75891 4.33393 6.7687 4.48158 6.65466L4.52013 6.62049L7.46596 3.63258C7.59923 3.4974 7.61034 3.28708 7.49928 3.13938L7.46596 3.10076L4.52013 0.112839C4.37327 -0.0361169 4.13346 -0.0378176 3.98451 0.109041Z" fill="white"/>
                          </svg>
                        </IconButton>
                      </IconButtonsGroup>
                    </ActionsRow>
                  </HoverContent>
                </CardContent>
              </Card>
              </ScrollAnimationComponent>
            );
          })}
        </Grid>

        {hasMore && (
        <LoadMoreWrapper>
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </button>
        </LoadMoreWrapper>
      )}

    </>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
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
  height: 260px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: white;
  border-radius: 12px;
  transition: all 0.4s ease;
  overflow: hidden;

  ${Card}:hover & {
    height: 140px;
    padding: 12px;
    background: #36454F;
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    overflow: hidden;
  }
`;

const HoverContent = styled.div`
  display: none;
  width: 100%;
  
  ${Card}:hover & {
    display: block;
  }
`;

const HospitalName = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #36454F;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  transition: all 0.3s ease;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  ${Card}:hover & {
    color: white;
    font-size: 16px;
    flex: none;
    width: 100%;
    line-height: 1.25;
  }
`;

const HospitalAddress = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  margin: 0 0 14px 0;
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-shrink: 0;
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  flex-shrink: 0;
  margin-top: auto;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const CallButton = styled.button`
  flex: 1;
  padding: 6px 12px;
  background: #FF69B4;
  border: none;
  border-radius: 12px;
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  white-space: nowrap;
  min-height: 30px;
  
  &:hover {
    opacity: 0.8;
  }
  
  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }
`;

const IconButton = styled.button`
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
   
  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: white;
  }
`;

const IconButtonsGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    gap: 8px;
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
  
  ${Card}:hover & {
    display: none;
  }
`;

const LoadMoreWrapper = styled.div`
  text-align: center;
  margin-top: 40px;

  .load-more-btn {
    background: #36454f;
    color: #fff;
    padding: 14px 30px;
    border-radius: 8px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: 0.25s ease;

    &:hover {
      background: #000;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #36454f;
  font-size: 18px;
  background: #f7f9fa;
  border-radius: 16px;
  padding: 40px 20px;
`;

export default HospitalGrid;

