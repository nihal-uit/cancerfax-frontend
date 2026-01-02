import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DynamicComponents from './DynamicComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug } from '../store/slices/pageSlice';

const FAQ = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data: globalData, loading: globalLoading } = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector(state => state.page);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!globalData && !globalLoading) {
      dispatch(fetchGlobalData());
    }
  }, [globalData, globalLoading, dispatch]);

  useEffect(() => {
    dispatch(fetchPageBySlug("faq"));
  }, [dispatch]);

  return (
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} />
  );
};

export default FAQ;

