import { FC, useCallback, useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader';

import { useAuth } from '../../hooks/useAuth';
import * as friendsApi from '../../hooks/useFriends';
import { Friendship, FriendshipStatus } from '../../types/Friendship';

import './Friends.scss';
import FriendRow from './FriendRow';
import PlusCircle from '../../components/Icons/PlusCircle';
import CancelIcon from '../../components/Icons/Cancel';
import CheckCircle from '../../components/Icons/CheckCircle';
import DeleteIcon from '../../components/Icons/Delete';

export enum FriendAction {
  ACCEPT = 'Accept',
  DELETE = 'Remove',
  CANCEL = 'Cancel',
  REJECT = 'Reject',
}

const Friends: FC = () => {
  const { user } = useAuth();
  const { friends, isLoading } = friendsApi.useFriends();
  const { friendship: newFriendRequest, invoke: sendFriendRequest } = friendsApi.useFriendRequest();
  const { friendship: acceptedFriend, invoke: acceptFriendRequest } = friendsApi.useFriendAccept();
  const { friendship: cancelledFriend, invoke: cancelFriendRequest } = friendsApi.useFriendCancel();
  const { friendship: rejectedFriend, invoke: rejectFriendRequest } = friendsApi.useFriendReject();

  const [sentRequests, setSentRequests] = useState<Array<Friendship>>([]);
  const [receivedRequests, setReceivedRequests] = useState<Array<Friendship>>([]);
  const [friendList, setFriendList] = useState<Array<Friendship>>([]);

  const [addFriendName, setAddFriendName] = useState<string>('');
  
  // add new friend request to display
  useEffect(() => {
    if (newFriendRequest) {
      const sent = [...sentRequests];
      setSentRequests([newFriendRequest, ...sent]);
    }
  }, [newFriendRequest]);

  // remove cancelled request
  useEffect(() => {
    if (cancelledFriend) {
      const sent = [...sentRequests];
      sent.splice(sent.findIndex(f => f.receiver === cancelledFriend.receiver), 1);
      setSentRequests(sent);
    }
  }, [cancelledFriend]);

  // remove rejected request
  useEffect(() => {
    if (rejectedFriend) {
      const received = [...receivedRequests];
      received.splice(received.findIndex(f => f.sender === rejectedFriend.sender), 1);
      setReceivedRequests(received);
    }
  }, [rejectedFriend]);

  // when we get the friends list, split it by sent/received/confirmed to display in that order
  useEffect(() => {
    const sent: Array<Friendship> = [];
    const received: Array<Friendship> = [];
    const confirmed: Array<Friendship> = [];

    if (user && friends) {
      friends.forEach(friendship => {
        if (friendship.status === FriendshipStatus.REQUESTED) {
          if (friendship.sender === user.username) {
            sent.push(friendship);
          } else {
            received.push(friendship);
          }
        } else if (friendship.status === FriendshipStatus.ACCEPTED) {
          confirmed.push(friendship);
        }
      });

      setSentRequests(sent);
      setReceivedRequests(received);
      setFriendList(confirmed);
    }
  }, [friends, user]);

  const requestFriend = useCallback(() => {
    sendFriendRequest({ user: addFriendName });
  }, [addFriendName]);

  return (
    <div className="friends-page">
      Placeholder friends management for {user?.username}
      <p>todo: add friend search</p>
      <input className="add-friend-input" value={addFriendName} onChange={(e) => setAddFriendName(e.target.value)} />
      <button className="primary" onClick={requestFriend} >
        Send Request
        <PlusCircle />
      </button>
      <div className="friends-list">
        {isLoading && (
          <div className="loading-overlay">
            <Loader />
          </div>
        )}
        <table className="friends-table">
          <tbody>
            {sentRequests.map(f => (
              <FriendRow
                displayName={f.receiver}
                statusText="Friend request sent"
                actions={[{ action: FriendAction.CANCEL, call: cancelFriendRequest, icon: CancelIcon } ]}
              />
            ))}
            {receivedRequests.map(f => (
              <FriendRow
                displayName={f.sender}
                statusText="Friend request received"
                actions={[
                  { action: FriendAction.ACCEPT, call: acceptFriendRequest, icon: CheckCircle },
                  { action: FriendAction.REJECT, call: rejectFriendRequest, icon: DeleteIcon },
                ]}
              />
            ))}
            {friendList.map(f => (
              <FriendRow
                displayName={(f.sender === user?.username) ? f.receiver: f.sender}
                statusText="Friend request accepted"
                actions={[{ action: FriendAction.DELETE, call: cancelFriendRequest, icon: CancelIcon }]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;