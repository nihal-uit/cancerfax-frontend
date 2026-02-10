import React from "react";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";
import { renderRichTextWithImages } from "@/utils/strapiHelpers";

const Transcend = ({ data, loading }) => {
  if (loading || !data || !Array.isArray(data) || data.length === 0 || !data[0]?.isActive) {
    return null;
  }
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section className="tanscend__sec py-120">
        <div className="containerWrapper z-2 position-relative">
          <ScrollAnimationComponent animationVariants={fadeIn}>
            <div className="row">
              <div className="col-lg-11 col-xl-10 mx-auto">
                <div className="commContent_wrap commContent_new text-center">
                  {data[0]?.heading && (
                    <p className="contentLabel">{data[0]?.heading}</p>
                  )}
                  {data[0]?.subHeading && (
                    <h3 className="title-3">
                      {data[0]?.subHeading}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimationComponent>
          <div className="list__holder">
            <div className="list">
              {data[0]?.phases && Array.isArray(data[0]?.phases) && data[0]?.phases?.map((item) => (
                <div key={item?.id} className="list__item">
                  <ScrollAnimationComponent animationVariants={fadeIn}>
                    <div className="list__content">
                      <div className="content__left">
                        <svg
                          width="19"
                          height="20"
                          viewBox="0 0 19 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.51141 0C5.08441 0 1.13486 3.34525 0.20879 7.90054C-0.253881 10.1767 0.0577985 12.597 1.09002 14.6565C2.08347 16.6386 3.71215 18.2405 5.66075 19.1484C7.68763 20.0929 10.0146 20.2575 12.1449 19.6134C14.2002 18.9922 16.0225 17.6288 17.2631 15.7985C19.8572 11.9722 19.5103 6.5975 16.4585 3.16893C14.6699 1.15959 12.1294 0 9.51141 0ZM14.0749 10.5352L11.4816 13.3272C10.825 14.0343 9.78722 12.9631 10.4411 12.2594L11.7496 10.8506H5.54853C5.10816 10.8506 4.74074 10.4641 4.74074 10.0014C4.74074 9.53865 5.1084 9.15212 5.54853 9.15212H11.7186L10.3842 7.74945C9.72105 7.05232 10.7492 5.97121 11.4123 6.66834L14.0688 9.46093C14.3504 9.75675 14.3531 10.2358 14.0749 10.5352Z"
                            fill="#36454F"
                          />
                        </svg>
                        {item?.title && <span>{item?.title}</span>}
                      </div>
                      <div className="content__right">
                        {(item?.description_text || item?.description_block) && <p>{renderRichTextWithImages(item?.description_block) || item?.description_text}</p>}
                      </div>
                    </div>
                  </ScrollAnimationComponent>
                </div>
              )) || null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transcend;
