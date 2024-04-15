import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData, getUserData } from './userReducer';
import Account from './comptes';

const UserHome = () => {
  const dispatch = useDispatch();
  const { userName, firstName, lastName } = useSelector(getUserData);

  const [newUserName, setNewUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleUpdateUserName = () => {
    dispatch(updateUserData({ token: localStorage.getItem('token'), userNames: { userName: newUserName } }));
    setIsEditing(false);
    setNewUserName('');
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back {userName} !</h1>
        <h1>{firstName} {lastName}</h1>
        {isEditing ? (
          <div className='editdiv'>
            <input
              className='editinput'
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter new username"
            />
            <input
              className='readonly-input'
              type="text"
              value={firstName}
              readOnly
            />
            <input
              className='readonly-input'
              type="text"
              value={lastName}
              readOnly
            />
            <div className='button-container'>
              <button className='editbtn' onClick={handleUpdateUserName}>Save</button>
              <button className='editbtn' onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="button-container">
            <button className='primarybtn' onClick={() => setIsEditing(true)}>Edit User</button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
      <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
      <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
    </main>
  );
}

export default UserHome;
