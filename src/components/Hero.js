import React from 'react';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import { useMediaQuery } from '../hooks/media';

function Hero(props) {
  return (
    <HeroContainer>
      <Container style={{ display: 'flex' }}>
        <HeroLeftWrapper>
          <HeroTextContainer>
            <HeroHeader>
              Community, Events & Jobs for BIPOC connections.
            </HeroHeader>
            <HeroText>
              People with disabilities, people of color, and people with
              multiple marginalized identities are especially encouraged to
              join.
            </HeroText>
          </HeroTextContainer>
          <BtnContainer>
            <Btn1>Post a job</Btn1>
            <Btn2>Find People</Btn2>
          </BtnContainer>
        </HeroLeftWrapper>
        <HeroRightWrapper>
          <img
            src="https://media.istockphoto.com/id/514325215/photo/say-cheese-for-success.webp?s=612x612&w=is&k=20&c=HTOLEzcFjszcseWaWCpxBr9s_hzvhmTn_Y8Wkca-S8g="
            alt="bipoc"
            style={{ width: '100%' }}
          />
        </HeroRightWrapper>
      </Container>
    </HeroContainer>
  );
}

export default Hero;

const HeroContainer = styled.div`
  display: flex;
  padding: 10px 0 50px;
  background: white;
`;

const HeroLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const HeroTextContainer = styled.div`
  padding: 20px;
`;

const HeroHeader = styled.h1`
  color: black;
`;

const HeroText = styled.p`
  color: black;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Btn1 = styled.div`
  padding: 15px;
  background-color: var(--color-7);
  width: 40%;
  text-align: center;
`;

const Btn2 = styled.div`
  padding: 15px;
  background-color: #746ca466;
  width: 40%;
  color: black;
  text-align: center;
`;

const HeroRightWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;
