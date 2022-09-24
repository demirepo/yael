import {createSlice} from '@reduxjs/toolkit';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {errorDict} from '../i18n/errors';

import {AppDispatch} from './store';

interface IUser {
  loggedUser: {
    email: string;
    uid: string;
    createdAt: string;
    lastLoginAt: string;
  };
  isLoading: boolean;
  userError: string;
}

const initialState: IUser = {
  loggedUser: {
    uid: '',
    email: '',
    createdAt: '',
    lastLoginAt: '',
  },
  isLoading: false,
  userError: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching: (state) => {
      state.isLoading = true;
    },
    userFetchingSuccess: (state, action) => {
      state.loggedUser.uid = action.payload.uid;
      state.loggedUser.email = action.payload.email;
      state.loggedUser.createdAt = action.payload.createdAt;
      state.loggedUser.lastLoginAt = action.payload.lastLoginAt;

      state.userError = '';
      state.isLoading = false;
    },
    userFetchingError: (state, action) => {
      state.isLoading = false;
      state.userError = action.payload;
    },
  },
});

export const {actions, reducer} = userSlice;

export const {userFetchingSuccess, userFetchingError, userFetching} = actions;
export default reducer;

export const signupThunk =
  (email: string, pass: string) => (dispatch: AppDispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const {uid, email: userEmail} = userCredential.user;
        dispatch(userFetchingSuccess({uid, userEmail}));
        alert('Пользователь создан. Добро пожаловать!');
      })
      .catch((error) => {
        dispatch(userFetchingError(error.message));
      });
  };

export const signinThunk =
  (email: string, pass: string) => (dispatch: AppDispatch) => {
    const auth = getAuth();
    dispatch(userFetching());
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const {uid, email: userEmail} = userCredential.user;
        dispatch(userFetchingSuccess({uid, userEmail}));
        alert('Пользователь авторизован. Добро пожаловать!');
      })
      .catch((error) => {
        dispatch(userFetchingError(errorDict[error.message]));
      });
  };

export const checkAuth = () => (dispatch: AppDispatch) => {
  const auth = getAuth();
  try {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        const {uid, email} = user;
        dispatch(userFetchingSuccess({uid, email}));
      } else {
        // User is signed out
        // ...
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      dispatch(userFetchingError(error.message));
      // eslint-disable-next-line no-console
    } else console.log(error);
  }
};
