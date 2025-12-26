import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DynamicComponents from './DynamicComponents';
import BlogKnowledgeChest from '../components/BlogComponent/BlogKnowledgeChest';
import { fetchPageBySlug } from '../store/slices/pageSlice';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { resourceCategoriesAPI } from '../services/contentService';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const CategoryListingPage = ({ categorySlug }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get('subcategory');

  const [subcategories, setSubcategories] = useState([]);

  const { data: globalData, loading: globalLoading } = useSelector(
    (state) => state.global
  );
  const pageDataFromStore = useSelector((state) => state.page?.pageData);
  const pageLoading = useSelector((state) => state.page?.pageLoading);
  const pageError = useSelector((state) => state.page?.pageError);

  // Use categorySlug prop (passed from App.js route)
  const actualCategorySlug = categorySlug;

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  const fetchCategoryData = useCallback(async () => {
    try {
      // Fetch page via Redux
      dispatch(fetchPageBySlug(actualCategorySlug));

      // Fetch subcategories for filter buttons - fetch them separately filtered by category
      try {
        const subcategoriesData = await resourceCategoriesAPI.getSubCategoriesByCategorySlug(
          actualCategorySlug
        );
        setSubcategories(subcategoriesData || []);
      } catch (subcatError) {
        // If fetching subcategories by category fails, try fetching all subcategories
        // This is a fallback in case the relation structure is different
        console.warn('Could not fetch subcategories by category, trying all subcategories:', subcatError);
        try {
          const allSubcategories = await resourceCategoriesAPI.getSubCategories();
          setSubcategories(allSubcategories || []);
        } catch (fallbackError) {
          console.error('Error fetching subcategories:', fallbackError);
          setSubcategories([]);
        }
      }
    } catch (err) {
      console.error('Error fetching category data:', err);
    }
  }, [actualCategorySlug, dispatch]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  const handleSubcategoryFilter = (subcategorySlug) => {
    if (subcategorySlug === selectedSubcategory) {
      setSearchParams({}); // Remove filter
    } else {
      setSearchParams({ subcategory: subcategorySlug });
    }
  };

  if (pageLoading || globalLoading) {
    return (
      <PageWrapper>
        <Header darkText={true} />
        <LoadingSpinner />
        <Footer />
      </PageWrapper>
    );
  }

  // Check if page exists (404 error means page doesn't exist)
  const pageExists = pageDataFromStore && !pageError;
  const is404Error = pageError?.status === 404;

  return (
    <PageWrapper>
      <Header darkText={true} />

      {/* If page exists in Strapi, render it via DynamicComponents */}
      {pageExists && (
        <DynamicComponents
          pageData={pageDataFromStore}
          pageLoading={pageLoading}
          showFooter={false}
          showHeader={false}
        />
      )}

      {/* If page doesn't exist, render BlogKnowledgeChest directly */}
      {/* BlogKnowledgeChest will automatically detect category from URL and filter resources */}
      {(!pageExists || is404Error) && (
        <BlogKnowledgeChest data={null} loading={false} />
      )}

      {/* Subcategory Filter Buttons */}
      {subcategories.length > 0 && (
        <SubcategoryFiltersContainer>
          <div className='containerWrapper'>
            <SubcategoryFilters>
              <FilterButton
                className={!selectedSubcategory ? 'active' : ''}
                onClick={() => handleSubcategoryFilter(null)}
              >
                All
              </FilterButton>
              {subcategories.map((subcategory) => {
                // Handle both Strapi v4 structure and flattened structure
                const subcategorySlug =
                  subcategory.attributes?.slug || subcategory.slug;
                const subcategoryName =
                  subcategory.attributes?.name || subcategory.name;

                return (
                  <FilterButton
                    key={subcategory.id || subcategory.documentId}
                    className={
                      selectedSubcategory === subcategorySlug ? 'active' : ''
                    }
                    onClick={() => handleSubcategoryFilter(subcategorySlug)}
                  >
                    {subcategoryName}
                  </FilterButton>
                );
              })}
            </SubcategoryFilters>
          </div>
        </SubcategoryFiltersContainer>
      )}

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
`;

const SubcategoryFiltersContainer = styled.section`
  padding: 40px 0;
  background: #f8f9fa;
`;

const SubcategoryFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button`
  padding: 10px 24px;
  border-radius: 24px;
  border: 1px solid #e9e9e9;
  background: white;
  color: #36454f;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #36454f;
    background: #f8f9fa;
  }

  &.active {
    background: #36454f;
    color: white;
    border-color: #36454f;
  }
`;

export default CategoryListingPage;
