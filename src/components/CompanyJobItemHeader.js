import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../hooks/media';

function CompanyJobItemHeader({ job }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Header isMobile={isMobile}>
      <div style={{ flex: 1 }}>
        <Title>{job.jobTitle} </Title>
        <div>
          <h4 style={{ fontWeight: 'normal', margin: 0 }}>
            {job.companyName} - {job.companyUrl}
          </h4>
        </div>
      </div>
      <JobItemDetails isMobile={isMobile}>
        <JobDesc>
          Employment Type:{' '}
          <span style={{ fontWeight: 'normal' }}>{job.employmentType}</span>
        </JobDesc>
        <JobDesc>
          Location: <span style={{ fontWeight: 'normal' }}>{job.location}</span>
        </JobDesc>
        <JobDesc>
          Salary: <span style={{ fontWeight: 'normal' }}>{job.salary}</span>
        </JobDesc>
      </JobItemDetails>
    </Header>
  );
}

export default CompanyJobItemHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => isMobile && `column`};
`;

const JobItemDetails = styled.div`
  flex: 1;
  margin-top: ${({ isMobile }) => isMobile && `10px`};
`;
const Title = styled.h4`
  margin: 0 0 10px;
`;

const JobDesc = styled.h4`
  margin: 0;
`;
