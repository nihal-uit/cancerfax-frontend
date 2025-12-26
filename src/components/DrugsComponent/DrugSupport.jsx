import SupportingLifeComponent from "../reusable/SupportingLifeComponent";

const Support = ( { data }) => {  
  return (
    <section className='supporting_life_sec bg_light_blue py-120'>
        <div className='containerWrapper'>
            <SupportingLifeComponent data={data} />
        </div>
      </section>
  );
};

export default Support;
