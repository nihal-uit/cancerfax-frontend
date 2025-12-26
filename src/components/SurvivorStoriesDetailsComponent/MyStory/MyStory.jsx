import styled from 'styled-components';
import ScrollAnimationComponent from '../../ScrollAnimation/ScrollAnimationComponent';
import {
  formatMedia,
  renderRichTextWithImages,
} from '../../../utils/strapiHelpers';

const MyStory = ({ data }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const storyContent = data?.story_content;
  if (!storyContent) return null;

  const imageUrl = formatMedia(storyContent?.image);
  const label = storyContent?.heading || 'My Story';
  const quote = storyContent?.quote;
  const contentBlocks = storyContent?.content || [];

  return (
    <section className='mystory_sec pb-120'>
      {imageUrl && (
        <div className='myStory_banner'>
          <img
            src={imageUrl}
            alt={storyContent?.image?.alternativeText || label}
          />
        </div>
      )}
      <div className='containerWrapper'>
        <ScrollAnimationComponent animationVariants={fadeIn}>
          <CommContent className='commContent_wrap'>
            {label && <span className='contentLabel'>{label}</span>}
            <div className='content-gap-12'>
              {quote && <h3 className='title-size-36'>{quote}</h3>}
              {contentBlocks && contentBlocks.length > 0 && (
                <div className='text-16 content-gap-12'>
                  {renderRichTextWithImages(contentBlocks)}
                </div>
              )}
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
