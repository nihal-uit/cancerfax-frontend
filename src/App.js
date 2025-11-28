import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HospitalListing from './pages/HospitalListing';
import HospitalDetails from './pages/HospitalDetails';
import DoctorsListing from './pages/DoctorsListing';
import DoctorsDetails from './pages/DoctorsDetails';
import DrugsListing from './pages/DrugsListing';
import DrugsDetails from './pages/DrugsDetails';
import BlogListing from './pages/BlogListing';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import DynamicPage from './pages/DynamicPage';
import ThankYou from './pages/ThankYou';
import TreatmentPage from './pages/TreatmentPage';
import AboutUsPage from './pages/AboutUsPage';
import SurvivorStoriesPage from './pages/SurvivorStoriesPage';
import TreatmentDetailPage from './pages/TreatmentDetailPage';
import NotFound from './pages/NotFound';
import './App.scss';
import ClinicalListPage from './pages/ClinicalList';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Reserved routes - must come before dynamic route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/hospitals" element={<HospitalListing />} />
        <Route path="/hospitaldetails" element={<HospitalDetails />} />
        <Route path="/doctors" element={<DoctorsListing />} />
        <Route path="/doctorsdetails" element={<DoctorsDetails />} />
        <Route path="/drugs" element={<DrugsListing />} />
        <Route path="/drugsDetails" element={<DrugsDetails />} />
        <Route path="/resources" element={<BlogListing />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/treatments" element={<TreatmentPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path='/treatmentdetails' element={<TreatmentDetailPage />} />
        <Route path="/survivor-stories" element={<SurvivorStoriesPage />} />
        <Route path='/clinical-list' element={<ClinicalListPage />} />

        {/* Detail Pages with ID */}
        <Route path="/resources/:id" element={<BlogDetails />} />
        
        {/* Dynamic route for all Strapi pages (must come before 404) */}
        <Route path="/:slug" element={<DynamicPage />} />
        <Route path="/404" element={<ThankYou />} />


        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
