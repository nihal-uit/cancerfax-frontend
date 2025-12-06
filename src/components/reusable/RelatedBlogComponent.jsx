import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ScrollAnimationComponent from '../../components/ScrollAnimation/ScrollAnimationComponent';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import { getMediaUrl } from '../../services/api';
import { formatDate } from '../../utils/strapiHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedBlogs } from '../../store/slices/resourcesSlice';
import NameAvatar from './NameAvatar';

const RelatedBlogComponent = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const relatedBlogs = useSelector(state => state.resources.relatedBlogs);


  useEffect(() => {
    dispatch(fetchRelatedBlogs(id));
  }, [id, dispatch]);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <ScrollAnimationComponent animationVariants={fadeIn}>
        <div className='commContent_wrap'>
          <Header>
            <Label className='contentLabel'>{data?.heading}</Label>
            <Title className='title-3'>{data?.subHeading}</Title>
          </Header>
        </div>
      </ScrollAnimationComponent>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        // loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          767: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        // navigation={true}
        navigation={{
          nextEl: ".customNext",
          prevEl: ".customPrev",
        }}
        className="commCircle_navigation"
      >
        {relatedBlogs?.related_posts?.related_posts && relatedBlogs?.related_posts?.related_posts?.map((blog) => (
          <SwiperSlide key={blog.id}>
              <BlogCard as="div" key={blog.id} onClick={() => navigate(`/resources/${blog.documentId}`)}>
                <BlogImage>
                  <img 
                    src={getMediaUrl(blog.featuredImage) ?? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'} 
                    alt='blog_image' 
                  />
                  {blog?.resource_category && <CategoryBadge className='lg-badge'>{blog.resource_category}</CategoryBadge>}
                </BlogImage>

                <BlogMeta>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7.23294 4.66664C7.23294 4.37669 6.99789 4.14164 6.70794 4.14164C6.41799 4.14164 6.18294 4.37669 6.18294 4.66664V7.29164C6.18294 7.51049 6.31869 7.70638 6.5236 7.78322L8.85694 8.65822C9.12843 8.76002 9.43104 8.62247 9.53285 8.35098C9.63466 8.07949 9.4971 7.77688 9.22562 7.67507L7.23294 6.92782V4.66664Z" fill="#36454F"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.99961 1.22498C3.81016 1.22498 1.22461 3.81053 1.22461 6.99998C1.22461 10.1894 3.81016 12.775 6.99961 12.775C10.1891 12.775 12.7746 10.1894 12.7746 6.99998C12.7746 3.81053 10.1891 1.22498 6.99961 1.22498ZM2.27461 6.99998C2.27461 4.39043 4.39006 2.27498 6.99961 2.27498C9.60916 2.27498 11.7246 4.39043 11.7246 6.99998C11.7246 9.60952 9.60916 11.725 6.99961 11.725C4.39006 11.725 2.27461 9.60952 2.27461 6.99998Z" fill="#36454F"/>
                  </svg> 
                  {blog.readTime} min read
                </BlogMeta>

                <BlogContent>
                  <div>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <BlogDescription>{blog.excerpt ?? ''}</BlogDescription>
                  </div>            
                  <AuthorInfo>
                    <AuthorAvatar>
                      {/* <img 
                        src={blog?.author?.avatar ?? 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'} 
                        alt={blog?.author?.firstName + ' ' + blog?.author?.lastName || 'Author'} 
                      /> */}
                      <NameAvatar 
                        src={getMediaUrl(blog?.author?.profilePicture)} 
                        name={blog?.author?.firstName}
                        size={30}
                      />
                    </AuthorAvatar>
                    <div>
                      <AuthorName>{blog.author?.firstName} {blog.author?.lastName ?? ''}</AuthorName>
                      <PostDate>{formatDate(blog.publishedDate)}</PostDate>
                    </div>
                  </AuthorInfo>
                </BlogContent>
              </BlogCard>
          </SwiperSlide>
        ))}
        <NavButton className='customPrev'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20" fill="none">
            <path d="M9.8614 20L10.9701 18.9151L2.95551 10.7879H28V9.21213H2.92559L10.9313 1.08489L9.8614 0L0 10L9.8614 20Z" fill="#727B81"/>
          </svg>         
        </NavButton>
        <NavButton className="customNext">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
          <path d="M29.1825 31.7313L27.3988 30.01L40.2931 17.1156H0V14.6156H40.3413L27.4613 1.72125L29.1825 0L45.0481 15.8656L29.1825 31.7313Z" fill="#727B81"/>
          </svg>          
        </NavButton>

      </Swiper>
    </>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    margin-bottom: 28px;
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.p`
  color: ${props => props.theme.colors.primary};
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;


const BlogCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  justify-content: space-around;
  background: #fff;
  border-radius: 20px;
  padding: 20px 16px;
`;

const BlogImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: rgba(255, 105, 180, 1);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  z-index: 2;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const BlogContent = styled.div`
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #E5E7EB;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #36454F;
  margin: 0;
`;

const BlogTitle = styled.h5`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #36454F;
  line-height: 27px;
  margin: 0 0 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 25px;
  }
`;

const BlogDescription = styled.p`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #36454F;
  line-height: 22px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const BlogMeta = styled.div`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #36454F;
  white-space: nowrap;
  opacity: 0.5;
  display: flex;
  gap: 6px;
  align-items: center;
`;
const PostDate = styled.span`
  font-family: "Be Vietnam Pro", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #36454F;
  white-space: nowrap;
  opacity: 0.5;
`;

const NavButton = styled.button`
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  
  svg {
    width: 28px;
    height: 20px;   
    @media (max-width: 768px) {
      width: 24px;
      height: 18px;
    }
    
  }
`;

export default RelatedBlogComponent;
