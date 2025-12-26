import styled from 'styled-components';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Accordion } from 'react-bootstrap';

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const PopularFaqComponent = ({data}) => {
  return (
      <ScrollAnimationComponent animationVariants={fadeIn}>
        <Content>
          <div className="comm-accodion-wrap commContent_wrap content-gap-32">
            <h4 className='title-4'>{data?.heading}</h4>
            <Accordion>
              {data?.faqs?.map((faq) => (
                <Accordion.Item eventKey={faq?.id} key={faq?.id}>
                  <Accordion.Header>{faq?.question}</Accordion.Header>
                  <Accordion.Body>
                    {faq?.answer}
                  </Accordion.Body>
                </Accordion.Item> 
              ))}          
            </Accordion>
          </div>
        </Content>
      </ScrollAnimationComponent>  
  );
};


const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PopularFaqComponent;

