import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonBlock = styled.div`
  background: linear-gradient(
    90deg,
    #e8e8e8 0%,
    #e8e8e8 40%,
    #f0f0f0 50%,
    #e8e8e8 60%,
    #e8e8e8 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const HeaderSkeleton = styled(SkeletonBlock)`
  height: 72px;
  width: 100%;
  border-radius: 0;
`;

const HeroSkeleton = styled(SkeletonBlock)`
  width: 100%;
  height: clamp(320px, 45vw, 480px);
  margin: 0;
  border-radius: 0;
`;

const ContentBlock = styled(SkeletonBlock)`
  width: 100%;
  height: ${(p) => p.$height ?? 200}px;
  max-width: 1200px;
  margin: 24px auto;
  @media (max-width: 768px) {
    margin: 16px 16px;
  }
`;

const FooterSkeleton = styled(SkeletonBlock)`
  width: 100%;
  height: 200px;
  margin-top: 48px;
  border-radius: 0;
`;

/**
 * Skeleton screen shown while page/global data is loading.
 * Mimics the rough layout (header, hero, content blocks, footer) so the user sees structure instead of a spinner.
 */
const PageSkeleton = ({ showHeader = true, showFooter = true }) => {
  return (
    <Wrapper>
      {showHeader && <HeaderSkeleton />}
      <HeroSkeleton />
      <ContentBlock $height={180} />
      <ContentBlock $height={240} />
      <ContentBlock $height={160} />
      {showFooter && <FooterSkeleton />}
    </Wrapper>
  );
};

export default PageSkeleton;
