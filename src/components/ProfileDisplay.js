import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
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
import { auth, db, storage } from '../firebase';
import { useMediaQuery } from '../hooks/media';

const ProfileDisplay = ({ userId, editable, closeProfile, showClose }) => {
  const navigate = useNavigate();
  const isTablet = useMediaQuery('(max-width: 980px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const user1 = auth.currentUser.uid;

  const [img, setImg] = useState('');
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState(null);
  const [work, setWork] = useState(null);
  const [education, setEducation] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const edRef = collection(db, 'profiles', userId, 'work');
    const q = query(edRef);

    const unsub = onSnapshot(q, (querySnapshot) => {
      let _work = [];
      querySnapshot.forEach((doc) => {
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

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = userId;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const currentTimestamp = Timestamp.fromDate(new Date());

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: currentTimestamp,
      media: '',
    });

    await updateDoc(doc(db, 'messages', id), {
      lastMsgAt: currentTimestamp,
    });

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: currentTimestamp,
      media: '',
      unread: true,
    });

    setSent(true);
    setText('');
  };

  return user && profileData ? (
    <Wrapper isTablet={isTablet}>
      <ButtonWrapper>
        {showClose && (
          <CloseButton onClick={closeProfile}>
            <CloseIcon color="primary" />
          </CloseButton>
        )}
        {!editable && (
          <ActionIcons style={{ textAlign: 'right', margin: 12 }}>
            <div
              style={{
                color: 'grey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}>
              <FavoriteIcon color="disabled" />{' '}
              <span style={{ marginLeft: 5 }}>Like</span>
            </div>
            {' | '}
            <div
              onClick={() => setOpen(true)}
              style={{
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}>
              <MessageIcon color="primary" />{' '}
              <span style={{ marginLeft: 5 }}>Message</span>
            </div>
          </ActionIcons>
        )}
      </ButtonWrapper>
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
      {education?.length > 0 && (
        <>
          <div style={{ margin: 20 }} />
          <h3 style={{ color: '#483d8b' }}>Education</h3>
          {education && <EducationTable education={education} />}
        </>
      )}
      {work?.length > 0 && (
        <>
          <div style={{ margin: 20 }} />
          <h3 style={{ color: '#483d8b' }}>Work History</h3>
          {work && <WorkTable work={work} />}
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Job Modal"
        aria-describedby="Job Description">
        <ModalContainer isMobile={isMobile}>
          <div>
            <div
              style={{
                borderBottom: `1px solid`,
                padding: 8,
                fontWeight: 'bold',
                background: '#5e76bf',
                color: 'white',
              }}>
              New Message
            </div>
            <div style={{ padding: 8 }}>
              <div>
                <span style={{ fontWeight: 'bold' }}>Message to:</span>{' '}
                {profileData.displayName}
              </div>
              {!sent ? (
                <div>
                  <div className="input_container">
                    <label htmlFor="about" style={{ fontWeight: 'bold' }}>
                      Message
                    </label>
                    <textarea
                      type="text"
                      name="about"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows="8"
                    />
                    <div style={{ textAlign: 'right', marginTop: 10 }}>
                      <Button
                        onClick={handleSubmit}
                        type="outlined"
                        size="small">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: 20, textAlign: 'center' }}>
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: 'green',
                      marginBottom: 10,
                    }}>
                    Message Sent
                  </div>
                  <div
                    style={{ color: 'blue', cursor: 'pointer' }}
                    onClick={() => setOpen(false)}>
                    Close
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalContainer>
      </Modal>
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

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 2px solid #000;
  border: 2px solid lightgrey;
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  max-height: 80%;
  overflow-y: auto;
  width: ${({ isMobile }) => (isMobile ? `90%` : '600px')};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  justify-content: space-around;
`;

const CloseButton = styled.div`
  margin: 12px;
  color: blue;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: lightblue;
  }
`;
