import React from 'react';
import styled from 'styled-components';
import { getMediaUrl } from '../../services/api';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import { useLoadMore } from '@/utils/useLoadMore';
import SkeletonBlogCard from '../reusable/SkeletonBlogCard';
import { useNavigate } from 'react-router-dom';

const DrugsGrid = ( { drugs, loading }) => {

  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
 
  const medicines = drugs?.length > 0 ? drugs.map((drug) => ({
    id: drug?.id,
    name: drug?.name,
    medicine_quantity: drug?.medicine_quantity,
    image: getMediaUrl(drug?.hero?.featuredImage),
    slug: drug?.slug,
  })) : [];

  const { visibleItems, loadMore, hasMore, isLoadingMore } = useLoadMore(
    medicines,
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

  if(medicines?.length === 0) {
    return (
      <Grid>
        <EmptyState>No drugs found</EmptyState>
      </Grid>
    );
  }

  const handleCardClick = (medicine) => {
    navigate(`/drugs/${medicine?.slug}`);
  };

  return (
    <>
        <Grid>
          {visibleItems.map((medicine) => {
            const drugImage = medicine?.image?.data?.attributes?.url 
              ? getMediaUrl(medicine.image.data.attributes.url) 
              : medicine?.image;
            const medicineName = medicine?.name;
            const medicineQuantity = `Box of ${medicine?.medicine_quantity || ''} ml medicine`;
            return (
              <ScrollAnimationComponent animationVariants={fadeIn}>
              <Card key={medicine.id} onClick={() => handleCardClick(medicine)}>
                <CardImage bgImage={drugImage} />
                <CardContent>
                  <div className='doctors-text'>
                    <DrugName>{medicineName}</DrugName>
                    <span>{medicineQuantity}</span>
                  </div>
                  <ArrowIcon>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </ArrowIcon>
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

const DrugName = styled.h5`
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

export default DrugsGrid;

