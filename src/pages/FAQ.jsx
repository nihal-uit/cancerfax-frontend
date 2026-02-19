import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DynamicComponents from './DynamicComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGlobalData } from '../store/slices/globalSlice';
import { fetchPageBySlug, selectPageBySlug } from '../store/slices/pageSlice';

const FAQ = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data: globalData, loading: globalLoading } = useSelector(state => state.global);
  const { pageData, pageLoading } = useSelector((state) => selectPageBySlug(state, 'faq'));

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
    if (!pageData && !pageLoading) dispatch(fetchPageBySlug("faq"));
  }, [dispatch, pageData, pageLoading]);

  return (
    <DynamicComponents pageData={pageData} pageLoading={pageLoading} />
  );
};

export default FAQ;

