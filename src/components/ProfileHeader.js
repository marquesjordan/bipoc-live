import React from 'react';
import { useNavigate } from 'react-router-dom';
import Img from '../avatar.jpg';
import Camera from '../components/svg/Camera';
import Delete from '../components/svg/Delete';

const ProfileHeader = ({ user, deleteImage, setImg }) => {
  const navigate = useNavigate();

  return (
    <div className="profile_container">
      <div className="img_container">
        <img src={user.avatar || Img} alt="avatar" />
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
      </div>
      <div className="text_container">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <hr />
        <small>Joined on {user.createdAt.toDate().toDateString()}</small>
      </div>
    </div>
  );
};

export default ProfileHeader;
