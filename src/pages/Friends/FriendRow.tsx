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

// TODO - just display stuff, leave all this login in Friends.tsx
const FriendRow: FC<FriendRowProps> = ({ currentUser, friendship }) => {
  const [displayName, setDisplayName] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');
  const [canCancel, setCanCancel] = useState<boolean>(false);
  const [canAccept, setCanAccept] = useState<boolean>(false);
  const [canReject, setCanReject] = useState<boolean>(false);
  const [canRemove, setCanRemove] = useState<boolean>(false);

  const { friendship: cancelledFriend, invoke: cancelFriendRequest } = useFriendCancel();
  const { friendship: acceptedFriend, invoke: acceptFriendRequest } = useFriendAccept();
  const { friendship: rejectedFriend, invoke: rejectFriendRequest } = useFriendReject();

  useEffect(() => {
    if (cancelledFriend) {
      setCanCancel(false);
      setStatusText('Cancelled');
    }
  }, [cancelledFriend]);

  useEffect(() => {
    if (acceptedFriend) {
      setCanReject(false);
      setCanRemove(true);
      setCanAccept(false);
      setStatusText('Friends');
    }
  }, [acceptedFriend]);

  useEffect(() => {
    if (currentUser && friendship) {
      if (friendship.status === FriendshipStatus.ACCEPTED) {
        // already friends, can remove
        setCanRemove(true);
        setStatusText('Friends');
        setDisplayName((friendship.sender === currentUser.username) ? friendship.receiver: friendship.sender);
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
            onClick={() => cancelFriendRequest({ user: displayName })}
          >
            <CancelIcon />
          </span>
        }
        {canRemove &&
          <span
            className="action-icon remove"
            title="Remove"
            onClick={() => alert('todo: Allow removing friends via UI')}
          >
            <DeleteIcon />
          </span>
        }
        {canAccept &&
          <span
            className="action-icon accept"
            title="Accept"
            onClick={() => acceptFriendRequest({ user: displayName })}
          >
            <CheckCircle />
          </span>
        }
        {canReject &&
          <span
            className="action-icon reject"
            title="Reject"
            onClick={() => rejectFriendRequest({ user: displayName })}
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
