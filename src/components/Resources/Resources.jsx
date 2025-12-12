import ResourcesComponent from '../reusable/ResourcesComponent';

const Resources = ( { data } ) => {
  return (
    <section className='resources_sec py-120' id='resources'>
      <div className='containerWrapper'>
        <ResourcesComponent data={data} />
      </div>
    </section>
  );
};

export default Resources;
