import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';

import Container from '@mui/material/Container';
import styled from 'styled-components';
// @mui icons-material components
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YoutubeIcon from '@mui/icons-material/YouTube';
import Camera from '../components/svg/Camera';
import Img from '../logo.png';
import { useNavigate } from 'react-router-dom';
import Delete from '../components/svg/Delete';

import { storage, db, auth } from '../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { useMediaQuery } from '../hooks/media';

function CompanyList({ companies }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [img, setImg] = useState('');
  const [company, setCompany] = useState();

  useEffect(() => {
    if (companies.length > 0) {
      setCompany(companies[0]);
    }

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `company/${new Date().getTime()} - ${img.name}`,
        );

        try {
          if (companies[0].logoPath) {
            await deleteObject(ref(storage, companies[0].logoPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'company', companies[0].id), {
            logo: url,
            logoPath: snap.ref.fullPath,
          });

          setImg('');
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete logo?');
      if (confirm) {
        await deleteObject(ref(storage, company.logoPath));
        await updateDoc(doc(db, 'company', companies[0].id), {
          logo: '',
          logoPath: '',
        });
        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <List sx={{ width: '100%' }}>
      {companies.map(({ companyName, heading, companyBio, logo }) => {
        return (
          <Container>
            <ShadowBox>
              <Header isMobile={isMobile}>
                <LogoContainer>
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
                <HeaderInfo>
                  <CompanyTitle>{companyName}</CompanyTitle>
                  <CompanyHeading>{heading}</CompanyHeading>
                  <div>
                    <CompanyBio>{companyBio}</CompanyBio>
                  </div>
                </HeaderInfo>
                <HeaderData isMobile={isMobile}>
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
                      <DataValue>##</DataValue>
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
                </HeaderData>
              </Header>
            </ShadowBox>
          </Container>
        );
      })}
    </List>
  );
}

export default CompanyList;

const ShadowBox = styled.div`
  margin: 10px auto;
  box-shadow: 1px 2px 10px var(--color-4);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
`;

const CompanyTitle = styled.h2`
  margin: 0.5rem 0;
`;

const CompanyHeading = styled.div`
  font-size: 12px;
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

const HeaderInfo = styled.div`
  flex: 1;
  padding: 20px;
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
  margin-right: 20px;
  display: flex;
  align-items: center;

  &:hover img {
    opacity: 0.4;
  }

  &:hover div {
    opacity: 1;
  }
`;

const LogoImg = styled.img`
  width: ${({ isMobile }) => (isMobile ? `100%` : `250px`)};
  height: ${({ isMobile }) => (isMobile ? `85px` : `150px`)};
  border: 1px solid var(--color-4);
  transition: 0.5s ease-in-out all;
`;