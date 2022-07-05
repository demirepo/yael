import { Route, Routes } from 'react-router';
import './App.css';
import Signup from './components/Login/Signup';
import Signin from './pages/Signin';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/userSlice';
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import Reader from './pages/Reader';
import Dictionary from './pages/Dictionary';
import Training from './pages/Training';

function App() {
  const dispatch = useDispatch();
  const isAuth = !!useSelector((state) => state.user.loggedUser.email);
  !isAuth && dispatch(checkAuth());

  return (
    <>
      <Header isAuth={isAuth}></Header>
      <Routes>
        <Route index element={<Search />} />

        {isAuth ? (
          <Route path='/' element={<Search />} />
        ) : (
          <Route path='/' element={<Signin isAuth={isAuth} />} />
        )}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dictionary' element={<Dictionary />} />
        <Route path='/training' element={<Training />} />
        <Route path='/reader' element={<Reader />} />
      </Routes>
    </>
  );
}

export default App;
