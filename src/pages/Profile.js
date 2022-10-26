import React, { useState, useEffect } from 'react';
import Camera from '../components/svg/Camera';
import Img from '../avatar.jpg';
import { storage, db, auth } from '../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import Delete from '../components/svg/Delete';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader';

const Profile = () => {
  const navigate = useNavigate();

  const [img, setImg] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
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

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
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
  }, [img, user.avatarPath]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm('Delete avater?');
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });

        navigate('/');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return user ? (
    <section>
      <ProfileHeader user={user} deleteImage={deleteImage} setImg={setImg} />
    </section>
  ) : null;
};

export default Profile;
