import React from 'react';
import InnovativeCareComponent from '../../reusable/InnovativeCareComponent';

const InnovativeCare = ({ data, loading }) => {
  if (loading || !data?.isActive) {
    return null;
  }

  return (
    <section className='innovativeCare_sec with_border py-120' id='treatments'>
      <div className='containerWrapper'>
        <InnovativeCareComponent data={data} />
      </div>
    </section>
  );
};

export default React.memo(InnovativeCare);
