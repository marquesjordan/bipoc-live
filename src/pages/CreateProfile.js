import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { useMediaQuery } from '../hooks/media';
import Moment from 'react-moment';

import Loading from '../components/Loading';
import AboutForm from '../components/profile/AboutForm';
import EducationForm from '../components/profile/EducationForm';
import HeadingForm from '../components/profile/HeadingForm';
import WorkHistoryForm from '../components/profile/WorkHistoryForm';

function CreateProfile(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 980px)');

  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  const getProfile = useCallback(async () => {
    const profileRef = doc(db, 'profiles', auth.currentUser.uid);
    const profileSnap = await getDoc(profileRef);
    const data = profileSnap.data();
    setProfile(data);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedTime = Timestamp.fromDate(new Date());
      await updateDoc(doc(db, 'profiles', auth.currentUser.uid), {
        displayName: profile.displayName,
        title: profile.title,
        pronoun: profile.pronoun,
        location: profile.location,
        about: profile.about,
        lastUpdated: updatedTime,
      });
      setProfile({ ...profile, lastUpdated: updatedTime });
      setSaving(false);
    } catch (error) {
      setSaving(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div style={{ paddingBottom: 50 }}>
      <Container isMobile={isMobile} isTablet={isTablet}>
        <h1 style={{ textAlign: 'center' }}>Update Profile</h1>
        <div style={{ textAlign: 'center' }}>
          <small>
            Last Updated:{' '}
            <Moment fromNow>{profile?.lastUpdated.toDate()}</Moment>
          </small>
        </div>
        {profile ? (
          <div>
            <HeadingForm
              title={profile.title}
              displayName={profile.displayName}
              pronoun={profile.pronoun}
              location={profile.location}
              handleFormChange={handleChange}
            />
            {!saving ? (
              <div
                onClick={handleSave}
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
                Save
              </div>
            ) : (
              <div>Saving...</div>
            )}
            <AboutForm
              about={profile.about}
              handleFormChange={handleChange}
              onSave={handleSave}
            />
            {!saving ? (
              <div
                onClick={handleSave}
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
                Save
              </div>
            ) : (
              <div>Saving...</div>
            )}
            <EducationForm />
            <WorkHistoryForm />
          </div>
        ) : (
          <Loading />
        )}
        {/* <div
          style={{
            marginTop: 30,
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <div style={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }}>
            Next {'>'}
          </div>
        </div> */}
      </Container>
    </div>
  );
}

export default CreateProfile;

const Container = styled.div`
  width: ${({ isMobile, isTablet }) =>
    isMobile ? '100%' : isTablet ? '600px' : '900px'};
  padding: 25px;
  margin: auto;
`;
