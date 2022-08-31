import React from 'react';
import Hero from '../components/Hero';
import HomeGroups from '../components/HomeGroups';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { useMediaQuery } from '../hooks/media';

function Home(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <Hero />
      <HomeGroups />
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
          <img
            style={{ maxWidth: '80%' }}
            alt="about"
            src="https://media.istockphoto.com/photos/london-uk-crowd-of-people-walking-at-work-in-early-morning-concept-picture-id1172671709?s=612x612"
          />
        </Container>
      </AboutContainer>
      <FooterContainer />
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
  padding: 25px 0 50px;
  height: 200px;
  background-color: #746ca466;
`;
