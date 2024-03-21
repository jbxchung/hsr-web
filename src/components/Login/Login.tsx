import { FC, useState } from 'react';

const LoginPage: FC = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div>
      <input value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} />
      <input value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
    </div>
  )
};

export default LoginPage;