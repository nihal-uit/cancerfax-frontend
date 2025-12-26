import InnovativeSolutionsComponent from '../reusable/InnovativeSolutionsComponent';

const HospitalDetailsInnovatioveSolutions = ( {data, loading} ) => {
    if (loading || !data || !data?.isActive) {
      return null;
    }
    
    return (
      <section className='innovativeCare_sec py-120' id="treatments">
      <div className='containerWrapper'>
        <InnovativeSolutionsComponent data={data} />
      </div>
    </section>
    );
  };
  
  export default HospitalDetailsInnovatioveSolutions;