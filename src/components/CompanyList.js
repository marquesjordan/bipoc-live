import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
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

import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../firebase';
import { useMediaQuery } from '../hooks/media';
import JobForm from './JobForm';
import CompanyJobList from './CompanyJobList';
import CompanyJobItem from './CompanyJobItem';
import JobDetail from './JobDetail';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function CompanyList({ companies }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [img, setImg] = useState('');
  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = (jobItem) => {
    setSelectedJob(jobItem);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedJob({});
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (companies.length > 0) {
      setCompany(companies[0]);

      const jobsCol = collection(db, 'jobs');

      const q = query(
        jobsCol,
        where('postByCompanyRef', '==', companies[0].id),
      );
      console.log('q', q);
      const unsub = onSnapshot(q, (querySnapshot) => {
        let _jobs = [];
        querySnapshot.forEach((doc) => {
          let data = {};
          data = doc.data();
          data.id = doc.id;
          _jobs.push(data);
        });
        setJobs(_jobs);
      });

      return () => unsub();
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
    <>
      <List sx={{ width: '100%' }}>
        {companies.map((company) => {
          const { companyName, heading, companyBio, logo } = company;
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
                  </HeaderData>
                </Header>
              </ShadowBox>
              <BottomContainer>
                {/* <BottomMenuContainer>
                <div>
                  <ListItem>Jobs</ListItem>
                  <ListItem>Posts</ListItem>
                </div>
              </BottomMenuContainer> */}

                <BottomBodyContainer>
                  {!showForm ? (
                    <CompanyJobList
                      onShowForm={() => setShowForm(true)}
                      company={company}
                      jobs={jobs}
                      handleOpen={handleOpen}
                    />
                  ) : (
                    <JobForm
                      onCloseForm={() => setShowForm(false)}
                      company={company}
                    />
                  )}
                </BottomBodyContainer>
              </BottomContainer>
            </Container>
          );
        })}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalContainer>
          <JobDetail selectedGig={selectedJob} />
        </ModalContainer>
      </Modal>
    </>
  );
}

export default CompanyList;

const ListItem = styled.div`
  color: var(--color-1);
  font-size: 16px;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background: #f0f0f0;
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 32px;
  max-height: 80%;
  overflow-y: auto;
`;

const ShadowBox = styled.div`
  margin: 10px auto;
  box-shadow: 1px 2px 10px var(--color-4);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BottomMenuContainer = styled.div`
  box-shadow: 1px 2px 10px var(--color-4);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
  flex-basis: 275px;
  margin-right: 10px;
  height: max-content;
`;

const BottomBodyContainer = styled.div`
  box-shadow: 1px 2px 10px var(--color-4);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
  flex: 1;
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
