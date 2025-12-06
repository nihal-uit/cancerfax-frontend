import ResourcesComponent from "../../reusable/ResourcesComponent";

const Resources = ({ sectionClass, data }) => {
  return (
    <section
      className={`resources_sec py-120 ${sectionClass}`}
      id="resources"
    >
      <div className="containerWrapper">
        <ResourcesComponent componentData={data} />
      </div>
    </section>
  );
};

export default Resources;
