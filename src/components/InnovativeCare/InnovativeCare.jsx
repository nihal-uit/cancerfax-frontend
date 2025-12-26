import InnovativeCareComponent from '../reusable/InnovativeCareComponent';

const InnovativeCare = ({ componentData, data }) => {
  return (
    <section className='innovativeCare_sec with_border py-120' id='treatments'>
      <div className='containerWrapper'>
        <InnovativeCareComponent componentData={componentData} data={data} />
      </div>
    </section>
  );
};

export default InnovativeCare;
