import React from 'react';
import styled from 'styled-components';
import EmptyBox from './EmptyBox';
import CompanyJobItem from './CompanyJobItem';

function CompanyJobList({
  company,
  onShowForm,
  jobs = [],
  handleOpenJobView,
  handleShowApplicants,
}) {
  return (
    <div>
      <AddBtnContainer>
        <AddBtn role="button" onClick={onShowForm}>
          + Add Job
        </AddBtn>
      </AddBtnContainer>
      {jobs.length === 0 && <EmptyBox text="No Jobs" />}
      {jobs.map((job) => {
        return (
          <CompanyJobItem
            handleOpenJobView={handleOpenJobView}
            handleShowApplicants={handleShowApplicants}
            job={job}
          />
        );
      })}
    </div>
  );
}

export default CompanyJobList;

const AddBtnContainer = styled.div`
  text-align: right;
  padding: 10px 0;
`;

const AddBtn = styled.a`
  color: blue;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: lightblue;
  }
`;
