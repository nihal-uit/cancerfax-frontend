import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import "./CostOfCancerTreatment.scss";

const SECTIONS = [
  { id: "CostOfTreatment_1", label: "Cost of cancer treatment in the USA for foreigners" },
  { id: "CostOfTreatment_2", label: "About CancerFax" },
  { id: "CostOfTreatment_3", label: "Hospitals" },
  { id: "CostOfTreatment_4", label: "Clinical Trials" },
  { id: "CostOfTreatment_5", label: "Locations" },
  { id: "CostOfTreatment_6", label: "Clinical Research and Trials" },
  { id: "CostOfTreatment_7", label: "How To Connect" },
];

const CostOfCancerTreatment = () => {

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
    <section className='builtExperience_sec hospitalDetailsInfo_sec pt-120'>
      <div className="containerWrapper">
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
              id="CostOfTreatment_1"
              ref={(el) => (sectionRefs.current["CostOfTreatment_1"] = el)}
              className="section"
            >
              <div className="commContent_wrap content-gap-24">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="content-gap-20">
                      <h3 className="title-size-36">Cost of cancer treatment in the USA for foreigners</h3>
                      <p>
                      Cost of cancer treatment in the USA varies between cancer centers. Average cost of cancer treatment in the USA can come out to be anywhere between $ 100,000 USD and can go up to Million USD depending upon the type of cancer and hospital chosen. Cancer is a deadly foe that affects millions of individuals worldwide, including the United States. While medical advances have considerably improved cancer treatment outcomes, the cost of such treatments has recently soared. The expensive costs of cancer care have become a significant worry for patients and their families, frequently resulting in financial distress and difficult decisions.
                      </p>
                      <h6 className="text-24">Treatment Costs Increasing</h6>
                      <p>Cancer treatment cost in USA without insurance has become too expensive in the United States. The high cost of novel pharmaceuticals, expensive diagnostic tests, sophisticated treatment methods, and the high cost of hospital stays and surgeries are all factors contributing to this increase. Furthermore, the significant research and development necessary to bring new medications to market adds to the rising prices.</p>
                      <div className="doctors-details-img">
                        <img
                          src="../images/doctors-details-img.jpg"
                          alt="doctors"
                        />
                      </div>
                      <hr/>
                      <h6 className="text-24">Effect on Patients</h6>
                      <p>Cancer treatment cost in USA without insurance has become too expensive in the United States. The high cost of novel pharmaceuticals, expensive diagnostic tests, sophisticated treatment methods, and the high cost of hospital stays and surgeries are all factors contributing to this increase. Furthermore, the significant research and development necessary to bring new medications to market adds to the rising prices.</p>
                    </div>
                  </div>
                  <div className="read-more-wrap">
                    <button className="readMore_btn">
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M14.8057 9.3511C14.5658 9.10776 14.1866 9.08493 13.9207 9.28441L13.8511 9.34433L9.675 13.4625L9.675 2.925C9.675 2.55221 9.37279 2.25 9 2.25C8.65588 2.25 8.37191 2.5075 8.33026 2.84033L8.325 2.925V13.4625L4.1489 9.34433C3.90556 9.10441 3.52616 9.08697 3.26302 9.2902L3.19433 9.3511C2.95441 9.59444 2.93697 9.97384 3.1402 10.237L3.2011 10.3057L8.5261 15.5557C8.76701 15.7932 9.14184 15.813 9.40506 15.615L9.4739 15.5557L14.7989 10.3057C15.0644 10.0439 15.0674 9.61657 14.8057 9.3511Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Precision */}
            <div
              id="CostOfTreatment_2"
              ref={(el) => (sectionRefs.current["CostOfTreatment_2"] = el)}
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
              id="CostOfTreatment_3"
              ref={(el) => (sectionRefs.current["CostOfTreatment_3"] = el)}
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
              id="CostOfTreatment_4"
              ref={(el) => (sectionRefs.current["CostOfTreatment_4"] = el)}
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
              id="CostOfTreatment_5"
              ref={(el) => (sectionRefs.current["CostOfTreatment_5"] = el)}
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
              id="CostOfTreatment_6"
              ref={(el) => (sectionRefs.current["CostOfTreatment_6"] = el)}
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
              id="CostOfTreatment_7"
              ref={(el) => (sectionRefs.current["CostOfTreatment_7"] = el)}
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

export default CostOfCancerTreatment;
