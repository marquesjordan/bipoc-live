import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import styled from 'styled-components';
// @mui icons-material components
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CompanyListHeading from './CompanyListHeading';

import { doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { db, storage } from '../firebase';
import CompanyJobList from './CompanyJobList';
import JobDetail from './JobDetail';
import JobForm from './JobForm';

import Modal from '@mui/material/Modal';
import { useMediaQuery } from '../hooks/media';
import CompanyJobApplicants from './CompanyJobApplicants';

function CompanyList({ companies }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [img, setImg] = useState('');
  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenJobView = (jobItem) => {
    setSelectedJob(jobItem);
    setOpen(true);
  };

  const handleShowApplicants = (jobs, _applicants) => {
    console.log('Job ', jobs);
    setSelectedJob(jobs);
    setApplicants(_applicants);
    setShowApplicants(true);
  };

  const handleClose = () => {
    setSelectedJob({});
    setOpen(false);
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
          return (
            <Container>
              {!showApplicants && (
                <CompanyListHeading
                  company={company}
                  jobs={jobs}
                  logo={company.logo}
                  deleteImage={deleteImage}
                  setImg={setImg}
                />
              )}
              <BottomContainer>
                {/* <BottomMenuContainer>
                <div>
                  <ListItem>Jobs</ListItem>
                  <ListItem>Posts</ListItem>
                </div>
              </BottomMenuContainer> */}

                {!showApplicants ? (
                  <BottomBodyContainer isMobile={isMobile}>
                    {!showForm ? (
                      <CompanyJobList
                        onShowForm={() => setShowForm(true)}
                        company={company}
                        jobs={jobs}
                        handleOpenJobView={handleOpenJobView}
                        handleShowApplicants={handleShowApplicants}
                      />
                    ) : (
                      <JobForm
                        onCloseForm={() => setShowForm(false)}
                        company={company}
                      />
                    )}
                  </BottomBodyContainer>
                ) : (
                  <BottomApplicantContainer isMobile={isMobile}>
                    <CompanyJobApplicants
                      job={selectedJob}
                      applicants={applicants}
                      handleBack={() => setShowApplicants(false)}
                    />
                  </BottomApplicantContainer>
                )}
              </BottomContainer>
            </Container>
          );
        })}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Job Modal"
        aria-describedby="Job Description">
        <ModalContainer isMobile={isMobile}>
          <JobDetail selectedGig={selectedJob} />
        </ModalContainer>
      </Modal>
    </>
  );
}

export default CompanyList;

// box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
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
  border: 2px solid lightgrey;
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 32px;
  max-height: 80%;
  overflow-y: auto;
  width: ${({ isMobile }) => isMobile && `90%`};
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// box-shadow: 1px 2px 10px var(--color-4);
const BottomBodyContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? `4px` : `0`)};
  border-radius: 5px;
  flex: 1;
  height: ${({ isMobile }) => (isMobile ? `100%` : `calc(100vh - 110px)`)};
`;

const BottomApplicantContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? `4px` : `10px 20px`)};
  border-radius: 5px;
  flex: 1;
  height: ${({ isMobile }) => (isMobile ? `100%` : `calc(100vh - 110px)`)};
`;
