import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';



const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const isLogin = authCtx.isLoggedIn;
  const isGet = authCtx.isGetSuccess;

  const callback = (str:string) => {
    setNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
    }
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.nickname);
    }
  }, [isGet]);

  const toggleLogoutHandler = () => {
    authCtx.logout();
  }

  return (
      <nav>
        <ul>
          <li>{!isLogin && <Link to='/login'>Login</Link>}</li>
          <li>{!isLogin && <Link to='/signup'>Sign-Up</Link>}</li>
          <li>{isLogin && <Link to='/profile'>{nickname}</Link>}</li>
          <li>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
  );
};

export default MainNavigation;
