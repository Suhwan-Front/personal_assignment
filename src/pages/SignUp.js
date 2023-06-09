/* eslint-disable import/no-extraneous-dependencies */
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const navigate = useNavigate();

  const checkForm = () => {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordCheck = password.length >= 8;
    setButtonDisable(!(emailCheck && passwordCheck));
  };

  useEffect(() => {
    const loginCheck = localStorage.getItem('jwt');
    if (loginCheck) {
      alert('이미 로그인 하셨습니다!');
      navigate('/');
    }
  });

  useEffect(() => {
    checkForm();
  }, [email, password]);

  const handleSignUp = async e => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(`서버로 부터 응답: ${response.data}`);
      navigate('/signIn');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link to="/">메인 페이지</Link>
      <div>회원가입 페이지</div>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-testid="signup-input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-testid="signup-input"
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={buttonDisable}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
