import React from 'react';
import InnovativeCareComponent from '../../reusable/InnovativeCareComponent';

const InnovativeCare = ({ data, loading }) => {
  return (
    <section className='innovativeCare_sec with_border py-120' id='treatments'>
      <div className='containerWrapper'>
        <InnovativeCareComponent data={data} loading={loading} />
      </div>
    </section>
  );
};

export default React.memo(InnovativeCare);
