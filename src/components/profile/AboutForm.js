import React, { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/media';

function AboutForm({ about, handleFormChange }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 980px)');

  const [data, setData] = useState({
    about: about,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleFormChange(e);
  };

  return (
    <FormContainer isMobile={isMobile} isTablet={isTablet}>
      <h3 style={{ color: '#483d8b' }}>About</h3>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="about">Cover Letter</label>
          <textarea
            type="text"
            name="about"
            value={data.about}
            onChange={handleChange}
            rows="8"
          />
        </div>
      </FormRow>
    </FormContainer>
  );
}

export default AboutForm;

const FormContainer = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
`;
