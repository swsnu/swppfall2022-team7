import { Button, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const enableSignup: boolean = (
    name !== '' &&
    email !== '' &&
    password === confirm &&
    password !== ''
  );
  const handleSignup: () => void = () => {
  };
  return (
    <div className="signup-body">
      <div className="signup-box">
        <div className="title">Create an account</div>
        <Input className="form-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input.Password className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Input.Password className="form-input" status={password !== confirm ? 'error' : ''} placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <Button type="primary" disabled={!enableSignup} onClick={handleSignup}>Create Account</Button>
      </div>
      <div>
        {'Have an account?'}&nbsp;&nbsp;<Link to="/login">Login!</Link>
      </div>
    </div>
  );
};

export default SignUp;
