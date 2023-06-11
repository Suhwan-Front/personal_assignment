import {useState} from 'react';

const SignIn = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  return (
    <>
      <div>로그인 페이지</div>
      <form>
        <input
          type="email"
          value={loginEmail}
          onChange={setLoginEmail(e => e.target.value)}
          data-testid="email-input"
        />
        <input
          type="password"
          value={loginPassword}
          onChange={setLoginPassword(e => e.target.value)}
          data-testid="password-input"
        />
        <button data-testid="signup-button">로그인</button>
      </form>
    </>
  );
};

export default SignIn;
