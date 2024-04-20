import { FC, useState } from 'react';
import UserRow from './UserRow';
import { useUsers } from '../../hooks/useUsers';

import './Users.scss';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import NewUserForm from './NewUserForm';
import Loader from '../../components/Loader/Loader';

const Users: FC = () => {
  const { users: userList, isLoading, error, invoke: refreshUserList } = useUsers();

  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);

  return (
    <div className="users">
      {error && (
        <div>Error loading users: {error.toString()}</div>
      )}
      <p>Click the <span className="edit-hint"><EditIcon/>Edit</span> icon to edit a user, or the <span className="delete-hint"><DeleteIcon/>Delete</span> icon to delete a user.</p>
      <table className="users-table">
        {isLoading && (
          <div className="loading-overlay">
            <Loader />
          </div>
        )}
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList?.map(user => (
            <UserRow key={user.id} user={user} onUserDeleted={() => refreshUserList()} />
          ))}
        </tbody>
      </table>

      <button className="primary new-user-button" onClick={() => setShowNewUserForm(true)}>
        {/* <PlusCircle /> */}
        Add New User
      </button>
      {showNewUserForm && <NewUserForm onUserCreated={() => refreshUserList()} closeModal={() => setShowNewUserForm(false)} />}
    </div>
  );
};

export default Users;