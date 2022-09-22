import {Route, Routes} from 'react-router-dom';

import './App.css';
import Signup from './components/Login/Signup';
import Signin from './pages/Signin';
import {checkAuth} from './store/userSlice';
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import Reader from './pages/Reader/Reader';
import Dictionary from './pages/Dictionary/Dictionary';
import Training from './pages/Training/Training';
import {useAppDispatch, useAppSelector} from './hooks/redux';

function App() {
  const dispatch = useAppDispatch();
  const isAuth = !!useAppSelector((state) => state.user.loggedUser.email);
  !isAuth && dispatch(checkAuth());

  return (
    <>
      <Header isAuth={isAuth} />
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
