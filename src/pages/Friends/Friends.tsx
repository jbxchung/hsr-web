import { FC, useCallback, useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader';

import { useAuth } from '../../hooks/useAuth';
import { useFriendRequest, useFriends } from '../../hooks/useFriends';
import { Friendship, FriendshipStatus } from '../../types/Friendship';

import './Friends.scss';
import FriendRow from './FriendRow';
import PlusCircle from '../../components/Icons/PlusCircle';

const Friends: FC = () => {
  const { user } = useAuth();
  const { friends, isLoading } = useFriends();
  const { friendship: newFriendRequest, invoke: sendFriendRequest } = useFriendRequest();

  const [sentRequests, setSentRequests] = useState<Array<Friendship>>([]);
  const [receivedRequests, setReceivedRequests] = useState<Array<Friendship>>([]);
  const [friendList, setFriendList] = useState<Array<Friendship>>([]);

  const [addFriendName, setAddFriendName] = useState<string>('');

  // when a new friend request has been sent, update our local state to display it
  useEffect(() => {
    if (newFriendRequest) {
      const sent = [...sentRequests];
      setSentRequests([newFriendRequest, ...sent]);
    }
  }, [newFriendRequest]);

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
            {sentRequests.map(f => <FriendRow currentUser={user} friendship={f} />)}
            {receivedRequests.map(f => <FriendRow currentUser={user} friendship={f} />)}
            {friendList.map(f => <FriendRow currentUser={user} friendship={f} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;