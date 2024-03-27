import { FC } from "react";
import { User } from "../../types/User";
import { useAuth } from "../../hooks/useAuth";

interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  const { user: currentUser } = useAuth();

  return (
    <tr className={`user-row${user.id === currentUser?.id ? ' highlight' : ''}`}>
      <td>{user.accountName}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </tr>
  );
}

export default UserRow;