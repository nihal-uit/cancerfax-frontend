import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HospitalListing from "./pages/HospitalListing";
import HospitalDetails from "./pages/HospitalDetails";
import DoctorsListing from "./pages/DoctorsListing";
import DoctorsDetails from "./pages/DoctorsDetails";
import DrugsListing from "./pages/DrugsListing";
import DrugsDetails from "./pages/DrugsDetails";
import BlogListing from "./pages/BlogListing";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import DynamicPage from "./pages/DynamicPage";
import ThankYou from "./pages/ThankYou";
import TreatmentPage from "./pages/TreatmentPage";
import AboutUsPage from "./pages/AboutUsPage";
import SurvivorStoriesPage from "./pages/SurvivorStoriesPage";
import SurvivorStoriesDetailsPage from "./pages/SurvivorStoriesDetailsPage";
import DiseasePage from "./pages/DiseasePage";
import CancerTreatmentInUSA from "./pages/CancerTreatmentInUSA";
import TreatmentDetailPage from "./pages/TreatmentDetailPage";
import ClinicalListPage from "./pages/ClinicalList";
import NotFound from "./pages/NotFound";
import ClinicalOngoingPage from "./pages/ClinicalOngoing";
import TermsService from "./pages/TermsService";
import './App.scss';


function App() {
  return (
    <div className='App'>
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
        <Route path="/blogDetails" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/treatments" element={<TreatmentPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/treatmentdetails" element={<TreatmentDetailPage />} />
        <Route path="/survivor-stories" element={<SurvivorStoriesPage />} />
        <Route path="/survivor-stories-details" element={<SurvivorStoriesDetailsPage />}/>
        <Route path="/clinical-list" element={<ClinicalListPage />} />
        <Route path="/clinical-ongoing" element={<ClinicalOngoingPage />} />
        <Route path="/disease" element={<DiseasePage />} />
        <Route path="/cancer-treatment-USA" element={<CancerTreatmentInUSA />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/terms-service" element={<TermsService />} />

        {/* Detail Pages with ID */}
        <Route path="/resources/:id" element={<BlogDetails />} />

        {/* Dynamic route for all Strapi pages (must be last) */}
        {/* This will match /about-us, /any-slug, etc. */}
        <Route path="/:slug" element={<DynamicPage />} />

        {/* Catch-all 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
