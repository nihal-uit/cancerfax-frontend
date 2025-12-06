import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPageBySlug } from '../store/slices/pageSlice';
import DynamicComponents from './DynamicComponents';

const HospitalListing = () => {
  const dispatch = useDispatch();
  const { pageData, pageLoading } = useSelector(state => state.page);

  useEffect(() => {
    dispatch(fetchPageBySlug("hospital-listing"));
  }, [dispatch]);

  return (
      <DynamicComponents pageData={pageData} pageLoading={pageLoading} darkText={true} />
  );
};

export default HospitalListing;
