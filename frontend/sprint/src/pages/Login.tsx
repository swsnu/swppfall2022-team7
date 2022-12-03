import useBindStore from '@store/zustand';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Login: React.FC = () => {
  const user = useBindStore(state => state.user);
  const logIn = useBindStore(state => state.logIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin: () => Promise<void> = async () => {
    const isLoggedIn = await logIn(email, password);
    if (!isLoggedIn) {
      alert('Email or password is incorrect');
      setPassword('');
    }
  };
  const onKeyPress: (e: React.KeyboardEvent<HTMLElement>) => Promise<void> = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') await handleLogin();
  };
  return (
    user === null
      ? <div className="login-body">
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
      : <Navigate to="/projects" />
  );
};

export default Login;
