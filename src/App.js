import { Route, Routes } from 'react-router';
import './App.css';
import Signup from './components/Login/Signup';
import Signin from './pages/Signin';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/userSlice';
import Main from './pages/Main';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const isAuth = !!useSelector((state) => state.user.loggedUser.email);
  !isAuth && dispatch(checkAuth());

  return (
    <>
      <Header isAuth={isAuth}></Header>
      <Routes>
        {isAuth ? (
          <Route path='/' element={<Main />} />
        ) : (
          <Route path='/' element={<Signin isAuth={isAuth} />} />
        )}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
