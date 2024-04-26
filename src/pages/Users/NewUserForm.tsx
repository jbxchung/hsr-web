import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { User, UserRole } from '../../types/User';
import { usePostUser } from '../../hooks/useUsers';

import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';

interface NewUserFormProps {
  onUserCreated: (user?: User) => void;
  closeModal: (e?: MouseEvent<HTMLButtonElement>) => void;
}

const NewUserForm: FC<NewUserFormProps> = (props: NewUserFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [password, setPassword] = useState<string>('');

  const [createButtonDisabled, setCreateButtonDisabled] = useState<boolean>(true);

  const { user: createdUser, isLoading, error: errorCreatingUser, invoke: createUser } = usePostUser();

  useEffect(() => {
    setCreateButtonDisabled(!username || !email || !password);
  }, [username, email, password, setCreateButtonDisabled]);

  const submitNewUser = useCallback(async () => {
    createUser({
      username,
      email,
      role,
      password,
    });
  }, [username, email, role, password]);

  useEffect(() => {
    if (createdUser) {
      console.log('created user', createdUser);
      props.onUserCreated();
      props.closeModal();
    }
  }, [createdUser, errorCreatingUser]);

  useEffect(() => {
    if (errorCreatingUser) {
      console.error('error creating user', errorCreatingUser);
    }
  }, [errorCreatingUser]);

  return (
    <Modal closeModal={props.closeModal}>
      <div className="new-user form">
        <h1>New User</h1>
        <Input
          required={true}
          className="form-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          required={true}
          className="form-field"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="form-field">
          <select
            value={role}
            onChange={e => setRole(e.target.value as UserRole)}
          >
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.USER}>User</option>
          </select>
        </div>
        <Input
          required={true}
          className="form-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="form-buttons">
          <button className="primary" disabled={createButtonDisabled} onClick={submitNewUser}>
            Create
          </button>
          <button className="danger"  onClick={props.closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NewUserForm;