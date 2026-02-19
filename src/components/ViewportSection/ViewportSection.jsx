import React, { useState, useEffect, useRef, Suspense } from 'react';
import styled from 'styled-components';

/**
 * Renders children only when the section is near or inside the viewport.
 * Uses IntersectionObserver to avoid mounting below-the-fold sections until needed,
 * reducing initial JS execution and DOM size.
 * Once visible, the section stays mounted (no unmount on scroll away).
 */
const ViewportSection = ({
  children,
  component: Component,
  componentProps = {},
  placeholderMinHeight = 200,
  rootMargin = '200px 0px 200px 0px',
  as: Wrapper = 'div',
  suspenseFallback = null,
}) => {
  const [isNearViewport, setIsNearViewport] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const content =
    Component != null ? (
      <Suspense fallback={suspenseFallback || <Placeholder $minHeight={placeholderMinHeight} />}>
        <Component {...componentProps} />
      </Suspense>
    ) : (
      children
    );

  return (
    <Wrapper ref={containerRef}>
      {isNearViewport ? content : <Placeholder $minHeight={placeholderMinHeight} />}
    </Wrapper>
  );
};

const Placeholder = styled.div`
  min-height: ${(p) => p.$minHeight}px;
  width: 100%;
`;

export default ViewportSection;
