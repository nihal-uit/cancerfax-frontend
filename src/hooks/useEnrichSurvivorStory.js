import { useState, useEffect } from 'react';
import { pageComponentAPI } from '@/services/contentService';

/**
 * Reusable hook for any testimonial/section data that may have survivor_story
 * without hero (featuredImage, featuredVideo, cta). If hero is missing, fetches
 * the full survivor story and returns merged data.
 *
 * Use in: dynamic-zone.testimonial-slider, treatment.testimonial-section, or any
 * component that receives section data from a parent that might not populate
 * survivor_story.hero.
 *
 * @param {object} sectionData - Section/slice data (e.g. { heading, isActive, survivor_story })
 * @returns {[object | null, boolean]} [enrichedData, isLoading]
 */
export function useEnrichSurvivorStory(sectionData) {
  const [enrichedData, setEnrichedData] = useState(sectionData ?? null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!sectionData) {
      setEnrichedData(null);
      setIsLoading(false);
      return;
    }

    const story = sectionData.survivor_story;
    if (!story) {
      setEnrichedData(sectionData);
      setIsLoading(false);
      return;
    }

    const hasHero =
      story?.hero?.featuredImage || story?.hero?.featuredVideo || story?.hero?.cta;
    if (hasHero) {
      setEnrichedData(sectionData);
      setIsLoading(false);
      return;
    }

    const documentId = story.documentId ?? story.id;
    if (!documentId) {
      setEnrichedData(sectionData);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    pageComponentAPI
      .getSurvivorStoryWithHero(documentId)
      .then((fullStory) => {
        if (cancelled) return;
        if (!fullStory) {
          setEnrichedData(sectionData);
          setIsLoading(false);
          return;
        }
        setEnrichedData({
          ...sectionData,
          survivor_story: { ...story, ...fullStory },
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setEnrichedData(sectionData);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sectionData]);

  return [enrichedData, isLoading];
}
