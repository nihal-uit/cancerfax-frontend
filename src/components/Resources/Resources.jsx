import ResourcesComponent from '../reusable/ResourcesComponent';

const Resources = ({ componentData, data }) => {
  const resourcesData = componentData || data;

  if (!resourcesData) {
    return null;
  }

  return (
    <section className='resources_sec py-120' id='resources'>
      <div className='containerWrapper'>
        <ResourcesComponent data={resourcesData} />
      </div>
    </section>
  );
};

export default Resources;
