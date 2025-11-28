import React from "react";
import { formatRichText, formatMedia } from "../../utils/strapiHelpers";
import SupportingLifeComponent from "../reusable/SupportingLifeComponent";

const Support = ( { data: drugSupportSection, loading }) => {
  if (loading) {
    return null;
  }
  
  const supportContent = {
    label: drugSupportSection?.heading,
    title: drugSupportSection?.subHeading,
    description: formatRichText(drugSupportSection?.description),
    buttonText: drugSupportSection?.cta?.text,
    buttonLink: drugSupportSection?.cta?.URL,
    buttonTarget: drugSupportSection?.cta?.target,
    image: formatMedia(drugSupportSection?.media),
  };

  return (
    <section className='supporting_life_sec bg_light_blue py-120'>
        <div className='containerWrapper'>
            <SupportingLifeComponent supportContent={supportContent} />
        </div>
      </section>
  );
};

export default Support;
