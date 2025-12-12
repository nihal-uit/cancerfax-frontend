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
import CancerTreatmentInUSA from "./pages/CountryTreatment";
import TreatmentDetailPage from "./pages/TherapyPage";
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
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Dynamic route for all Strapi pages (must be last) */}
        {/* This will match /about-us, /any-slug, etc. */}
        <Route path="/:slug" element={<DynamicPage />} />
        
        {/* <Route path="/hospitals" element={<HospitalListing />} />
        <Route path="/doctors" element={<DoctorsListing />} />
        <Route path="/drugs" element={<DrugsListing />} />
        <Route path="/resources" element={<BlogListing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/survivor-stories" element={<SurvivorStoriesPage />} />
        <Route path="/clinical-trials" element={<ClinicalListPage />} />
        <Route path="/clinical-ongoing" element={<ClinicalOngoingPage />} />
        <Route path="/terms-service" element={<TermsService />} /> */}

        {/* Detail Pages with ID */}
        <Route path="/resources/:id" element={<BlogDetails />} />
        <Route path="/doctors/:slug" element={<DoctorsDetails />} />
        <Route path="/hospitals/:slug" element={<HospitalDetails />} />
        <Route path="/drugs/:slug" element={<DrugsDetails />} />
        <Route path="/survivor-stories/:slug" element={<SurvivorStoriesDetailsPage />}/>
        <Route path="/treatments/:slug" element={<TreatmentPage />} />
        <Route path="/therapy/:slug" element={<TreatmentDetailPage />} />
        <Route path="/disease/:slug" element={<DiseasePage />} />
        <Route path="/country-treatment/:slug" element={<CancerTreatmentInUSA />} />



        {/* Catch-all 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
