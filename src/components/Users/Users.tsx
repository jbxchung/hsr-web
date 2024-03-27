import { FC, useEffect, useState } from 'react';
import UserRow from './UserRow';
import { useUsers } from '../../hooks/useUsers';

import './Users.scss';

// todo - handle loading state
const Users: FC = () => {
  const { users: userList, isLoading, error } = useUsers();

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
          </tr>
        </thead>
        <tbody>
          {userList?.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
          <tr>
            <button className="new-user-button">Add New User</button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
