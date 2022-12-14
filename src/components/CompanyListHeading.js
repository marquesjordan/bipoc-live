import React from 'react';

import styled from 'styled-components';
// @mui icons-material components
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import Camera from '../components/svg/Camera';
import Delete from '../components/svg/Delete';
import Img from '../logo.png';

import { useMediaQuery } from '../hooks/media';

function CompanyListHeading({ company, logo, jobs, deleteImage, setImg }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <ShadowBox isMobile={isMobile}>
      <EditButton>Edit</EditButton>
      <Header isMobile={isMobile}>
        <HeaderInfo>
          <Heading isMobile={isMobile}>
            <LogoContainer isMobile={isMobile}>
              <LogoImg src={logo || Img} alt="logo" isMobile={isMobile} />
              <div className="overlay">
                <div>
                  <label htmlFor="photo">
                    <Camera />
                  </label>
                  {logo ? <Delete deleteImage={deleteImage} /> : null}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
            </LogoContainer>
            <div style={{ width: '100%' }}>
              <CompanyTitle>{company.companyName}</CompanyTitle>
              <CompanyHeading>{company.heading}</CompanyHeading>
            </div>
          </Heading>
          <div>
            <CompanyBio>{company.companyBio}</CompanyBio>
          </div>
        </HeaderInfo>
        {/* <HeaderData isMobile={isMobile}>
          <div>
            <Data>
              <DataTitle>Company Views:</DataTitle>
              <DataValue>#,###</DataValue>
            </Data>
            <Data>
              <DataTitle>Followers:</DataTitle>
              <DataValue>###</DataValue>
            </Data>
            <Data>
              <DataTitle>Jobs:</DataTitle>
              <DataValue>{jobs.length}</DataValue>
            </Data>
            <Data>
              <DataTitle>Applicants:</DataTitle>
              <DataValue>##</DataValue>
            </Data>
          </div>
          <Social>
            <TwitterIcon />
            <InstagramIcon />
            <LinkedinIcon />
            <FacebookIcon />
            <YoutubeIcon />
          </Social>
        </HeaderData> */}
      </Header>
    </ShadowBox>
  );
}

export default CompanyListHeading;

// box-shadow: 1px 2px 10px var(--color-4);
const ShadowBox = styled.div`
  margin: 10px auto;
  padding: ${({ isMobile }) => (isMobile ? `10px 0` : `10px 20px`)};
  border-radius: 5px;
  background-color: white;
  border: 2px solid lightgrey;
  position: relative;
`;

const EditButton = styled.div`
  margin: 20px;
  position: absolute;
  right: 0;
  top: 0;
  color: blue;
  cursor: pointer;
`;

const CompanyTitle = styled.h2`
  margin: 0.5rem 0;
`;

const CompanyHeading = styled.div`
  font-size: 12px;
  border-bottom: 1px solid;
  font-weight: 600;
`;

const CompanyBio = styled.p`
  font-size: 12px;
  // white-space: nowrap;
  // width: 70%;
  // overflow: hidden;
  // text-overflow: ellipsis;
  margin: 5px 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => isMobile && `column`};
  justify-content: ${({ isMobile }) => isMobile && `center`};
  align-items: ${({ isMobile }) => isMobile && `center`};
`;

const Heading = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${({ isMobile }) => isMobile && `column`};
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const HeaderData = styled.div`
  flex-basis: ${({ isMobile }) => !isMobile && `370px`};
  padding: 20px;
  font-size: 12px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  border-left: ${({ isMobile }) => !isMobile && `2px solid #cbcbcb`};
  width: 100%;
`;

const Data = styled.div`
  display: flex;
  padding: 5px 0;
`;

const DataTitle = styled.strong`
  flex: 1;
`;

const DataValue = styled.strong`
  flex: 1;
  color: #6c6a6a;
`;

const Social = styled.div`
  padding: 10px 0;
  display: flex;

  svg {
    margin-right: 20px;
    color: var(--color-8);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  margin-right: ${({ isMobile }) => (isMobile ? `0` : `20px`)};
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:hover img {
    opacity: 0.4;
  }

  &:hover div {
    opacity: 1;
  }
`;

const LogoImg = styled.img`
  width: ${({ isMobile }) => (isMobile ? `100%` : `175px`)};
  height: ${({ isMobile }) => (isMobile ? `75px` : `75px`)};
  border: 1px solid var(--color-4);
  transition: 0.5s ease-in-out all;
`;
