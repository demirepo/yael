import { createSlice } from '@reduxjs/toolkit';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: {
      email: '',
      uid: '',
      createdAt: '',
      lastLoginAt: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.loggedUser.email = action.payload.email;
      state.loggedUser.uid = action.payload.uid;
    },
  },
});

export const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;

export const signupThunk = (email, pass) => (dispatch) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const { uid, email } = userCredential.user;
      dispatch(setUser({ uid, email }));
      alert('Пользователь создан. Добро пожаловать!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const signinThunk = (email, pass) => (dispatch) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const { uid, email } = userCredential.user;
      dispatch(setUser({ uid, email }));
      alert('Пользователь авторизован. Добро пожаловать!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const checkAuth = () => (dispatch) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const { uid, email } = user;
      dispatch(setUser({ uid, email }));
    } else {
      // User is signed out
      // ...
    }
  });
};
