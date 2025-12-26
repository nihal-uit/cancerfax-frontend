import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import BlogGrid from './BlogGrid';
import ScrollAnimationComponent from '../ScrollAnimation/ScrollAnimationComponent';
import { fetchBlogs } from '../../store/slices/resourcesSlice';
import {
  fetchResourceCategories,
  fetchResourceSubCategories,
} from '../../store/slices/resourcesCategorySlice';

const BLOGS_PAGE_SIZE = 6;

const BlogKnowledgeChest = ({ data, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, blogsLoading, blogsHasMore } = useSelector(
    (state) => state.resources
  );
  const { categories, subcategories: allSubcategories } = useSelector(
    (state) => state.resourceCategory
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('');
  const [selectedFilterSubcategory, setSelectedFilterSubcategory] =
    useState('');
  const [selectedSorting, setSelectedSorting] = useState('');

  // Get category and subcategory from URL params (from DynamicPage route: /:slug/:category?/:subcategory?)
  // Also check query params for subcategory (backward compatibility)
  const { category: categoryParam, subcategory: subcategoryParam } =
    useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const selectedSubcategory =
    subcategoryParam || searchParams.get('subcategory');

  // Extract category slug from URL pathname (for legacy routes or when not using DynamicPage params)
  // Pattern: /resources/:category
  const extractCategoryFromPath = (pathname) => {
    if (!pathname.startsWith('/resources/')) return '';
    if (pathname === '/resources') return '';

    // Check if it's a detail page (has 2+ segments after /resources/)
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 3 && segments[0] === 'resources') {
      return ''; // Detail page, not category page
    }

    // Extract category from /resources/:category
    if (segments.length === 2 && segments[0] === 'resources') {
      return segments[1];
    }

    return '';
  };

  // Get category slug with priority:
  // 1. URL params from DynamicPage (/:slug/:category)
  // 2. Pathname extraction (legacy /resources/:category)
  // 3. Component data filter_category
  const categoryFromUrlParams = categoryParam || '';
  const categoryFromPathname = extractCategoryFromPath(location.pathname);
  const categoryFromData =
    data?.filter_category?.data?.attributes?.slug ||
    data?.filter_category?.attributes?.slug ||
    data?.filter_category?.slug ||
    '';

  // Use URL params first, then pathname, then component data
  const categorySlug =
    categoryFromUrlParams || categoryFromPathname || categoryFromData;

  // Fetch categories and subcategories from Redux on component mount
  useEffect(() => {
    dispatch(fetchResourceCategories());
    dispatch(fetchResourceSubCategories());
  }, [dispatch]);

  // Sync filter state with URL params when URL changes (vice versa)
  useEffect(() => {
    // Update filter state from URL params
    if (categorySlug && categorySlug !== selectedFilterCategory) {
      setSelectedFilterCategory(categorySlug);
    } else if (!categorySlug && selectedFilterCategory) {
      setSelectedFilterCategory('');
    }

    if (
      selectedSubcategory &&
      selectedSubcategory !== selectedFilterSubcategory
    ) {
      setSelectedFilterSubcategory(selectedSubcategory);
    } else if (!selectedSubcategory && selectedFilterSubcategory) {
      setSelectedFilterSubcategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, selectedSubcategory]);

  // Determine which category/subcategory to use (URL params take priority, then filter state)
  const activeCategorySlug = categorySlug || selectedFilterCategory || '';
  const activeSubcategorySlug =
    selectedSubcategory || selectedFilterSubcategory || '';

  // Fetch blogs with category and subcategory filters
  useEffect(() => {
    dispatch(
      fetchBlogs({
        limit: BLOGS_PAGE_SIZE,
        start: 0,
        categorySlug: activeCategorySlug,
        subcategorySlug: activeSubcategorySlug,
        sorting: selectedSorting || '',
      })
    );
  }, [dispatch, activeCategorySlug, activeSubcategorySlug, selectedSorting]);

  const sortingOptions = [
    { id: 1, name: 'Name A-Z', value: 'a-z' },
    { id: 2, name: 'Name Z-A', value: 'z-a' },
    { id: 3, name: 'Published Date Newest', value: 'published-date-newest' },
    { id: 4, name: 'Published Date Oldest', value: 'published-date-oldest' },
  ];

  const handleSearch = () => {
    dispatch(
      fetchBlogs({
        limit: BLOGS_PAGE_SIZE,
        start: 0,
        query: searchTerm,
        categorySlug: activeCategorySlug,
        subcategorySlug: activeSubcategorySlug,
        sorting: selectedSorting || '',
      })
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSelectedSorting(newSorting);
    dispatch(
      fetchBlogs({
        limit: BLOGS_PAGE_SIZE,
        start: 0,
        query: searchTerm,
        categorySlug: activeCategorySlug,
        subcategorySlug: activeSubcategorySlug,
        sorting: newSorting || '',
      })
    );
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;

    // Check if it's a category or subcategory
    const category = categories.find((c) => c.slug === value);
    const subcategory = allSubcategories.find((s) => s.slug === value);

    let newCategory = '';
    let newSubcategory = '';

    if (!value) {
      // Cleared selection - navigate to base resources page
      newCategory = '';
      newSubcategory = '';
      setSelectedFilterCategory('');
      setSelectedFilterSubcategory('');
    } else if (category) {
      // Selected a category - set category, clear subcategory
      newCategory = value;
      newSubcategory = '';
      setSelectedFilterCategory(value);
      setSelectedFilterSubcategory('');
    } else if (subcategory) {
      // Selected a subcategory - keep current category or use the one from URL
      newCategory = selectedFilterCategory || categorySlug || '';
      newSubcategory = value;
      if (!selectedFilterCategory && !categorySlug) {
        // If no category selected, we need to find which category this subcategory belongs to
        // For now, just set subcategory and let the user select category
        setSelectedFilterSubcategory(value);
        // Navigate with query param for subcategory if no category
        navigate('/resources', { replace: true });
        return;
      }
      setSelectedFilterCategory(newCategory);
      setSelectedFilterSubcategory(value);
    }

    // Update URL based on new filter values
    // Check if we're on a resources page (slug === 'resources')
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const isResourcesPage = pathSegments[0] === 'resources';

    if (isResourcesPage) {
      // Build new URL path
      let newPath = '/resources';
      if (newCategory) {
        newPath += `/${newCategory}`;
        if (newSubcategory) {
          newPath += `/${newSubcategory}`;
        }
      }
      navigate(newPath, { replace: true });
    } else {
      // We're on a dynamic page, need to check the slug
      const currentSlug = pathSegments[0] || 'resources';
      let newPath = `/${currentSlug}`;
      if (newCategory) {
        newPath += `/${newCategory}`;
        if (newSubcategory) {
          newPath += `/${newSubcategory}`;
        }
      }
      navigate(newPath, { replace: true });
    }
  };

  // Get display text for filter dropdown
  const getFilterDisplayText = () => {
    if (selectedFilterCategory && selectedFilterSubcategory) {
      const categoryName =
        categories.find((c) => c.slug === selectedFilterCategory)?.name || '';
      const subcategoryName =
        allSubcategories.find((s) => s.slug === selectedFilterSubcategory)
          ?.name || '';
      return `${categoryName} + ${subcategoryName}`;
    }
    if (selectedFilterCategory) {
      return (
        categories.find((c) => c.slug === selectedFilterCategory)?.name ||
        'FilterBy'
      );
    }
    if (selectedFilterSubcategory) {
      return (
        allSubcategories.find((s) => s.slug === selectedFilterSubcategory)
          ?.name || 'FilterBy'
      );
    }
    return 'FilterBy';
  };

  // Get the current selected value for the dropdown (shows the last selected item)
  const getFilterValue = () => {
    if (selectedFilterSubcategory) return selectedFilterSubcategory;
    if (selectedFilterCategory) return selectedFilterCategory;
    return '';
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const content = data
    ? {
        label: data?.heading || '',
        title: data?.subHeading ?? '',
        description: data?.description_text || '',
        resources: data?.resources,
      }
    : {};

  if (loading) {
    return null;
  }

  return (
    <section className='quickFinds_sec py-120'>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <TopSection>
            <LeftContent className='commContent_wrap'>
              <Label className='contentLabel text_theme_dark'>
                {content.label}
              </Label>
              <Title className='title-3 text_theme_dark'>{content.title}</Title>
            </LeftContent>

            <RightContent className='commContent_wrap'>
              <Description className='text-16'>
                {content.description}
              </Description>
            </RightContent>
          </TopSection>

          <FiltersContainer>
            <SearchInput>
              <Input
                type='text'
                placeholder='Search with keywords'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <SearchIcon onClick={handleSearch}>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.35-4.35' />
                </svg>
              </SearchIcon>
            </SearchInput>

            <SelectWrapper>
              <Select value={getFilterValue()} onChange={handleFilterChange}>
                <option value=''>FilterBy</option>
                {categories.length > 0 && (
                  <optgroup label='Categories'>
                    {categories.map((category) => (
                      <option
                        key={`category-${category.id || category.documentId}`}
                        value={category.slug}
                      >
                        {category.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                {allSubcategories.length > 0 && (
                  <optgroup label='Subcategories'>
                    {allSubcategories.map((subcategory) => (
                      <option
                        key={`subcategory-${
                          subcategory.id || subcategory.documentId
                        }`}
                        value={subcategory.slug}
                      >
                        {subcategory.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </Select>
              <SelectDisplay
                className={
                  !selectedFilterCategory && !selectedFilterSubcategory
                    ? 'placeholder'
                    : ''
                }
              >
                {getFilterDisplayText()}
              </SelectDisplay>
              <DropdownIcon>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='12'
                  viewBox='0 0 18 12'
                  fill='none'
                >
                  <path
                    d='M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z'
                    fill='#36454F'
                  />
                </svg>
              </DropdownIcon>
            </SelectWrapper>

            <SelectWrapper>
              <Select value={selectedSorting} onChange={handleSortingChange}>
                <option value=''>Sort by</option>
                {sortingOptions.map((sorting) => (
                  <option key={sorting.id} value={sorting.value}>
                    {sorting.name}
                  </option>
                ))}
              </Select>
              <SelectDisplay className={!selectedSorting ? 'placeholder' : ''}>
                {selectedSorting
                  ? sortingOptions.find((s) => s.value === selectedSorting)
                      ?.name || 'Sort by'
                  : 'Sort by'}
              </SelectDisplay>
              <DropdownIcon>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='6 9 12 15 18 9' />
                </svg>
              </DropdownIcon>
            </SelectWrapper>
          </FiltersContainer>
        </ScrollAnimationComponent>

        {!loading && !blogsLoading && (!blogs || blogs.length === 0) && (
          <NoResultsMessage>
            No blogs found with the selected filters
          </NoResultsMessage>
        )}

        <BlogGrid
          data={blogs}
          loading={loading || (blogsLoading && blogs.length === 0)}
        />

        {blogs?.length > 0 && blogsHasMore && (
          <LoadMoreWrapper>
            <LoadMoreButton
              type='button'
              onClick={() =>
                dispatch(
                  fetchBlogs({
                    limit: BLOGS_PAGE_SIZE,
                    start: blogs.length,
                    query: searchTerm,
                    categorySlug: activeCategorySlug,
                    subcategorySlug: activeSubcategorySlug,
                    sorting: selectedSorting || '',
                  })
                )
              }
              disabled={blogsLoading}
            >
              {blogsLoading ? 'Loading...' : 'Load More'}
            </LoadMoreButton>
          </LoadMoreWrapper>
        )}
      </div>
    </section>
  );
};

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    gap: 32px;
    margin-bottom: 40px;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 0 0 500px;
  @media (max-width: 1024px) {
    flex: 1 1 auto;
  }
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Label = styled.div``;

const Title = styled.h3`
  max-width: 500px;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 500px;
`;

const Description = styled.p``;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: 680px repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454f;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  background: transparent;

  &::placeholder {
    color: rgba(54, 69, 79, 0.5);
  }

  &.placeholder {
    color: rgba(54, 69, 79, 0.5);
    background-color: transparent;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgba(54, 69, 79, 1);
  font-size: 18px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 17px 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: none;
    border: 1px solid #36454f;
  }
  &:focus {
    box-shadow: none;
    border: 1px solid #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(54, 69, 79, 0.5);
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 17px 20px;
  border-radius: 50px;
  z-index: 2;

  option {
    font-family: 'Be Vietnam Pro', sans-serif;
    padding: 12px;
    background: white;
    color: #36454f;
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
  }
`;

const SelectDisplay = styled.div`
  flex: 1;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #36454f;
  pointer-events: none;
  z-index: 1;

  &.placeholder {
    color: rgba(54, 69, 79, 0.5);
    background-color: transparent;
  }
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  color: rgba(54, 69, 79, 0.5);
  font-size: 18px;
  pointer-events: none;
  transition: transform 0.3s ease;
  z-index: 1;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const LoadMoreButton = styled.button`
  padding: 14px 36px;
  border-radius: 999px;
  border: 1px solid #36454f;
  background: transparent;
  color: #36454f;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #36454f;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #36454f;

  @media (max-width: 768px) {
    padding: 40px 20px;
    font-size: 16px;
  }
`;

export default BlogKnowledgeChest;
