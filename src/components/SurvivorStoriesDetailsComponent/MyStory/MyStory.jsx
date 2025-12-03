import styled from "styled-components";
import ScrollAnimationComponent from "../../ScrollAnimation/ScrollAnimationComponent";


const MyStory = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const content = {
    label: "my Story",
    title: "From Lifelong Transfusions to a New Life: My Beta-Thalassemia Cure Story",
    details: "At age 21, Chen Yan became the first adult patient to receive CRISPR-edited hematopoietic stem cells for beta-thalassemia. His life transformed. Chen Yan was diagnosed with severe beta-thalassemia before his first birthday. For over two decades, regular blood transfusions and hospital visits defined his life — limiting opportunities, casting a long shadow over his future. In 2022, an innovative gene therapy trial using the CRISPR/Cas9 system and the ModiHSC® platform opened new possibilities. The therapy targeted the BCL11A enhancer in hematopoietic stem and progenitor cells, boosting fetal hemoglobin (HbF) production, a key breakthrough for both beta-thalassemia and sickle cell disease.",
    image: "../images/my-story-banner.jpg",
    imageAlt: "my-story",
  };

  return (
    <section className='mystory_sec pb-120'>
      <div className="myStory_banner">
        <img src={content.image || "../images/my-story-banner.jpg"} alt={content.imageAlt || "my Story"} />
      </div>
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className="commContent_wrap">
            <span className="contentLabel">
              {content.label || "my Story"}
            </span>
            <div className="content-gap-12">
                <h3 className="title-size-36">
                  {content.title || "From Lifelong Transfusions to a New Life: My Beta-Thalassemia Cure Story"}
                </h3>
                <p className="text-16">
                  {content.details || "At age 21, Chen Yan became the first adult patient to receive CRISPR-edited hematopoietic stem cells for beta-thalassemia. His life transformed. Chen Yan was diagnosed with severe beta-thalassemia before his first birthday. For over two decades, regular blood transfusions and hospital visits defined his life — limiting opportunities, casting a long shadow over his future. In 2022, an innovative gene therapy trial using the CRISPR/Cas9 system and the ModiHSC® platform opened new possibilities. The therapy targeted the BCL11A enhancer in hematopoietic stem and progenitor cells, boosting fetal hemoglobin (HbF) production, a key breakthrough for both beta-thalassemia and sickle cell disease."}
                </p>
                <p className="text-16">Chen Yan became the first adult participant in this trial, due to the lack of a donor for traditional stem-cell transplantation. His eligibility marked a turning point.</p>
                <p className="text-18">“Twenty years of transfusions had become just my routine,” he shared. “I’d long accepted that this was my normal.”</p>
            </div>
          </CommContent>
        </ScrollAnimationComponent>
      </div>
    </section>
  );
};

const CommContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;
  margin-inline: auto;
  margin-top: 60px;
  @media (max-width: 1024px) {
    gap: 24px;
    margin-top: 40px;
  }
`;

export default MyStory;
