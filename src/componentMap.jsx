import React from "react";

const lazy = (loader) => React.lazy(loader);

export const componentMap = {
  // Core/simple	
  "dynamic-zone.header": lazy(() => import("@/components/Header/Header.jsx")),
  "dynamic-zone.footer": lazy(() => import("@/components/Footer/Footer.jsx")),
  "dynamic-zone.seo": lazy(() => import("@/components/SEO/SEO.jsx")),

  // Homepage
  "dynamic-zone.hero": lazy(() => import("@/components/Hero/Hero.jsx")),
  "dynamic-zone.slider-section": lazy(() => import("@/components/ClinicalTrialsShowcase/ClinicalTrialsShowcase.jsx")),
  "dynamic-zone.about": lazy(() => import("@/components/AboutSection/AboutSection.jsx")),
  "dynamic-zone.therapy-section": lazy(() => import("@/components/InnovativeCare/InnovativeCare.jsx")),
  "dynamic-zone.testimonial-slider": lazy(() => import("@/components/Testimonials/Testimonials.jsx")),
  "dynamic-zone.statistics": lazy(() => import("@/components/ClinicalTrialsAbout/ClinicalTrialsAbout.jsx")),
  "dynamic-zone.trials-section": lazy(() => import("@/components/ClinicalTrials/ClinicalTrials.jsx")),
  "dynamic-zone.get-in-touch": lazy(() => import("@/components/GetInTouch/GetInTouch.jsx")),
  "dynamic-zone.how-it-works": lazy(() => import("@/components/HowItWorks/HowItWorks.jsx")),
  "dynamic-zone.location": lazy(() => import("@/components/LocationNetwork/LocationNetwork.jsx")),
  "dynamic-zone.testimonials": lazy(() => import("@/components/VideoTestimonials/VideoTestimonials.jsx")),
  "dynamic-zone.resources": lazy(() => import("@/components/Resources/Resources.jsx")),


  // Resources
  "resource-listing.hero-section": lazy(() => import("@/components/BlogComponent/BlogHero.jsx")),
  "resource-listing.slider-section": lazy(() => import("@/components/BlogComponent/BlogSlider.jsx")),
  "resource-listing.knowledge-chest-section": lazy(() => import("@/components/BlogComponent/BlogKnowledgeChest.jsx")),
  "resource-listing.subscribe-section": lazy(() => import("@/components/BlogComponent/BlogSupport.jsx")),

  // Doctors
  "doctor-listing.hero-section": lazy(() => import("@/components/DoctorsComponent/DoctorHero.jsx")),
  "doctor-listing.slider-section": lazy(() => import("@/components/DoctorsComponent/DoctorsSlider.jsx")),
  "doctor-listing.quick-links-section": lazy(() => import("@/components/DoctorsComponent/DoctorsQuickFinds.jsx")),
  "doctor-listing.innovation-insights-section": lazy(() => import("@/components/DoctorsComponent/DoctorsInnovationInsights.jsx")),


  // Drugs
  "drug-listing.hero-section": lazy(() => import("@/components/DrugsComponent/DrugHero.jsx")),
  "drug-listing.slider-section": lazy(() => import("@/components/DrugsComponent/DrugSlider.jsx")),
  "drug-listing.knowledge-chest-section": lazy(() => import("@/components/DrugsComponent/DrugsKnowledgeChest.jsx")),
  "drug-listing.supporting-section": lazy(() => import("@/components/DrugsComponent/DrugSupport.jsx")),

  // Hospitals
  "hospital-listing.hero-section": lazy(() => import("@/components/HospitalComponents/HospitalHero.jsx")),
  "hospital-listing.slider-section": lazy(() => import("@/components/HospitalComponents/HospitalSlider.jsx")),
  "hospital-listing.quick-links-section": lazy(() => import("@/components/HospitalComponents/HospitalQuickFinds.jsx")),
  "hospital-listing.key-factors-section": lazy(() => import("@/components/HospitalComponents/HospitalKeyFactors.jsx")),
  "hospital-listing.innovation-insights-section": lazy(() => import("@/components/HospitalComponents/HospitalInnovationInsights.jsx")),
  "hospital-listing.testimonial-section": lazy(() => import("@/components/HospitalComponents/HospitalTestimonials.jsx")),


  // Treatments
  "treatment.hero-section": lazy(() => import("@/components/TreatmentComponent/Hero/TreatmentHero.jsx")),
  "treatment.slider-section": lazy(() => import("@/components/TreatmentComponent/TreatmentSlider/TreatmentSlider.jsx")),
  "treatment.how-it-works-section": lazy(() => import("@/components/TreatmentComponent/HowItWorks/HowItWorks.jsx")),
  "treatment.why-section": lazy(() => import("@/components/TreatmentComponent/WhyOpt/WhyOpt.jsx")),
  "treatment.evidance-section": lazy(() => import("@/components/TreatmentComponent/Evidance/Evidance.jsx")),
  "treatment.journey-section": lazy(() => import("@/components/TreatmentComponent/Journey/Journey.jsx")),
  "treatment.is-for-you-section": lazy(() => import("@/components/TreatmentComponent/IsForYou/IsForYou.jsx")),
  "treatment.testimonial-section": lazy(() => import("@/components/TreatmentComponent/Testimonials/Testimonials.jsx")),
  "treatment.treatment-different-section": lazy(() => import("@/components/TreatmentComponent/InnovativeCare/InnovativeCare.jsx")),
  "treatment.get-in-touch": lazy(() => import("@/components/TreatmentComponent/GetInTouch/GetInTouch.jsx")),
  "treatment.treatment-risk-section": lazy(() => import("@/components/TreatmentComponent/TreatmentRisk/TreatmentRisk.jsx")),
  "treatment.treatment-cost-section": lazy(() => import("@/components/TreatmentComponent/TreatmentCost/TreatmentCost.jsx")),
  "treatment.treatment-we-do-therapy": lazy(() => import("@/components/TreatmentComponent/WhatWeDo/WhatWeDo.jsx")),
  "treatment.faq-section": lazy(() => import("@/components/TreatmentComponent/FAQ/FAQ.jsx")),
  "treatment.resources-section": lazy(() => import("@/components/TreatmentComponent/Resources/Resources.jsx")),

  // Survivor Stories
  "survivor-story-listing.hero-section": lazy(() => import("@/components/SurvivorStoriesComponent/Hero/SurvivorStoriesHero.jsx")),
  "survivor-story-listing.slider-section": lazy(() => import("@/components/SurvivorStoriesComponent/OurStory/OurStory.jsx")),
  "survivor-story-listing.insights-section": lazy(() => import("@/components/reusable/SupportingLifeComponent.jsx")),

  // About
  "about.hero-section": lazy(() => import("@/components/aboutComponent/Hero/Hero.jsx")),

  "about.slider-section": lazy(() => import("@/components/aboutComponent/AboutSlider.jsx")),
  "about.certification-section": lazy(() => import("@/components/aboutComponent/AboutCerticication.jsx")),

  // "about.slider-section": lazy(() => import("@/components/aboutComponent/AboutHeroBanner/AboutHeroBanner.jsx")),

  "about.vision-section": lazy(() => import("@/components/aboutComponent/MissionVision/MissionVision.jsx")),
  "about.our-story-section": lazy(() => import("@/components/aboutComponent/OurStory/OurStory.jsx")),
  "about.mile-stone-section": lazy(() => import("@/components/aboutComponent/OurJourney/OurJourney.jsx")),
  "about.our-value-section": lazy(() => import("@/components/aboutComponent/OurValues/OurValues.jsx")),
  "about.what-we-do-section": lazy(() => import("@/components/aboutComponent/WhatWeDo/WhatWeDo.jsx")),
  "about.get-in-touch-section": lazy(() => import("@/components/aboutComponent/GetInTouch/GetInTouch.jsx")),
  "about.galary-section": lazy(() => import("@/components/reusable/InnovativeGalleryMarqueComponent.jsx")),
  "about.testimonial-section": lazy(() => import("@/components/reusable/VideoTestimonialComponent.jsx")),
  "about.resources-section": lazy(() => import("@/components/aboutComponent/Resources/Resources.jsx")),

  // FAQ
  "faq.hero-section": lazy(() => import("@/components/FAQHero/FAQHero.jsx")),
  "faq.faq-section": lazy(() => import("@/components/FAQSection/FAQSection.jsx")),

  // Clinical Trials
  "clinical-trial-listing.hero-section": lazy(() => import("@/components/ClinicalComponents/ClinicalHero.jsx")),
  "clinical-trial-listing.slider-section": lazy(() => import("@/components/TreatmentComponent/TreatmentSlider/TreatmentSlider.jsx")),
  "clinical-trial-listing.listing-section": lazy(() => import("@/components/ClinicalComponents/ClinicalFeature.jsx")),
  "clinical-trial-listing.understanding-section": lazy(() => import("@/components/ClinicalComponents/ClinicalHowWork.jsx")),
  "clinical-trial-listing.process-section": lazy(() => import("@/components/ClinicalComponents/ClinicalProcess.jsx")),
  "clinical-trial-listing.get-in-touch": lazy(() => import("@/components/GetInTouch/GetInTouch.jsx")),
  "clinical-trial-listing.trial-requirement-section": lazy(() => import("@/components/ClinicalComponents/ClinicalCenter.jsx")),
  "clinical-trial-listing.collaboration-section": lazy(() => import("@/components/ClinicalComponents/ClinicalPartner.jsx")),
  "clinical-trial-listing.phases-section": lazy(() => import("@/components/ClinicalComponents/ClinicalPhases.jsx")),
  "clinical-trial-listing.benefits-section": lazy(() => import("@/components/ClinicalComponents/ClinicalHelp.jsx")),
  "clinical-trial-listing.pricing-section": lazy(() => import("@/components/ClinicalComponents/ClinicalPlan.jsx")),
  "clinical-trial-listing.insights-section": lazy(() => import("@/components/TreatmentComponent/Resources/Resources.jsx")),

  // Ongoing Trials
  "on-going-clinical-trial-listing.hero-section": lazy(() => import("@/components/ClinicalComponents/OngoingClinicalHero.jsx")),
  // "on-going-clinical-trial-listing.listing-section": lazy(() => import("@/components/ClinicalComponents/OngoingQuickFinds.jsx")),
  "on-going-clinical-trial-listing.slider-section": lazy(() => import("@/components/ClinicalComponents/ClinicalSafety.jsx")),
  "on-going-clinical-trial-listing.expert-section": lazy(() => import("@/components/ClinicalComponents/ClinicalGuidance.jsx")),

  // Contact
  "contact.contact-form-section": lazy(() => import("@/components/ContactComponent/ContactHero.jsx")),
  "contact.partners-section": lazy(() => import("@/components/PartnerHospitals/PartnerHospitals.jsx")),
  "contact.contact-info-section": lazy(() => import("@/components/DedicatedSupport/DedicatedSupport.jsx")),
  "contact.location": lazy(() => import("@/components/LocationNetwork/LocationNetwork.jsx")),
  "contact.testimonial-section": lazy(() => import("@/components/ContactTestimonialWrapper/ContactTestimonialWrapper.jsx")),
  
  // Reusable
  "dynamic-zone.supporting-life-component": lazy(() => import("@/components/reusable/SupportingLifeComponent.jsx")),
};
