import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/media';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import EducationTable from '../EducationTable';

function EducationForm(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 980px)');

  const [education, setEducation] = useState([]);
  const [data, setData] = useState({
    schoolName: '',
    degreeName: '',
    yearCompleted: '',
  });

  useEffect(() => {
    const edRef = collection(db, 'profiles', auth.currentUser.uid, 'education');
    const q = query(edRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _education = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        _education.push(doc.data());
      });
      setEducation(_education);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    try {
      await addDoc(
        collection(db, 'profiles', auth.currentUser.uid, 'education'),
        {
          schoolName: data.schoolName,
          degreeName: data.degreeName,
          yearCompleted: data.yearCompleted,
        },
      );

      setData({
        schoolName: '',
        degreeName: '',
        yearCompleted: '',
      });
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <FormContainer isMobile={isMobile} isTablet={isTablet}>
      <h3 style={{ color: '#483d8b' }}>Education</h3>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="schoolName">Name of Institution</label>
          <input
            type="text"
            name="schoolName"
            value={data.schoolName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: 10 }} />
        <div className="input_container">
          <label htmlFor="degreeName">Degree Earned</label>
          <input
            type="text"
            name="degreeName"
            value={data.degreeName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: 10 }} />

        <div className="input_container">
          <label htmlFor="yearCompleted">Year Completed</label>
          <input
            type="text"
            name="yearCompleted"
            value={data.yearCompleted}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <div
        onClick={() => handleSave()}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          alignContent: 'center',
          color: 'blue',
          fontWeight: 'bold',
          paddingLeft: 10,
          marginTop: 10,
          fontSize: 16,
          cursor: 'pointer',
          justifyContent: 'flex-end',
        }}>
        Save and add another
      </div>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <div style={{ padding: '10px 0' }}>
            <EducationTable education={education} />
          </div>
        </div>
      </FormRow>
    </FormContainer>
  );
}

export default EducationForm;

const FormContainer = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
`;
