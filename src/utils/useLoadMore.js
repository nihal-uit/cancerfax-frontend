import { useState, useEffect } from "react";

export function useLoadMore(items, initial = 6, step = 3) {
  const [visibleCount, setVisibleCount] = useState(initial);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = visibleCount < items.length;
  const visibleItems = items.slice(0, visibleCount);

  const loadMore = () => {
    if (!hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + step);
      setIsLoadingMore(false);
    }, 400); // simulated delay for smooth animation
  };

  return {
    visibleItems,
    visibleCount,
    loadMore,
    hasMore,
    isLoadingMore,
  };
}
