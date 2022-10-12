import { blue } from '@mui/material/colors';
import React from 'react';
import Moment from 'react-moment';

const JobListItem = ({ job, selectJob, user1 }) => {
  return (
    <div
      style={{ border: '1px solid', padding: 5, cursor: 'pointer' }}
      onClick={() => selectJob(job)}>
      <div style={{ fontSize: 22, color: '#483d8b', fontWeight: 'bold' }}>
        {job.jobTitle}
      </div>
      <div style={{ fontWeight: 'bold' }}>{job.companyName}</div>
      <div>
        {job.location} ({job.employmentType})
      </div>
      <div style={{ marginTop: 8 }}>
        <small>
          Created: <Moment fromNow>{job.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
};

export default JobListItem;
