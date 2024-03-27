import { FC, useEffect, useState } from 'react';
import UserRow from './UserRow';
import { useUsers } from '../../hooks/useUsers';

import './Users.scss';
import { User } from '../../types/User';
import PlusCircle from '../Icons/PlusCircle';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import NewUserForm from './NewUserForm';

// todo - handle loading state
const Users: FC = () => {
  const { users: userList, isLoading, error } = useUsers();

  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);

  return (
    <div className="users">
      {error && (
        <div>Error loading users: {error.toString()}</div>
      )}
      <p>Click the <span className="edit-hint"><EditIcon/>Edit</span> icon to edit a user, or the <span className="delete-hint"><DeleteIcon/>Delete</span> icon to delete a user.</p>
      <table className="users-table">
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
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>

      <button className="primary new-user-button" onClick={() => setShowNewUserForm(true)}>
        {/* <PlusCircle /> */}
        Add New User
      </button>
      {showNewUserForm && <NewUserForm />}
    </div>
  );
};

export default Users;
