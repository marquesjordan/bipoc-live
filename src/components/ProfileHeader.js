import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../avatar.jpg';
import Camera from '../components/svg/Camera';
import Delete from '../components/svg/Delete';

const ProfileHeader = ({ user, profile, deleteImage, setImg, editable }) => {
  const navigate = useNavigate();

  return (
    <div className="profile_container">
      <div className="img_container">
        <img src={user.avatar || Img} alt="avatar" />
        {editable && (
          <div className="overlay">
            <div>
              {deleteImage && (
                <>
                  <label htmlFor="photo">
                    <Camera />
                  </label>
                  {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
                </>
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        )}
      </div>
      {profile.displayName && profile.title && (
        <div className="text_container">
          <h4 style={{ margin: 0, lineHeight: 1.2 }}>{profile.displayName}</h4>
          <h3 style={{ margin: 0, lineHeight: 1.2 }}>{profile.title}</h3>
          <small>Email: {profile.email}</small>
          <hr />
          <small>Joined on {user.createdAt.toDate().toDateString()}</small>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
