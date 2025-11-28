import ResourcesComponent from "../../reusable/ResourcesComponent";

const Resources = ({ sectionClass }) => {
  return (
    <section
      className={`resources_sec py-120 ${sectionClass}`}
      id="resources"
    >
      <div className="containerWrapper">
        <ResourcesComponent />
      </div>
    </section>
  );
};

export default Resources;
