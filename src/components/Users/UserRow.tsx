import { FC } from 'react';
import { User } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import EditIcon from '../Icons/EditIcon';
import DeleteIcon from '../Icons/DeleteIcon';

interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  const { user: currentUser } = useAuth();

  return (
    <tr className={`user-row${user.id === currentUser?.id ? ' highlight' : ''}`}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.createdDate}</td>
      <td>
        <EditIcon />
        <DeleteIcon />
      </td>
    </tr>
  );
}

export default UserRow;