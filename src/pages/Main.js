import {Link} from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Link to="/signup">
        <div>회원가입 페이지로 이동</div>
      </Link>
      <Link to="/signin">
        <div>로그인 페이지로 이동</div>
      </Link>
      <Link to="/todo">
        <div>투두리스트 페이지로 이동</div>
      </Link>
    </>
  );
};

export default Main;
