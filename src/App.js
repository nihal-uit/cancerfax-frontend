import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HospitalDetails from './pages/HospitalDetails';
import DoctorsDetails from './pages/DoctorsDetails';
import DrugsDetails from './pages/DrugsDetails';
import BlogDetails from './pages/BlogDetails';
import DynamicPage from './pages/DynamicPage';
import ThankYou from './pages/ThankYou';
import TreatmentPage from './pages/TreatmentPage';
import SurvivorStoriesDetailsPage from './pages/SurvivorStoriesDetailsPage';
import DiseasePage from './pages/DiseasePage';
import CancerTreatmentInUSA from './pages/CountryTreatment';
import TherapyPage from './pages/TherapyPage';
import NotFound from './pages/NotFound';
import ClinicalTrialsDetailsPage from './pages/ClinicalTrialsDetailsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import CookieConsent from './components/CookieConsent/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <CookieConsent />
      <WhatsAppButton />
      <Routes>
        {/* Reserved routes - must come before dynamic route */}
        <Route path='/' element={<HomePage />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/cookie-policy' element={<CookiePolicyPage />} />

        {/* Resource listing pages - must come before detail routes */}
        {/* /resources and /resources/:category are handled by DynamicPage */}
        {/* These routes are handled by the dynamic routes below */}

        {/* Resource detail pages - using /resource to avoid conflicts with /resources listing routes */}
        {/* Route Pattern: /resource/:category/:subcategory?/:slug */}
        <Route
          path='/resource/:category/:subcategory/:slug'
          element={<BlogDetails />}
        />
        <Route path='/resource/:category/:slug' element={<BlogDetails />} />
        <Route path='/resource/:slug' element={<BlogDetails />} />

        {/* Other detail pages */}
        <Route path='/doctors/:slug' element={<DoctorsDetails />} />
        <Route path='/hospitals/:slug' element={<HospitalDetails />} />
        <Route path='/drugs/:slug' element={<DrugsDetails />} />
        <Route
          path='/survivor-stories/:slug'
          element={<SurvivorStoriesDetailsPage />}
        />
        <Route path='/treatments/:slug' element={<TreatmentPage />} />
        <Route path='/therapy/:slug' element={<TherapyPage />} />
        <Route path='/disease/:slug' element={<DiseasePage />} />
        <Route
          path='/country-treatment/:slug'
          element={<CancerTreatmentInUSA />}
        />
        <Route
          path='/clinical-trials/:slug'
          element={<ClinicalTrialsDetailsPage />}
        />

        {/* Dynamic route for Strapi pages with optional category and subcategory */}
        {/* Pattern: /:slug/:category?/:subcategory? */}
        {/* Examples: 
            /resources → DynamicPage (slug="resources")
            /resources/blogs → DynamicPage (slug="resources", category="blogs")
            /resources/blogs/oncology → DynamicPage (slug="resources", category="blogs", subcategory="oncology")
            /about-us → DynamicPage (slug="about-us")
        */}
        <Route path='/:slug/:category/:subcategory' element={<DynamicPage />} />
        <Route path='/:slug/:category' element={<DynamicPage />} />
        <Route path='/:slug' element={<DynamicPage />} />

        {/* Catch-all 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
