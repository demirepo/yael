import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Reader from './components/Reader/Reader';
import Toolbar from './components/Toolbar/Toobar';
import Signup from './components/Login/Signup';
import Signin from './components/Login/Signin';
import { useDispatch, useSelector } from 'react-redux';
import RoundMenuButton from './components/RoundMenuButton/RoundMenuButton';
import { checkAuth } from './store/userSlice';

const Secondary = () => {
  const dispatch = useDispatch();
  const isAuthed = !!useSelector((state) => state.user.loggedUser.email);
  !isAuthed && dispatch(checkAuth());

  return (
    <div className='wrapper'>
      <Toolbar isAuthed={isAuthed} />
      <Routes>
        {isAuthed ? (
          <Route path='/' element={<Reader className={'reader'} />} />
        ) : (
          <Route path='/' element={<Signin isUserAuthed={isAuthed} />} />
        )}
        <Route path='/signin' element={<Signin />} />

        <Route path='/signup' element={<Signup />} />
        {/* <Route path="/" element={<Toolbar />} /> */}
      </Routes>
      <RoundMenuButton />
    </div>
  );
};

export default Secondary;
