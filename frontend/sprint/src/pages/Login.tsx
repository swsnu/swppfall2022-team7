import { Button, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin: () => void = () => {
  };
  return (
    <div className="login-body">
      <div className="login-box">
        <div className="title">Login</div>
        <Input placeholder="Example@snu.ac.kr" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="primary" onClick={handleLogin}>Login</Button>
      </div>
      <div>
        {'Don\'t have an account yet?'}&nbsp;&nbsp;<Link to="/signup">Sign up!</Link>
      </div>
    </div>
  );
};

export default Login;
