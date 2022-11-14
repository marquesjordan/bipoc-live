import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import HomeGroups from '../components/HomeGroups';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { useMediaQuery } from '../hooks/media';
import Subscribe from '../components/Subscribe';

function Home(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <FooterContainer>
        <h3 style={{ textAlign: 'center' }}>
          Our website is still under construction. Please leave your email below
          for updates.
        </h3>
      </FooterContainer>
      <Hero />
      {/* <HomeGroups /> */}
      <Subscribe />
      <AboutContainer>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h2 style={{ color: 'black', textAlign: 'center' }}>
            Make A Difference Today
          </h2>

          <p
            style={{
              color: 'black',
              textAlign: 'center',
              margin: '20px auto',
              lineHeight: 1.6,
              fontSize: 18,
            }}>
            We connect you with a wide variety of organizations, nonprofits, and
            businesses that are looking to utilize your expertise, enabling to
            make a difference in the fields that matter to you.
          </p>
          <img style={{ width: '100%' }} alt="about" src="/love.jpg" />
        </Container>
      </AboutContainer>
      <FooterContainer />

      {/* <FooterContainer>
        <p style={{ textAlign: 'center' }}>
          Our website is still under construction and we would like to stay in
          contact to provide you updates on our journey.
        </p>
      </FooterContainer> */}
    </div>
  );
}

export default Home;

const AboutContainer = styled.div`
  display: flex;
  padding: 25px 0 50px;
  background-color: white;
`;

const FooterContainer = styled.div`
  display: flex;
  background-color: var(--color-7);
  color: var(--color-2);
  justify-content: center;
  font-weight: bold;
`;
