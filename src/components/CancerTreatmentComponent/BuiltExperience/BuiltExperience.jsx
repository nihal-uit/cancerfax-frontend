import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { Image, Ratio } from "react-bootstrap";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { Link } from "react-router-dom";
import "./BuiltExperience.scss";

const SECTIONS = [
  { id: "builtExperience_1", label: "Introduction" },
  { id: "builtExperience_2", label: "Medical Precision" },
  { id: "builtExperience_3", label: "Immunotherapy Advances" },
  { id: "builtExperience_4", label: "Radiation Therapy Advances" },
  { id: "builtExperience_5", label: "MIS stands for minimally invasive surgery" },
  { id: "builtExperience_6", label: "Clinical Research and Trials" },
  { id: "builtExperience_7", label: "Identifying and Addressing Healthcare Disparities" },
  { id: "builtExperience_8", label: "Conclusion" },
];

const BuiltExperience = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [activeId, setActiveId] = useState("builtExperience_1");
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
    <section className='builtExperience_sec hospitalDetailsInfo_sec py-120'>
      <div className="containerWrapper">

        <div className="builtExperience_row">
          <div>
            <ScrollAnimationComponent
              animationVariants={fadeIn}
              className="h-100"
            >
              <RatioHolder>
                <div className="commContent_wrap commContent_new">
                  <h3 className="title-3">
                  Built on Experience. Driven by Empathy.                    
                  </h3>
                </div>
                <div className="ratio__holder">
                  <Ratio aspectRatio={"16x9"}>
                    <Image src="./images/chronic-thumb.png" />
                  </Ratio>
                </div>
              </RatioHolder>
            </ScrollAnimationComponent>
          </div>
          <div>
            <ScrollAnimationComponent animationVariants={fadeIn}>
              <Description className="commContent_wrap">
                <p>
                The United States has made significant advances in cancer treatment and remains at the vanguard of medical innovation. The country provides an extensive selection of treatments, including surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, precision medicine and clinical trials. Patients from across the globe look forward to cancer treatment in the USA. The United States has cancer centres and research institutions of international repute that contribute to ground-breaking discoveries and innovative therapies.                  
                </p>
                <p>
                  Furthermore, clinical trials and access to experimental treatments offer patients hope. However, the cost of cancer treatment continues to be a concern, with expensive healthcare costs and insurance complexities posing obstacles for many people. Nationwide efforts are being made to resolve these concerns and enhance access to affordable and equitable cancer care.
                </p>
                <Link href="#" className="btn btn-pink-solid">
                  Connect with Experts Now
                </Link>
              </Description>
            </ScrollAnimationComponent>
          </div>
        </div>

        <div className="hospitalDetailsInfo_wrap cancer_sidebar_wrap">
          <aside className="sidebar cancer-sidebar">
            <ul>
              {SECTIONS.map((item) => (
                <li
                  key={item.id}
                  className={item.id === activeId ? "active" : ""}
                  onClick={() => handleClick(item.id)}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="hospitalDetails_info">
            {/* Introduction */}
            <div
              id="builtExperience_1"
              ref={(el) => (sectionRefs.current["builtExperience_1"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Introduction:</h3>
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease. Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Precision */}
            <div
              id="builtExperience_2"
              ref={(el) => (sectionRefs.current["builtExperience_2"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Medical Precision</h3>
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

            {/* Immunotherapy Advances */}
            <div
              id="builtExperience_3"
              ref={(el) => (sectionRefs.current["builtExperience_3"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Immunotherapy Advances</h3>
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

            {/* Radiation Therapy Advances */}
            <div
              id="builtExperience_4"
              ref={(el) => (sectionRefs.current["builtExperience_4"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">Radiation Therapy Advances</h3>
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

            {/* MIS stands for minimally invasive surgery */}
            <div
              id="builtExperience_5"
              ref={(el) => (sectionRefs.current["builtExperience_5"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <h3 className="title-3">MIS stands for minimally invasive surgery</h3>
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

            {/* Clinical Research and Trials */}
            <div
              id="builtExperience_6"
              ref={(el) => (sectionRefs.current["builtExperience_6"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Clinical Research and Trials</h3>
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease. Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Identifying and Addressing Healthcare Disparities */}
            <div
              id="builtExperience_7"
              ref={(el) => (sectionRefs.current["builtExperience_7"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Identifying and Addressing Healthcare Disparities</h3>
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease. Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div
              id="builtExperience_8"
              ref={(el) => (sectionRefs.current["builtExperience_8"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Conclusion:</h3>
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-lg-7">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-5">
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <p>
                        Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease. Cancer remains a global health challenge, claiming millions of lives worldwide. Cancer therapy has evolved significantly in the United States as a result of intensive research, advanced technologies, and a strong healthcare system. The purpose of this article is to shed light on the current status of cancer treatment in the USA, highlighting major developments and the multidisciplinary strategy used to tackle this complicated disease.
                      </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const RatioHolder = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (max-width: 1023.98px) {
    gap: 30px;
  }
  @media screen and (max-width: 767.98px) {
    gap: 24px;
  }
`;
const Description = styled.div`
  p {
    margin-bottom: 10px;
    line-height: 28px;
  }
`;

export default BuiltExperience;
