import React, { memo } from 'react';
import ResourcesComponent from "../../reusable/ResourcesComponent";

const Resources = ({ sectionClass, data, loading }) => {
  return (
    <section className={`resources_sec py-120  ${sectionClass}`} id="resources">
      <div className="containerWrapper">
        <ResourcesComponent componentData={data} loading={loading} />
      </div>
    </section>
  );
};

export default memo(Resources);
