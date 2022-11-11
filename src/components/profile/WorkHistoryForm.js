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
import WorkTable from '../WorkTable';

function WorkHistoryForm(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 980px)');
  const [work, setWork] = useState([]);

  const [data, setData] = useState({
    companyName: '',
    yearStarted: '',
    yearCompleted: '',
    description: '',
    isCurrent: false,
  });

  useEffect(() => {
    const edRef = collection(db, 'profiles', auth.currentUser.uid, 'work');
    const q = query(edRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _work = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        _work.push(doc.data());
      });
      setWork(_work);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    try {
      await addDoc(collection(db, 'profiles', auth.currentUser.uid, 'work'), {
        companyName: data.companyName,
        yearStarted: data.yearStarted,
        yearCompleted: data.yearCompleted,
        description: data.description,
        isCurrent: false,
      });

      setData({
        companyName: '',
        yearStarted: '',
        yearCompleted: '',
        description: '',
        isCurrent: false,
      });
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <FormContainer isMobile={isMobile} isTablet={isTablet}>
      <h3 style={{ color: '#483d8b' }}>Work History</h3>
      <FormRow isMobile={isMobile}>
        <div className="input_container" style={{ flex: 3 }}>
          <label htmlFor="companyName">Company</label>
          <input
            type="text"
            name="companyName"
            value={data.companyName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: 10 }} />
        <div className="input_container" style={{ flex: 1 }}>
          <label htmlFor="yearStarted">Year Started</label>
          <input
            type="text"
            name="yearStarted"
            value={data.yearStarted}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginLeft: 5 }} />
        <div className="input_container" style={{ flex: 1 }}>
          <label htmlFor="yearCompleted">Year Ended</label>
          <input
            type="text"
            name="yearCompleted"
            value={data.yearCompleted}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow isMobile={isMobile}>
        <div className="input_container">
          <label htmlFor="description">Job Description</label>
          <textarea
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            rows="3"
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
            <WorkTable work={work} />
          </div>
        </div>
      </FormRow>
    </FormContainer>
  );
}

export default WorkHistoryForm;

const FormContainer = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
`;
