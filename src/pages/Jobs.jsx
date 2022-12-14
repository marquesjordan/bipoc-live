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
        let data = {};
        data = doc.data();
        data.id = doc.id;
        _jobs.push(data);
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
              key={job.id}
              jobId={job.id}
              job={job}
              selectJob={selectJob}
              user1={user1}
              selectedGig={selectedGig}
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
`;

//  box-shadow: 1px 2px 10px var(--color-4);
const ShadowBox = styled.div`
  margin: 20px auto;
  background-color: white;
  max-width: 1200px;
  border: 2px solid lightgrey;
`;
