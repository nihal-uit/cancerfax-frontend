import React, { memo } from 'react';
import ResourcesComponent from "../../reusable/ResourcesComponent";

const Resources = ({ sectionClass, data, loading }) => {  
  if (loading || !data?.isActive) {
    return null;
  }
  
  return (
    <section className={`resources_sec py-120  ${sectionClass}`} id="resources">
      <div className="containerWrapper">
        <ResourcesComponent data={data} />
      </div>
    </section>
  );
};

export default memo(Resources);
