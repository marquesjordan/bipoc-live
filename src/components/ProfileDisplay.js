import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EducationTable from '../components/EducationTable';
import ProfileHeader from '../components/ProfileHeader';
import WorkTable from '../components/WorkTable';
import { db, storage } from '../firebase';
import { useMediaQuery } from '../hooks/media';

const ProfileDisplay = ({ userId, editable }) => {
  const navigate = useNavigate();
  const isTablet = useMediaQuery('(max-width: 980px)');

  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState(null);
  const [work, setWork] = useState(null);
  const [education, setEducation] = useState(null);

  useEffect(() => {
    const edRef = collection(db, 'profiles', userId, 'work');
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
  }, [userId]);

  useEffect(() => {
    const edRef = collection(db, 'profiles', userId, 'education');
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
  }, [userId]);

  useEffect(() => {
    getDoc(doc(db, 'users', userId)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    getDoc(doc(db, 'profiles', userId)).then((docSnap) => {
      if (docSnap.exists) {
        setProfileData(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`,
        );

        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, 'users', userId), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg('');
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [img, user?.avatarPath, userId]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avater?');
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, 'users', userId), {
          avatar: '',
          avatarPath: '',
        });

        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return user && profileData ? (
    <Wrapper isTablet={isTablet}>
      {profileData && (
        <ProfileHeader
          user={user}
          profile={profileData}
          deleteImage={deleteImage}
          setImg={setImg}
          editable={editable}
        />
      )}
      {profileData.about && (
        <>
          <div style={{ margin: 20 }} />
          <h3 style={{ color: '#483d8b' }}>Intro</h3>
          <TextWrapper>{profileData.about}</TextWrapper>
        </>
      )}
      {education.length > 0 && (
        <>
          <div style={{ margin: 20 }} />
          <h3 style={{ color: '#483d8b' }}>Education</h3>
          {education && <EducationTable education={education} />}
        </>
      )}
      {work.length > 0 && (
        <>
          <div style={{ margin: 20 }} />
          <h3 style={{ color: '#483d8b' }}>Work History</h3>
          {work && <WorkTable work={work} />}
        </>
      )}
    </Wrapper>
  ) : null;
};

export default ProfileDisplay;

const Wrapper = styled.div`
  padding: ${({ isTablet }) => (isTablet ? `15px` : `0`)};
`;

const TextWrapper = styled.div`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  padding: 25px 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
`;
