import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { User, UserRole } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import EditIcon from '../../components/Icons/Edit';
import DeleteIcon from '../../components/Icons/Delete';
import SaveIcon from '../../components/Icons/Save';
import { useDeleteUser, usePostUser, usePutUser } from '../../hooks/useUsers';

interface UserRowProps {
  user: User;
  onUserDeleted: (user: User) => void;
}

const UserRow: FC<UserRowProps> = ({ user, onUserDeleted }) => {
  const { user: currentUser } = useAuth();

  const { user: updatedUser, isLoading: isUpdatingUser, error: errorUpdatingUser, invoke: updateUser } = usePutUser(user.username);
  const { user: deletedUser, isLoading, error,invoke: deleteUser } = useDeleteUser(user.username);

  const [editableUser, setEditableUser] = useState<User>(user);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const usernameFieldRef = useRef<HTMLInputElement>(null);

  // when editing is enabled, focus the first field
  useEffect(() => {
    if (isEditing && usernameFieldRef.current) {
      usernameFieldRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    if (updatedUser) {
      console.log('updated user', updatedUser);
    }
  }, [updatedUser]);

  useEffect(() => {
    if (deletedUser) {
      console.log('deleted user', deletedUser);
      onUserDeleted(deletedUser);
    }
  }, [deletedUser]);

  // build css and render flags
  const cssClasses = [];
  let allowDelete = true;
  if (user.id === currentUser?.id) {
    cssClasses.push('highlight');
    allowDelete = false;
  }
  if (isEditing) {
    cssClasses.push('editing');
  }

  return (
    <tr className={`user-row ${cssClasses.join(' ')}`}>
      <td>
        <input
          ref={usernameFieldRef}
          value={editableUser.username}
          onChange={e => setEditableUser({
            ...editableUser,
            username: e.target.value
          })}
          disabled={!isEditing}
        />
      </td>
      <td>
        <input
          value={editableUser.email}
          onChange={e => setEditableUser({
            ...editableUser,
            email: e.target.value
          })}
          disabled={!isEditing}
        />
      </td>
      <td>
        {/* TODO: replace this with custom select for full style control */}
        <select
          value={editableUser.role}
          onChange={e => {
            setEditableUser({
              ...editableUser,
              role: e.target.value as UserRole
            });
            console.log(e.target.value);
          }}
          disabled={!isEditing}
        >
          <option value={UserRole.ADMIN}>Admin</option>
          <option value={UserRole.USER}>User</option>
        </select>
      </td>
      <td>{user.createdDate}</td>
      <td>
        {isEditing ? (
          <span
            className="action-icon save"
            title="Save"
            onClick={() => {
              updateUser(editableUser);
              setIsEditing(false);
            }}
          >
            <SaveIcon />
          </span>
        ) : (
          <span
            className="action-icon edit"
            title="Edit"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </span>
        )}
      </td>
      <td>
        <span
          className={`action-icon delete${allowDelete ? '' : ' disabled'}`}
          title={allowDelete ? 'Delete' : 'Why are you trying to delete yourself?'}
          onClick={() => {
            if (allowDelete) {
              deleteUser();
            }
          }}
        >
          <DeleteIcon />
        </span>
      </td>
    </tr>
  );
}

export default UserRow;