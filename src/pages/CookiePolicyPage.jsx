import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SEO from '../components/SEO/SEO';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import api from '../services/api';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 120px 20px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 100px 15px 40px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #555;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-top: 25px;
    margin-bottom: 12px;
  }

  p {
    margin-bottom: 15px;
  }

  ul, ol {
    margin-bottom: 15px;
    padding-left: 30px;
  }

  li {
    margin-bottom: 8px;
  }

  a {
    color: #007bff;
    text-decoration: underline;

    &:hover {
      color: #0056b3;
    }
  }
`;

const LastUpdated = styled.p`
  font-size: 14px;
  color: #888;
  font-style: italic;
  margin-bottom: 30px;
`;

const CookiePolicyPage = () => {
  const [policyData, setPolicyData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchCookiePolicy = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cookie-policy?populate=*');
        setPolicyData(response.data.data);
      } catch (err) {
        console.error('Error fetching cookie policy:', err);
        setError('Failed to load cookie policy');
        // Set default content if API fails
        setPolicyData({
          attributes: {
            title: 'Cookie Policy',
            content: '<p>Cookie policy content will be available soon.</p>',
            lastUpdated: new Date().toISOString(),
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCookiePolicy();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <LoadingSpinner />
        </ContentWrapper>
        <Footer />
      </PageWrapper>
    );
  }

  const { attributes } = policyData || {};
  const seoData = attributes?.seo?.data?.attributes || {};

  return (
    <PageWrapper>
      <SEO
        title={seoData.metaTitle || attributes?.title || 'Cookie Policy'}
        description={seoData.metaDescription || 'Cookie Policy for CancerFax'}
        keywords={seoData.keywords || 'cookie policy, privacy'}
      />
      <Header />
      <ContentWrapper>
        {attributes && (
          <>
            <Title>{attributes.title || 'Cookie Policy'}</Title>
            {attributes.lastUpdated && (
              <LastUpdated>
                Last updated: {new Date(attributes.lastUpdated).toLocaleDateString()}
              </LastUpdated>
            )}
            <Content
              dangerouslySetInnerHTML={{
                __html: attributes.content || '<p>Cookie policy content will be available soon.</p>',
              }}
            />
          </>
        )}
        {error && (
          <Content>
            <p>{error}</p>
          </Content>
        )}
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CookiePolicyPage;


