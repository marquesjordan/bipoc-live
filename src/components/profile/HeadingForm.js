import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/media';

function HeadingForm({
  title,
  displayName,
  pronoun,
  location,
  handleFormChange,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 980px)');

  const [data, setData] = useState({
    displayName: displayName,
    title: title,
    pronoun: pronoun,
    location: location,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleFormChange(e);
  };

  return (
    <FormContainer isMobile={isMobile} isTablet={isTablet}>
      <h3 style={{ color: '#483d8b' }}>Person</h3>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={data.displayName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: 10 }} />
        <div className="input_container">
          <label htmlFor="pronoun">Pronoun</label>
          <input
            type="text"
            name="pronoun"
            value={data.pronoun}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="title">Professional Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="location">City, State, Country</label>
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
          />
        </div>
      </FormRow>
    </FormContainer>
  );
}

export default HeadingForm;

const FormContainer = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
`;
