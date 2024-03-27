import { FC, useEffect, useState } from 'react';
import UserRow from './UserRow';
import { useUsers } from '../../hooks/useUsers';

import './Users.scss';
import { User } from '../../types/User';
import PlusCircle from '../Icons/PlusCircle';

// todo - handle loading state
const Users: FC = () => {
  const { users: userList, isLoading, error } = useUsers();

  const [ newUser, setNewUser ] = useState<User | null>(null);

  return (
    <div className="users">
      {error && (
        <div>Error loading users: {error.toString()}</div>
      )}
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

      <button className="primary new-user-button">
        {/* <PlusCircle /> */}
        Add New User
      </button>
    </div>
  );
};

export default Users;
