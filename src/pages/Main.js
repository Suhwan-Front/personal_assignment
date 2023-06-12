import {useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

const Main = () => {
  const isLogin = localStorage.getItem('jwt') !== null;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    console.log(`로컬 스토리지 저장 : ${jwt}`);
  });

  useEffect(() => {
    if (
      isLogin &&
      (location.pathname === 'signin' || location.pathname === 'signup')
    ) {
      navigate('/');
    }
  }, [isLogin, location.pathname, navigate]);
  return (
    <>
      {isLogin ? (
        <>
          <div>로그인 중입니다.</div>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/signup">
            <div>회원가입 페이지로 이동</div>
          </Link>
          <Link to="/signin">
            <div>로그인 페이지로 이동</div>
          </Link>
          <div>경로 접속시 리다이렉션 확인용</div>
          <Link to="/todo">
            <div>투두리스트 페이지로 이동</div>
          </Link>
        </>
      )}
      {location.pathname === '/' && isLogin && (
        <>
          <Link to="/todo">
            <div>투두리스트 페이지로 이동</div>
          </Link>
          <div>경로 접속시 리다이렉션 확인용</div>
          <Link to="/signup">
            <div>회원가입 페이지로 이동</div>
          </Link>
          <Link to="/signin">
            <div>로그인 페이지로 이동</div>
          </Link>
        </>
      )}
    </>
  );
};

export default Main;
