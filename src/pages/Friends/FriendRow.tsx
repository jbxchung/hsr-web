import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { User, UserRole } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import EditIcon from '../../components/Icons/EditIcon';
import DeleteIcon from '../../components/Icons/DeleteIcon';
import SaveIcon from '../../components/Icons/SaveIcon';
import { Friendship, FriendshipStatus } from '../../types/Friendship';
import { useFriendAccept, useFriendReject } from '../../hooks/useFriends';

interface FriendRowProps {
  currentUser: User | null;
  friendship: Friendship;
}

const FriendRow: FC<FriendRowProps> = ({ currentUser, friendship }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [canCancel, setCanCancel] = useState<boolean>(false);
  const [canAccept, setCanAccept] = useState<boolean>(false);
  const [canReject, setCanReject] = useState<boolean>(false);
  const [canRemove, setCanRemove] = useState<boolean>(false);

  const { friendship: acceptedFriend } = useFriendAccept(friendship.sender);
  const { friendship: rejectedFriend } = useFriendReject(friendship.sender);

  useEffect(() => {
    if (currentUser && friendship) {
      if (friendship.status === FriendshipStatus.ACCEPTED) {
        // already friends, can remove
        setCanRemove(true);
        setStatusText('Friends');
      } else if (friendship.sender === currentUser.username) {
        // we sent this request, display the receiver's name
        setDisplayName(friendship.receiver);
        // pending request, can cancel
        setCanCancel(true);
        setStatusText('Sent Request');
      } else {
        // we received this request, display the sender's name
        setDisplayName(friendship.sender);
        // pending request, can accept or reject
        setCanAccept(true);
        setCanReject(true);
        setStatusText('Received Request');
      }
    }
  }, [currentUser, friendship]);
  

  return (
    <tr className={`friend-row`}>
      <td>
        {displayName}
      </td>
      <td>
        {statusText}
      </td>
      <td>
        {canCancel &&
          'todo: cancel button'
        }
        {canAccept &&
          'todo: accept button'
        }
        {canReject &&
          'todo: reject button'
        }
      </td>
      <td>
        {/* <span
          className="action-icon edit"
          title="Edit"
          onClick={() => console.log('todo: edit')}
        >
          <EditIcon />
        </span> */}
      </td>
    </tr>
  );
}

export default FriendRow;
