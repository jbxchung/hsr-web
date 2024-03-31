import { FC, useState } from 'react';
import { UserRole } from '../../types/User';

const NewUserForm: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [password, setPassword] = useState<string>('');

  return (
    <div className="new-user-modal form">
      <h1>New User</h1>
      <div className="form-field">
        <span className="placeholder">Username</span>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email-address">Email Address</label>
        <input
          id="email-address"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field">
        <select
          value={role}
          onChange={e => setRole(e.target.value as UserRole)}
        >
          <option value={UserRole.ADMIN}>Admin</option>
          <option value={UserRole.USER}>User</option>
        </select>
      </div>
      <div className="form-field">
        <input
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  )
}

export default NewUserForm;