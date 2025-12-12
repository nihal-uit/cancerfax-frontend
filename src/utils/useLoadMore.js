import { useState, useEffect, useCallback, useRef } from "react";

export function useLoadMore(items, initial = 6, step = 3) {
  const [visibleCount, setVisibleCount] = useState(initial);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsRef = useRef(items);
  const prevItemsRef = useRef(items);
  const timeoutRef = useRef(null);
  const isLoadingMoreRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    itemsRef.current = items;
    isLoadingMoreRef.current = isLoadingMore;
  }, [items, isLoadingMore]);

  const hasMore = visibleCount < items.length;
  const visibleItems = items.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    // Prevent multiple simultaneous loads using ref for current value
    if (isLoadingMoreRef.current) return;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setIsLoadingMore(true);
    isLoadingMoreRef.current = true;
    
    // Use setTimeout to allow state update and smooth animation
    timeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) => {
        const currentItems = itemsRef.current;
        if (prev >= currentItems.length) {
          setIsLoadingMore(false);
          isLoadingMoreRef.current = false;
          return prev;
        }
        const newCount = prev + step;
        const finalCount = newCount > currentItems.length ? currentItems.length : newCount;
        setIsLoadingMore(false);
        isLoadingMoreRef.current = false;
        return finalCount;
      });
    }, 400); // simulated delay for smooth animation
  }, [step]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Reset visibleCount only when items array is completely replaced (new dataset)
  // Check by comparing first item ID - if it changes, it's a new dataset
  useEffect(() => {
    const prevFirstId = prevItemsRef.current[0]?.id;
    const currentFirstId = items[0]?.id;
    const prevLength = prevItemsRef.current.length;
    const currentLength = items.length;
    
    // Only reset if:
    // 1. Items array reference changed AND
    // 2. First item ID is different (indicating new dataset, not appended items)
    const isNewDataset = 
      prevItemsRef.current !== items &&
      prevFirstId !== undefined &&
      currentFirstId !== undefined &&
      prevFirstId !== currentFirstId;
    
    // Also reset if going from empty to non-empty or vice versa
    const isEmptyToNonEmpty = prevLength === 0 && currentLength > 0;
    const isNonEmptyToEmpty = prevLength > 0 && currentLength === 0;
    
    if (isNewDataset || isEmptyToNonEmpty || isNonEmptyToEmpty) {
      setVisibleCount(initial);
    }
    
    // If we're currently showing all items and more items were appended,
    // automatically reveal the newly fetched items so the user doesn't need
    // a second click.
    const firstItemUnchanged = prevFirstId !== undefined && prevFirstId === currentFirstId;
    const itemsAppended = firstItemUnchanged && currentLength > prevLength;

    if (itemsAppended && visibleCount >= prevLength) {
      // Automatically reveal newly fetched items when we've already shown everything before.
      const additional = currentLength - prevLength;
      setVisibleCount((prev) => {
        const target = prev + additional;
        return target > currentLength ? currentLength : target;
      });
    }
    
    prevItemsRef.current = items;
  }, [items, initial, visibleCount]);

  return {
    visibleItems,
    visibleCount,
    loadMore,
    hasMore,
    isLoadingMore,
  };
}
