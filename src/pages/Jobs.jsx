import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';

import JobDetail from '../components/JobDetail';
import JobListItem from '../components/JobListItem';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedGig, setSelectedGig] = useState('');

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const userRef = collection(db, 'jobs');

    const q = query(userRef, where('active', '==', true));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _jobs = [];
      querySnapshot.forEach((doc) => {
        _jobs.push(doc.data());
      });
      setJobs(_jobs);
    });

    return () => unsub();
  }, []);

  const selectJob = async (job) => {
    console.log('Selected ', job.companyDescription);
    setSelectedGig(job);
  };

  return (
    <ShadowBox>
      <div className="jobs_container">
        <div className="jobs_list_container">
          <Title>Jobs List</Title>
          {jobs.map((job) => (
            <JobListItem
              key={job.uid}
              job={job}
              selectJob={selectJob}
              user1={user1}
            />
          ))}
        </div>
        <div className="job_container">
          {selectedGig ? (
            <JobDetail selectedGig={selectedGig} />
          ) : (
            <h3 className="no_conv">Select a job</h3>
          )}
        </div>
      </div>
    </ShadowBox>
  );
};

export default Jobs;

const Title = styled.div`
  background: var(--color-1);
  color: white;
  padding: 8px;
  font-weight: bold;
  font-size: 18px;
  border-top-left-radius: 6px;
`;

const ShadowBox = styled.div`
  margin: 20px auto;
  box-shadow: 1px 2px 10px var(--color-4);
  border-radius: 5px;
  background-color: white;
  max-width: 1200px;
`;
