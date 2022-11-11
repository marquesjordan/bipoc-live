import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useMediaQuery } from '../hooks/media';

function JobForm({ company, onCloseForm }) {
  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [requiredItem, setRequiredItem] = useState('');
  const [dutyItem, setDutyItem] = useState('');
  const [qualificationList, setQualificationList] = useState([]);
  const [dutiesList, setDutiesList] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const user = auth.currentUser.uid;

  const [data, setData] = useState({
    jobTitle: '',
    companyName: '',
    companyDescription: '',
    companyUrl: '',
    companyEEOC: '',
    location: '',
    employmentType: '',
    jobSummary: '',
    salary: '',
    error: null,
    loading: false,
  });

  const {
    jobTitle,
    companyName,
    companyDescription,
    companyUrl,
    companyEEOC,
    location,
    employmentType,
    jobSummary,
    salary,
    loading,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRequiredChange = (e) => {
    setRequiredItem(e.target.value);
  };

  const handleRequiredAdd = () => {
    const temp = qualificationList;
    temp.push(requiredItem);
    setQualificationList(temp);
    setRequiredItem('');
  };

  const handleDutyChange = (e) => {
    console.log(e.target.value);
    setDutyItem(e.target.value);
  };

  const handleDutyAdd = () => {
    const temp = dutiesList;
    temp.push(dutyItem);
    setDutiesList(temp);

    setDutyItem('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    let url;
    // if (img) {
    //   const imgRef = ref(
    //     storage,
    //     `company/${new Date().getTime()} - ${img.name}`,
    //   );
    //   const snap = await uploadBytes(imgRef, img);
    //   const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
    //   url = dlUrl;
    // }

    try {
      console.log('try');
      await addDoc(collection(db, 'jobs'), {
        jobTitle,
        postByCompanyRef: company.id,
        companyName,
        companyDescription,
        companyUrl,
        companyEEOC,
        location,
        employmentType,
        jobSummary,
        salary,
        qualifications: qualificationList,
        duties: dutiesList,
        active: false,
        createdBy: user,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setData({
        jobTitle: '',
        companyName: '',
        companyDescription: '',
        companyUrl: '',
        companyEEOC: '',
        location: '',
        employmentType: '',
        jobSummary: '',
        salary: '',
        error: null,
        loading: false,
      });

      setQualificationList([]);
      setDutiesList([]);
      onCloseForm();
      // navigate('/company');
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <Container>
      <section style={{ margin: 0, background: '#f0f0f0', maxWidth: '100%' }}>
        <CloseBtnContainer>
          <CloseBtn role="button" onClick={onCloseForm}>
            Close Form
          </CloseBtn>
        </CloseBtnContainer>
        <h3>Create Job Post</h3>
        <form className="form" onSubmit={handleSubmit}>
          <FormRow isMobile={isMobile}>
            <div className="input_container">
              <label htmlFor="companyName">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={jobTitle}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginLeft: 10 }} />
            <div className="input_container">
              <label htmlFor="location">Job Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
              />
            </div>
          </FormRow>
          <FormRow isMobile={isMobile}>
            <div className="input_container">
              <label htmlFor="employmentType">Employment Type</label>
              <input
                type="text"
                name="employmentType"
                value={employmentType}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginLeft: 10 }} />
            <div className="input_container">
              <label htmlFor="salary">Salary Range</label>
              <input
                type="text"
                name="salary"
                value={salary}
                onChange={handleChange}
              />
            </div>
          </FormRow>
          <div className="input_container">
            <label htmlFor="jobSummary">Job Summary</label>
            <textarea
              type="text"
              name="jobSummary"
              value={jobSummary}
              onChange={handleChange}
            />
          </div>
          <hr style={{ marginTop: 20 }} />
          <FormRow isMobile={isMobile}>
            <div className="input_container">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginLeft: 10 }} />
            <div className="input_container">
              <label htmlFor="companyUrl">Company Website</label>
              <input
                type="text"
                name="companyUrl"
                value={companyUrl}
                onChange={handleChange}
              />
            </div>
          </FormRow>
          <div className="input_container">
            <label htmlFor="companyDescription">Company Summary</label>
            <textarea
              type="text"
              name="companyDescription"
              value={companyDescription}
              onChange={handleChange}
            />
          </div>
          <hr style={{ marginTop: 20 }} />

          <div className="input_container">
            <label htmlFor="duty">Duities (optional)</label>
            <div
              style={{
                display: 'flex',
              }}>
              <input
                id="duty"
                type="text"
                name="required"
                value={dutyItem}
                onChange={handleDutyChange}
              />
              <div
                onClick={() => handleDutyAdd()}
                style={{
                  width: 65,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  color: 'blue',
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  fontSize: 30,
                  cursor: 'pointer',
                }}>
                +
              </div>
            </div>
            <div style={{ padding: '10px 0' }}>
              <ul>
                {dutiesList.map((item) => {
                  return (
                    <li key={item} style={{ marginBottom: 5 }}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="input_container">
            <label htmlFor="qualifiication">Qualifications (optional)</label>
            <div
              style={{
                display: 'flex',
              }}>
              <input
                id="qualification"
                type="text"
                name="required"
                value={requiredItem}
                onChange={handleRequiredChange}
              />
              <div
                onClick={() => handleRequiredAdd()}
                style={{
                  width: 65,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  color: 'blue',
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  fontSize: 30,
                  cursor: 'pointer',
                }}>
                +
              </div>
            </div>
            <div style={{ padding: '10px 0' }}>
              <ul>
                {qualificationList.map((item) => {
                  return (
                    <li key={item} style={{ marginBottom: 5 }}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <label for="profile_pic">Choose file to upload</label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept=".pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>
          <div className="btn_container">
            <button className="btn" disabled={loading}>
              {loading ? 'Saving Job...' : 'Save'}
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
}

export default JobForm;

const Container = styled.div`
  margin-bottom: 100px;
`;

const CloseBtnContainer = styled.div`
  text-align: right;
  padding: 10px 0;
`;

const CloseBtn = styled.a`
  color: blue;
  cursor: pointer;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? `column` : `row`)};
`;
