import useBindStore from '@store/zustand';
import { Button, Input, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useBindStore(state => state.signUp);
  const enableSignup: boolean = (
    name !== '' &&
    email !== '' &&
    password === confirm &&
    password !== ''
  );
  const handleSignup = async (): Promise<void> => {
    const re = /^\S+@\S+$/;
    const isValidEmail = re.test(email);
    if (!isValidEmail) {
      await message.error('Invalid email');
      return;
    }
    setLoading(true);
    try {
      await signUp(name, email, password);
      await message.success('Signup complete! Please check your email');
      navigate('/login');
    } catch (error) {
      await message.error('The email or username already exists!');
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="signup-body">
      <div className="signup-box">
        <div className="title">Create an account</div>
        <Input className="form-input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input className="form-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input.Password className="form-input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Input.Password className="form-input" status={password !== confirm ? 'error' : ''} placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        <Button type="primary" disabled={!enableSignup} onClick={() => { void handleSignup(); }} loading={loading}>
          Create Account
        </Button>
      </div>
      <div>
        {'Have an account?'}&nbsp;&nbsp;<Link to="/login">Login!</Link>
      </div>
    </div>
  );
};

export default SignUp;
