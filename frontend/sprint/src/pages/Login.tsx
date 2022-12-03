import useBindStore from '@store/zustand';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const logIn = useBindStore(state => state.logIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin: () => Promise<void> = async () => {
    const token = await logIn(email, password);
    if (token === null) {
      setPassword('');
      localStorage.clear();
      await message.error('Wrong email or password', 1);
    } else {
      localStorage.setItem('token', token);
      navigate('/projects');
    }
  };
  const onKeyPress: (e: React.KeyboardEvent<HTMLElement>) => Promise<void> = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') await handleLogin();
  };
  return (
    <div className="login-body">
      <div className="login-box">
        <div className="title">Login</div>
        <Input placeholder="Example@snu.ac.kr" value={email} onChange={e => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e => { void onKeyPress(e); }}
        />
        <Button type="primary" onClick={() => { void handleLogin(); }}>Login</Button>
      </div>
      <div>
        {'Don\'t have an account yet?'}&nbsp;&nbsp;<Link to="/signup">Sign up!</Link>
      </div>
    </div>
  );
};

export default Login;
