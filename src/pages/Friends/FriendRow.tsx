import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { User, UserRole } from '../../types/User';
import { useAuth } from '../../hooks/useAuth';
import EditIcon from '../../components/Icons/Edit';
import DeleteIcon from '../../components/Icons/Delete';
import SaveIcon from '../../components/Icons/Save';
import { Friendship, FriendshipStatus } from '../../types/Friendship';
import { useFriendAccept, useFriendCancel, useFriendReject } from '../../hooks/useFriends';
import CancelIcon from '../../components/Icons/Cancel';
import CheckCircle from '../../components/Icons/CheckCircle';

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

  const { friendship: cancelledFriend } = useFriendCancel(friendship.sender);
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
        <div className="action-icons">
        {canCancel &&
          <span
            className="action-icon cancel"
            title="Cancel"
            onClick={() => alert('todo: cancel')}
          >
            <CancelIcon />
          </span>
        }
        {canAccept &&
          <span
            className="action-icon accept"
            title="Accept"
            onClick={() => alert('todo: accept')}
          >
            <CheckCircle />
          </span>
        }
        {canReject &&
          <span
            className="action-icon reject"
            title="Reject"
            onClick={() => alert('todo: Reject')}
          >
            <CancelIcon />
          </span>
        }
        </div>
      </td>
    </tr>
  );
}

export default FriendRow;
