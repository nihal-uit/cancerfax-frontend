import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';

const SECTIONS = [
  { id: "about", label: "About", icon: "../images/disease-icon-1.svg" },
  { id: "overview", label: "Overview", icon: "../images/disease-icon-2.svg" },
  { id: "causes", label: "Causes", icon: "../images/disease-icon-3.svg" },
  { id: "symptoms", label: "Symptoms", icon: "../images/disease-icon-4.svg" },
  { id: "diagnosis", label: "Diagnosis", icon: "../images/disease-icon-5.svg" },
  { id: "treatmentManagement", label: "Treatment & Management", icon: "../images/disease-icon-6.svg" },
  { id: "prevention", label: "Prevention", icon: "../images/disease-icon-7.svg" },
  { id: "complications", label: "Complications", icon: "../images/disease-icon-8.svg" },
  { id: "prognosis", label: "Prognosis", icon: "../images/disease-icon-9.svg" },
  { id: "livingWithDisease", label: "Living with Disease", icon: "../images/disease-icon-10.svg" },
  { id: "lifeStyleNutrition", label: "Life style & Nutrition", icon: "../images/disease-icon-11.svg" },
  { id: "researchAdvancements", label: "Research & Advancements", icon: "../images/disease-icon-12.svg" },
  // { id: "supportResources", label: "Support & Resources", icon: "../images/disease-icon-13.svg" },
  // { id: "clinicalTrials", label: "Clinical Trials", icon: "../images/disease-icon-14.svg" },
  // { id: "healthcareInsurance", label: "Healthcare & Insurance", icon: "../images/disease-icon-15.svg" },
];

const DiseaseInfo = () => {

  const [activeId, setActiveId] = useState("about");
  const sectionRefs = useRef({});

  // Scroll spy – highlight active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // center-ish
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className='hospitalDetailsInfo_sec py-120'>
      <div className="containerWrapper">
        <div className="hospitalDetailsInfo_wrap">
          <aside className="sidebar disease-sidebar">
            <ul>
              {SECTIONS.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeId ? "active" : ""}
                  onClick={() => handleClick(item.id)}
                >
                  <img src={item.icon} alt={item.label} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info">
            {/* ABOUT */}
            <div
              id="about"
              ref={(el) => (sectionRefs.current["about"] = el)}
              className="section"
            >

             <div className="commContent_wrap content-gap-24">
                <h3>About The Disease</h3>
                <div className="details-img">
                  <img
                    src="../images/about-disease-img.jpg"
                    alt="Hospital"
                  />
                </div>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
             </div>
            </div>

            {/* OverView */}
            <div
              id="overview"
              ref={(el) => (sectionRefs.current["overview"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Overview</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Causes */}
            <div
              id="causes"
              ref={(el) => (sectionRefs.current["causes"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Causes</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Symptoms */}
            <div
              id="symptoms"
              ref={(el) => (sectionRefs.current["symptoms"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Symptoms</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Diagnosis */}
            <div
              id="diagnosis"
              ref={(el) => (sectionRefs.current["diagnosis"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Diagnosis</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Treatment & Management */}
            <div
              id="treatmentManagement"
              ref={(el) => (sectionRefs.current["treatmentManagement"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Treatment & Management</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Prevention */}
            <div
              id="prevention"
              ref={(el) => (sectionRefs.current["prevention"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Prevention</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Complications */}
            <div
              id="complications"
              ref={(el) => (sectionRefs.current["complications"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Complications</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Prognosis */}
            <div
              id="prognosis"
              ref={(el) => (sectionRefs.current["prognosis"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Prognosis</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Living with Disease */}
            <div
              id="livingWithDisease"
              ref={(el) => (sectionRefs.current["livingWithDisease"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Living with Disease</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Life style & Nutrition */}
            <div
              id="lifeStyleNutrition"
              ref={(el) => (sectionRefs.current["lifeStyleNutrition"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Life style & Nutrition</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Research & Advancements */}
            <div
              id="researchAdvancements"
              ref={(el) => (sectionRefs.current["researchAdvancements"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Research & Advancements</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div>

            {/* Support & Resources */}
            {/* <div
              id="supportResources"
              ref={(el) => (sectionRefs.current["supportResources"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Support & Resources</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div> */}

            {/* Clinical Trials */}
            {/* <div
              id="clinicalTrials"
              ref={(el) => (sectionRefs.current["clinicalTrials"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Clinical Trials</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div> */}

            {/* Healthcare & Insurance */}
            {/* <div
              id="healthcareInsurance"
              ref={(el) => (sectionRefs.current["healthcareInsurance"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Healthcare & Insurance</h3>
                <p>Liver cancer is the growth and spread of unhealthy cells in the liver. Cancer that starts in the liver is called primary liver cancer. Cancer that spreads to the liver from another organ is called metastatic liver cancer.  Hepatocellular carcinoma (HCC) is the most common type of primary liver cancer.</p>
                <h5>Liver</h5>
                <p>
                The liver is made up of cells called hepatocytes. It also has other types of cells, including cells that line its blood vessels and cells that line small tubes in the liver called bile ducts. The bile ducts carry bile from the liver to the gallbladder or directly to the intestines.                
                </p>
                <p>
                The liver is the largest glandular organ in the body and performs various critical functions to keep the body free of toxins and harmful substances. It’s located in the right upper quadrant of the abdomen, right below the ribs. The liver is responsible for producing bile, which is a substance that helps you digest fats, vitamins, and other nutrients.                
                </p>
                <p>
                  This vital organ also stores nutrients such as glucose so that you remain nourished at times when you’re not eating. It also breaks down medications and toxins. When cancer develops in the liver, it destroys liver cells and interferes with the ability of the liver to function normally.
                </p>
                <p>Liver cancer is generally classified as primary or secondary. Primary liver cancer begins in the cells of the liver. Secondary liver cancer develops when cancer cells from another organ spread to the liver. Unlike other cells in the body, cancer cells can break away from the primary site, or where the cancer began. The cells travel to other areas of the body through the bloodstream or the lymphatic system. Cancer cells eventually collect in another body organ and begin to grow there.</p>
                <p>You cannot live without your liver. It has many important functions:</p>
                <p>- Beijing Main Campus (Chaoyang District): ~1,000 beds</p>
                <p>- Hedian Branch (Langfang, Hebei Province): ~500 beds</p>
                <p>The Langfang campus (opened in 2019) significantly expanded capacity to alleviate patient overflow and support advanced treatment facilities, including proton therapy.</p>
                <p>- Main Campus: Panjiayuan, Chaoyang District, Beijing, China</p>
                <p>- Hedian Campus: Langfang, Hebei Province (a newer branch for expanded services)</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseInfo;
