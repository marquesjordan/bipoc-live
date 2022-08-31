import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import FloatingActionButtons from './FloatingActionButton';
import { useMediaQuery } from '../hooks/media';
import styled from 'styled-components';

function CompanyForm() {
  const navigate = useNavigate();
  const [img, setImg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const user = auth.currentUser.uid;

  const [data, setData] = useState({
    companyName: '',
    heading: '',
    industry: '',
    companyBio: '',
    website: '',
    location: '',
    error: null,
    loading: false,
  });

  const {
    companyName,
    heading,
    industry,
    companyBio,
    website,
    location,
    loading,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('called');
    setData({ ...data, error: null, loading: true });

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `company/${new Date().getTime()} - ${img.name}`,
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    try {
      console.log('try');
      await addDoc(collection(db, 'company'), {
        companyName,
        heading,
        industry,
        companyBio,
        website,
        location,
        createdBy: user,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setData({
        companyName: '',
        heading: '',
        industry: '',
        companyBio: '',
        website: '',
        location: '',
        error: null,
        loading: false,
      });

      setShowForm(false);
      // navigate('/company');
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <Container>
      {showForm ? (
        <section>
          <h3>Company Profile</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                name="heading"
                value={heading}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                name="industry"
                value={industry}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="companyBio">Company Bio</label>
              <input
                type="text"
                name="companyBio"
                value={companyBio}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="website">Website URL</label>
              <input
                type="text"
                name="website"
                value={website}
                onChange={handleChange}
              />
            </div>
            <div className="btn_container">
              <button
                className="btn"
                onClick={() => setShowForm(false)}
                disabled={loading}
                style={{ marginRight: 10 }}>
                Cancel
              </button>
              <button className="btn" disabled={loading}>
                {loading ? 'Saving Company...' : 'Save'}
              </button>
            </div>
          </form>
        </section>
      ) : (
        //   <div onClick={() => setShowForm(true)}>+ Add Company</div>
        <div style={{ textAlign: 'center', paddingTop: 30 }}>
          <FloatingActionButtons handleClick={() => setShowForm(true)} />
        </div>
      )}
    </Container>
  );
}

export default CompanyForm;

const Container = styled.div`
  margin-bottom: 100px;
`;
