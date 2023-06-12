import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setLoginEmail] = useState('');
  const [password, setLoginPassword] = useState('');
  const [loginButtonDisable, setLoginButtonDisable] = useState(true);

  const checkLoginForm = () => {
    const loginEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const loginPasswordCheck = password.length >= 8;
    setLoginButtonDisable(!(loginEmailCheck && loginPasswordCheck));
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem('jwt');
    if (loginCheck) {
      alert('이미 로그인 하셨습니다!');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    console.log(`로컬 스토리지에 저장: ${jwt}`);
  }, []);

  useEffect(() => {
    checkLoginForm();
  }, [email, password]);

  const handleLogin = async e => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/auth/signin',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(`서버로부터 응답: ${response.data}`);
      const jwt = response.data.access_token;

      if (jwt) {
        localStorage.setItem('jwt', jwt);
        console.log(`로컬 스토리지 저장: ${localStorage.getItem('jwt')}`);
        navigate('/');
      } else {
        console.error('JWT 값을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to="/">
        <button>메인 페이지</button>
      </Link>
      <div>로그인 페이지</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={e => setLoginEmail(e.target.value)}
          data-testid="email-input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setLoginPassword(e.target.value)}
          data-testid="password-input"
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={loginButtonDisable}
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default SignIn;
